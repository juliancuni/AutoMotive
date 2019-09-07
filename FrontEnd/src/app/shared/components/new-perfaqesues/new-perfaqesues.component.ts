import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KlientFinanca, KlientFinancaApi, Perfaqesues, PerfaqesuesApi, Klient, KlientApi } from '../../sdk';

@Component({
    selector: 'app-new-perfaqesues',
    templateUrl: './new-perfaqesues.component.html',
    styleUrls: ['./new-perfaqesues.component.scss']
})
export class NewPerfaqesuesComponent implements OnInit {
    @Input() showNewPerfaqesues: boolean;
    @Input() klient: Klient;
    @Output() hapMbyllNPFNgaSelf = new EventEmitter();
    @Output() shtoPerfaqesues = new EventEmitter<Perfaqesues>();

    public klientetFinanca: KlientFinanca[] = [];
    public klientetFinancaFiltruar: KlientFinanca[];
    public klientZgjedhurNgaFinanca: KlientFinanca;

    public newPerfaqesuesForm: FormGroup;

    public klientIzgjedhurNgaFinanca: boolean = false;
    public hapFinancen: boolean = false;

    public kerko: string;

    constructor(
        private _fb: FormBuilder,
        private _perfaqesues: PerfaqesuesApi,
        private _klientFinanca: KlientFinancaApi,
        private _klient: KlientApi,
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
        this.hapMbyllNPFNgaSelf.emit(this.showNewPerfaqesues = !this.showNewPerfaqesues);
    }

    regNewPerfaqesues(ev, newPerfaqesuesForm) {
        ev.preventDefault();
        if (this.newPerfaqesuesForm.valid) {
            this._klient.createPerfaqesues(this.klient.id, newPerfaqesuesForm).subscribe((res: Perfaqesues) => {
                this.shtoPerfaqesues.emit(res);
                this.newPerfaqesuesForm.reset();
                this.toggle();
                this.hapFinancen = false;
            })
        }
    }

    ngOnInit() {
        this.newPerfaqesuesForm = this._fb.group({
            "emer": [null, Validators.required],
            "telefon": [null, null],
            "email": [null, null],
            "adresa": [null, null],
        })
    }
}
