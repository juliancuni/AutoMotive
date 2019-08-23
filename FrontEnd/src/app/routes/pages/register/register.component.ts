import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AmUserApi, AmUser, OrgApi, Org } from '../../../shared/sdk';

import { MsToasterService } from '../../../shared/services/mstoaster.service';
import { ToastModel } from '../../../shared/msInterfaces/interfaces';

const swal = require('sweetalert');

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    private registerForm: FormGroup;
    private loading: boolean = false;
    private toast: ToastModel;
    private emailError: boolean = false;
    private passowrdError: boolean = false;
    private usernameError: boolean = false;
    private error: {};
    private org: Org;
    constructor(
        public settings: SettingsService,
        fb: FormBuilder,
        private _amUser: AmUserApi,
        private _router: Router,
        private _msToasterService: MsToasterService,
        private _org: OrgApi
    ) {
        this.registerForm = fb.group({
            'emer': [null, Validators.required],
            'mbiemer': [null, Validators.required],
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'telefon': [null, null],
            'username': [null, Validators.required],
            'password': [null, Validators.required],
            // 'dakord': [null, Validators.required],
        });
    }

    submitForm($ev: any, user: AmUser): void {
        $ev.preventDefault();
        for (let c in this.registerForm.controls) {
            this.registerForm.controls[c].markAsTouched();
        }
        if (this.registerForm.valid) {
            this.loading = true;
            this.registerForm.disable();
            this._amUser.create(user).subscribe((res: AmUser) => {
            }, (err) => {
                if (typeof err.details !== 'undefined' && typeof err.details.codes !== 'undefined' && typeof err.details.codes.email !== 'undefined') {
                    this.passowrdError = false;
                    this.emailError = true;
                    this.usernameError = false;
                    this.error = { email: err.details.messages.email[1] };
                }
                if (typeof err.details !== 'undefined' && typeof err.details.codes !== 'undefined' && typeof err.details.codes.username !== 'undefined') {
                    this.passowrdError = false;
                    this.emailError = false;
                    this.usernameError = true;
                    this.error = { username: err.details.messages.username[1] };
                }
                if (err.code == "FJALEKALIMI_SHKURTER") {
                    this.passowrdError = true;
                    this.emailError = false;
                    this.usernameError = false;
                    this.error = { password: err.message };
                }
                if (err.statusCode == 500 || err == "Server error") {
                    this.passowrdError = false;
                    this.emailError = false;
                    this.usernameError = false;
                    this.toast = { type: "error", title: "API ERR", body: err.message ? err.message : "Server Down"};
                    this._msToasterService.toastData(this.toast);

                }
                this.loading = false;
                this.registerForm.enable();
            }, () => {
                this.loading = false;
                this.registerForm.enable();
                swal({
                    title: 'LLOGARIA U KRIJUA ME SUKSES!',
                    text: 'Hapni e-mail-in dhe ndiqni udhëzimet aty.\n*Info: Nese e-mail ynë nuk shfaqet në INBOX, kontrolloni në SPAM.',
                    icon: 'success',
                    buttons: {
                        cancel: false,
                        confirm: {
                            text: 'Mbyll',
                            value: true,
                            visible: true,
                            className: "bg-success",
                            closeModal: true
                        }
                    }
                }).then(() => {
                    this._router.navigate(['/login']);
                });
            });
        }
    }

    toggleFjalekalim() {
        var x: any = document.getElementById("fjalekalim");
        var y: any = document.getElementById("eyeIcon");

        if (x.type === "password") {
            x.type = "text";
            y.className = "fa fa-eye-slash";
        } else {
            x.type = "password";
            y.className = "fa fa-eye";
        }
    }

    ngOnInit() {
        let userlocalStorage = localStorage.getItem("OrgData");
        if (userlocalStorage) {
            this.org = JSON.parse(userlocalStorage);
        } else {
            this._org.findOne({ where: { domain: { like: window.location.hostname } } }).subscribe((res: Org) => {
                this.org = res;
            }, (err) => {
                // console.log(err);
            }, () => {
                localStorage.setItem("OrgData", JSON.stringify(this.org))
            })
        }
    }

}
