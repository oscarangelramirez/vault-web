import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserAdapter } from '../adapters/user.adapter';
import User from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private userAdapter: UserAdapter) {

    if (this.cookieService.check('user')) {
      let user = JSON.parse(this.cookieService.get('user'));
      this.user = new BehaviorSubject<User>(user);
    }
    else {
      this.user = new BehaviorSubject<User>(null);
    }

    this.user$ = this.user.asObservable();
  }

  public get currentUser(): User {
    if (!this.cookieService.check('user')) {
      this.user.next(null);
      return null;
    }

    return this.user.value;
  }

  getAllUsers() {
    return this
      .http
      .get<User[]>(`${environment.apiUrl}/users`)
      .pipe(map((data: any) => {
        let users: User[] = [];
        data.forEach((item: any) => {
          let user = this.userAdapter.adapt(item);
          users.push(user);
        });

        return users;
      }));
  }

  getUser(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`)
      .pipe(map((data: any) => this.userAdapter.adapt(data)));
  }

  addUser(user: User) {
    var request = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      isActive: user.isActive,
      role: user.role
    };

    return this.http.post<User>(`${environment.apiUrl}/users`, request)
      .pipe(map((data: any) => {
        user.id = data.id;

        return user;
      }));
  }

  updateUser(user: User) {
    var request = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isLocked: user.isLocked,
      isActive: user.isActive,
      role: user.role
    };

    return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, request)
      .pipe(map((data: any) => {
        return user;
      }));
  }

  changePasswordUser(email: string, oldPassword: string, newPassword: string) {
    var request = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    return this.http.post<User>(`${environment.apiUrl}/users/changepassword`, request)
      .pipe(map((data: any) => {
        let user = this.userAdapter.adapt(data);

        this.user.next(user);

        return user;
      }));
  }

  recoveryPasswordUser(email: string) {
    var request = {
      email: email
    };

    return this.http.post(`${environment.apiUrl}/users/recoverypassword`, request);
  }

  newPasswordUser(
    key: string,
    password: string) {
    var request = {
      key: key,
      password: password
    };

    return this.http.post(`${environment.apiUrl}/users/newpassword`, request);
  }

  loginUser(email: string, password: string) {
    var request = {
      email: email,
      password: password
    };

    return this.http.post<User>(`${environment.apiUrl}/users/login`, request)
      .pipe(map((data: any) => {
        let user = this.userAdapter.adapt(data);
        let expiredDate = new Date();
        expiredDate.setMinutes(expiredDate.getMinutes() + 30);

        this.cookieService.set('user', JSON.stringify(user), expiredDate, '/');
        this.user.next(user);

        return user;
      }));
  }

  logoutUser() {
    this.cookieService.delete('user', '/');
    this.user.next(null);
  }

  refreshUser() {
    let user = this.user.value;
    let expiredDate = new Date();
    expiredDate.setMinutes(expiredDate.getMinutes() + 30);

    this.cookieService.set('user', JSON.stringify(user), expiredDate, '/');
  }
}