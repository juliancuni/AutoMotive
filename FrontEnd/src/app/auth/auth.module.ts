import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmUserApi } from '../shared/sdk/services/custom';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AmUserApi,
    AuthGuard,
    UnauthGuard,
  ]
})
export class AuthModule { }
