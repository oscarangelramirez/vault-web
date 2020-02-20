import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Keepalive } from '@ng-idle/keepalive';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lastPing?: Date = null;

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private userService: UserService,
    private location: Location,
    private router: Router) {
    idle.setIdle(1800);
    idle.setTimeout(5);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onTimeout.subscribe(() => {
      userService.logoutUser();
      this.router.navigate(['/home']);
    });

    keepalive.interval(60);

    keepalive.onPing.subscribe(() => {
      userService.refreshUser();
    });

    router.events.subscribe((val) => {
      if (location.path().includes('/users/login') || location.path().includes('users/password/change') || location.path().includes('/users/password/recovery') || location.path().includes('/users/password/new'))
        idle.stop();
      else
        idle.watch();
    });

    idle.watch();
  }
}
