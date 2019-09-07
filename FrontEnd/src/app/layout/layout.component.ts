import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../shared/services/notifications.service';
import { Ndermarrje } from '../shared/sdk';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    public ndermarrje: Ndermarrje;
    constructor(
        private _notificationService: NotificationsService,
    ) { }

    ngOnInit() {
        this._notificationService.castNdermarrje.subscribe((ndermarrje: Ndermarrje) => {
            this.ndermarrje = ndermarrje;
        });
    }

}
