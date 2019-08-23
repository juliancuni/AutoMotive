import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerdoruesApi } from '../shared/sdk/services/custom';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    PerdoruesApi,
    AuthGuard,
    UnauthGuard,
  ]
})
export class AuthModule { }
