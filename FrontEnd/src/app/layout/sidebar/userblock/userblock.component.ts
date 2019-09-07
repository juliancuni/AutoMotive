import { Component, OnInit, Input } from '@angular/core';

import { UserblockService } from './userblock.service';
import { Perdorues, PerdoruesApi, LoopBackAuth } from 'src/app/shared/sdk';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/core/settings/settings.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    @Input() perdorues: Perdorues;
    constructor(
        public userblockService: UserblockService,
        private _perdorues: PerdoruesApi,
        private _router: Router,
        private settings: SettingsService,
        private _lbAuth: LoopBackAuth,
        ) {
    }
    ngOnInit() {
        this.perdorues = this._lbAuth.getCurrentUserData();
     }
    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }
    logOut() {
        this.postLogOut();
    }
    postLogOut(): void {
        localStorage.removeItem("NdermarrjeData");
        this._perdorues.logout().subscribe();
        this._router.navigate(['/login']);
    }
}
