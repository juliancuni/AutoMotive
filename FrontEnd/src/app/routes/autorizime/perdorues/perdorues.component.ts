import { Component, OnInit, ViewChild } from '@angular/core';
import { PerdoruesApi, Perdorues } from 'src/app/shared/sdk';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-perdorues',
    templateUrl: './perdorues.component.html',
    styleUrls: ['./perdorues.component.scss']
})
export class PerdoruesComponent implements OnInit {

    @ViewChild('pezulloPerdorues', {static: false}) public pezulloPerdorues: ModalDirective;
    @ViewChild('editPerdorues', {static: false}) public editPerdorues: ModalDirective;

    private perdorues: Perdorues;
    private perdoruesit: Perdorues[];
    private tableColumnDefs: any[];
    private tableRowData: any[];

    constructor(
        private _perdorues: PerdoruesApi
    ) { }

    edit(perdorues: Perdorues) {

    }

    showPezullo(perdorues: Perdorues) {
        this.perdorues = perdorues;
        this.pezulloPerdorues.show();
    }

    pezullo(perdorues: Perdorues) {

    }

    ngOnInit() {
        this._perdorues.find().subscribe((res: Perdorues[]) => {
            this.perdoruesit = res;
        })
    }
}
