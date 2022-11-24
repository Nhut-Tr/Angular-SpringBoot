import { CategoriesComponent } from './categories/categories.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination'; // At the top of your module
import { Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  declarations: [
  CategoriesComponent
  ],

  imports: [ BrowserModule, FormsModule, NgxPaginationModule ],
  exports: [CommonModule, NgxPaginationModule],

})
export class CategoriesModule { }