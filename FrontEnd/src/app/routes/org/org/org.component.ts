import { Component, OnInit } from '@angular/core';
import { ToastModel } from 'src/app/shared/msInterfaces/interfaces';
import { MsToasterService } from 'src/app/shared/services/mstoaster.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FileUploader } from 'ng2-file-upload';
import { Org, OrgApi } from 'src/app/shared/sdk';
import { SettingsService } from 'src/app/core/settings/settings.service';

const URL = 'http://localhost:4000/api/files/upload?orgId=true';

@Component({
    selector: 'app-org',
    templateUrl: './org.component.html',
    styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {

    private orgDataForm: FormGroup;
    private org: Org;
    private loading: boolean = false;
    private toast: ToastModel;
    public uploader = new FileUploader({ url: URL, allowedMimeType: ['image/png', 'image/svg+xml', 'image/jpeg'] });
    private subscriptions: Subscription[] = new Array<Subscription>();

    private editlogo: boolean = false;

    constructor(
        private _org: OrgApi,
        private _msToasterService: MsToasterService,
        private _fb: FormBuilder,
        private settings: SettingsService
    ) { }

    enableEdit(field: string): void {
        this["edit" + field] ? this["edit" + field] = false : this["edit" + field] = true;
        this["edit" + field] ? this.orgDataForm.get(field).enable() : this.orgDataForm.get(field).disable();
        this.orgDataForm.get(field).reset(this.org[field]);
    }

    saveField(field: string, value: string) {
        let reqErr: boolean = this.orgDataForm.controls[field].hasError('required');
        if (reqErr) {
            this.loading = false;
        } else {
            this.loading = true
            //Clone Org Obj
            let updatedOrg: Org = { ...this.org };
            updatedOrg[field] = value;
            if (this.org[field] === value) {
                this.loading = false;
                this.enableEdit(field);
            } else {
                this._org.upsertPatch(updatedOrg).subscribe((res: Org) => {
                    this.org = res;
                    this.toast = { type: "success", title: "Përditësim", body: field + " u përditësua" };
                    this._msToasterService.toastData(this.toast);
                }, (err) => {
                    if (typeof err.details.codes !== 'undefined' && err.details.codes.orgname[0] === "uniqueness") {
                        this.orgDataForm.get(field).setErrors({ orgNotUnique: true })
                    } else if (err.statusCode == 500 || err == "Server error") {
                        this.toast = { type: "error", title: "API ERR", body: err.message ? err.message : "Server Down" };
                        this._msToasterService.toastData(this.toast);
                    }
                    this.loading = false;
                }, () => {
                    this.enableEdit(field);
                    this.loading = false;
                    localStorage.setItem("OrgData", JSON.stringify(this.org));
                })
            }
        }
    }

    ndryshoLogo(): void {
        this.editlogo = true;
        this.loading = true;
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item, response: any, status, header) => {
            if (status === 0) {
                this.loading = false;
                this.editlogo = false;
                this.toast = { type: "error", title: "Upload Deshtoi", body: "Nuk mund të bëj dot upload në server" };
            } else {
                this.loading = false;
                this.editlogo = false;
                this.org.logo = response;
                this.toast = { type: "success", title: "Upload Logo", body: "Logo u përditësua" };
            }
            this._msToasterService.toastData(this.toast);
        }
    }

    ngOnInit() {
        this.orgDataForm = this._fb.group({
            'orgname': [null, Validators.required],
            'slogan': [null, null],
            'domain': [null, Validators.required],
            'adresa': [null, null],
            'telefon': [null, null],
            'email': [null, null],
            'nius': [null, null],
        });

        this.subscriptions.push(
            this._org.findOne().subscribe((res: Org) => {
                this.org = res;

            }, (err) => {

                if (err.statusCode == 500 || err == "Server error") {
                    this.toast = { type: "error", title: "API ERR", body: err.message ? err.message : "Server Down" };
                }
                this._msToasterService.toastData(this.toast);
            }, () => {
                this.orgDataForm.get('orgname').disable();
                this.orgDataForm.get('slogan').disable();
                this.orgDataForm.get('domain').disable();
                this.orgDataForm.get('adresa').disable();
                this.orgDataForm.get('telefon').disable();
                this.orgDataForm.get('email').disable();
                this.orgDataForm.get('nius').disable();
                this.orgDataForm.get('orgname').setValue(this.org.orgname);
                this.orgDataForm.get('slogan').setValue(this.org.slogan)
                this.orgDataForm.get('domain').setValue(this.org.domain)
                this.orgDataForm.get('adresa').setValue(this.org.adresa)
                this.orgDataForm.get('telefon').setValue(this.org.telefon)
                this.orgDataForm.get('email').setValue(this.org.email)
                this.orgDataForm.get('nius').setValue(this.org.nius)
            })
        )
    }
}
