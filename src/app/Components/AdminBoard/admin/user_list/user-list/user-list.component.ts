import { UserService } from './../../../../../service/user.service';
import { Users } from './../../../../../class/users';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  user?:any;
  currentUser?: Users;
  currentIndex = -1;
  name = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  searchName:any;
  constructor(private userService:UserService,private router:Router,private confirmService:NgConfirmService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getListUsers()
      .subscribe(
        data => {
          this.user = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  search(){
    this.userService.findByUserName(this.searchName).subscribe(data=>{
      this.user = data;
    })
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getUsers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUsers();
  }

  refreshList(): void {
    this. getUsers();
    this.currentUser = undefined;
    this.currentIndex = -1;
  }

  setActiveUser(user: Users, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.confirmService.showConfirm('Are you want to delete?',
    ()=>{
      this.userService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
    },
    ()=>{
      alert('alo')
    }
    )

  }



  updateUser(id:number){
    this.router.navigate(['/admin/update-user',id]);
  }

  deleteUser(id:number){
    this.confirmService.showConfirm('Are you want to delete?',
    ()=>{
      this.userService.delete(id).subscribe(data =>{
        console.log(data);
        this.refreshList();
      })
    },
    ()=>{
    }
    )

  }

  getnameJson(roleName:any){
    return roleName[0]?.name;
  }


}
