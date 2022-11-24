import { ProfileComponent } from './Components/Users/profile/profile/profile.component';
import { ChangepasswordComponent } from './Components/Users/changepassword/changepassword/changepassword.component';
import { ResetpasswordComponent } from './Components/Users/resetpassword/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './Components/Users/forgotpassword/forgotpassword/forgotpassword.component';
import { VerificationComponent } from './Components/Users/verification/verification/verification.component';
import { HistoryCartComponent } from './Components/Block/history-cart/history-cart.component';
import { DetailComponent } from './Components/Pages/detail/detail/detail.component';
import { CheckoutComponent } from './Components/Block/checkout/checkout.component';
import { CartitemComponent } from './Components/Block/cart/cartitem/cartitem.component';
import { UserListComponent } from './Components/AdminBoard/admin/user_list/user-list/user-list.component';
import { ProductListComponent } from './Components/AdminBoard/admin/product-list/product-list.component';
import { AdminComponent } from './Components/AdminBoard/admin/admin.component';
import { RegisterComponent } from './Components/Users/register/register/register.component';
import { LoginComponent } from './Components/Users/login/login/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/Pages/home/home.component';

import { AboutComponent } from './Components/Pages/about/about/about.component';
import { CategoriesComponent } from './Components/Pages/categories/categories/categories.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryComponent } from './Components/Block/header/categoty/category/category.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'product', component: CategoriesComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerificationComponent },
  { path: 'forgot', component: ForgotpasswordComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reset', component: ResetpasswordComponent },
  { path: 'product_list', component: ProductListComponent },
  { path: 'user_list', component: UserListComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cartitem', component: CartitemComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'history', component: HistoryCartComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Components/AdminBoard/admin/admin.module').then(
            (m) => m.AdminModule
          ),
      },
    ],
  },
  { path: 'detail', component: DetailComponent },
];

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [RouterModule.forRoot(routes), CommonModule, NgxPaginationModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
