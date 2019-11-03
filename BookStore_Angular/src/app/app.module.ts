import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './Components/Blocks/Menu/menu.component';
import { SliderComponent } from './Components/Blocks/Slider/slider.component';
import { CategoryComponent } from './Components/Blocks/Category/category.component';
import { LoginComponent } from './Components/Blocks/Login/Login/login.component';
import { WelcomeComponent } from './Components/Blocks/Login/Welcome/welcome.component';
import { UsersComponent } from './Components/Blocks/Login/Users/users.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SliderComponent,
    CategoryComponent,
    LoginComponent,
    WelcomeComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
