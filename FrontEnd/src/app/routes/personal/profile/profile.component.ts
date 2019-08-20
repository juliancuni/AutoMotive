import { Component, OnInit } from '@angular/core';
import { AmUser, AmUserApi } from 'src/app/shared/sdk';
import { ToastModel } from 'src/app/shared/msInterfaces/interfaces';
import { MsToasterService } from 'src/app/shared/services/mstoaster.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private userDataForm: FormGroup;
    private user: AmUser;
    private loading: boolean = false;
    private toast: ToastModel;
    private emailError: boolean = false;
    private passowrdError: boolean = false;
    private usernameError: boolean = false;
    private error: {};

    private editEmer: boolean = false;
    private editMbiemer: boolean = false;
    private editUsername: boolean = false;
    private editEmail: boolean = false;
    private editAdresa: boolean = false;
    private editTelefon: boolean = false;
    private editDatelindja: boolean = false;
    private editPassword: boolean = false;

    private subscriptions: Subscription[] = new Array<Subscription>();

    bsValue = new Date();
    bsConfig = {
        containerClass: 'theme-blue',
        isAnimated: true,
        dateInputFormat: 'DD-MM-YYYY'
    }

    constructor(
        private _amUser: AmUserApi,
        private _msToasterService: MsToasterService,
        private _fb: FormBuilder,
    ) {

    }

    submitForm($ev: any, user: AmUser): void {
        // $ev.preventDefault();
        // for (let c in this.userDataForm.controls) {
        //     this.userDataForm.controls[c].markAsTouched();
        // }
        // if (this.userDataForm.valid) { }
    }

    enableEdit(field: string): void {
        this["edit" + field] ? this["edit" + field] = false : this["edit" + field] = true;
        this["edit" + field] ? this.userDataForm.get(field.toLowerCase()).enable() : this.userDataForm.get(field.toLowerCase()).disable();
        this.userDataForm.get(field.toLowerCase()).reset(this.user[field.toLowerCase()]);
    }

    saveField(field: string, value: string) {
        let key = field.toLowerCase();

        let minErr: boolean = this.userDataForm.controls[key].hasError('minlength');
        let reqErr: boolean = this.userDataForm.controls[key].hasError('required');
        console.log(key + " min: " + minErr, key + " req: " + reqErr)
        if (minErr || reqErr) {
            this.enableEdit(field);
        } else {
            this.loading = true
            //Clone Amuser Obj
            let updatedAmUser: AmUser = { ...this.user };
            updatedAmUser[key] = value;
            if (key === "newpassword") {

                //Ketu kemi nje problem me fjalekalimet. Rregulloje

                let oldPassword: string = this.userDataForm.get('password').value;
                let newPassword: string = this.userDataForm.get('newpass').value;
                this._amUser.changePassword(oldPassword, newPassword).subscribe((res) => {
                    this.enableEdit(field);
                    this.loading = false;
                }, (err) => {
                    this.enableEdit(field);
                    this.loading = false;
                })
            } else if (this.user[key] === value) {
                this.enableEdit(field);
                this.loading = false;
            } else {
                this._amUser.upsertPatch(updatedAmUser).subscribe((res: AmUser) => {
                    this.user = res;
                }, (err) => {
                    this.enableEdit(field);
                    this.loading = false;
                }, () => {
                    this.enableEdit(field);
                    this.loading = false;
                    localStorage.setItem("UserPersonalData", JSON.stringify(this.user));
                })
            }
        }
    }

    ngOnInit() {
        this.userDataForm = this._fb.group({
            'emer': [null, Validators.required],
            'mbiemer': [null, Validators.required],
            'username': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'adresa': [null, null],
            'telefon': [null, null],
            'datelindja': [null, null],
            'password': [null, Validators.required],
            'newpass': [null, [Validators.required, Validators.minLength(6)]],
        });
        this.subscriptions.push(
            this._amUser.getCurrent().subscribe((res: AmUser) => {
                this.user = res;
                this.userDataForm.get('emer').disable();
                this.userDataForm.get('mbiemer').disable();
                this.userDataForm.get('username').disable();
                this.userDataForm.get('email').disable();
                this.userDataForm.get('adresa').disable();
                this.userDataForm.get('telefon').disable();
                this.userDataForm.get('datelindja').disable();
                this.userDataForm.get('password').disable();
                this.userDataForm.get('emer').setValue(res.emer);
                this.userDataForm.get('mbiemer').setValue(res.mbiemer)
                this.userDataForm.get('username').setValue(res.username)
                this.userDataForm.get('email').setValue(res.email)
                this.userDataForm.get('adresa').setValue(res.adresa)
                this.userDataForm.get('telefon').setValue(res.telefon)
                this.userDataForm.get('datelindja').setValue(res.datelindja)
            }, (err) => {

            }, () => {
            })
        )
    }
}
