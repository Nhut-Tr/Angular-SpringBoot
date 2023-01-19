import { NgToastService } from 'ng-angular-popup';
import { TokenStorageService } from './../../../../../service/token-storage.service';
import { UserService } from './../../../../../service/user.service';
import { Users } from './../../../../../class/users';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { end } from '@popperjs/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
interface role {
  id: number;
  name: string;
}
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  id: any;
  user: Users = new Users();
  currentUser!: Users;
  userRole: any;
  selectRole: any;
  data: any;
  userData: any;
  selectStatus: any;
  updateUserForm!: FormGroup;
  roles = [
    {
      id: 1,
      name: 'ROLE_USER',
    },
    {
      id: 2,
      name: 'ROLE_ADMIN',
    },
    {
      id: 3,
      name: 'ROLE_MODERATOR',
    },
  ];
  listStatus = [
    {
      enabled: true,
      name: 'ACTIVE',
    },
    {
      enabled: false,
      name: 'INACTIVE',
    },
  ];
  displayStatus(enabled: boolean) {
    return this.listStatus.find((e) => e.enabled === enabled)?.name;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastService: NgToastService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(
      (data) => {
        console.log(data.roles[0].name);
        this.user = data;
        this.selectStatus = this.listStatus.find(
          (e) => e.enabled === this.user.enabled
        );

        this.selectRole = this.roles.find(
          (e) => e.id === this.user.roles[0].id
        );

        console.log(this.user);
      },
      (error) => console.log(error)
    );
    this.updateUserForm = this.formBuilder.group({
      userName: [
        this.user.username,
        [Validators.required, Validators.minLength(4)],
      ],
      fullName: [this.user.fullName, [Validators.required]],
      selectStatus: [this.user.enabled, [Validators.required]],
      selectRole: [this.user.roles, [Validators.required]],
    });
  }

  updateUser() {
    this.data = {
      ...this.user,
      username: this.updateUserForm.value.userName,
      fullName: this.updateUserForm.value.fullName,
      roles: [this.selectRole],
      enabled: this.selectStatus.enabled,
    };
    this.userService.update(this.id, this.data).subscribe(
      (data) => {
        this.user = new Users();
        this.gotoList();
      },
      (error) =>
        this.toastService.error({
          detail: 'Failed Message',
          summary: error.err.message,
          duration: 4000,
        })
    );
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
    console.log(event);
  }
  back() {
    this.router.navigate(['/admin/user-list']);
  }
}
