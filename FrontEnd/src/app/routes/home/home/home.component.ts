import { Component, OnInit } from '@angular/core';
import { Ndermarrje } from 'src/app/shared/sdk';
import { SettingsService } from '../../../core/settings/settings.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private ndermarrje: Ndermarrje

    constructor(
        public settings: SettingsService,
    ) { }

    ngOnInit() {
        this.ndermarrje = JSON.parse(localStorage.getItem("NdermarrjeData"));
    }

}
