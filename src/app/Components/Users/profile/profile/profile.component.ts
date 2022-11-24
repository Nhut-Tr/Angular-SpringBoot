import { NgToastService } from 'ng-angular-popup';
import { Users } from './../../../../class/users';
import { TokenStorageService } from './../../../../service/token-storage.service';
import { UserService } from './../../../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: Users = new Users();
  userData: any;
  data: any;
  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService,
    private toastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserById(this.tokenService.getUser().id)
      .subscribe((data) => {
        this.user = data;
      });
  }
  getnameJson(roleName: any) {
    return roleName[0].name;
  }
  updateUser() {
    const id = this.tokenService.getUser().id;
    this.userService
      .updateProfile(id, this.user.username!, this.user.fullName!)
      .subscribe(
        (data) => {
          this.toastService.success({
            detail: 'Success Message',
            summary: 'Change information successfully!',
            duration: 4000,
          });
        },
        (error) => console.log(error)
      );
  }

  onSubmit() {
    this.updateUser();
  }
}
