import { UpdateUserComponent } from './update-user/update-user/update-user.component';
import { UpdateProductComponent } from './update-product/update-product.component';

import { CrudProductComponent } from './addnewproduct/crud-product/crud-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserListComponent } from './user_list/user-list/user-list.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


// const routes: Routes = [
//   {path: "", pathMatch:"full",redirectTo:"/home"},
//   {path: "product-list", component: ProductListComponent},
//   {path: "user-list", component: UserListComponent},
//   {path: "crud-product", component: CrudProductComponent},
  
  
// ];
export const AdminRoutes: Routes = [
  {
      path: 'user-list',
      component: UserListComponent
  },
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
  },
  {
      path: 'product-list',
      component: ProductListComponent
  },
  {
      path: 'crud-product',
      component: CrudProductComponent
  },
  {
    path: 'update-product/:id',
    component: UpdateProductComponent
},
{
    path: 'update-user/:id',
    component: UpdateUserComponent
}
 
];
