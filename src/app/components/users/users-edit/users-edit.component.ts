import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  toogle: boolean;
  userEdit: User = new User();
  editForm: FormGroup;
  submitted = false;
  user: User;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);

    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
      isLocked: [true],
      isActive: [true]
    });

    this.route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get("id");

      this.userService
        .getUser(id)
        .subscribe(data => {
          this.userEdit = data;

          this.editForm.setValue({
            name: this.userEdit.name,
            lastName: this.userEdit.lastName,
            email: this.userEdit.email,
            role: this.userEdit.role,
            isLocked: this.userEdit.isLocked,
            isActive: this.userEdit.isActive
          });
        }, error => {
          console.log(error);
        });
    });
  }

  get f() { return this.editForm.controls; }

  update() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    this.userEdit.name = this.f.name.value;
    this.userEdit.lastName = this.f.lastName.value;
    this.userEdit.email = this.f.email.value;
    this.userEdit.isLocked = this.f.isLocked.value;
    this.userEdit.isActive = this.f.isActive.value;
    this.userEdit.role = this.f.role.value;

    this.userService
      .updateUser(this.userEdit)
      .subscribe(
        data => {
          this.location.back();
        },
        error => {
          console.log(error);
        });
  }

  cancel() {
    this.location.back();
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
