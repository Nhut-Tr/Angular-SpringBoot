import { ProductListComponent } from './product-list/product-list.component';
import { UserListComponent } from './user_list/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminRoutes } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateUserComponent } from './update-user/update-user/update-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgConfirmModule } from 'ng-confirm-box';
import { AddUserComponent } from './add-user/add-user.component';
import { OrderManagerComponent } from './order/order-manager/order-manager.component';
import { UpdateOrderComponent } from './update-order/update-order/update-order.component';
import { ChartComponent } from './chart/chart/chart.component';
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    NgxPaginationModule,
    NgConfirmModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgxSliderModule,
  ],
  declarations: [
    UserListComponent,
    ProductListComponent,
    UpdateProductComponent,
    UpdateUserComponent,
    AddUserComponent,
    OrderManagerComponent,
    UpdateOrderComponent,
    ChartComponent,
  ],
})
export class AdminModule {}
