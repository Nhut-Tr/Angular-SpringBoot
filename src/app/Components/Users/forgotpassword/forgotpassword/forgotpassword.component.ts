import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  email?: string;
  constructor(
    private authService: AuthService,
    private toastService: NgToastService
  ) {}

  ngOnInit(): void {}
  submit() {
    this.authService.forgetPassword(this.email!).subscribe(
      (data) => {
        this.toastService.success({
          detail: 'Success Message',
          summary: 'Please check your email!',
          duration: 4000,
        });
      },
      (err) => {
        this.toastService.error({
          detail: 'Fail Message',
          summary: 'Email not found!',
          duration: 4000,
        });
      }
    );
  }
}
