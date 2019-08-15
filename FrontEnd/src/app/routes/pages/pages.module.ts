import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { SharedModule } from '../../shared/shared.module';

import { UnauthGuard } from '../../auth/guards/unauth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'ndertim', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UnauthGuard] },
  { path: 'recover', component: RecoverComponent, canActivate: [UnauthGuard] },
  { path: '404', component: Error404Component },
];

@NgModule({
  declarations: [LoginComponent, Error404Component, RegisterComponent, RecoverComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
