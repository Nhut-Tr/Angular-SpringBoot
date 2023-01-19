import { TokenStorageService } from './../../../../service/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductClass } from 'src/app/class/product-class.model';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Users } from 'src/app/class/users';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  id: any;
  product: ProductClass = new ProductClass();
  selectStatus: any;
  submitted = false;
  updateProductForm!: FormGroup;

  listStatus = [
    {
      status: false,
      name: 'INACTIVE',
    },
    {
      status: true,
      name: 'ACTIVE',
    },
  ];
  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(
      (data) => {
        this.product = data;

        // this.addProductForm.setValue({ ...this.product });
        this.selectStatus = this.listStatus.find(
          (e) => e.status === this.product.status
        );
        this.updateProductForm.setValue({
          selectStatus: this.product.status,
          ...this.product,
        });
      },
      (error) => console.log(error)
    );

    this.updateProductForm = this.formBuilder.group({
      productName: [
        this.product.name,
        [Validators.required, Validators.minLength(4)],
      ],
      price: [
        this.product.price,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
        ],
      ],
      description: [this.product.description, Validators.required],
      quantity: [
        this.product.quantity,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      img: [this.product.img, Validators.required],
      selectStatus: [this.product.status, Validators.required],
    });
  }

  updateProduct() {
    this.product = { ...this.product, status: this.selectStatus.status };
    this.productService.update(this.id, this.product).subscribe(
      (data) => {
        this.product = new ProductClass();
        this.gotoList();
      },
      (error) => console.log(error)
    );
  }
  gotoList() {
    this.router.navigate(['/admin/product-list']);
  }
  onSubmit() {
    this.updateProduct();
  }
  back() {
    this.router.navigate(['/admin/product-list']);
  }
}
