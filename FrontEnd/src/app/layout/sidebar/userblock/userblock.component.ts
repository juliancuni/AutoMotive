import { Component, OnInit, Input } from '@angular/core';

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
    @Input() perdorues: Perdorues;
    constructor(
        public userblockService: UserblockService,
        private _perdorues: PerdoruesApi,
        private _router: Router,
        private settings: SettingsService
        ) {
    }
    ngOnInit() {
        if (localStorage.getItem("PerdoruesData")) {
            this.perdorues = JSON.parse(localStorage.getItem("PerdoruesData"));
        } else {
            this._perdorues.getCurrent().subscribe((res: Perdorues) => {
                this.perdorues = res;
            }, (err) => {
                console.log(err);
            }, () => {
                localStorage.setItem("PerdoruesData", JSON.stringify(this.perdorues))
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
