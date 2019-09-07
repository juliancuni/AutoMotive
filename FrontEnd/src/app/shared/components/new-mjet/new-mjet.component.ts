import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KlientFinanca, KlientFinancaApi, Klient, KlientApi, Mjeti, MjetiApi, KategoriMjetesh, KategoriMjeteshApi } from '../../sdk';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-new-mjet',
    templateUrl: './new-mjet.component.html',
    styleUrls: ['./new-mjet.component.scss']
})
export class NewMjetComponent implements OnInit {
    @Input() showNewMjet: boolean;
    @Input() klient: Klient;
    @Output() hapMbyllNMNgaSelf = new EventEmitter();
    @Output() shtoMjet = new EventEmitter<Mjeti>();

    @ViewChild('instance', { static: false }) instance: NgbTypeahead;

    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    public klientetFinanca: KlientFinanca[] = [];
    public klientetFinancaFiltruar: KlientFinanca[];
    public klientZgjedhurNgaFinanca: KlientFinanca;
    public kategoriMjetesh: KategoriMjetesh[];

    public newMjetForm: FormGroup;

    public klientIzgjedhurNgaFinanca: boolean = false;
    public hapFinancen: boolean = false;

    public kerko: string;
    public kategoria: string;

    constructor(
        private _fb: FormBuilder,
        // private _mjet: MjetiApi,
        private _klientFinanca: KlientFinancaApi,
        private _klient: KlientApi,
        private _kategoriMjetesh: KategoriMjeteshApi,
    ) {
    }

    kerkoNgaFinanca(ev) {
        if (ev.target.checked) {
            if (this.klientetFinanca.length === 0) {
                this._klientFinanca.find().subscribe((res: KlientFinanca[]) => {
                    this.klientetFinanca = res;
                    this.hapFinancen = true;
                })
            }
            this.hapFinancen = true;
        } else {
            this.hapFinancen = false;
            this.kerko = "";
            this.klientetFinancaFiltruar = [];
            this.pastroKlientinEZgjedhur();
        }
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

    toggle() {
        this.hapMbyllNMNgaSelf.emit(this.showNewMjet = !this.showNewMjet);
    }

    regNewMjet(ev, newMjetForm) {
        ev.preventDefault();
        if (this.newMjetForm.valid) {
            let kategoriMjeteshId = "";
            if (!newMjetForm.kategoria.id) {
                this._kategoriMjetesh.create({ emer: newMjetForm.kategoria }).subscribe((res: KategoriMjetesh) => {
                    this.kategoriMjetesh.push(res);
                    newMjetForm.kategoriMjeteshId = res.id;
                    this._klient.createMjetet(this.klient.id, newMjetForm).subscribe((res: Mjeti) => {
                        this.shtoMjet.emit(res);
                        this.newMjetForm.reset();
                        this.toggle();
                        this.hapFinancen = false;
                    })
                })
            } else {
                kategoriMjeteshId = newMjetForm.kategoria.id;
                delete newMjetForm.kategoria;
                newMjetForm.kategoriMjeteshId = kategoriMjeteshId;
                this._klient.createMjetet(this.klient.id, newMjetForm).subscribe((res: Mjeti) => {
                    this.shtoMjet.emit(res);
                    this.newMjetForm.reset();
                    this.toggle();
                    this.hapFinancen = false;
                })
            }
        }
        this.kerko = "";
        this.klientetFinancaFiltruar = [];
        this.pastroKlientinEZgjedhur();
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
        this._kategoriMjetesh.find().subscribe((res: KategoriMjetesh[]) => {
            this.kategoriMjetesh = res;
        })
        this.newMjetForm = this._fb.group({
            "kategoria": [{ value: this.kategoria }, null],
            "brand": [null, Validators.required],
            "model": [null, null],
            "viti": [null, null],
            "nrShasise": [null, null],
            "targa": [null, Validators.required],
            "nePark": [null, null],
            "neOficine": [null, null],
            "kilometrazhi": [null, null],
        })
    }
}
