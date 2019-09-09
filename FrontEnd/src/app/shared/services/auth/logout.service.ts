import { Injectable } from '@angular/core';
import { PerdoruesApi } from '../../sdk';
import { Router } from '@angular/router';
import { RTConnService } from '../rtcon.service';

@Injectable({
    providedIn: 'root'
})
export class LogoutService {

    constructor(
        private _perdorues: PerdoruesApi,
        private _router: Router, 
        private _rtCon: RTConnService,
    ) { }
    logOut() {
        this._rtCon.rtDisconnect();
        localStorage.removeItem("NdermarrjeData");
        this._perdorues.logout().subscribe();
        this._router.navigate(['/login']);
    }

}
