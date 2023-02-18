import { Injectable } from '@angular/core';
import{Observable} from "rxjs";
import{HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public login(data:any):Observable<any>
  {
    return this.http.post("http://localhost:3000/login", data)
  }

  public getUsers():Observable<any>
  {
    return this.http.get("http://localhost:3000/users");
  }
}
