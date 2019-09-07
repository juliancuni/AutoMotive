import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KlientApi, Klient, KlientFinanca, KlientFinancaApi } from '../../sdk';

@Component({
    selector: 'app-new-klient',
    templateUrl: './new-klient.component.html',
    styleUrls: ['./new-klient.component.scss']
})
export class NewKlientComponent implements OnInit {
    @Input() showNewKlient: boolean;
    @Output() hapMbyllNKNgaSelf = new EventEmitter();
    @Output() shtoKlient = new EventEmitter<Klient>();

    public klientetFinanca: KlientFinanca[] = [];
    public klientetFinancaFiltruar: KlientFinanca[];
    public klientZgjedhurNgaFinanca: KlientFinanca;

    public newKlientForm: FormGroup;

    public klientIzgjedhurNgaFinanca: boolean = false;
    public hapFinancen: boolean = false;

    public kerko: string;

    constructor(
        private _fb: FormBuilder,
        private _klient: KlientApi,
        private _klientFinanca: KlientFinancaApi,
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
        this.hapMbyllNKNgaSelf.emit(this.showNewKlient = !this.showNewKlient);
    }

    regNewklient(ev, newKlientForm) {
        ev.preventDefault();
        if (this.newKlientForm.valid) {
            this._klient.create(newKlientForm).subscribe((res: Klient) => {
                this.shtoKlient.emit(res);
                this.newKlientForm.reset();
                this.toggle();
                this.hapFinancen = false;
            })
        }
    }

    ngOnInit() {
        this.newKlientForm = this._fb.group({
            "person": [null, Validators.required],
            "emer": [{ value: null, disabled: true }, Validators.required],
            "telefon": [{ value: null, disabled: true }, null],
            "nius": [{ value: null, disabled: true }, null],
            "email": [{ value: null, disabled: true }, null],
            "adresa": [{ value: null, disabled: true }, null],
        })
        this.newKlientForm.controls.person.valueChanges.subscribe((value: string) => {
            console.log(value);
            value !== "privat" ? this.newKlientForm.controls.nius.enable() : this.newKlientForm.controls.nius.disable();
            this.newKlientForm.controls.emer.enable();
            this.newKlientForm.controls.telefon.enable();
            this.newKlientForm.controls.email.enable();
            this.newKlientForm.controls.adresa.enable();
        })
    }

}
