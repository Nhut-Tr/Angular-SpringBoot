
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './Components/Block/header/categoty/category/category.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Block/header/header.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
