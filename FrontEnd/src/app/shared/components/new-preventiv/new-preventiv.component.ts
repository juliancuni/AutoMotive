import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UrdherDiagnoze, UrdherDiagnozeApi, Diagnoza, KategoriSherbimeshApi, KategoriSherbimesh, Preventiv, PreventivApi, PjeseKembimi, PjeseKembimiApi, PjeseKembimiFin, PjeseKembimiFinApi } from '../../sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-new-preventiv',
    templateUrl: './new-preventiv.component.html',
    styleUrls: ['./new-preventiv.component.scss']
})
export class PreventivComponent implements OnInit, OnChanges {
    @Input() showNewPreventiv: boolean;
    @Input() urdherDiag: UrdherDiagnoze;
    @Output() hapMbyllNPrNgaSelf = new EventEmitter();
    @ViewChild('instanceKatSherb', { static: false }) instanceKatSherb: NgbTypeahead;
    @ViewChild('instancePjeseKembimi', { static: false }) instancePjeseKembimi: NgbTypeahead;
    focusKatSherb$ = new Subject<string>();
    clickKatSherb$ = new Subject<string>();
    focusPjeseKembimi$ = new Subject<string>();
    clickPjeseKembimi$ = new Subject<string>();

    public diagnozat: Diagnoza[];
    public katSherbimesh: KategoriSherbimesh[];
    public preventivet: Preventiv[] = [];
    public pjesetKembimiFin: PjeseKembimiFin[];
    public pjesaKembimitFin: PjeseKembimiFin;
    public preventiv: Preventiv;
    
    public vlereSherbimi: number;
    public orePune: number;
    public cmimi: number;
    public ulje: number;
    public totalVleraSherbime: number = 0;
    
    public sherbimNukEgziston: boolean = false;
    
    public preventivForm: FormGroup;
    public pjeseKembimiForm: FormGroup;


    constructor(
        private _urdherDiag: UrdherDiagnozeApi,
        private _katSherbimesh: KategoriSherbimeshApi,
        private _preventiv: PreventivApi,
        private _pjeseKembimiFin: PjeseKembimiFinApi,
        private _fb: FormBuilder,
    ) { }

    searchKatSherb = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickKatSherb$.pipe(filter(() => !this.instanceKatSherb.isPopupOpen()));
        const inputFocus$ = this.focusKatSherb$;
        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.katSherbimesh : this.katSherbimesh.filter(v => v.emer.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }

    formatterKatSherb = (x: { emer: string }) => x.emer;

    searchPjeseKembimi = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickPjeseKembimi$.pipe(filter(() => !this.instancePjeseKembimi.isPopupOpen()));
        const inputFocus$ = this.focusPjeseKembimi$;
        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.pjesetKembimiFin : this.pjesetKembimiFin.filter(v => v.pershkrimi.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }

    formatterPjeseKembimi = (x: { emer: string }) => x.emer;

    toggle() {
        this.preventivForm.reset();
        this.preventiv = new Preventiv();
        this.hapMbyllNPrNgaSelf.emit(this.showNewPreventiv = !this.showNewPreventiv);
    }

    ruajNewSherbim() {
        return new Promise((resolve, reject) => {
            if (this.preventivForm.valid) {
                if (!this.preventivForm.controls.sherbimi.value.id) {
                    let newKatSherbimi = new KategoriSherbimesh({
                        emer: this.preventivForm.controls.sherbimi.value,
                        orePune: this.preventivForm.controls.orePune.value,
                        cmimiPerOre: this.preventivForm.controls.cmimi.value
                    })
                    this._katSherbimesh.create(newKatSherbimi).subscribe((res: KategoriSherbimesh) => {
                        this.katSherbimesh.push(res);
                        this.sherbimNukEgziston = false;
                        resolve(res);
                    })
                } else {
                    resolve(this.preventivForm.controls.sherbimi.value)
                }
            }
        })
    }

    ruajNewPjese() {

    }

    regPreventiv(ev, preventivForm) {
        ev.preventDefault();
        if (this.preventivForm.valid) {
        //     let newKategoriSherbimi = new KategoriSherbimesh;
        //     this.ruajNewSherbim().then((katSherbimi: KategoriSherbimesh) => {
        //         let newPreventiv = new Preventiv({
        //             zeri: katSherbimi.emer,
        //             sasia: preventivForm.orePune,
        //             cmimi: preventivForm.cmimi,
        //             vlera: this.vlereSherbimi,
        //             ulje: preventivForm.ulje,
        //             klientId: this.urdherDiag.klientId,
        //             mjetiId: this.urdherDiag.mjetiId,
        //             urdherDiagnozeId: this.urdherDiag.id,
        //         })
        //         console.log(this.preventiv);
        //         if (this.preventiv) newPreventiv.id = this.preventiv.id;
        //         this._preventiv.upsert(newPreventiv).subscribe((res: Preventiv) => {
        //             let indexPreventiv = this.preventivet.map((preventiv) => { return preventiv.id }).indexOf(res.id);
        //             if (indexPreventiv !== -1) this.preventivet.splice(indexPreventiv, 1);
        //             this.preventivet.push(res);
        //             this.preventiv = res;
        //             this.preventivForm.reset();
        //             this.preventiv = new Preventiv();
        //             this.gjejVlerenTotalSherbime();
        //         })
        //     });
        }
    }

    editPreventiv(preventiv) {
        this.preventiv = preventiv;
        let zgjidhSherbimin = this.katSherbimesh.filter((katSherb) => { return katSherb.emer === preventiv.zeri })
        this.preventivForm.controls.sherbimi.setValue(zgjidhSherbimin[0]);
        this.preventivForm.controls.orePune.setValue(preventiv.sasia);
        this.preventivForm.controls.cmimi.setValue(preventiv.cmimi);
        this.preventivForm.controls.ulje.setValue(preventiv.ulje);
    }

    fshiPreventiv(preventiv) {
        this._preventiv.deleteById(preventiv.id).subscribe(() => {
            let indexPreventiv = this.preventivet.map((prev) => { return prev.id }).indexOf(preventiv.id);
            if (indexPreventiv !== -1) this.preventivet.splice(indexPreventiv, 1);
        })
    }

    ngOnInit() {
        this._pjeseKembimiFin.find().subscribe((res: PjeseKembimiFin[]) => {
            this.pjesetKembimiFin = res;
        })

        this._katSherbimesh.find().subscribe((res: KategoriSherbimesh[]) => {
            this.katSherbimesh = res;
        })

        this.preventivForm = this._fb.group({
            "sherbimi": [null, Validators.required],
            "orePune": [null, Validators.required],
            "cmimi": [null, Validators.required],
            "ulje": [null],
        })

        this.pjeseKembimiForm = this._fb.group({
            "partNo": [null, Validators.required],
            "pershkrimi": [null, Validators.required],
            "sasia": [null, Validators.required],
            "cmimi": [null, Validators.required],
            "ulje": [null],
        })

        this.preventivForm.controls.sherbimi.valueChanges.subscribe((value) => {
            if (value instanceof KategoriSherbimesh) {
                this.preventivForm.controls.orePune.setValue(value.orePune);
                this.preventivForm.controls.cmimi.setValue(value.cmimiPerOre);
                this.sherbimNukEgziston = false;
            }
        })

        this.preventivForm.controls.orePune.valueChanges.subscribe((value) => {
            this.orePune = value;
            this.gjejVlerenEsherbimit();

        })

        this.preventivForm.controls.cmimi.valueChanges.subscribe((value) => {
            this.cmimi = value;
            this.gjejVlerenEsherbimit();

        })

        this.preventivForm.controls.ulje.valueChanges.subscribe((value) => {
            this.ulje = value;
            this.gjejVlerenEsherbimit();
        })
    }

    ngOnChanges() {
        if (typeof this.urdherDiag !== "undefined" && Object.entries(this.urdherDiag).length !== 0) {
            this._urdherDiag.getDiagnozat(this.urdherDiag.id).subscribe((res: Diagnoza[]) => {
                this.diagnozat = res;
                // this.preventivet = res.preventiva;
            })
        }
        this.gjejVlerenEsherbimit();
        this.gjejVlerenTotalSherbime();
    }

    gjejVlerenEsherbimit() {
        let vlera = 0;
        let vleraPerqindjes = 0;
        if (this.orePune > 0 && this.cmimi > 0) {
            vlera = this.orePune * this.cmimi;
        }
        if (this.ulje > 0 && vlera > 0) {
            vleraPerqindjes = (this.ulje * vlera) / 100;
        }
        this.vlereSherbimi = vlera - vleraPerqindjes;
    }

    gjejVlerenTotalSherbime() {
        // this.totalVleraSherbime = this.preventivet.reduce((acc, prev) => acc += prev.vlera, 0);
    }
}
