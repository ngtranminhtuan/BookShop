import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  templateUrl: './welcome.component.html',
  selector: 'welcome'
})

export class WelcomeComponent implements OnInit{

  @Input()
  name:String="";


  logOut(){
    localStorage.removeItem("UserToken");
    location.reload();
  }

  ngOnInit(){

  }

}
