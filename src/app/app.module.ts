import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CfdiGetAllComponent } from './components/issues/cfdi-get-all/cfdi-get-all.component';
import { PaysheetGetAllComponent } from './components/issues/paysheet-get-all/paysheet-get-all.component';
import { DownloadsGetAllComponent } from './components/dowloads/downloads-get-all/downloads-get-all.component';
import { UsersGetAllComponent } from './components/users/users-get-all/users-get-all.component';
import { UsersAddComponent } from './components/users/users-add/users-add.component';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { UsersPasswordChangeComponent } from './components/users/users-password-change/users-password-change.component';
import { ModalMessageComponent } from './components/modals/modal-message/modal-message.component';
import { UsersLoginComponent } from './components/users/users-login/users-login.component';
import { UsersPasswordRecoveryComponent } from './components/users/users-password-recovery/users-password-recovery.component';
import { AuthGuard } from './guards/auth.guard';
import { LoaderInterceptorService } from './interceptors/loaderInterceptor.service';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { CustomDateParserFormatter } from './formatters/date.formatter';
import { CookieService } from 'ngx-cookie-service';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { UppercaseDirective } from './directives/uppercase.directive';
import { UsersPasswordNewComponent } from './components/users/users-password-new/users-password-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CfdiGetAllComponent,
    PaysheetGetAllComponent,
    DownloadsGetAllComponent,
    UsersGetAllComponent,
    UsersAddComponent,
    UsersEditComponent,
    UsersPasswordChangeComponent,
    ModalMessageComponent,
    UsersLoginComponent,
    UsersPasswordRecoveryComponent,
    LoaderComponent,
    UppercaseDirective,
    UsersPasswordNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  entryComponents: [ModalMessageComponent],
  providers: [AuthGuard,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    {
      provide: NgbDateParserFormatter,
      useClass: CustomDateParserFormatter
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
