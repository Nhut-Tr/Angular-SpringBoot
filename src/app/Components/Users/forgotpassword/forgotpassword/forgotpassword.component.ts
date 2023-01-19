import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  email?: string;
  forgetForm!: FormGroup;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private toastService: NgToastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.email]],
    });
  }
  submit() {
    this.isLoading = true;
    this.authService.forgetPassword(this.forgetForm.value.email).subscribe(
      (data) => {
        this.toastService.success({
          detail: 'Success Message',
          summary: 'Please check your email!',
          duration: 4000,
        });
        this.forgetForm.reset();
        this.isLoading = false;
      },
      (err) => {
        this.toastService.error({
          detail: 'Fail Message',
          summary: 'Email not found!',
          duration: 4000,
        });
        this.isLoading = false;
      }
    );
  }
}
