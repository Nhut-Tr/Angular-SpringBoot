import { ProductListComponent } from './product-list/product-list.component';
import { UserListComponent } from './user_list/user-list/user-list.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminRoutes } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateUserComponent } from './update-user/update-user/update-user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgConfirmModule } from 'ng-confirm-box';
@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(AdminRoutes),
      FormsModule,
      NgxPaginationModule,
      NgConfirmModule
    ],
    declarations: [
     UserListComponent,
     ProductListComponent,
     UpdateProductComponent,
     UpdateUserComponent,

    ]
  })

  export class AdminModule {}
