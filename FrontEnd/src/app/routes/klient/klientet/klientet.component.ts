import { Component, OnInit } from '@angular/core';
import { Klient, KlientApi } from 'src/app/shared/sdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-klientet',
    templateUrl: './klientet.component.html',
    styleUrls: ['./klientet.component.scss']
})
export class KlientetComponent implements OnInit {

    public klientet: Klient[];
    public newKlientForm: FormGroup;
    constructor(
        private _klient: KlientApi,
        private _fb: FormBuilder,
    ) { }

    regNewKlient($ev, formData: Klient) {
        $ev.preventDefault();
        console.log(this.newKlientForm.valid);
    }

    ngOnInit() {
        this._klient.find().subscribe((res: Klient[]) => {
            this.klientet = res;
        })

        this.newKlientForm = this._fb.group({
            "person": [null, Validators.required],
            "emer": [null, Validators.required],
            "telefon": [null, null],
            "nius": [null, null],
            "email": [null, null],
            "adresa": [null, null],
        })
        this.newKlientForm.disable();
        this.newKlientForm.controls.person.enable();
    }

}
