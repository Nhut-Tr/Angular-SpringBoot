import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { ProductClass } from 'src/app/class/product-class.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-product',
  templateUrl: './crud-product.component.html',
  styleUrls: ['./crud-product.component.css'],
})
export class CrudProductComponent implements OnInit {
  product: ProductClass = new ProductClass();
  submitted = false;
  addProductForm!: FormGroup;
  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private toast: NgToastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
      image: ['', Validators.required],
    });
  }
  checkValidate() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }
    alert('success!');
  }

  addProduct() {
    this.product = {
      ...this.addProductForm.value,
      name: this.addProductForm.value.productName,
      img: this.addProductForm.value.image,
    };
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe(
      (data) => {
        console.log(data);
        this.gotoProductList();
      },
      (error) => {
        this.toast.warning({
          detail: 'Failed Message',
          summary: 'Error: The field is empty!',
          duration: 4000,
        });
      }
    );
  }

  onSubmit() {
    this.addProduct();
  }

  gotoProductList() {
    this.router.navigate(['/admin/product-list']);
  }
  readUrl(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        // this.url = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  clear() {
    this.addProductForm.reset();
  }
}
