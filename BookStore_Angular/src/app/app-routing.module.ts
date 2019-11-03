import { NgModule } from "@angular/core"
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './Components/Pages/Home/home.component';
import { BooksComponent } from './Components/Pages/Books/books.component';
import { RegisterComponent } from './Components/Pages/Register/register.component';
import { DetailComponent } from './Components/Pages/Detail/detail.component';
import { IntroduceComponent } from './Components/Pages/Introduce/introduce.component';


const routesConfig:Routes = [
  {path: 'introduce', component:IntroduceComponent },
  {path: 'register', component:RegisterComponent },
  {path: 'cate/:id', component:BooksComponent },
  {path: 'cate', component:BooksComponent },
  {path: 'detail/:id', component:DetailComponent },
  {path: '**', component: HomeComponent }
]

@NgModule({
  declarations: [
    HomeComponent,
    BooksComponent,
    RegisterComponent,
    DetailComponent,
    IntroduceComponent
  ],
  imports: [
    RouterModule.forRoot(routesConfig),
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule{

}
