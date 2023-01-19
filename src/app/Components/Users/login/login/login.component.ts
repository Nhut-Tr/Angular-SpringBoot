import { TokenStorageService } from './../../../../service/token-storage.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    userName: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.tokenStorage.currentUser.subscribe((data) => {
      if (data) {
        const user = data;
        this.roles = user.roles;
        this.showUserBoard = this.roles.includes('ROLE_USER');
        this.showAdminBoard =
          this.roles.includes('ROLE_ADMIN') ||
          this.roles.includes('ROLE_MODERATOR');
        if (this.showUserBoard == true) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/admin/chart']);
        }
      }
    });
  }

  onSubmit(): void {
    const { userName, password } = this.form;

    this.authService.login(userName, password).subscribe(
      (data: any) => {
        this.tokenStorage.currentUser.next(data);
        console.log(this.tokenStorage.currentUser.value);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        const tt: any = window;
        this.reloadPage();
        tt.drift!.identify(data.id, {
          email: data.email,

          name: data.fullName,
        });
      },
      (err) => {
        this.toast.error({
          detail: 'Error Message',
          summary: err.error.message,
          duration: 4000,
        });
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
