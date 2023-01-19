import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    fullName: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  registerForm!: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private toast: NgToastService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(4)]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.email]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  onSubmit(): void {
    const { username, email, password, fullName } = this.form;
    this.isLoading = true;
    this.authService.register(username, email, password, fullName).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toast.success({
          detail: 'Success Message',
          summary: 'Please check your email for verification!',
          duration: 4000,
        });
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (err) => {
        this.toast.error({
          detail: 'Fail Message',
          summary: err.error.message,
          duration: 4000,
        });
        this.isLoading = false;
      }
    );
  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmPassword']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
