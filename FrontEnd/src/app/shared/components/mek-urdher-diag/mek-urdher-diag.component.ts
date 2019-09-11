import { Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { UrdherDiagnoze, UrdherDiagnozeApi, RealTime, Mjeti, MjetiApi, KategoriKontrollesh, Diagnoza, DiagnozaApi } from '../../sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';

const ESC_KEY = 27;
const source = fromEvent(document, 'keydown');

@Component({
    selector: 'app-mek-urdher-diag',
    templateUrl: './mek-urdher-diag.component.html',
    styleUrls: ['./mek-urdher-diag.component.scss']
})

export class MekUrdherDiagComponent implements OnInit {


    @Input() showMekUrdherDiag: boolean;
    @Input() urdherDiag: UrdherDiagnoze;
    @Output() hapMbyllMUDNgaSelf = new EventEmitter();
    @Output() shtoMekUrdheraDiag = new EventEmitter<UrdherDiagnoze>();


    public mjeti: Mjeti;
    public kontroll: KategoriKontrollesh;
    public diagnozat: Diagnoza[];
    public diagnoza: Diagnoza;

    public showDiagBlock: boolean = false;

    public diagForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _urdheraDiagnoze: UrdherDiagnozeApi,
        private _rt: RealTime,
        private _mjeti: MjetiApi,
        private _diagnoza: DiagnozaApi,
    ) { }

    toggle() {
        // this.showMekUrdherDiag = !this.showMekUrdherDiag;
        this.hapMbyllMUDNgaSelf.emit(this.showMekUrdherDiag = !this.showMekUrdherDiag);
    }

    konfirmo() {
        if (this.urdherDiag.statusi === 2) {
            this.urdherDiag.statusi = 3;
            delete this.urdherDiag["new"];
            delete this.urdherDiag["edited"];
            this.urdherDiag.konfirmuarNgaMek = true;
            this._urdheraDiagnoze.upsert(this.urdherDiag).subscribe((res) => {
                this._rt.IO.emit("urdherDiagEditedByMekanik", this.urdherDiag);
            })
        }
    }

    refuzo() {
        if (this.urdherDiag.statusi === 2) {
            this.urdherDiag.statusi = 5;
            delete this.urdherDiag["new"];
            delete this.urdherDiag["edited"];
            this.urdherDiag.konfirmuarNgaMek = false;
            this._urdheraDiagnoze.upsert(this.urdherDiag).subscribe((res) => {
                this._rt.IO.emit("urdherDiagEditedByMekanik", this.urdherDiag);
                this.urdherDiag["delete"] = true;
                this._rt.IO.emit("urdherDiag", this.urdherDiag);
                this.toggle();
            })
        }
    }

    regDiagnoze(ev, diagForm) {
        ev.preventDefault();
        if (this.diagForm.valid) {


            let kontrolleTotal = this.urdherDiag.kontrolle.length;
            let kontrolleKryer = 0;

            this.urdherDiag.kontrolle.forEach((kontroll) => {
                if (kontroll.id === this.kontroll.id) {
                    this.kontroll["perfunduar"] = true;
                }
                if(kontroll.perfunduar) {
                    kontrolleKryer++
                }
            })

            this.showDiagBlock = false;
            // this.urdherDiag.mjeti.odometer = diagForm.odometer;
            this._mjeti.upsert(this.urdherDiag.mjeti).subscribe((res: Mjeti) => {
                this.mjeti = res;
            })
            this._diagnoza.create(diagForm).subscribe((res: Diagnoza) => {
                this.diagnoza = res;
            })
            if (kontrolleKryer === kontrolleTotal) this.urdherDiag.statusi = 4;

            this._urdheraDiagnoze.upsert(this.urdherDiag).subscribe((res: UrdherDiagnoze) => {
                res.mjeti = this.urdherDiag.mjeti;
                this._rt.IO.emit("urdherDiagEditedByMekanik", res);
            })

        }
    }

    showDiagnoze(kontroll) {
        this.showDiagBlock = true;
        this.kontroll = kontroll;
    }

    ngOnInit() {
        this.diagForm = this._fb.group({
            "odometer": [null, Validators.required],
            "diagnoza": [null, Validators.required],
            "gjendjaDifektit": [null, Validators.required],
            "sasia": [0, null],
        })

        this._rt.IO.on("urdherDiag").subscribe((msg: UrdherDiagnoze) => {
            if (msg["delete"]) {
                this.urdherDiag = new UrdherDiagnoze;
                this.showMekUrdherDiag ? this.showMekUrdherDiag = false: null;
            } else {
                this.urdherDiag = msg;
            }
        })

    }

    ngOnChanges() {
        if (this.urdherDiag && Object.entries(this.urdherDiag).length !== 0) {
            this.diagForm.controls.odometer.setValue(this.urdherDiag.mjeti.odometer);

            if (this.urdherDiag.statusi === 1) {
                this.urdherDiag.statusi = 2;
                delete this.urdherDiag["new"];
                delete this.urdherDiag["edited"];
                this._urdheraDiagnoze.upsert(this.urdherDiag).subscribe((res) => {
                    this._rt.IO.emit("urdherDiagEditedByMekanik", this.urdherDiag);
                })
            }
        }

        this.showDiagBlock = false;

        source.subscribe((e: KeyboardEvent) => {
            if (e.keyCode === ESC_KEY) {
                if (this.showMekUrdherDiag) this.toggle();
            }
        })
    }

}
