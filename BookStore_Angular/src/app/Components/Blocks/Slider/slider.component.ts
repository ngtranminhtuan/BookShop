import {Component} from '@angular/core';

@Component({
  templateUrl: './slider.component.html',
  selector: 'slider'
})

export class SliderComponent{
  ClickBanner(n){
    if(n==1){
      localStorage.setItem("Banner-1", "1");
      window.open("https://khoapham.vn/lichkhaigiang.html", '_blank');
    }

    if(n==2){
      localStorage.setItem("Banner-2", "1");
      window.open("http://online.khoapham.vn", '_blank');
    }
  }

}
