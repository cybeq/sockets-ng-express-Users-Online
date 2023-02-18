let express = require('express') ;
let app = express () ;

const bodyParser = require ( 'body-parser' ) ;
app . use ( bodyParser.json() )

let http   = require ( 'http' ) ;
let server = http . Server ( app ) ;

let cors = require ( 'cors' ) ;
app . use ( cors() ) ;

let socketIO = require ( 'socket.io' ) ;
let io = socketIO ( server , { cors : {origin:'*'} } ) ;

const port = process.env.PORT|| 3000 ;

const fs = require ( 'fs' ) ;

server . listen ( port, () =>
{
  console.log(`started on port: ${port}`);
}
                ) ;

let online = [ ] ;
io . on ( 'connection', socket =>
{


  socket.on('login', (id) =>
  {
    var x = 0;
    for ( let all of online )
    {
      if ( all.user === id ) x++ ;
    }
      if ( x === 0 ) online . push ( { user:id, socket:socket.id } )  ;

      io . emit ( 'refresh' , JSON.stringify ( online ) ) ;

      x = 0 ;
  })

  socket.on( 'logout', (id) =>
  {

    let arr = [ ] ;
    for ( let all of online )
    {
      if ( all.user === id )  continue ;
      arr . push ( all ) ;
    }
    online = arr ;
    io.emit ( 'refresh' , JSON.stringify ( online ) ) ;
    arr = [ ] ;
  })

  function getSocket ()
  {
    return socket ;
  }

  socket . on ( 'disconnect' , socket => {

    let arr = [ ] ;
    for ( let all of online )
    {
      if ( all.socket === getSocket().id )  continue ;

      arr . push ( all ) ;
    }
    online = arr;
    io.emit( 'refresh', JSON.stringify( online ) ) ;
    arr = [ ] ;
  })
})


//api
app.post ('/login' ,  ( req , res ) =>
              {
                let email  = req. body.email;
                let password = req.body.password

                let rawdata = fs.readFileSync('users.json');
                let jsonUsers = JSON.parse(rawdata);
                for (let all of jsonUsers)
                {
                  if (all.email === email && all.password === password)
                  {
                    return res.send(all)
                  }

                }

                return  res.send({"response":"unauthorized"})
              }
        )  ;
app.get( '/users', ( req , res ) =>
            {
              let rawdata = fs.readFileSync('users.json');
              let jsonUsers = JSON.parse(rawdata);
              res.send(jsonUsers);
            }
      )  ;


app.get('/online', (req, res)=>
          {
            res.send(online);
          }
      ) ;
