import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PerdoruesApi } from '../../../sdk/services/custom';
import { LoopBackAuth } from 'src/app/shared/sdk';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _auth: LoopBackAuth,
        private _router: Router,
        private _perdorues: PerdoruesApi) { }

    canActivate() {
        if (this._perdorues.isAuthenticated()) {
            if (this._auth.getCurrentUserData().mekanik) {
                this._router.navigate(['/mekaniket']);
                return false;
            }
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }
    }
}
