import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { PerdoruesApi, NdermarrjeApi, Ndermarrje } from '../../../shared/sdk';
const swal = require('sweetalert');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
    @ViewChild('usernameRef', { static: false }) usernameRef: ElementRef;
    loginForm: FormGroup;
    errorLoginTxt: string;
    perdoruesResponseErr: boolean = false;
    fjaleKalimiResponseErr: boolean = false;
    loading: boolean = false;
    ndermarrje: Ndermarrje
    constructor(
        public settings: SettingsService,
        fb: FormBuilder,
        private _router: Router,
        private _perdorues: PerdoruesApi,
        private _ndermarrje: NdermarrjeApi,
        private _route: ActivatedRoute
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
            let kredencialet = { realm: localStorage.getItem("ndermarrje_token"), username: value.username, password: value.password, ttl: value.remebmerMe ? 31536000 : 1209600 };
            this.loginForm.disable();
            this.errorLoginTxt = "";
            this.perdoruesResponseErr = false;
            this.fjaleKalimiResponseErr = false;
            this._perdorues.login(kredencialet, "", value.remebmerMe).subscribe((res) => {
                this._router.navigate(['/home']);
            }, (err) => {
                this.loading = false;
                this.loginForm.enable();
                this.errorLoginTxt = null;
                if (err.code == "TOKEN_ERROR") {
                    this.errorLoginTxt = "Token Error: Njoftoni Administratorin";
                }
                if (err.code == "PERDORUES_NUK_EGZISTON") {
                    this.perdoruesResponseErr = true;
                    this.fjaleKalimiResponseErr = false;
                    this.usernameRef.nativeElement.focus();
                }
                if (err.code == "FJALEKALIMI_GABIM") {
                    this.perdoruesResponseErr = false;
                    this.fjaleKalimiResponseErr = true;
                    this.usernameRef.nativeElement.focus();
                }
                if (err.code == "LLOGARI_INAKTIVE") {
                    this.errorLoginTxt = "Kjo Llogari është pezulluar!"
                    this.perdoruesResponseErr = false;
                    this.fjaleKalimiResponseErr = false;
                }
                if (err.code == "LOGIN_FAILED_EMAIL_NOT_VERIFIED") {
                    this.errorLoginTxt = "Verifikoni emailin para se të logoheni"
                }
                if (err.statusCode == 500 || err == "Server error") {
                    this.errorLoginTxt = "API ERR: " + err.message;
                }
            });
        }
    }

    ngOnInit() {
        let ndermarrjelocalStorage = localStorage.getItem("NdermarrjeData");
        if (ndermarrjelocalStorage) {
            this.ndermarrje = JSON.parse(ndermarrjelocalStorage);
        } else {
            this._ndermarrje.findOne({ where: { domain: { like: window.location.hostname } } }).subscribe((res: Ndermarrje) => {
                this.ndermarrje = res;
            }, (err) => {
                // console.log(err);
                this.ndermarrje = new Ndermarrje
            }, () => {
                localStorage.setItem("NdermarrjeData", JSON.stringify(this.ndermarrje))
            })
        }
        this._route.queryParams.subscribe((params: any) => {
            if (params.uid) {
                swal("Shumë mire!", "Verifikimi u krye! Tani mund te logoheni.", "success");
            }
            if (params.expired) {
                swal("Linku ka skaduar!", "Kjo llogari është verifikuar më parë. \nProvoni të logoheni me të dhënat personale", "warning");
            }
        });
    }

    ngAfterViewInit() {
        // this.usernameRef.nativeElement.focus();
    }
}
