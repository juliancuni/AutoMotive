import { Component, OnInit } from '@angular/core';
import { Perdorues, PerdoruesApi, Role, RoleApi, RoleMappingApi } from 'src/app/shared/sdk';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Subscription } from 'rxjs/Subscription';
import { SettingsService } from 'src/app/core/settings/settings.service';
import { ActivatedRoute } from '@angular/router';

const swal = require('sweetalert');

@Component({
    selector: 'app-profile',
    templateUrl: './kartela-perdorues.component.html',
    styleUrls: ['./kartela-perdorues.component.scss']
})
export class KartelaPerdoruesComponent implements OnInit {

    public perdoruesDataForm: FormGroup;
    public perdorues: Perdorues;
    private roletOrigj: Role[];
    public roletTabele: Role[];
    private roletQeKa: Role[];

    public loading: boolean = false;

    private subscriptions: Subscription[] = new Array<Subscription>();

    bsValue = new Date();
    bsConfig = {
        containerClass: 'theme-blue',
        isAnimated: true,
        dateInputFormat: 'DD-MM-YYYY'
    }

    constructor(
        private _perdorues: PerdoruesApi,
        private _fb: FormBuilder,
        private _roleMapping: RoleMappingApi,
        private settings: SettingsService,
        private _route: ActivatedRoute,
        private _rolet: RoleApi,
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
                        })
                    }
                } else {
                    this._perdorues.upsertPatch(updatedPerdorues).subscribe((res: Perdorues) => {
                        this.perdorues = res;
                    })
                }
            }
        }
    }

    fshiFoto(): void {
        this._perdorues.upsertPatch(this.perdorues).subscribe((res: Perdorues) => {
            this.perdorues = res;
        })
    }

    resetPass() {
        swal({
            title: 'Reset Fjalëkalimin e ' + this.perdorues.emer + ' ' + this.perdorues.mbiemer,
            text: 'Instruksionet do i nisen këtij përdoruesi me e-mail.',
            icon: 'warning',
            buttons: {
                cancel: {
                    text: 'Jo!',
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true
                },
                confirm: {
                    text: 'Po, resetoje!',
                    value: true,
                    visible: true,
                    className: "bg-danger",
                    closeModal: false
                }
            }
        }).then((isConfirm) => {
            if (isConfirm) {
                this._perdorues.resetPassword({ email: this.perdorues.email }).subscribe((res) => {
                }, (err) => {
                    swal('Error', 'Kerkesa nuk u zbatua.', 'error');
                }, () => {
                    swal('Ok!', 'Fjalëkalimi u resetua me sukses.', 'success');
                })
            }
        });
    }

    fshiLlogarine() {

    }

    pezullo() {
        swal({
            title: 'Pezullo  ' + this.perdorues.emer + ' ' + this.perdorues.mbiemer,
            text: 'Pas kësaj ky pëdorues nuk ka më access në program.',
            icon: 'warning',
            buttons: {
                cancel: {
                    text: 'Jo!',
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true
                },
                confirm: {
                    text: 'Po, pezulloje!',
                    value: true,
                    visible: true,
                    className: "bg-danger",
                    closeModal: false
                }
            }
        }).then((isConfirm) => {
            if (isConfirm) {
                let perdorues = { ...this.perdorues };
                perdorues.enabled = false;
                this._perdorues.upsertPatch(perdorues).subscribe((res: Perdorues) => {
                    this.perdorues = res;
                }, (err) => {
                    swal('Error', 'Kerkesa nuk u zbatua.', 'error');
                }, () => {
                    swal('Ok!', 'Përdoruesi u pezullua me sukses.', 'success');
                })
            }
        });
        this._perdorues.deleteAccessTokens(this.perdorues.id).subscribe(() => { });
    }

    riaktivizo() {
        swal({
            title: 'Riaktivizo  ' + this.perdorues.emer + ' ' + this.perdorues.mbiemer,
            text: 'Doni ta riaktivizoni këtë përdorues?',
            icon: 'warning',
            buttons: {
                cancel: {
                    text: 'Jo!',
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true
                },
                confirm: {
                    text: 'Po, riaktivizoje!',
                    value: true,
                    visible: true,
                    className: "bg-danger",
                    closeModal: false
                }
            }
        }).then((isConfirm) => {
            if (isConfirm) {
                let perdorues = { ...this.perdorues };
                perdorues.enabled = true;
                this._perdorues.upsertPatch(perdorues).subscribe((res: Perdorues) => {
                    this.perdorues = res;
                }, (err) => {
                    swal('Error', 'Kerkesa nuk u zbatua.', 'error');
                }, () => {
                    swal('Ok!', 'Përdoruesi u riaktivizua me sukses.', 'success');
                })
            }
        });
    }

    onRoleChange($event, role) {
        if ($event) {
            this._roleMapping.create({
                principalType: "USER",
                principalId: this.perdorues.id,
                roleId: role.id
            }).subscribe((res) => {
            }, (err) => {
            })
        } else {
            this._roleMapping.findOne({ where: { and: [{ principalId: this.perdorues.id }, { roleId: role.id }] } }).subscribe((res) => {
                this._roleMapping.deleteById(res["id"]).subscribe((res) => {
                })
            })
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
            this._route.params.subscribe((params) => {
                this._perdorues.getRolet(params.id).subscribe((res: Role[]) => {
                    this.roletQeKa = res["Rolet"];
                    this._rolet.find().subscribe((res: Role[]) => {
                        this.roletOrigj = res;
                        let roletOrigj = [...this.roletOrigj];
                        let roletQeKa = [...this.roletQeKa];
                        roletOrigj.forEach((roleOrigj) => {
                            roleOrigj["eka"] = false;
                            roletQeKa.forEach((roleQeKa) => {
                                if (roleQeKa.id === roleOrigj.id) {
                                    roleOrigj["eka"] = true;
                                }
                            })
                        })
                        this.roletTabele = roletOrigj;
                    })
                })
                this._perdorues.findOne({ where: { id: params.id } }).subscribe((res: Perdorues) => {
                    this.perdorues = res;
                    Object.keys(this.perdoruesDataForm.controls).forEach(key => {
                        this.perdoruesDataForm.controls[key].disable();
                        this.perdoruesDataForm.controls[key].setValue(res[key]);
                    });
                })
            }),
        )
    }
}
