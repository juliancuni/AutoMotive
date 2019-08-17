import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { AmUser, AmUserApi } from 'src/app/shared/sdk';
import { Router } from '@angular/router';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: AmUser;
    constructor(
        public userblockService: UserblockService,
        private _amUser: AmUserApi,
        private _router: Router
    ) {
    }
    ngOnInit() {
        if (localStorage.getItem("UserPersonalData")) {
            this.user = JSON.parse(localStorage.getItem("UserPersonalData"));
        } else {
            this._amUser.getCurrent().subscribe((res: AmUser) => {
                this.user = res;
            }, (err) => {
                console.log(err);
            }, () => {
                localStorage.setItem("OrgData", JSON.stringify(this.user))
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
        localStorage.removeItem("OrgData");
        localStorage.removeItem("UserPersonalData");
        this._amUser.logout().subscribe();
        this._router.navigate(['/login']);
    }
}
