import { Component, OnInit, ViewChild } from '@angular/core';
import { Klient, KlientApi, KlientFinancaApi, KlientFinanca } from 'src/app/shared/sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
    selector: 'app-klientet',
    templateUrl: './klientet.component.html',
    styleUrls: ['./klientet.component.scss']
})
export class KlientetComponent implements OnInit {

    @ViewChild('newClient', { static: false }) public newClient: ModalDirective;


    public klientet: Klient[];
    public klientetFinanca: KlientFinanca[];
    public klientetFinancaFiltruar: KlientFinanca[];
    public klientZgjedhurNgaFinanca: KlientFinanca;
    public newKlientForm: FormGroup;

    public klientIzgjedhurNgaFinanca: boolean = false;

    constructor(
        private _klient: KlientApi,
        private _fb: FormBuilder,
        private _klientFinanca: KlientFinancaApi,
    ) { }


    showNewKlient() {
        this._klientFinanca.find().subscribe((res: KlientFinanca[]) => {
            this.klientetFinanca = res;
        })
        this.newClient.show();
    }

    test(event: { length: number; toLowerCase: () => string; }) {
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

    // regKlientPastajPerfaqesues($ev: { preventDefault: () => void; }, newKlientForm: Klient) {
    //     $ev.preventDefault();
    //     if(this.newKlientForm.valid) {
    //         this._klient.create(newKlientForm).subscribe((res: Klient) => {
    //             this.klientet.push(res);
    //         })
    //     }
    // }

    regNewKlient($ev: { preventDefault: () => void; }, newKlient: Klient) {
        $ev.preventDefault();
        if(this.newKlientForm.valid) {
            this._klient.create(newKlient).subscribe((res: Klient) => {
                this.klientet.push(res);
            })
        }
    }

    ngOnInit() {
        this._klient.find().subscribe((res: Klient[]) => {
            this.klientet = res;
        })
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
