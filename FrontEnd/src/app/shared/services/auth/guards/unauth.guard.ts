import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PerdoruesApi } from '../../../sdk/services/custom';


@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private auth: PerdoruesApi, private router: Router) {}

  canActivate() {
    if(!this.auth.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
