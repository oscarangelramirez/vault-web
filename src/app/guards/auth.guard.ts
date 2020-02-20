import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: UserService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authenticationService.currentUser;
    if (user) {
      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
          this.router.navigate(['/']);
          return false;
      }
      return true;
  }

    this.router.navigate(['/users/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
