import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Klient, KlientApi, Perfaqesues, Mjeti, KategoriMjetesh, KategoriMjeteshApi, KlientFinanca, KlientFinancaApi } from 'src/app/shared/sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-klienti',
    templateUrl: './klienti.component.html',
    styleUrls: ['./klienti.component.scss']
})
export class KlientiComponent implements OnInit {

    @ViewChild('regPerfaqesuesModal', { static: false }) public regPerfaqesuesModal: ModalDirective;
    @ViewChild('regMjetModal', { static: false }) public regMjetModal: ModalDirective;

    @ViewChild('instance', { static: true }) instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    public model: any;
    public kerko: any;

    public settingActive: number = 1;
    public loading = false;
    public klientIzgjedhurNgaFinanca: boolean = false;

    public klient: Klient;
    public klientId: string;
    public perfaqesuesit: Perfaqesues[];
    public kategoriMjetesh: KategoriMjetesh[];

    public klientetFinanca: KlientFinanca[];
    public klientetFinancaFiltruar: KlientFinanca[];
    public klientZgjedhurNgaFinanca: KlientFinanca;



    public klientDataForm: FormGroup;
    public perfaqesuesDataForm: FormGroup;
    public mjeteDataForm: FormGroup;

    constructor(
        private _route: ActivatedRoute,
        private _klient: KlientApi,
        private _kategoriMjetesh: KategoriMjeteshApi,
        private _klientFinanca: KlientFinancaApi,
        private _fb: FormBuilder,
    ) { }

    enableEdit(field: string): void {
        this["edit" + field] ? this["edit" + field] = false : this["edit" + field] = true;
        this["edit" + field] ? this.klientDataForm.get(field).enable() : this.klientDataForm.get(field).disable();
        this.klientDataForm.get(field).reset(this.klient[field]);
    }

    saveField(field: string, value: string) {
        let reqErr: boolean = this.klientDataForm.controls[field].hasError('required');
        if (reqErr) {
            this.loading = false;
        } else {
            this.loading = true
            //Clone Perdorues Obj
            let updatedKlient: Klient = { ...this.klient };
            updatedKlient[field] = value;
            if (this.klient[field] === value) {
                this.loading = false;
                this.enableEdit(field);
            } else {
                this._klient.upsertPatch(updatedKlient).subscribe((res: Klient) => {
                    this.klient = res;
                    this.enableEdit(field);
                    this.loading = false;
                })
            }
        }
    }

    regNewPerfaqesues($ev, perfaqesuesForm) {
        $ev.preventDefault();
        if (this.perfaqesuesDataForm.valid) {
            this._klient.createPerfaqesues(this.klientId, perfaqesuesForm).subscribe((res: Perfaqesues) => {
                this.klient.perfaqesues.push(res);
                this.regPerfaqesuesModal.hide();
                this.perfaqesuesDataForm.reset();
            })
        }
    }

    regNewMjet($ev, mjeteForm) {
        $ev.preventDefault();
        if (this.mjeteDataForm.valid) {
            let kategoriMjeteshId = "";
            if (!mjeteForm.kategoria.id) {
                this._kategoriMjetesh.create({ emer: mjeteForm.kategoria }).subscribe((res: KategoriMjetesh) => {
                    this.kategoriMjetesh.push(res);
                    mjeteForm.kategoriMjeteshId = res.id;
                    this._klient.createMjetet(this.klientId, mjeteForm).subscribe((res: Mjeti) => {
                        this.klient.mjetet.push(res);
                        this.regMjetModal.hide();
                        this.mjeteDataForm.reset();
                        this.kerko = "";
                    })
                })
            } else {
                kategoriMjeteshId = mjeteForm.kategoria.id;
            }
            delete mjeteForm.kategoria;
            mjeteForm.kategoriMjeteshId = kategoriMjeteshId;
            this._klient.createMjetet(this.klientId, mjeteForm).subscribe((res: Mjeti) => {
                this.klient.mjetet.push(res);
                this.regMjetModal.hide();
                this.mjeteDataForm.reset();
                this.kerko = "";
            })
        }
    }

    showNewMjet() {
        this._klientFinanca.find().subscribe((res: KlientFinanca[]) => {
            this.klientetFinanca = res;
        })
        this.regMjetModal.show();
    }

    filterKlientetFinanca(event: { length: number; toLowerCase: () => string; }) {
        if (event.length > 2) {
            this.klientetFinancaFiltruar = [...this.klientetFinanca]
            this.klientetFinancaFiltruar = this.klientetFinancaFiltruar.filter((klient) => {
                return klient.pershkrimi.toLowerCase().includes(event.toLowerCase())
            })
            // console.log(this.klientetFinancaFiltruar);
        } else {
            this.klientetFinancaFiltruar = [];
        }
    }

    zgjidhKlientNgaFinanca(klientFiltruar: KlientFinanca) {
        console.log(klientFiltruar);
        this.klientIzgjedhurNgaFinanca = true;
        this.klientZgjedhurNgaFinanca = klientFiltruar;
    }

    pastroKlientinEZgjedhur() {
        this.klientIzgjedhurNgaFinanca = false;
        this.klientZgjedhurNgaFinanca = new KlientFinanca;
    }

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => (term === '' ? this.kategoriMjetesh
                : this.kategoriMjetesh.filter(v => v.emer.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
        );
    }

    formatter = (x: { emer: string }) => x.emer;

    ngOnInit() {
        this.klientDataForm = this._fb.group({
            "emer": [null, Validators.required],
            "person": [null, null],
            "telefon": [null, null],
            "email": [null, null],
            "nius": [null, null],
            "adresa": [null, null],
        })
        this.perfaqesuesDataForm = this._fb.group({
            "emer": [null, Validators.required],
            "telefon": [null, null],
            "email": [null, null],
            "adresa": [null, null],
        })
        this.mjeteDataForm = this._fb.group({
            "kategoria": [{ value: this.model }, null],
            "brand": [null, Validators.required],
            "model": [null, null],
            "viti": [null, null],
            "nrShasise": [null, null],
            "targa": [null, Validators.required],
            "nePark": [null, null],
            "neOficine": [null, null],
            "odometer": [null, null],
        })
        this._route.params.subscribe((params) => {
            this.klientId = params.id;
            this._klient.findById(params.id, { include: ["perfaqesues", "mjetet"] }).subscribe((res: Klient) => {
                this.klient = res;
                Object.keys(this.klientDataForm.controls).forEach(key => {
                    this.klientDataForm.controls[key].disable();
                    this.klientDataForm.controls[key].setValue(res[key]);
                });
            })
        })
        this._kategoriMjetesh.find().subscribe((res: KategoriMjetesh[]) => {
            console.log(res);
            this.kategoriMjetesh = res;
        })
    }
}
