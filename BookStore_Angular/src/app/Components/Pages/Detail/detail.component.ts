import {Component} from '@angular/core';
import { BookService } from '../../../Services/book.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './detail.component.html',
  selector: 'detail',
  providers: [BookService]
})

export class DetailComponent{
  kq:any = [];
  pdf:Boolean = false;
  arr:any = [];
  errr:Boolean = false;

  constructor(private book:BookService, private route:ActivatedRoute){
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.book.BookDetail(params.get("id")).subscribe(data=>{
        this.kq = data;
      });
    });
  }

  Download(f){
    if (localStorage.getItem("Banner-1") === null || localStorage.getItem("Banner-2") === null) {
      this.errr = true;
      setTimeout(()=>{    //<<<---    using ()=> syntax
        this.errr = false;
   }, 3000);
    }else{
      this.errr = false;
      window.open("https://khoapham.vn/download/ebooks/" + f, '_blank');
    }
  }
}
