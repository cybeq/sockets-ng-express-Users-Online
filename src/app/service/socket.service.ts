import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket : any ;
  private url = 'http://localhost:3000' ;

  constructor ()
  {
    this . socket = io . connect ( this.url ) ;
  }

  public login ( id : any )
  {
    this . socket . emit ( 'login' , id ) ;
  }

  public logout ( id: any )
  {
    this . socket . emit ('logout', id) ;
  }

  public online ()
  {
      return new Observable <any> (
                            observer =>
                                                {
                                                   this . socket . on ('refresh', (data: any) => observer.next(data));
                                     });
  }

}
