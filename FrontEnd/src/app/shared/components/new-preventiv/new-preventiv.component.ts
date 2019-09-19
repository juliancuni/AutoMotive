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

    // focusPjeseKembimi$ = new Subject<string>();
    // clickPjeseKembimi$ = new Subject<string>();

    public diagnozat: Diagnoza[];
    public katSherbimesh: KategoriSherbimesh[];
    public preventivet: Preventiv[] = [];
    // public pjesetKembimiFin: PjeseKembimiFin[];
    // public pjesaKembimitFin: PjeseKembimiFin;
    public preventiv: Preventiv;

    public vlereSherbimi: number;
    public vlerePjese: number;
    public orePune: number;
    public cmimi: number;
    public ulje: number;

    public sasiaPjese: number;
    public cmimiPjese: number;
    public uljePjese: number;

    public totalVleraSherbime: number = 0;

    public sherbimNukEgziston: boolean = false;

    public sherbimeForm: FormGroup;
    public pjeseKembimiForm: FormGroup;


    constructor(
        private _urdherDiag: UrdherDiagnozeApi,
        private _katSherbimesh: KategoriSherbimeshApi,
        private _preventiv: PreventivApi,
        // private _pjeseKembimiFin: PjeseKembimiFinApi,
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

    // searchPjeseKembimi = (text$: Observable<string>) => {
    //     const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    //     const clicksWithClosedPopup$ = this.clickPjeseKembimi$.pipe(filter(() => !this.instancePjeseKembimi.isPopupOpen()));
    //     const inputFocus$ = this.focusPjeseKembimi$;
    //     return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
    //         map(term => (term === '' ? this.pjesetKembimiFin : this.pjesetKembimiFin.filter(v => v.pershkrimi.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    //     );
    // }

    // formatterPjeseKembimi = (x: { emer: string }) => x.emer;

    toggle() {
        this.sherbimeForm.reset();
        this.preventiv = new Preventiv();
        this.hapMbyllNPrNgaSelf.emit(this.showNewPreventiv = !this.showNewPreventiv);
    }

    // ruajNewSherbim() {
    //     return new Promise((resolve, reject) => {
    //         if (this.sherbimeForm.valid) {
    //             if (!this.sherbimeForm.controls.sherbimi.value.id) {
    //                 let newKatSherbimi = new KategoriSherbimesh({
    //                     emer: this.sherbimeForm.controls.sherbimi.value,
    //                     orePune: this.sherbimeForm.controls.orePune.value,
    //                     cmimiPerOre: this.sherbimeForm.controls.cmimi.value
    //                 })
    //                 this._katSherbimesh.create(newKatSherbimi).subscribe((res: KategoriSherbimesh) => {
    //                     this.katSherbimesh.push(res);
    //                     this.sherbimNukEgziston = false;
    //                     resolve(res);
    //                 })
    //             } else {
    //                 resolve(this.sherbimeForm.controls.sherbimi.value)
    //             }
    //         }
    //     })
    // }
    addSherbim(ev, sherbimeForm) {
        ev.preventDefault();
        if (this.sherbimeForm.valid) {
            let sherbim = {
                id: sherbimeForm.sherbimi.id,
                emer: sherbimeForm.sherbimi.emer,
                orePune: sherbimeForm.orePune,
                cmimiPerOre: sherbimeForm.cmimi,
                ulje: sherbimeForm.ulje,
                vlera: this.vlereSherbimi
            }
            if (typeof this.preventiv.vlera === 'undefined') this.preventiv.vlera = 0;

            let sherbimPreventivIndex = this.preventiv.sherbimet.map((sherbim) => { return sherbim.id }).indexOf(sherbimeForm.sherbimi.id);
            if (sherbimPreventivIndex !== -1) {
                this.preventiv.sherbimet.splice(sherbimPreventivIndex, 1);
            }
            this.preventiv.sherbimet.push(sherbim);
            this.preventiv.vlera = this.gjejVlerenEPreventivit();
            this._preventiv.upsert(this.preventiv).subscribe((res: Preventiv) => {
                this.preventiv = res;
                this.sherbimeForm.reset();
            })
        }
    }

    editSherbim(sherbim) {
        this.sherbimeForm.controls.sherbimi.setValue(sherbim);
        this.sherbimeForm.controls.orePune.setValue(sherbim.orePune);
        this.sherbimeForm.controls.cmimi.setValue(sherbim.cmimiPerOre);
        this.sherbimeForm.controls.ulje.setValue(sherbim.ulje);
    }

    fshiSherbim(sherbim) {
        let sherbimPreventivIndex = this.preventiv.sherbimet.map((sherbim) => { return sherbim.id }).indexOf(sherbim.id);
        if (sherbimPreventivIndex !== -1) this.preventiv.sherbimet.splice(sherbimPreventivIndex, 1);
        this.preventiv.vlera = this.gjejVlerenEPreventivit();
        this._preventiv.upsert(this.preventiv).subscribe((res: Preventiv) => {
            this.preventiv = res;
        })
    }

    addPjeseKembimi(ev, pjeseKembimiForm) {
        ev.preventDefault();
        if (this.pjeseKembimiForm.valid) {
            console.log(pjeseKembimiForm);
            let pjeseKembimiPreventivIndex = this.preventiv.pjeset.map((pjese) => { return pjese.partNo }).indexOf(pjeseKembimiForm.partNo);
            if (pjeseKembimiPreventivIndex !== -1) this.preventiv.pjeset.splice(pjeseKembimiPreventivIndex, 1);
            this.preventiv.pjeset.push(pjeseKembimiForm);
            this._preventiv.upsert(this.preventiv).subscribe((res: Preventiv) => {
                this.preventiv = res;
            })
        }
    }
    ngOnInit() {
        // this._pjeseKembimiFin.find().subscribe((res: PjeseKembimiFin[]) => {
        // this.pjesetKembimiFin = res;
        // })

        this._katSherbimesh.find().subscribe((res: KategoriSherbimesh[]) => {
            this.katSherbimesh = res;
        })

        this.sherbimeForm = this._fb.group({
            "sherbimi": [null, Validators.required],
            "orePune": [null, Validators.required],
            "cmimi": [null, Validators.required],
            "ulje": [0],
        })

        this.pjeseKembimiForm = this._fb.group({
            "partNo": [null, Validators.required],
            "pershkrimi": [null, Validators.required],
            "gjendje": [null, Validators.required],
            "vonesa": [null, Validators.required],
            "sasia": [null, Validators.required],
            "cmimi": [null, Validators.required],
            "ulje": [0],
        })

        this.sherbimeForm.controls.sherbimi.valueChanges.subscribe((value) => {
            if (value instanceof KategoriSherbimesh) {
                this.sherbimeForm.controls.orePune.setValue(value.orePune);
                this.sherbimeForm.controls.cmimi.setValue(value.cmimiPerOre);
                this.sherbimNukEgziston = false;
            }
        })

        this.sherbimeForm.controls.orePune.valueChanges.subscribe((value) => {
            this.orePune = value;
            this.gjejVlerenEsherbimit();

        })

        this.sherbimeForm.controls.cmimi.valueChanges.subscribe((value) => {
            this.cmimi = value;
            this.gjejVlerenEsherbimit();

        })

        this.sherbimeForm.controls.ulje.valueChanges.subscribe((value) => {
            this.ulje = value;
            this.gjejVlerenEsherbimit();
        })

        this.pjeseKembimiForm.controls.sasia.valueChanges.subscribe((value) => {
            this.sasiaPjese = value;
        })
        this.pjeseKembimiForm.controls.cmimi.valueChanges.subscribe((value) => {
            this.cmimiPjese = value;
        })

        this.pjeseKembimiForm.controls.ulje.valueChanges.subscribe((value) => {
            this.uljePjese = value;
            
        })
    }

    ngOnChanges() {
        if (typeof this.urdherDiag !== "undefined" && Object.entries(this.urdherDiag).length !== 0) {
            this._urdherDiag.findById(this.urdherDiag.id, { include: ["diagnozat", "preventiva"] }).subscribe((res: UrdherDiagnoze) => {
                if (res.preventiva.length === 0) {
                    this.preventiv = new Preventiv({
                        klientId: this.urdherDiag.klientId,
                        mjetiId: this.urdherDiag.mjetiId,
                        urdherDiagnozeId: this.urdherDiag.id,
                        sherbimet: [],
                        pjeset: []
                    })
                } else {
                    this.preventiv = res.preventiva[0];
                }
            })
        }
    }

    gjejVlerenEsherbimit() {
        let vlera = 0;
        let vleraPerqindjes = 0;
        if (this.orePune > 0 && this.cmimi > 0) vlera = this.orePune * this.cmimi;
        if (this.ulje > 0 && vlera > 0) vleraPerqindjes = (this.ulje * vlera) / 100;
        this.vlereSherbimi = vlera - vleraPerqindjes;

    }

    gjejVlerenEPjeses() { 
        let vlera = 0;
        let vleraPerqindjes = 0;
        if (this.sasiaPjese > 0 && this.cmimiPjese > 0) vlera = this.sasiaPjese * this.cmimiPjese;
        if (this.uljePjese > 0 && vlera > 0) vleraPerqindjes = (this.uljePjese * vlera) / 100;
        this.vlerePjese = vlera - vleraPerqindjes;
    }

    gjejVlerenEPreventivit(): number {
        let vleraSherbime = this.preventiv.sherbimet.reduce((acc, sherbim) => acc += sherbim.vlera, 0);
        let vleraPjeset = this.preventiv.pjeset.reduce((acc, pjese) => acc += pjese.vlera, 0);
        return
    }
}
