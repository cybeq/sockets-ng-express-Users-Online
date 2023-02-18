import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import{UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:any;

  formGroup = new FormGroup({
    "email" : new FormControl('', Validators.required),
    "password" : new FormControl('', Validators.required)
  })
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  public sbmLogin() : void {
    this.userService.login(this.formGroup.value).subscribe(res => {
      if(res.id)
      {
        localStorage.setItem("id", res.id)
        this.router.navigate(['dashboard'])
      }
      else{
        this.error = "Wprowadź poprawne dane"
      }
    })
  }

}
