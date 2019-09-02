import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { ResetComponent } from './reset/reset.component';
import { TermsComponent } from './terms/terms.component';
import { SharedModule } from '../../shared/shared.module';

import { UnauthGuard } from '../../shared/services/auth/guards/unauth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'ndertim', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UnauthGuard] },
  { path: 'recover', component: RecoverComponent, canActivate: [UnauthGuard] },
  { path: 'reset', component: ResetComponent, canActivate: [UnauthGuard] },
  { path: 'terms', component: TermsComponent },
  { path: '404', component: Error404Component },
];

@NgModule({
  declarations: [LoginComponent, Error404Component, RegisterComponent, RecoverComponent, TermsComponent, ResetComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
