import { Component, OnInit } from '@angular/core';
import { RealTime, UrdherDiagnoze, UrdherDiagnozeApi, LoopBackAuth } from 'src/app/shared/sdk';

@Component({
    selector: 'app-mekaniket',
    templateUrl: './mekaniket.component.html',
    styleUrls: ['./mekaniket.component.scss']
})
export class MekaniketComponent implements OnInit {

    public urdheraDiagnoze: UrdherDiagnoze[] = [];
    public urdherDiag: UrdherDiagnoze;

    public showMekUrdherDiag: boolean;

    constructor(
        private _rt: RealTime,
        private _urdheraDiagnoze: UrdherDiagnozeApi,
        private _lbAuth: LoopBackAuth,
    ) { }


    shtoUrdheraDiag(ev) {

    }

    hapMbyllNgaMUDChild(ev) {
        this.showMekUrdherDiag = ev;
    }

    showUrdherDiag(urdherDiag: UrdherDiagnoze) {
        if (urdherDiag) {
            this.urdherDiag = urdherDiag;
        } else {
            this.urdherDiag = new UrdherDiagnoze;
        }
        if (!this.showMekUrdherDiag) {
            this.showMekUrdherDiag = !this.showMekUrdherDiag
        }
    }

    resetTableRow() {
        setTimeout(() => {
            this.urdheraDiagnoze.forEach((urdherDiag) => {
                delete urdherDiag["edited"];
                delete urdherDiag["new"];
            })
        }, 60000)
    }

    sortUrdheraDiagnoze(urdheraDiag: UrdherDiagnoze[]) {
        this.urdheraDiagnoze = urdheraDiag.sort((a, b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0));
        this.resetTableRow();
    }

    ngOnInit() {
        this._urdheraDiagnoze.find({ where: { perdoruesId: this._lbAuth.getCurrentUserId() }, include: ["mjeti"] }).subscribe((res: UrdherDiagnoze[]) => {
            this.sortUrdheraDiagnoze(res);
        })
        this._rt.IO.on("urdherDiag").subscribe((msg: UrdherDiagnoze) => {
            let msgIdIndex = this.urdheraDiagnoze.map((urdherDiag) => { return urdherDiag.id }).indexOf(msg.id)
            //Kerko njehere eshte apo jo ne urdheraDiag array
            if (msgIdIndex !== -1) {
                console.log("Eshte ne array")
                //kontrollo ka te njejtin mekanikId
                if (msg.perdoruesId === this._lbAuth.getCurrentUserId()) {
                    console.log("Ka te njejtin mekanik")
                    //kontrollo nese ka delete key ne object
                    if (msg["delete"]) {
                        console.log("Ka delete key")
                        //thjesht splice nga array nese ka delete.
                        this.urdheraDiagnoze.splice(msgIdIndex, 1);
                    } else {
                        console.log("Nuk ka delete key")
                        //Nese nuk eshte ne array, ka te njejtin mekanikID dhe ska delete key
                        this.urdheraDiagnoze.splice(msgIdIndex, 1);
                        this.urdheraDiagnoze.push(msg);
                        this.playAlert(msg.prioriteti);
                    }
                } else {
                    console.log("Nuk ka te njejtin mekanik")
                    //Nese nuk ka te njejtin mekanikId thjesht hiqe
                    this.urdheraDiagnoze.splice(msgIdIndex, 1);
                }
            } else if (msgIdIndex === -1 && msg.perdoruesId === this._lbAuth.getCurrentUserId()) {
                console.log("Nuk eshte ne array + eshte per kete mekanik")
                this.urdheraDiagnoze.push(msg);
                this.playAlert(msg.prioriteti);
            }
            this.sortUrdheraDiagnoze(this.urdheraDiagnoze);
        })
    }

    playAlert(prioriteti: number) {
        let sound = new Audio();
        if (prioriteti === 3) {
            sound.src = "assets/sounds/high.mp3"
            sound.load();
            sound.play();
        }
        if (prioriteti === 2) {
            sound.src = "assets/sounds/normal.mp3"
            sound.load();
            sound.play();
        }
    }

}
