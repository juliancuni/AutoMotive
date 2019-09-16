import { Component, Input, Output, OnInit, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { UrdherDiagnoze, UrdherDiagnozeApi, RealTime, Mjeti, MjetiApi, KategoriKontrollesh, Diagnoza, DiagnozaApi, KategoriKontrolleshApi } from '../../sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fromEvent, Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

const ESC_KEY = 27;
const source = fromEvent(document, 'keydown');

@Component({
    selector: 'app-mek-urdher-diag',
    templateUrl: './mek-urdher-diag.component.html',
    styleUrls: ['./mek-urdher-diag.component.scss']
})

export class MekUrdherDiagComponent implements OnInit, OnChanges {

    @Input() showMekUrdherDiag: boolean;
    @Input() urdherDiag: UrdherDiagnoze;
    @Output() hapMbyllMUDNgaSelf = new EventEmitter();
    @Output() shtoMekUrdheraDiag = new EventEmitter<UrdherDiagnoze>();


    public mjeti: Mjeti;
    public kontroll: KategoriKontrollesh;
    public diagnozat: Diagnoza[];
    public diagnoza: Diagnoza;
    public katKontrollesh: KategoriKontrollesh[];
    public katKontrolleshOrgj: KategoriKontrollesh[];
    public katKontrolleTeZgjedhura: KategoriKontrollesh[] = [];


    public showDiagBlock: boolean = false;
    public showDiagForm: boolean = false;

    public diagForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _urdheraDiagnoze: UrdherDiagnozeApi,
        private _rt: RealTime,
        private _mjeti: MjetiApi,
        private _diagnoza: DiagnozaApi,
        private _katKontrollesh: KategoriKontrolleshApi,
    ) { }

    toggle() {
        this.diagForm.reset();
        this.hapMbyllMUDNgaSelf.emit(this.showMekUrdherDiag = !this.showMekUrdherDiag);
    }

    // shtoKontroll(r) {
    //     let kontrollIndex = this.katKontrollesh.map((kontroll) => { return kontroll.emer }).indexOf(r.emer);
    //     let kontrollZgjedhurIndex = this.katKontrolleTeZgjedhura.map((kontroll) => { return kontroll.emer }).indexOf(r.emer);
    //     if (kontrollIndex !== -1 && kontrollZgjedhurIndex === -1) {
    //         this.katKontrolleTeZgjedhura.push(this.katKontrollesh[kontrollIndex]);
    //     }
    // }

    // hiqKontroll(kontroll) {
    //     let kontrollIndex = this.katKontrolleTeZgjedhura.map((kontroll) => { return kontroll.emer }).indexOf(kontroll.emer);
    //     if (kontrollIndex !== -1) {
    //         let spliced = this.katKontrolleTeZgjedhura.splice(kontrollIndex, 1);
    //         this.katKontrollesh.push(spliced[0]);
    //     }
    // }

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
            // let kontrolleTotal = this.urdherDiag.kontrolle.length;
            // let kontrolleKryer = 0;
            // if (this.kontroll) {
            //     this.urdherDiag.kontrolle.forEach((kontroll) => {
            //         if (kontroll.id === this.kontroll.id) {
            //             this.kontroll["perfunduar"] = true;
            //         }
            //         if (kontroll.perfunduar) {
            //             kontrolleKryer++
            //         }
            //     })
            // }

            this.urdherDiag.mjeti.odometer = diagForm.odometer;
            this.showDiagBlock = false;
            this._mjeti.upsert(this.urdherDiag.mjeti).subscribe((res: Mjeti) => {
                this.mjeti = res;
                this.urdherDiag.mjeti = res;
            })
            if (this.urdherDiag.statusi = 4) this.urdherDiag.statusi = 3;

            diagForm.urdherDiagnozeId = this.urdherDiag.id;
            diagForm.mjetiId = this.urdherDiag.mjeti.id;
            diagForm.perdoruesId = this.urdherDiag.perdoruesId;
            if(this.diagnoza) {
                diagForm.id = this.diagnoza.id;
                this.diagnozat = this.diagnozat.filter((diag) => { return this.diagnoza.id !== diag.id});
            } 

            this._diagnoza.upsert(diagForm).subscribe((res: Diagnoza) => {
                this.diagnozat.push(res);
                this.diagForm.controls.diagnoza.reset();
                this.diagForm.controls.sasia.reset();
                this.diagForm.controls.gjendjaDifektit.reset();
            }, (err) => {

            }, () => {
                this._urdheraDiagnoze.upsert(this.urdherDiag).subscribe((res: UrdherDiagnoze) => {
                    res.mjeti = this.urdherDiag.mjeti;
                    res.diagnozat = this.diagnozat;
                    this._rt.IO.emit("urdherDiagEditedByMekanik", res);
                    this.diagnoza = new Diagnoza;
                })
            })
        }
    }

    // showDiagnoze(kontroll) {
    //     this.showDiagBlock = true;
    //     this.kontroll = kontroll;
    // }

    fshiDiagnoze(diagnoze: Diagnoza) {
        this._diagnoza.deleteById(diagnoze.id).subscribe(() => {
            this.diagnozat = this.diagnozat.filter((diag) => { return diag.id !== diagnoze.id });
            this.urdherDiag.diagnozat = this.diagnozat;
            this._rt.IO.emit("urdherDiagEditedByMekanik", this.urdherDiag);
        })
    }

    editDiagnoze(diagnoza: Diagnoza) {
        this.diagnoza = diagnoza;
        this.diagForm.controls.diagnoza.setValue(diagnoza.diagnoza);
        this.diagForm.controls.gjendjaDifektit.setValue(diagnoza.gjendjaDifektit);
        this.diagForm.controls.sasia.setValue(diagnoza.sasia);
    }

    gjejDiagnozat(id) {
        this._urdheraDiagnoze.getDiagnozat(id).subscribe((res: Diagnoza[]) => {
            this.diagnozat = res;
        })
    }

    dorezoDiagnozat() {
        this.urdherDiag.statusi = 4;
        this._urdheraDiagnoze.upsert(this.urdherDiag).subscribe((res) => {
            console.log(this.urdherDiag);
            this.urdherDiag.diagnozat = this.diagnozat;
            this._rt.IO.emit("urdherDiagEditedByMekanik", this.urdherDiag);
            this.toggle();
        })
    }

    ngOnInit() {
        this.diagForm = this._fb.group({
            "odometer": [null, Validators.required],
            "diagnoza": [null, Validators.required],
            "gjendjaDifektit": [null, Validators.required],
            "sasia": [0, null],
        })

        this._katKontrollesh.find().subscribe((res: KategoriKontrollesh[]) => {
            this.katKontrollesh = res;
            this.katKontrolleshOrgj = [...res];
        })



        this._rt.IO.on("urdherDiag").subscribe((msg: UrdherDiagnoze) => {
            if (msg["delete"]) {
                this.urdherDiag = new UrdherDiagnoze;
                this.showMekUrdherDiag ? this.showMekUrdherDiag = false : null;
            } else {
                this.urdherDiag = msg;
            }
        })

    }

    ngOnChanges() {
        if (this.urdherDiag && Object.entries(this.urdherDiag).length !== 0) {
            this.gjejDiagnozat(this.urdherDiag.id);
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
