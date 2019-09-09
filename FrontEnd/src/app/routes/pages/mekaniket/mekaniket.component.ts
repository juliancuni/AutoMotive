import { Component, OnInit } from '@angular/core';
import { RealTime, UrdherDiagnoze } from 'src/app/shared/sdk';

@Component({
    selector: 'app-mekaniket',
    templateUrl: './mekaniket.component.html',
    styleUrls: ['./mekaniket.component.scss']
})
export class MekaniketComponent implements OnInit {

    constructor(
        private _rt: RealTime
    ) { }

    ngOnInit() {
        this._rt.IO.on("urdherPune").subscribe((msg: UrdherDiagnoze) => {
            let sound = new Audio();
            if (msg.prioriteti === 3) {
                console.log("high");
                sound.src = "assets/sounds/high.mp3"
                sound.load();
                sound.play();
            }
            if (msg.prioriteti === 2) {
                console.log("normal");
                sound.src = "assets/sounds/normal.mp3"
                sound.load();
                sound.play();
            }
        })
    }

}
