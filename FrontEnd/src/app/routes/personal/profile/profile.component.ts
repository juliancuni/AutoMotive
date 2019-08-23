import { Component, OnInit } from '@angular/core';
import { Perdorues, PerdoruesApi, LoopBackAuth } from 'src/app/shared/sdk';
import { ToastModel } from 'src/app/shared/msInterfaces/interfaces';
import { MsToasterService } from 'src/app/shared/services/mstoaster.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Subscription } from 'rxjs/Subscription';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { SettingsService } from 'src/app/core/settings/settings.service';

const URL = 'http://localhost:4000/api/files/upload?userId=true';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private userDataForm: FormGroup;
    private user: Perdorues;
    private loading: boolean = false;
    private toast: ToastModel;

    public uploader = new FileUploader({ url: URL, allowedMimeType: ['image/png', 'image/gif', 'image/jpeg'] });
    private subscriptions: Subscription[] = new Array<Subscription>();

    private editavatar: boolean = false;

    bsValue = new Date();
    bsConfig = {
        containerClass: 'theme-blue',
        isAnimated: true,
        dateInputFormat: 'DD-MM-YYYY'
    }

    constructor(
        private _Perdorues: PerdoruesApi,
        private _msToasterService: MsToasterService,
        private _fb: FormBuilder,
        private _lbAuth: LoopBackAuth,
        private _http: HttpClient,
        private settings: SettingsService
    ) { }

    submitForm($ev: any, user: Perdorues): void {
        // $ev.preventDefault();
        // for (let c in this.userDataForm.controls) {
        //     this.userDataForm.controls[c].markAsTouched();
        // }
        // if (this.userDataForm.valid) { }
    }

    enableEdit(field: string): void {
        this["edit" + field] ? this["edit" + field] = false : this["edit" + field] = true;
        this["edit" + field] ? this.userDataForm.get(field).enable() : this.userDataForm.get(field).disable();
        this.userDataForm.get(field).reset(this.user[field]);
    }

    saveField(field: string, value: string) {
        // let minErr: boolean = this.userDataForm.controls[field].hasError('minlength');
        let reqErr: boolean = this.userDataForm.controls[field].hasError('required');
        let minErr: boolean = this.userDataForm.controls['newpass'].hasError('minlength');
        let emailErr: boolean = this.userDataForm.controls[field].hasError('email');
        if (minErr || reqErr || emailErr) {
            // this.enableEdit(field);
            this.loading = false;
        } else {
            this.loading = true
            //Clone Perdorues Obj
            let updatedPerdorues: Perdorues = { ...this.user };
            updatedPerdorues[field] = value;
            if (this.user[field] === value) {
                this.loading = false;
                this.enableEdit(field);
            } else {
                if (field === "password") {
                    //Ketu kemi nje problem me fjalekalimet. Rregulloje
                    if (minErr) {
                        this.loading = false;
                    } else {
                        let oldPassword: string = this.userDataForm.get('password').value;
                        let newPassword: string = this.userDataForm.get('newpass').value;
                        this._Perdorues.changePassword(oldPassword, newPassword).subscribe(() => {
                            this.enableEdit(field);
                            this.loading = false;
                            this.toast = { type: "success", title: "Përditësim", body: field + " u përditësua" };
                            this._msToasterService.toastData(this.toast);
                        }, (err) => {
                            // this.enableEdit(field);
                            if (err.code === "INVALID_PASSWORD") {
                                this.userDataForm.get(field).setErrors({ invalidPass: true })
                            }
                            if (err.statusCode == 500 || err == "Server error") {
                                this.toast = { type: "error", title: "API ERR", body: err.message ? err.message : "Server Down" };
                                this._msToasterService.toastData(this.toast);
                            }
                            this.loading = false;
                        }, () => {
                        })
                    }
                } else {
                    this._Perdorues.upsertPatch(updatedPerdorues).subscribe((res: Perdorues) => {
                        this.user = res;
                        this.toast = { type: "success", title: "Përditësim", body: field + " u përditësua" };
                        this._msToasterService.toastData(this.toast);
                        console.log("ok - " + field);

                    }, (err) => {
                        console.log("nok - " + field);

                        if (typeof err.details.codes !== 'undefined' && err.details.codes.username[0] === "uniqueness") {
                            this.userDataForm.get(field).setErrors({ userNotUnique: true })
                        } else if (err.statusCode == 500 || err == "Server error") {
                            this.toast = { type: "error", title: "API ERR", body: err.message ? err.message : "Server Down" };
                            this._msToasterService.toastData(this.toast);
                        }
                        // this.enableEdit(field);
                        this.loading = false;
                    }, () => {
                        this.enableEdit(field);
                        this.loading = false;
                        localStorage.setItem("PerdoruesData", JSON.stringify(this.user));
                    })
                }
            }
        }
    }

    ndryshoFoto(): void {
        this.loading = true;
        this.editavatar = true;
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item, response: any, status, header) => {
            if (status === 0) {
                this.loading = false;
                this.editavatar = false;
                this.toast = { type: "error", title: "Upload Deshtoi", body: "Nuk mund të bëj dot upload në server" };
            } else {
                this.loading = false;
                this.editavatar = false;
                this.user.avatar = response;
                this.toast = { type: "success", title: "Upload Avatar", body: "Avatar u përditësua" };
            }
            this._msToasterService.toastData(this.toast);
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
            this._Perdorues.getCurrent().subscribe((res: Perdorues) => {
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
                if (err.statusCode == 500 || err == "Server error") {
                    this.toast = { type: "error", title: "API ERR", body: err.message ? err.message : "Server Down" };
                }
                this._msToasterService.toastData(this.toast);
            }, () => {
            })
        )
    }
}
