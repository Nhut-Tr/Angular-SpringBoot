import { UserService } from './../../../../../service/user.service';
import { Users } from './../../../../../class/users';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
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
  userRole: any;
  selectRole: any;
  data: any;
  userData: any;
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
      },
      (error) => console.log(error)
    );
  }

  updateUser() {
    const { role, ...userData } = this.user;
    this.data = {
      ...userData,
      role: [this.selectRole],
    };
    console.log(this.data);
    this.userService.update(this.id, this.data).subscribe(
      (data) => {
        console.log(data);
        this.user = new Users();
        this.gotoList();
      },
      (error) => console.log(error)
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
}
