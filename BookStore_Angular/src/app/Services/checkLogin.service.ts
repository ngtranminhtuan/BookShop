import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class CheckLoginService{

  constructor( private http:HttpClient ){}

  checkLogin(token){
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }

    let body = new URLSearchParams();
    body.set("UserToken", token);

    return this.http.post("http://localhost:3000/api/checkLogin", body.toString(), options);
  }

  login(un, pw){
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }

    let body = new URLSearchParams();
    body.set("txtUsername", un);
    body.set("txtPassword", pw);

    return this.http.post("http://localhost:3000/api/login", body.toString(), options);
  }

}
