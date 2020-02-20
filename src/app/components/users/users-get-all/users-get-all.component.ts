import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-users-get-all',
  templateUrl: './users-get-all.component.html',
  styleUrls: ['./users-get-all.component.scss']
})
export class UsersGetAllComponent implements OnInit {
  users: User[] = []
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;
  total: number;
  toogle: boolean;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);

    this.userService
      .getAllUsers()
      .subscribe(data => {
        this.users = data;
      }, error => {
        console.log(error);
      });
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  edit(user: User) {
    this.router.navigate([user.id, 'edit'], { relativeTo: this.route });
  }

  getUsers() {
    let users = this.users.filter(user => user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      || user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      || user.email.toLowerCase().includes(this.searchTerm.toLowerCase()));

    this.total = users.length;

    users = users.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    return users;
  }

  logout() {
    this.userService.logoutUser();
    this.router.navigate(['/home']);
  }

  get isAdmin(){
    return this.user && (this.user.role === Role.Admin);
  }

  get isCfdi(){
    return this.user && (this.user.role === Role.Cfdi || this.user.role === Role.Admin);
  }

  get isPaysheet(){
    return this.user && (this.user.role === Role.Paysheet || this.user.role === Role.Admin);
  }
}
