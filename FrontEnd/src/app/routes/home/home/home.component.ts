import { Component, OnInit } from '@angular/core';
import { Ndermarrje, UrdherDiagnoze, UrdherDiagnozeApi, UrdherPune, PerdoruesApi, Perdorues, Role, LoopBackAuth, RealTime, Mjeti, MjetiApi } from 'src/app/shared/sdk';
import { SettingsService } from '../../../core/settings/settings.service';
import { ColorsService } from '../../../shared/colors/colors.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    easyPiePercent1 = 0;

    pieOptions1 = {
        animate: {
            duration: 800,
            enabled: true
        },
        barColor: this._colors.byName('info'),
        trackColor: '#edf2f6',
        scaleColor: false,
        lineWidth: 2,
        lineCap: 'round',
        size: 25
    };

    public ndermarrje: Ndermarrje
    public urdheraDiagnoze: UrdherDiagnoze[];
    public urdherDiag: UrdherDiagnoze;
    public perdorues: Perdorues;
    public rolet: Role[];
    public showUrdherDiag: boolean;
    public showUrdherPune: boolean;
    public showNewPreventiv: boolean;
    public eshteMekanik: boolean = false;

    public mjetetNePark = 0;
    public urdheraDiagnozeAktive = 0;

    constructor(
        public settings: SettingsService,
        private _urdherDiagnoze: UrdherDiagnozeApi,
        private _perdorues: PerdoruesApi,
        private _mjetet: MjetiApi,
        private _lbAuth: LoopBackAuth,
        private _rt: RealTime,
        public _colors: ColorsService

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

    hapMbyllNgaNPrChild(ev) {
        this.showNewPreventiv = ev;
    }

    shtoUrdheraDiag(ev: UrdherDiagnoze) {
        let evIndex = this.urdheraDiagnoze.map((urdherDiag) => { return urdherDiag.id }).indexOf(ev.id);
        if (ev["delete"]) {
            this.urdheraDiagnoze.splice(evIndex, 1);
        } else if (evIndex !== -1) {
            this.urdheraDiagnoze.splice(evIndex, 1);
            this.urdheraDiagnoze.push(ev);
        } else {
            this.urdheraDiagnoze.push(ev);
        }
        this.sortUrdheraDiagnoze(this.urdheraDiagnoze);
    }

    shtoUrdheraPune(ev: UrdherPune) {
        // this.urdheraDiagnoze.push(ev);
    }

    resetTableRow() {
        setTimeout(() => {
            this.urdheraDiagnoze.forEach((urdherDiag) => {
                delete urdherDiag["edited"];
                delete urdherDiag["new"];
            })
        }, 60000)
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

    sortUrdheraDiagnoze(urdheraDiag: UrdherDiagnoze[]) {
        this.urdheraDiagnozeAktive = 0;
        this.urdheraDiagnoze = urdheraDiag.sort((a, b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0));
        this.urdheraDiagnoze.forEach((urdher) => {
            urdher["perqindjePerfunduar"] = this.llogPerqindjDiag(urdher);
            if (urdher.statusi !== 4) this.urdheraDiagnozeAktive++;
        })
        this.resetTableRow();
    }

    numeroMjetet() {
        this._mjetet.count({ nePark: true }).subscribe((res) => {
            this.mjetetNePark = res.count;
        })
    }

    ngOnInit() {
        if (this.eshteMekanik) {
            this._perdorues.getUrdheraDiagnoze(this._lbAuth.getCurrentUserId(), { include: ["mjeti"] }).subscribe((res: UrdherDiagnoze[]) => {
                this.sortUrdheraDiagnoze(res);
            })
        } else {
            this._urdherDiagnoze.find({ include: ["perdorues", "mjeti", "klient", "perfaqesues", "diagnozat"] }).subscribe((res: UrdherDiagnoze[]) => {
                this.sortUrdheraDiagnoze(res);
            })
        }
        this.numeroMjetet();

        //degjo per ndryshime nga mekaniket
        this._rt.IO.on("urdherDiagEditedByMekanik").subscribe((msg: UrdherDiagnoze) => {
            let urdherDiag = this.urdheraDiagnoze.filter((urdhDiag) => { return urdhDiag.id === msg.id });
            msg.klient = urdherDiag[0].klient
            msg.perfaqesues = urdherDiag[0].perfaqesues;
            msg.perdorues = urdherDiag[0].perdorues;
            this.shtoUrdheraDiag(msg);
        })
        //degjo per ndryshime nga Mjetet Ne park
        this._rt.IO.on("refreshMjetet").subscribe((msg: number) => {
            if (msg === 1) this.numeroMjetet();
        })

        this.ndermarrje = JSON.parse(localStorage.getItem("NdermarrjeData"));

    }

    llogPerqindjDiag(urdherDiag: UrdherDiagnoze): number {
        let totalKontrolle = urdherDiag.kontrolle.length;
        let kontrolleKryer = 0;
        urdherDiag.kontrolle.forEach((kontroll) => {
            if (kontroll["perfunduar"]) kontrolleKryer++;
        });
        // return Math.round(kontrolleKryer / totalKontrolle * 100);
        return kontrolleKryer / totalKontrolle * 100;
    }

}
