import { NgToastService } from 'ng-angular-popup';
import { Users } from './../../../../class/users';
import { TokenStorageService } from './../../../../service/token-storage.service';
import { UserService } from './../../../../service/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('takeInput', { static: false }) InputVar!: ElementRef;
  user: Users = new Users();
  userData: any;
  data: any;
  isDisable = true;

  fileName = null;
  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService,
    private toastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
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
    const data = new FormData();
    data.append('file', this.fileName!);
    data.append(
      'user',
      JSON.stringify({ id: this.user.id, fullName: this.user.fullName })
    );
    if (this.user.fullName == '') {
      this.getUser();
      this.toastService.error({
        detail: 'Error Message',
        summary: 'Your name is invalid!',
        duration: 4000,
      });
    } else {
      this.userService.updateProfile(data).subscribe({
        next: (data) => {
          this.user = data;
          this.toastService.success({
            detail: 'Success Message',
            summary: 'Change information successfully!',
            duration: 4000,
          });
          this.editProfile();
        },
        error: (res) => {
          this.toastService.error({
            detail: 'Success Message',
            summary: res.error.message,
            duration: 4000,
          });
        },
      });
    }
  }
  onFileChange(evt: any): void {
    console.log(evt.target.files[0].size);
    if (evt.target.files[0].size > 1048576) {
      this.InputVar.nativeElement.value = '';
      this.toastService.error({
        detail: 'Fail Message',
        summary: 'File must be <= 1Mb!',
        duration: 4000,
      });
      return;
    }
    this.fileName = evt.target.files[0];
  }

  onSubmit() {
    this.updateUser();
  }
  editProfile() {
    this.isDisable = !this.isDisable;
  }
}
