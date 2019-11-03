import {Component} from '@angular/core';
import { CategoryService } from '../../../Services/category.service';

@Component({
  templateUrl: './category.component.html',
  selector: 'category',
  providers: [CategoryService]
})

export class CategoryComponent{
  arrCate:any = [];
  constructor(private CateService:CategoryService){
    this.CateService.getAllCate().subscribe(data=>{
      this.arrCate = data;
    });
  }
}
