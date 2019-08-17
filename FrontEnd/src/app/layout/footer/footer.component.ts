import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { Org } from 'src/app/shared/sdk';

@Component({
    selector: '[app-footer]',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    private org: Org;
    constructor(
        public settings: SettingsService,
    ) { }

    ngOnInit() {
        this.org = JSON.parse(localStorage.getItem("OrgData"));
    }

}
