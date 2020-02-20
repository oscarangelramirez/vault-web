import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CfdiGetAllComponent } from './components/issues/cfdi-get-all/cfdi-get-all.component';
import { PaysheetGetAllComponent } from './components/issues/paysheet-get-all/paysheet-get-all.component';
import { DownloadsGetAllComponent } from './components/dowloads/downloads-get-all/downloads-get-all.component';
import { UsersGetAllComponent } from './components/users/users-get-all/users-get-all.component';
import { UsersAddComponent } from './components/users/users-add/users-add.component';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { UsersPasswordChangeComponent } from './components/users/users-password-change/users-password-change.component';
import { UsersLoginComponent } from './components/users/users-login/users-login.component';
import { UsersPasswordRecoveryComponent } from './components/users/users-password-recovery/users-password-recovery.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';
import { UsersPasswordNewComponent } from './components/users/users-password-new/users-password-new.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'issues/cfdi',
    component: CfdiGetAllComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Cfdi] }
  },
  {
    path: 'issues/paysheet',
    component: PaysheetGetAllComponent
  },
  {
    path: 'downloads',
    component: DownloadsGetAllComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Cfdi, Role.Paysheet] }
  },
  {
    path: 'users',
    component: UsersGetAllComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'users/add',
    component: UsersAddComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'users/:id/edit',
    component: UsersEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'users/password/change',
    component: UsersPasswordChangeComponent
  },
  {
    path: 'users/password/recovery',
    component: UsersPasswordRecoveryComponent
  },
  {
    path: 'users/password/new/:key',
    component: UsersPasswordNewComponent
  },
  {
    path: 'users/login',
    component: UsersLoginComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
