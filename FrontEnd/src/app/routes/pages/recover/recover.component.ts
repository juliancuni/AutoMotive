import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { OrgApi, Org, AmUserApi } from 'src/app/shared/sdk';
import { Router } from '@angular/router';

const swal = require('sweetalert');

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
    private org: Org;
    recoveryForm: FormGroup;
    loading: boolean = false;
    emailError: boolean = false;
    error: {};
    constructor(
        public settings: SettingsService,
        fb: FormBuilder,
        private _org: OrgApi,
        private _amUser: AmUserApi,
        private _router: Router,
    ) {
        this.recoveryForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
        });
    }

    submitForm($ev, value: any) {
        this.emailError = false;
        $ev.preventDefault();
        for (let c in this.recoveryForm.controls) {
            this.recoveryForm.controls[c].markAsTouched();
        }
        if (this.recoveryForm.valid) {
            this.loading = true;
            this._amUser.resetPassword(value).subscribe((res: any) => {
                this.loading = false;
            }, (err) => {
                this.loading = false;
                if (err.code == "EMAIL_NOT_FOUND") {
                    this.emailError = true;
                    this.error = { message: "Ky e-mail nuk është i regjistruar" }
                }
                if (err.code == "RESET_FAILED_EMAIL_NOT_VERIFIED") {
                    swal("EMAIL_PROBLEM!", "Ky e-mail nuk është verifikuar. \nKontrolloni në adresën tuaj për e-mailin tonë të verifikimit.", "warning");
                    this.emailError = true;
                    this.error = { message: "Ky e-mail nuk është verifikuar" }
                }
            }, () => {
                swal({
                    title: 'OK!',
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
            })
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
                console.log(err);
                this
            }, () => {
                localStorage.setItem("OrgData", JSON.stringify(this.org))
            })
        }
    }

}
