import { Component, OnInit } from '@angular/core';
import { Ndermarrje, UrdherDiagnoze, UrdherDiagnozeApi, UrdherPune, PerdoruesApi, Perdorues, Role, LoopBackAuth } from 'src/app/shared/sdk';
import { SettingsService } from '../../../core/settings/settings.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public ndermarrje: Ndermarrje
    public urdheraDiagnoze: UrdherDiagnoze[];
    public perdorues: Perdorues;
    public rolet: Role[];
    public showUrdherDiag: boolean;
    public showUrdherPune: boolean;

    public eshteMekanik: boolean = false;


    constructor(
        public settings: SettingsService,
        private _urdherDiagnoze: UrdherDiagnozeApi,
        private _perdorues: PerdoruesApi,
        private _lbAuth: LoopBackAuth,

    ) {
        this.eshteMekanik = this._lbAuth.getCurrentUserData().mekanik;
    }

    hapMbyllNgaUDChild(ev) {
        this.showUrdherDiag = ev;
    }

    hapMbyllNgaUPChild(ev) {
        this.showUrdherPune = ev;
    }

    hapMbyllNgaNPChild(ev) {
        // this.showUrdherPune = ev;
    }

    shtoPerdorues(ev: Perdorues) {
        // this.urdheraDiagnoze.push(ev);
    }

    shtoUrdheraDiag(ev: UrdherDiagnoze) {
        this.urdheraDiagnoze.push(ev);
    }

    shtoUrdheraPune(ev: UrdherPune) {
        // this.urdheraDiagnoze.push(ev);
    }

    ngOnInit() {
        if (this.eshteMekanik) {
            this._perdorues.getUrdheraDiagnozeTeMarre(this._lbAuth.getCurrentUserId()).subscribe((res: UrdherDiagnoze[]) =>{
                console.log(this._lbAuth.getCurrentUserId());
                this.urdheraDiagnoze = res;
            })
        } else {
            this._urdherDiagnoze.find({ where: { statusi: { lte: 3 } } }).subscribe((res: UrdherDiagnoze[]) => {
                this.urdheraDiagnoze = res;
            })
        }

        this.ndermarrje = JSON.parse(localStorage.getItem("NdermarrjeData"));
    }

}
