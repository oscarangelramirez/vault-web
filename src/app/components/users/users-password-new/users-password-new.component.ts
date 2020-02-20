import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MustMatch } from 'src/app/validators/mustmatch.validator';
import { ModalMessageComponent } from '../../modals/modal-message/modal-message.component';

@Component({
  selector: 'app-users-password-new',
  templateUrl: './users-password-new.component.html',
  styleUrls: ['./users-password-new.component.scss']
})
export class UsersPasswordNewComponent implements OnInit {
  @ViewChild('formElement', { static: false }) formElement: ElementRef;
  passwordNewForm: FormGroup;
  submitted = false;
  key: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService) { }

  ngOnInit() {

    this.passwordNewForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: MustMatch('password', 'confirmPassword') });

    this.route.paramMap.subscribe(parameterMap => {
      this.key = parameterMap.get("key");

      if (!this.key) {
        const modalRef = this.modalService.open(ModalMessageComponent);
        modalRef.componentInstance.title = 'Recuperación';
        modalRef.componentInstance.message = 'No existe la ruta';

        modalRef.result.then(() => {
          this.router.navigate(['/home']);
        });
      }
    });
  }

  get f() { return this.passwordNewForm.controls; }

  new() {
    this.formElement.nativeElement.ownerDocument.activeElement.blur();

    this.submitted = true;

    if (this.passwordNewForm.invalid) {
      return;
    }

    this.userService
      .newPasswordUser(
        this.key,
        this.f.password.value)
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
            if (error.error.code == 4 || error.error.code == 6 || error.error.code == 7) {
              const modalRef = this.modalService.open(ModalMessageComponent);
              modalRef.componentInstance.title = 'Error';
              modalRef.componentInstance.message = error.error.details[0];
            }
          }
        });
  }
}
