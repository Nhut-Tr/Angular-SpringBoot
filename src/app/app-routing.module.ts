

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/Pages/home/home.component';
import { DetailComponent } from './Components/Pages/detail/detail/detail.component';
import { AboutComponent } from './Components/Pages/about/about/about.component';
import { CategoriesComponent } from './Components/Pages/categories/categories/categories.component';

const routes: Routes = [
  {path: "", pathMatch:"full",redirectTo:"/home"},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "product", component: CategoriesComponent},
  {path: "detail", component: DetailComponent},

  
];

@NgModule({
  declarations:[
    HomeComponent,
    AboutComponent,
    CategoriesComponent,
    DetailComponent
  ],
  imports: [RouterModule.forRoot(routes),
  CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
