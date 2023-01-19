import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Users } from 'src/app/class/users';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  id: any;
  user: Users = new Users();
  userRole: any;
  isAuth = false;
  data: any;
  userData: any;
  role: any;
  submitted = false;
  addUserForm!: FormGroup;
  roles = [
    {
      id: 1,
      name: 'admin',
    },
    {
      id: 2,
      name: 'moderator',
    },
    {
      id: 3,
      name: 'user',
    },
  ];
  selectRole: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toast: NgToastService,
    private tokenService: TokenStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    this.role = user.roles;
    this.isAuth = this.role.includes('ROLE_MODERATOR');

    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      fullName: ['', Validators.required],
      email: ['', [Validators.email]],
    });
  }

  updateUser() {
    console.log(this.selectRole);
    this.data = {
      ...this.addUserForm.value,
      role: this.selectRole ? [].concat(this.selectRole.name) : null,
    };
    console.log(this.data);
    this.userService.addUsers(this.data).subscribe({
      next: () => {
        this.user = new Users();
        this.gotoList();
      },
      error: (err) => {
        this.toast.error({
          detail: 'Failed Message',
          summary: 'Error: Insert Failed!',
          duration: 4000,
        });
      },
    });
  }
  gotoList() {
    this.router.navigate(['/admin/user-list']);
  }
  onSubmit() {
    this.updateUser();
  }

  onChangeRole(event: any) {
    this.selectRole = this.roles.filter(
      (role: any) => role.name === event.target.value
    )[0];

    console.log(this.selectRole);
  }

  clear() {
    this.addUserForm.reset();
  }
}
