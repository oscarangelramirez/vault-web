import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../../modals/modal-message/modal-message.component';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/models/user';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {
  toogle: boolean;
  addForm: FormGroup;
  submitted = false;
  user: User;

  constructor(
    private router: Router,
    private location: Location,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);

    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      isActive: [true]
    });
  }

  get f() { return this.addForm.controls; }

  add() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    let user = new User();
    user.name = this.f.name.value;
    user.lastName = this.f.lastName.value;
    user.email = this.f.email.value;
    user.password = this.f.password.value;
    user.isActive = this.f.isActive.value;
    user.role = this.f.role.value;

    this.userService
      .addUser(user)
      .subscribe(
        data => {
          this.location.back();
        },
        error => {
          if (error.error && error.error.code == 4) {
            const modalRef = this.modalService.open(ModalMessageComponent);
            modalRef.componentInstance.title = 'Error';
            modalRef.componentInstance.message = error.error.details[0];
          }
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
