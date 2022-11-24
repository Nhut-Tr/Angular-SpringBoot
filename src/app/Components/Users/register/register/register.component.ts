import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';

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

  constructor(
    private authService: AuthService,
    private toast: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, email, password, fullName } = this.form;

    this.authService.register(username, email, password, fullName).subscribe(
      (data) => {
        console.log(data);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.toast.success({
          detail: 'Success Message',
          summary: 'Register success!',
          duration: 4000,
        });
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.toast.error({
          detail: 'Fail Message',
          summary: 'err.error.message',
          duration: 4000,
        });
      }
    );
  }
}
