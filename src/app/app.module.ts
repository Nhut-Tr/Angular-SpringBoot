import { CategoriesModule } from './Components/Pages/categories/categories.module';

import { MenuBarComponent } from './Components/AdminBoard/admin/MenuAdmin/menu-bar/menu-bar.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './Components/Block/header/categoty/category/category.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Block/header/header.component';
import { LoginComponent } from './Components/Users/login/login/login.component';
import { RegisterComponent } from './Components/Users/register/register/register.component';
import { NgToastModule } from 'ng-angular-popup';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { NgxPayPalModule } from 'ngx-paypal';
import { NotiComponent } from './Components/AdminBoard/noti/noti/noti.component';
import { CrudProductComponent } from './Components/AdminBoard/admin/addnewproduct/crud-product/crud-product.component';
import { AdminComponent } from './Components/AdminBoard/admin/admin.component';
import { CartitemComponent } from './Components/Block/cart/cartitem/cartitem.component';
import { CheckoutComponent } from './Components/Block/checkout/checkout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from './Components/Pages/detail/detail/detail.component';
import { HistoryCartComponent } from './Components/Block/history-cart/history-cart.component';
import { FooterComponent } from './Components/Block/footer/footer.component';
import { NgConfirmModule } from 'ng-confirm-box';
import { VerificationComponent } from './Components/Users/verification/verification/verification.component';
import { ForgotpasswordComponent } from './Components/Users/forgotpassword/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './Components/Users/resetpassword/resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './Components/Users/changepassword/changepassword/changepassword.component';
import { ProfileComponent } from './Components/Users/profile/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    LoginComponent,
    RegisterComponent,
    NotiComponent,
    AdminComponent,
    MenuBarComponent,
    CrudProductComponent,
    CartitemComponent,
    CheckoutComponent,
    DetailComponent,
    HistoryCartComponent,
    FooterComponent,
    VerificationComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ChangepasswordComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    NgbModule,
    NgxPayPalModule,
    CategoriesModule,
    NgConfirmModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
