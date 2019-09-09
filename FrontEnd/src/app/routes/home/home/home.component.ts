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
    public urdherDiag: UrdherDiagnoze;
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
        let evIndex = this.urdheraDiagnoze.map((urdherDiag) => { return urdherDiag.id }).indexOf(ev.id)
        if (evIndex !== -1) {
            this.urdheraDiagnoze.splice(evIndex, 1);
        }
        this.urdheraDiagnoze.push(ev);
        if (ev["delete"]) {
            this.urdheraDiagnoze.splice(evIndex, 1);
        }
    }

    shtoUrdheraPune(ev: UrdherPune) {
        // this.urdheraDiagnoze.push(ev);
    }

    editUrdherDiag(urdherDiag: UrdherDiagnoze) {
        if (urdherDiag) {
            this.urdherDiag = urdherDiag;
        } else {
            this.urdherDiag = new UrdherDiagnoze;
        }
        if (!this.showUrdherDiag) {
            this.showUrdherDiag = !this.showUrdherDiag
        }
    }

    ngOnInit() {
        if (this.eshteMekanik) {
            this._perdorues.getUrdheraDiagnoze(this._lbAuth.getCurrentUserId(), { include: ["mjeti"] }).subscribe((res: UrdherDiagnoze[]) => {
                this.urdheraDiagnoze = res;

            })
        } else {
            this._urdherDiagnoze.find({ include: ["perdorues", "mjeti", "klient", "perfaqesues"] }).subscribe((res: UrdherDiagnoze[]) => {
                this.urdheraDiagnoze = res;
                console.log(res);
            })
        }

        this.ndermarrje = JSON.parse(localStorage.getItem("NdermarrjeData"));

        // Test Event-Stream
        // this._urdherDiagnoze.createChangeStream().subscribe((res) => {
        //     console.log(res)
        // })
    }

}
