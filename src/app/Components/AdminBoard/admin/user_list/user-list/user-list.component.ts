import { UserService } from './../../../../../service/user.service';
import { Users } from './../../../../../class/users';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  user?: any;
  currentUser!: Users;
  currentIndex = -1;
  name = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  listSize = [5, 10, 15];
  searchName: any;
  searchMail: any;
  searchRole: any;
  isAuth = false;
  searchUserStatus = null;
  selectStatus: any;
  private role: string[] = [];
  selectRole: any;
  paramURL: { enabled?: boolean } = {};
  listRole = [
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
      status: false,
      name: 'INACTIVE',
    },
    {
      status: true,
      name: 'ACTIVE',
    },
  ];
  constructor(
    private userService: UserService,
    private router: Router,
    private confirmService: NgConfirmService,
    private tokenService: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.searchUserStatus = !res['enabled'] ? true : res['enabled'];

      this.currentUser = this.tokenService.getUser();
      this.role = this.currentUser.roles;
      this.isAuth = this.role.includes('ROLE_MODERATOR');

      this.getUsers();
    });
  }

  getUsers(): void {
    this.userService.getListUser(this.page - 1, this.tableSize).subscribe(
      (data: any) => {
        this.user = data.content;
        this.count = data.totalElements;
      },
      (error) => {
        this.user = [];
        this.count = 0;
      }
    );
  }

  searchByRole() {
    this.searchRole = this.selectRole?.id;
    this.userService
      .findUserByRole(this.searchRole, this.page - 1, this.tableSize)
      .subscribe({
        next: (data: any) => {
          this.user = data.content;
          this.count = data.totalElements;
        },
        error: (err) => {
          this.user = [];
          this.count = 0;
        },
      });
  }
  search() {
    this.userService
      .findByUserName(this.searchName, this.page - 1, this.tableSize)
      .subscribe({
        next: (data: any) => {
          this.user = data.content;
          this.count = data.totalElements;
        },
        error: (err) => {
          this.user = [];
          this.count = 0;
        },
      });
  }
  searchEmail() {
    this.userService
      .findUserByEmail(this.searchMail, this.page - 1, this.tableSize)
      .subscribe({
        next: (data: any) => {
          this.user = data.content;
          this.count = data.totalElements;
        },
        error: (err) => {
          this.user = [];
          this.count = 0;
        },
      });
  }
  searchStatus() {
    this.searchUserStatus = this.selectStatus.status;
    this.userService
      .findUserByStatus(this.searchUserStatus, this.page - 1, this.tableSize)
      .subscribe({
        next: (data: any) => {
          this.user = data.content;
          this.count = data.totalElements;
        },
        error: (err) => {
          this.user = [];
          this.count = 0;
        },
      });
  }

  searchFunction() {
    this.page = 1;

    this.findUserAllField();
  }

  findUserAllField() {
    this.searchUserStatus = this.selectStatus ? this.selectStatus.status : '';
    this.userService
      .findUserAllField(
        this.searchName ? this.searchName : '',
        this.searchMail ? this.searchMail : '',
        this.selectRole ? this.selectRole.id : '',
        this.searchUserStatus,
        this.page - 1,
        this.tableSize
      )
      .subscribe({
        next: (data: any) => {
          this.user = data.content;
          this.count = data.totalElements;
        },
        error: (err) => {
          this.user = [];
          this.count = 0;
        },
      });
  }

  onTableDataChange(event: any) {
    this.page = event;
    if (
      this.searchName ||
      this.searchMail ||
      this.selectRole ||
      this.selectStatus
    ) {
      this.findUserAllField();
    } else {
      this.getUsers();
    }
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    if (
      this.searchName ||
      this.searchMail ||
      this.selectRole ||
      this.selectStatus
    ) {
      this.findUserAllField();
    } else {
      this.getUsers();
    }
  }

  refreshList(): void {
    this.getUsers();
    // this.currentUser = undefined;
    this.currentIndex = -1;
  }

  setActiveUser(user: Users, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.confirmService.showConfirm(
      'Are you want to delete?',
      () => {
        this.userService.deleteAll().subscribe(
          (response) => {
            console.log(response);
            this.refreshList();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      () => {
        alert('alo');
      }
    );
  }

  updateUser(id: number) {
    this.router.navigate(['/admin/update-user', id]);
  }

  deleteUser(id: number) {
    this.confirmService.showConfirm(
      'Are you want to inactive this user?',
      () => {
        this.userService.setStatusUser(id, false).subscribe((data) => {
          console.log(data);
          this.refreshList();
        });
      },
      () => {}
    );
  }

  getNameJson(roleName: any) {
    return roleName[0]?.name;
  }

  clearData() {
    this.searchMail = '';
    this.searchName = '';
    this.selectRole = undefined;
    this.selectStatus = undefined;
    this.page = 1;
    this.getUsers();
  }
}
