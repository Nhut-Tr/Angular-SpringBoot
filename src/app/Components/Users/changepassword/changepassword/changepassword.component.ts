import { TokenStorageService } from './../../../../service/token-storage.service';
import { UserService } from './../../../../service/user.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
})
export class ChangepasswordComponent implements OnInit {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  constructor(
    private authService: AuthService,
    private toastService: NgToastService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.toastService.warning({
        detail: 'Fail Message',
        summary: 'Password not match! Please try again',
        duration: 4000,
      });
    } else {
      this.authService
        .changePassword({
          userId: this.tokenService.getUser().id,
          userName: this.tokenService.getUser().username,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.toastService.success({
              detail: 'Success Message',
              summary: 'Change password successfully!',
              duration: 4000,
            });
            (this.oldPassword = ''),
              (this.newPassword = ''),
              (this.confirmPassword = '');
          },
          (err) => {
            this.toastService.warning({
              detail: 'Fail Message',
              summary: 'Current password is not valid!',
              duration: 4000,
            });
          }
        );
    }
  }
}
