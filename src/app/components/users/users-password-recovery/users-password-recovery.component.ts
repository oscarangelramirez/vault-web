import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { ModalMessageComponent } from '../../modals/modal-message/modal-message.component';

@Component({
  selector: 'app-users-password-recovery',
  templateUrl: './users-password-recovery.component.html',
  styleUrls: ['./users-password-recovery.component.scss']
})
export class UsersPasswordRecoveryComponent implements OnInit {
  passwordRecoveryForm: FormGroup;
  submitted = false;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService) { }

  ngOnInit() {
    this.passwordRecoveryForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  get f() { return this.passwordRecoveryForm.controls; }

  recovery(){
    this.submitted = true;

    if (this.passwordRecoveryForm.invalid) {
      return;
    }

    this.userService
      .recoveryPasswordUser(
        this.f.email.value)
      .subscribe(
        data => {
          const modalRef = this.modalService.open(ModalMessageComponent);
          modalRef.componentInstance.title = 'Recuperación';
          modalRef.componentInstance.message = 'Se ha enviado un correo a su dirección de correo electrónico';

          modalRef.result.then(() => {
            this.router.navigate(['/home']);
          });
        },
        error => {
          if (error.error) {
            if (error.error.code == 1 || error.error.code == 2 || error.error.code == 3 || error.error.code == 4 || error.error.code == 6) {
              const modalRef = this.modalService.open(ModalMessageComponent);
              modalRef.componentInstance.title = 'Error';
              modalRef.componentInstance.message = error.error.details[0];
            }
          }
        });
  }
}
