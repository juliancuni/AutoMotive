import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { Ndermarrje } from 'src/app/shared/sdk';

@Component({
    selector: '[app-footer]',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    @Input() private ndermarrje: Ndermarrje;
    constructor(
        public settings: SettingsService,
    ) { }

    ngOnInit() {
        this.ndermarrje = JSON.parse(localStorage.getItem("NdermarrjeData"));
    }

}
