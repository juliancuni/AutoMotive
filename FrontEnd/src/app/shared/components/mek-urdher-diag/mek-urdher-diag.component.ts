import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-mek-urdher-diag',
    templateUrl: './mek-urdher-diag.component.html',
    styleUrls: ['./mek-urdher-diag.component.scss']
})
export class MekUrdherDiagComponent implements OnInit {

    @Input() showMekUrdherDiag: boolean;

    constructor() { }

    toggle() {
        this.showMekUrdherDiag = !this.showMekUrdherDiag;
    }

    ngOnInit() {
    }

}
