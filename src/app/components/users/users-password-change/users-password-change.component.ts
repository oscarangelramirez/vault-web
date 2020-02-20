import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../../modals/modal-message/modal-message.component';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/mustmatch.validator';

@Component({
  selector: 'app-users-password-change',
  templateUrl: './users-password-change.component.html',
  styleUrls: ['./users-password-change.component.scss']
})
export class UsersPasswordChangeComponent implements OnInit {
  @ViewChild('formElement', {static: false}) formElement: ElementRef;
  state;
  passwordChangeForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private modalService: NgbModal,
    private userService: UserService) { }

  ngOnInit() {
    this.state = this.location.getState();

    this.passwordChangeForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: MustMatch('newPassword', 'confirmPassword') });
  }

  get f() { return this.passwordChangeForm.controls; }

  change() {
    this.formElement.nativeElement.ownerDocument.activeElement.blur();

    this.submitted = true;

    if (this.passwordChangeForm.invalid) {
      return;
    }

    this.userService
      .changePasswordUser(
        this.state.email,
        this.f.oldPassword.value,
        this.f.newPassword.value)
      .subscribe(
        data => {
          const modalRef = this.modalService.open(ModalMessageComponent);
          modalRef.componentInstance.title = 'Cambio';
          modalRef.componentInstance.message = 'Se ha cambiado la contraseña exitosamente';

          modalRef.result.then(() => {
            this.router.navigate(['/home']);
          });
        },
        error => {
          if (error.error) {
            if (error.error.code == 1 || error.error.code == 2 || error.error.code == 3 || error.error.code == 4) {
              const modalRef = this.modalService.open(ModalMessageComponent);
              modalRef.componentInstance.title = 'Error';
              modalRef.componentInstance.message = error.error.details[0];
            }
          }
        });
  }
}
