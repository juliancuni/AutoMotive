import { Component, OnInit } from '@angular/core';
import { Perdorues, PerdoruesApi, LoopBackAuth } from 'src/app/shared/sdk';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Subscription } from 'rxjs/Subscription';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { SettingsService } from 'src/app/core/settings/settings.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

const URL = 'http://localhost:4000/api/files/upload?perdoruesId=true';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public perdoruesDataForm: FormGroup;
    public perdorues: Perdorues;
    public loading: boolean = false;

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
        private _perdorues: PerdoruesApi,
        private _fb: FormBuilder,
        private _lbAuth: LoopBackAuth,
        private _http: HttpClient,
        private settings: SettingsService,
        private _notificationService: NotificationsService,
    ) { }

    enableEdit(field: string): void {
        this["edit" + field] ? this["edit" + field] = false : this["edit" + field] = true;
        this["edit" + field] ? this.perdoruesDataForm.get(field).enable() : this.perdoruesDataForm.get(field).disable();
        this.perdoruesDataForm.get(field).reset(this.perdorues[field]);
    }

    saveField(field: string, value: string) {
        let reqErr: boolean = this.perdoruesDataForm.controls[field].hasError('required');
        let minErr: boolean = this.perdoruesDataForm.controls['newpass'].hasError('minlength');
        let emailErr: boolean = this.perdoruesDataForm.controls[field].hasError('email');
        if (minErr || reqErr || emailErr) {
            this.loading = false;
        } else {
            this.loading = true
            //Clone Perdorues Obj
            let updatedPerdorues: Perdorues = { ...this.perdorues };
            updatedPerdorues[field] = value;
            if (this.perdorues[field] === value) {
                this.loading = false;
                this.enableEdit(field);
            } else {
                if (field === "password") {
                    if (minErr) {
                        this.loading = false;
                    } else {
                        let oldPassword: string = this.perdoruesDataForm.get('password').value;
                        let newPassword: string = this.perdoruesDataForm.get('newpass').value;
                        this._perdorues.changePassword(oldPassword, newPassword).subscribe(() => {
                            this.enableEdit(field);
                            this.loading = false;
                        }, (err) => {
                            if (err.code === "INVALID_PASSWORD") {
                                this.perdoruesDataForm.get(field).setErrors({ invalidPass: true })
                            }
                            this.loading = false;
                        }, () => {
                        })
                    }
                } else {
                    this._perdorues.upsertPatch(updatedPerdorues).subscribe((res: Perdorues) => {
                        this.perdorues = res;
                        this._notificationService.perdoruesDataChanged(this.perdorues);
                    }, (err) => {
                        if (typeof err.details.codes !== 'undefined' && err.details.codes.username[0] === "uniqueness") {
                            this.perdoruesDataForm.get(field).setErrors({ perdoruesNotUnique: true })
                        } 
                        this.loading = false;
                    }, () => {
                        this.enableEdit(field);
                        this.loading = false;
                        localStorage.setItem("PerdoruesData", JSON.stringify(this.perdorues));
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
            } else {
                this.loading = false;
                this.editavatar = false;
                this.perdorues.avatar = response;
                this._notificationService.perdoruesDataChanged(this.perdorues);
            }
        }
    }

    ngOnInit() {
        this.perdoruesDataForm = this._fb.group({
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
            this._perdorues.getCurrent().subscribe((res: Perdorues) => {
                this.perdorues = res;
                Object.keys(this.perdoruesDataForm.controls).forEach(key => {
                    this.perdoruesDataForm.controls[key].disable();
                    this.perdoruesDataForm.controls[key].setValue(res[key]);
                });
            }, (err) => {
                
            }, () => {
            })
        )
    }
}
