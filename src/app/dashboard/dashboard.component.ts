import { Component, OnInit } from '@angular/core';
import {SocketService} from "../service/socket.service";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // //
  usersDisplay = "none" ;
  // //

  status : boolean [ ] = [ ] ;
  online : any [ ] = [ ] ;
  users  : any ;

  constructor ( private router:Router,
                private socket:SocketService,
                private userService: UserService)
              {
                if ( localStorage.getItem("id") === null   ||   localStorage.getItem("id") === '' )
                {
                  router . navigate( [ '/' ] ) ;
                }
              }

      ngOnInit () : void
      {
      //lista uzytkownikow
      this . userService
           . getUsers ()
           . subscribe ( res =>
                                   {
                                     this.users = res;
                                   }
                       ) ;

        //dodaj id do socket
        this . socket . login ( localStorage.getItem("id") ) ;

        //online
        this . socket . online ()
                      . subscribe(res=>
                                            {
                                              this.online = JSON.parse(res);
                                            }
                                 )


      }


      logout () : void
      {
        this . socket . logout ( localStorage.getItem("id") ) ;
        localStorage . clear () ;

        this . router . navigate ( ['/'] )
      }


      getOnlineStatus ( id : number )
      {
          for ( let all    of   this . online )
          {
            if ( String( all.user )   ===   String( id ) )
            {
              return "online" ;
              break ;
            }
          }
          return "offline" ;
      }

      showUsers ()
      {
            this . usersDisplay = 'inherit'
      }

       shutUsers ()
      {
             this . usersDisplay = 'none'
      }

}
