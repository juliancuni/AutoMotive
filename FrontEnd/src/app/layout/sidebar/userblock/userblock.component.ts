import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { Perdorues, PerdoruesApi } from 'src/app/shared/sdk';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/core/settings/settings.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: Perdorues;
    constructor(
        public userblockService: UserblockService,
        private _perdorues: PerdoruesApi,
        private _router: Router,
        private settings: SettingsService
        ) {
    }
    ngOnInit() {
        if (localStorage.getItem("PerdoruesData")) {
            this.user = JSON.parse(localStorage.getItem("PerdoruesData"));
        } else {
            this._perdorues.getCurrent().subscribe((res: Perdorues) => {
                this.user = res;
            }, (err) => {
                console.log(err);
            }, () => {
                localStorage.setItem("PerdoruesData", JSON.stringify(this.user))
            })
        }

    }
    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }
    logOut() {
        this.postLogOut();
    }
    postLogOut(): void {
        localStorage.removeItem("NdermarrjeData");
        localStorage.removeItem("PerdoruesData");
        this._perdorues.logout().subscribe();
        this._router.navigate(['/login']);
    }
}
