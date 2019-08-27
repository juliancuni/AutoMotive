import { Component, OnInit, ViewChild } from '@angular/core';
import { PerdoruesApi, Perdorues } from 'src/app/shared/sdk';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MsToasterService } from 'src/app/shared/services/mstoaster.service';
import { ToastModel } from 'src/app/shared/msInterfaces/interfaces';

@Component({
    selector: 'app-perdorues',
    templateUrl: './perdorues.component.html',
    styleUrls: ['./perdorues.component.scss']
})
export class PerdoruesComponent implements OnInit {

    @ViewChild('pezulloPerdorues', {static: false}) public pezulloPerdorues: ModalDirective;
    @ViewChild('editPerdorues', {static: false}) public editPerdorues: ModalDirective;

    public perdorues: Perdorues;
    public perdoruesit: Perdorues[];
    public tableColumnDefs: any[];
    public tableRowData: any[];
    public loading: boolean = false;
    private toast: ToastModel;
    constructor(
        private _perdorues: PerdoruesApi,
        private _msToasterService: MsToasterService,
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
        }, (err) => {
            this.loading = false;
            this.toast = { type: "error", title: "API ERR", body: err.message };
            this._msToasterService.toastData(this.toast);
        })
    }
}
