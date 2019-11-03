import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class BookService{

  constructor( private http:HttpClient ){}

  BookHome(){
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }

    /*
    let body = new URLSearchParams();
    body.set("UserToken", "");
    */
    return this.http.post("http://localhost:3000/api/HomeBook",  options);
  }

  BookFromCategory(id){
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }

    let body = new URLSearchParams();
    body.set("idCate", id);

    return this.http.post("http://localhost:3000/api/BookFromCate", body.toString(),  options);
  }

  BookDetail(id){
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }

    let body = new URLSearchParams();
    body.set("id", id);

    return this.http.post("http://localhost:3000/api/BookDetail", body.toString(),  options);
  }


}
