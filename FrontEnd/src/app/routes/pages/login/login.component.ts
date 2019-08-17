import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { CustomValidators } from 'ng2-validation';

import { Router } from '@angular/router';
import { AmUserApi } from '../../../shared/sdk/services/custom';
import { MsToasterService } from '../../../shared/services/mstoaster.service';
import { ToastModel } from '../../../shared/msInterfaces/interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorLoginTxt: string;
    perdoruesResponseErr: boolean = false;
    fjaleKalimiResponseErr: boolean = false;
    loading: boolean = false;
    private toast: ToastModel;
    constructor(
        public settings: SettingsService,
        fb: FormBuilder,
        private _router: Router,
        private _perdorues: AmUserApi,
        private _msToasterService: MsToasterService,
    ) {
        this.loginForm = fb.group({
            'username': [null, [Validators.required]],
            'password': [null, [Validators.required]],
            'remebmerMe': [false]
        });
    }
    submitForm($ev, value: any) {
        this.loading = true;
        $ev.preventDefault();
        for (let c in this.loginForm.controls) {
            this.loginForm.controls[c].markAsTouched();
        }
        if (this.loginForm.valid) {
            this.loginForm.controls["username"].disabled;
            let kredencialet = { realm: localStorage.getItem("org_token"), username: value.username, password: value.password, ttl: value.remebmerMe ? 31536000 : 1209600 };
            this.loginForm.disable();
            this.errorLoginTxt = "";
            this.perdoruesResponseErr = false;
            this.fjaleKalimiResponseErr = false;
            this._perdorues.login(kredencialet, "", value.remebmerMe).subscribe(() => {
            }, (err) => {
                this.loading = false;
                this.loginForm.enable();
                this.errorLoginTxt = null;
                if (err.code == "TOKEN_ERROR") {
                    this.toast = { type: "warning", title: "Kujdes!", body: "TOKEN_ERROR" };
                    this.errorLoginTxt = "Token Error: Njoftoni Administratorin";
                }
                if (err.code == "PERDORUES_NUK_EGZISTON") {
                    this.toast = { type: "warning", title: "Kujdes!", body: "PERDORUES_NUK_EGZISTON" };
                    this.perdoruesResponseErr = true;
                    this.fjaleKalimiResponseErr = false;
                }
                if (err.code == "FJALEKALIMI_GABIM") {
                    this.toast = { type: "warning", title: "Kujdes!", body: "FJALEKALIMI_GABIM" };
                    this.perdoruesResponseErr = false;
                    this.fjaleKalimiResponseErr = true;
                }
                if (err.code == "LLOGARI_INAKTIVE") {
                    this.errorLoginTxt = "Kjo Llogari është pezulluar!"
                    this.toast = { type: "error", title: "Error!", body: "LLOGARI_INAKTIVE" };
                    this.perdoruesResponseErr = false;
                    this.fjaleKalimiResponseErr = false;
                }
                if (err.code == "LOGIN_FAILED_EMAIL_NOT_VERIFIED") {
                    this.errorLoginTxt = "Verifikoni emailin para se të logoheni"
                    this.toast = { type: "warning", title: "Kujdes!", body: "VERIFIKO_EMAILIN" };
                }
                if (err.statusCode == 500 || err == "Server error") {
                    this.errorLoginTxt = "API ERR: " + err.message;
                    this.toast = { type: "error", title: "API ERR", body: err.message ? err.message : "Server Down" };
                }
                this._msToasterService.toastData(this.toast);
            }, () => {
                this._router.navigate(['/home']);
                this.toast = { type: "success", title: "Mirësererdhe " + kredencialet.username, body: "" };
                this._msToasterService.toastData(this.toast);
            });
        }
    }

    ngOnInit() {
    }

}
