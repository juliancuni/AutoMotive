import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Perdorues, LoopBackAuth } from 'src/app/shared/sdk';

@Injectable()
export class MekanikGuard implements CanActivate {
    // private perdorues: Perdorues;
    constructor(
        private _auth: LoopBackAuth,
        private _router: Router,
    ) { }

    canActivate() {
        // this.perdorues = this._auth.getCurrentUserData();
        if (this._auth.getCurrentUserData().mekanik) {
            this._router.navigate(['./personal/profile'])
            console.log(this._auth.getCurrentUserData().mekanik)
            // return false;
        } else {
            return true;
        }
    }
}
