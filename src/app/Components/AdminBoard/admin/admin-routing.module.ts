import { ChartComponent } from './chart/chart/chart.component';
import { UpdateOrderComponent } from './update-order/update-order/update-order.component';
import { OrderManagerComponent } from './order/order-manager/order-manager.component';
import { AdminComponent } from './admin.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user/update-user.component';
import { UpdateProductComponent } from './update-product/update-product.component';

import { CrudProductComponent } from './addnewproduct/crud-product/crud-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserListComponent } from './user_list/user-list/user-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { AuthorizeGuard } from 'src/app/auth/authorize.guard';

export const AdminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'order-manager',

        canActivate: [AuthorizeGuard],
        component: OrderManagerComponent,
      },
      {
        path: 'product-list',
        canActivate: [AuthorizeGuard],
        component: ProductListComponent,
      },
      {
        path: 'user-list',
        canActivate: [AuthorizeGuard],
        component: UserListComponent,
      },
      {
        path: 'add-user',
        canActivate: [AuthorizeGuard],
        component: AddUserComponent,
      },
      {
        path: 'crud-product',
        canActivate: [AuthorizeGuard],
        component: CrudProductComponent,
      },
      {
        path: 'update-product/:id',
        canActivate: [AuthorizeGuard],
        component: UpdateProductComponent,
      },
      {
        path: 'update-user/:id',
        canActivate: [AuthorizeGuard],
        component: UpdateUserComponent,
      },
      {
        path: 'update-order/:id',
        canActivate: [AuthorizeGuard],
        component: UpdateOrderComponent,
      },
      {
        path: 'chart',
        canActivate: [AuthorizeGuard],
        component: ChartComponent,
      },
    ],
  },
];
