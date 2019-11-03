import {Component, OnInit} from '@angular/core';
import { CheckLoginService } from '../../../../Services/checkLogin.service';

@Component({
  templateUrl: './login.component.html',
  selector: 'login',
  providers: [CheckLoginService]
})

export class LoginComponent implements OnInit{
  Username = "";
  Password = "";
  state:Boolean = false;
  name:String = "";
  arr:any = [];

  error:Boolean = false;
  err:String = "";

  constructor(private checkLogin:CheckLoginService){
    if(localStorage["UserToken"]){
      this.checkLogin.checkLogin(localStorage.getItem("UserToken")).subscribe(data=>{
        this.arr = data;
        console.log(data);
        if(this.arr.kq==1){
          this.name = this.arr.user.name;
          this.state = true;
        }else{
          this.state = false;
        }
      });
    }else{
      this.state = false;
    }
  }

  ngOnInit() {
    // ...
  }

  didLogOut(){
    this.state = false;
  }

  submitLogin(f){
    this.checkLogin.login(f.value.Username, f.value.Password).subscribe(data=>{
      this.arr = data;
      if(this.arr.kq==1){
        this.state = true;
        this.name = this.arr.name;
        localStorage.setItem("UserToken", this.arr.token);
      }else{
        this.error = true;
        this.err = this.arr.err;
      }
    });
  }
}
