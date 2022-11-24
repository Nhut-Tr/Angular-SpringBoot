import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
  code?: string;
  constructor(
    private authService: AuthService,
    private routeActive: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService
      .verify(this.routeActive.snapshot.queryParams['code'])
      .subscribe({ next: (res: any) => {} });
  }
}
