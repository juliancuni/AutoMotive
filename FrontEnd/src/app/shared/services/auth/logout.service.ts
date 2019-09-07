import { Injectable } from '@angular/core';
import { PerdoruesApi } from '../../sdk';
import { Router } from '@angular/router';
import { PubsubService } from '../pubsub.service';

@Injectable({
    providedIn: 'root'
})
export class LogoutService {

    constructor(
        private _perdorues: PerdoruesApi,
        private _router: Router, 
        private _pubsub: PubsubService,
    ) { }
    logOut() {
        this._pubsub.rtDisconnect();
        localStorage.removeItem("NdermarrjeData");
        this._perdorues.logout().subscribe();
        this._router.navigate(['/login']);
    }

}
