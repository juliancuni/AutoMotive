import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FileUploader } from 'ng2-file-upload';
import { Ndermarrje, NdermarrjeApi } from 'src/app/shared/sdk';
import { SettingsService } from 'src/app/core/settings/settings.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

const URL = 'http://localhost:4000/api/files/upload?ndermarrjeId=true';

@Component({
    selector: 'app-ndermarrje',
    templateUrl: './ndermarrje.component.html',
    styleUrls: ['./ndermarrje.component.scss']
})
export class NdermarrjeComponent implements OnInit {

    public ndermarrjeDataForm: FormGroup;
    public ndermarrje: Ndermarrje
    public loading: boolean = false;
    public uploader = new FileUploader({ url: URL, allowedMimeType: ['image/png', 'image/svg+xml', 'image/jpeg'] });
    private subscriptions: Subscription[] = new Array<Subscription>();

    private editlogo: boolean = false;

    constructor(
        private _ndermarrje: NdermarrjeApi,
        private _notificationService: NotificationsService,
        private _fb: FormBuilder,
        private settings: SettingsService
    ) { }

    enableEdit(field: string): void {
        this["edit" + field] ? this["edit" + field] = false : this["edit" + field] = true;
        this["edit" + field] ? this.ndermarrjeDataForm.get(field).enable() : this.ndermarrjeDataForm.get(field).disable();
        this.ndermarrjeDataForm.get(field).reset(this.ndermarrje[field]);
    }

    saveField(field: string, value: string) {
        let reqErr: boolean = this.ndermarrjeDataForm.controls[field].hasError('required');
        if (reqErr) {
            this.loading = false;
        } else {
            this.loading = true
            //Clone Ndermarrje Obj
            let updatedndermarrje: Ndermarrje = { ...this.ndermarrje };
            updatedndermarrje[field] = value;
            if (this.ndermarrje[field] === value) {
                this.loading = false;
                this.enableEdit(field);
            } else {
                this._ndermarrje.upsertPatch(updatedndermarrje).subscribe((res: Ndermarrje) => {
                    this.ndermarrje = res;
                    this._notificationService.ndermarrjeDataChanged(this.ndermarrje);
                }, (err) => {
                    this.loading = false;
                }, () => {
                    this.enableEdit(field);
                    this.loading = false;
                    localStorage.setItem("NdermarrjeData", JSON.stringify(this.ndermarrje));
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
            } else {
                this.loading = false;
                this.editlogo = false;
                this.ndermarrje.logo = response;
                this._notificationService.ndermarrjeDataChanged(this.ndermarrje);
            }
        }
    }

    ngOnInit() {
        this.ndermarrjeDataForm = this._fb.group({
            'emer': [null, Validators.required],
            'slogan': [null, null],
            'domain': [null, Validators.required],
            'adresa': [null, null],
            'telefon': [null, null],
            'email': [null, null],
            'nius': [null, null],
        });

        this.subscriptions.push(
            this._ndermarrje.findOne().subscribe((res: Ndermarrje) => {
                this.ndermarrje = res;

            }, (err) => {

                if (err.statusCode == 500 || err == "Server error") {
                }
            }, () => {
                this.ndermarrjeDataForm.get('emer').disable();
                this.ndermarrjeDataForm.get('slogan').disable();
                this.ndermarrjeDataForm.get('domain').disable();
                this.ndermarrjeDataForm.get('adresa').disable();
                this.ndermarrjeDataForm.get('telefon').disable();
                this.ndermarrjeDataForm.get('email').disable();
                this.ndermarrjeDataForm.get('nius').disable();
                this.ndermarrjeDataForm.get('emer').setValue(this.ndermarrje.emer);
                this.ndermarrjeDataForm.get('slogan').setValue(this.ndermarrje.slogan)
                this.ndermarrjeDataForm.get('domain').setValue(this.ndermarrje.domain)
                this.ndermarrjeDataForm.get('adresa').setValue(this.ndermarrje.adresa)
                this.ndermarrjeDataForm.get('telefon').setValue(this.ndermarrje.telefon)
                this.ndermarrjeDataForm.get('email').setValue(this.ndermarrje.email)
                this.ndermarrjeDataForm.get('nius').setValue(this.ndermarrje.nius)
            })
        )
    }
}
