import { Component, OnInit } from '@angular/core';
import { RealTime, UrdherDiagnoze, UrdherDiagnozeApi, LoopBackAuth } from 'src/app/shared/sdk';

@Component({
    selector: 'app-mekaniket',
    templateUrl: './mekaniket.component.html',
    styleUrls: ['./mekaniket.component.scss']
})
export class MekaniketComponent implements OnInit {

    public urdheraDiagnoze: UrdherDiagnoze[] = [];
    constructor(
        private _rt: RealTime,
        private _urdheraDiagnoze: UrdherDiagnozeApi,
        private _lbAuth: LoopBackAuth,
    ) { }



    ngOnInit() {
        this._urdheraDiagnoze.find({ where: { perdoruesId: this._lbAuth.getCurrentUserId() }, include: ["mjeti"] }).subscribe((res: UrdherDiagnoze[]) => {
            this.urdheraDiagnoze = res;
        })
        this._rt.IO.on("urdherPune").subscribe((msg: UrdherDiagnoze) => {
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
            } else if(msgIdIndex === -1 && msg.perdoruesId === this._lbAuth.getCurrentUserId()) {
                console.log("Nuk eshte ne array + eshte per kete mekanik")
                this.urdheraDiagnoze.push(msg);
                this.playAlert(msg.prioriteti);
            }
            // else {
            //     console.log("Nuk eshte ne array")
            //     this.urdheraDiagnoze.push(msg);
            //     this.playAlert(msg.prioriteti);
            // }
            // if (msg.perdoruesId === this._lbAuth.getCurrentUserId()) {
            //     if (msg["delete"]) {
            //         this.urdheraDiagnoze.splice(msgIdIndex, 1);
            //     } else if (msgIdIndex === -1) {
            //         this.urdheraDiagnoze.splice(msgIdIndex, 1);
            //     } else {
            //         this.urdheraDiagnoze.push(msg);
            //         this.playAlert(msg.prioriteti);
            //     }
            // }
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
