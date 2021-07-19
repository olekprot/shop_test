import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  public auth: AuthService;

  private router: Router;

  constructor(auth: AuthService, router: Router) {
    this.router = router;
    this.auth = auth;
  }

  public ngOnInit(): void {}

  public logout(event: any): void {
    event.preventDefault();
    this.auth.logout();
    void this.router.navigate(['/admin', 'login']);
  }
}
