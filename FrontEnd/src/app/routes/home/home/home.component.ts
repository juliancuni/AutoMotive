import { Component, OnInit } from '@angular/core';
import { Org } from 'src/app/shared/sdk';
import { SettingsService } from '../../../core/settings/settings.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private org: Org;

    constructor(
        public settings: SettingsService,
    ) { }

    ngOnInit() {
        this.org = JSON.parse(localStorage.getItem("OrgData"));
    }

}
