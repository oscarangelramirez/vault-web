import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  toogle: boolean;
  user: User;

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);

    if (this.user) {
      switch (this.user.role) {
        case Role.Cfdi:
          this.router.navigate(['/issues/cfdi']);
          break;
        case Role.Paysheet:
          this.router.navigate(['/issues/paysheet']);
          break;
      }
    }
    else {
      this.router.navigate(['/users/login']);
    }
  }

  login() {
    this.router.navigate(['/users/login']);
  }

  logout() {
    this.userService.logoutUser();
    this.router.navigate(['/home']);
  }

  get isAdmin() {
    return this.user && (this.user.role === Role.Admin);
  }

  get isCfdi() {
    return this.user && (this.user.role === Role.Cfdi || this.user.role === Role.Admin);
  }

  get isPaysheet() {
    return this.user && (this.user.role === Role.Paysheet || this.user.role === Role.Admin);
  }
}
