import {Component} from '@angular/core';
import { BookService } from '../../../Services/book.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './books.component.html',
  selector: 'books',
  providers: [BookService]
})

export class BooksComponent{
  arr:any = [];
  id:String = "";

  titleCate = "";
  dsBooks:any = [];

  constructor(private book:BookService, private route:ActivatedRoute){
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.book.BookFromCategory(params.get("id")).subscribe(data=>{
        this.arr = data;
        this.titleCate = this.arr.arr[0].title;
        this.dsBooks = this.arr.arr[0].DSBook;
      });
    });

  }
}
