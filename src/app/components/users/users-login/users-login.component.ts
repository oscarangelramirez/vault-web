import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../../modals/modal-message/modal-message.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-login',
  templateUrl: './users-login.component.html',
  styleUrls: ['./users-login.component.scss']
})
export class UsersLoginComponent implements OnInit {
  @ViewChild('formElement', { static: false }) formElement: ElementRef;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private userService: UserService) {
    if (this.userService.currentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.formElement.nativeElement.ownerDocument.activeElement.blur();

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService
      .loginUser(
        this.f.email.value,
        this.f.password.value)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          if (error.error) {
            if (error.error.code == 1 || error.error.code == 2 || error.error.code == 3 || error.error.code == 4) {
              const modalRef = this.modalService.open(ModalMessageComponent);
              modalRef.componentInstance.title = 'Error';
              modalRef.componentInstance.message = error.error.details[0];
            }
            else if (error.error.code == 5) {
              const modalRef = this.modalService.open(ModalMessageComponent);
              modalRef.componentInstance.title = 'Error';
              modalRef.componentInstance.message = error.error.details[0];

              modalRef.result.then(() => {
                this.router.navigate(['/users/password/change'], { state: { email: this.f.email.value } });
              });
            }
          }
        });
  }
}
