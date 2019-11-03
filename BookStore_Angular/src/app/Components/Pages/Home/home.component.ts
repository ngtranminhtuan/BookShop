import {Component} from '@angular/core';
import { BookService } from '../../../Services/book.service';

@Component({
  templateUrl: './home.component.html',
  selector: 'home',
  providers: [BookService]
})

export class HomeComponent{

  arr:any = [];

  constructor(private book:BookService){
    this.book.BookHome().subscribe(data=>{
      this.arr = data;
    });
  }
}
