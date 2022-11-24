import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent implements OnInit {
  password?: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastService: NgToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService
      .verify(this.activatedRoute.snapshot.queryParams['token'])
      .subscribe({ next: (res: any) => {} });
  }

  onSubmit() {
    this.authService
      .resetPassword(
        this.activatedRoute.snapshot.queryParams['token'],
        this.password!
      )
      .subscribe((data) => {
        this.toastService.success({
          detail: 'Success Message',
          summary: 'You have successfully changed your password!',
          duration: 4000,
        });
        this.router.navigate(['/login']);
      });
  }
}
