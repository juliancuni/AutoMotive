import { Component, OnInit } from '@angular/core';
import { SDKModels, RoleApi, Role, ACL, ACLApi, RoleMappingApi, RoleMapping, PerdoruesApi, Perdorues } from 'src/app/shared/sdk';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MsToasterService } from 'src/app/shared/services/mstoaster.service';
import { ToastModel } from 'src/app/shared/msInterfaces/interfaces';

const swal = require('sweetalert');

@Component({
    selector: 'app-acl',
    templateUrl: './acl.component.html',
    styleUrls: ['./acl.component.scss']
})
export class AclComponent implements OnInit {

    private appModels = [];
    private rolet: Role[];
    private acls: ACL[];
    private aclNewEdit: ACL;
    private roleMapping: RoleMapping[];
    private perdoruesit: Perdorues[];
    private roletTabele = [];

    private loading: boolean = false;
    private showPerdorues: boolean = false;
    private showRole: boolean = false;
    // private editACL: boolean = false;
    private aclsPerUpload: ACL[] = [];
    private toast: ToastModel;

    private roletDataForm: FormGroup;
    private aclSpecifikeDataForm: FormGroup;

    constructor(
        private _appModels: SDKModels,
        private _rolet: RoleApi,
        private _acls: ACLApi,
        private _roleMappings: RoleMappingApi,
        private _perdorues: PerdoruesApi,
        private _fb: FormBuilder,
        private _msToasterService: MsToasterService,
    ) { }

    onRoleChange($event, accessType, acl: ACL) {
        this.loading = true;
        acl.accessType = accessType
        if ($event.target.checked) {
            acl.permission = 'ALLOW'
            acl.accessType = accessType;
            acl.permission = "ALLOW";
            if (acl.id) {
                delete acl.id;
            }
            this._acls.upsert(acl).subscribe((res: ACL) => {
                this.mbushMatricen();
            })
        } else {
            acl.permission = 'DENY'

            this._acls.deleteById(acl.id).subscribe((res) => {
                this.mbushMatricen();
            })
        }
    }

    newRole($ev, newRole: any) {
        $ev.preventDefault();
        for (let c in this.roletDataForm.controls) {
            this.roletDataForm.controls[c].markAsTouched();
        }
        if (this.roletDataForm.valid) {
            this._rolet.create(newRole).subscribe((res) => {
                this.mbushMatricen();
            })
        }
    }

    fshiRole(role) {
        swal({
            title: 'Jeni i sigurtë',
            text: "Roli " + role.name + ' dhe të gjitha të drejtat e tij do fshihen.',
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
                    text: 'Po, Fshije!',
                    value: true,
                    visible: true,
                    className: "bg-danger",
                    closeModal: false
                }
            }
        }).then((isConfirm) => {
            if (isConfirm) {
                this._acls.find({ where: { principalId: role.name } }).subscribe((res: ACL[]) => {
                    res.forEach((acl) => {
                        this._acls.deleteById(acl.id).subscribe((res) => {

                        }, (err) => {
                            this.toast = { type: "error", title: "API ERR", body: err.message };
                            this._msToasterService.toastData(this.toast);
                        })
                    })
                }, (err) => {
                    this.toast = { type: "error", title: "API ERR", body: err.message };
                    this._msToasterService.toastData(this.toast);
                }, () => {
                    this._roleMappings.findOne({ where: { roleId: role.id } }).subscribe((res: RoleMapping) => {
                        this._roleMappings.deleteById(res.id).subscribe((res) => {

                        }, (err) => {
                            console.log(err)
                            this.toast = { type: "error", title: "API ERR", body: err.message };
                            this._msToasterService.toastData(this.toast);
                        })
                    })
                    this._rolet.deleteById(role.id).subscribe((res: Role) => {

                    }, (err) => {
                        this.toast = { type: "error", title: "API ERR", body: err.message };
                        this._msToasterService.toastData(this.toast);
                        swal('Error', 'Kerkesa nuk u zbatua.', 'error');
                    }, () => {
                        this.mbushMatricen();
                        swal('Ok!', 'Roli dhe të gjitha të drejtat u fshinë.', 'success');
                    })
                })
            }
        })
    }

    ngOnInit() {
        this._perdorues.find({ where: { username: { neq: 'root' } } }).subscribe((res: Perdorues[]) => {
            this.perdoruesit = res;
        }, (err) => {
            this.toast = { type: "error", title: "API ERR", body: err.message };
            this._msToasterService.toastData(this.toast);
        })
        this.mbushMatricen();
        this.roletDataForm = this._fb.group({
            "name": [null, Validators.required],
            "description": [null, null]
        })
        this.aclSpecifikeDataForm = this._fb.group({
            // "perdorues": [null, null],
            // "id": [null, null],
            "model": [null, Validators.required],
            "property": [null, Validators.required],
            "accessType": [null, Validators.required],
            "permission": [null, Validators.required],
            "principalId": [null, Validators.required],
            "principalType": [null, Validators.required],
        });
    }

    ndryshoBasuarNe(value) {


        if (value.target.value === "roleRadio") {
            // this._acls.find({ where: { and: [{ principalType: "ROLE" }, { principalId: { neq: "root" } }] } }).subscribe((res: ACL[]) => {
            // this.acls = res;
            this.showRole = true
            this.showPerdorues = false
            // })
        }
        if (value.target.value === "perdouruesRadio") {
            // this._acls.find({ where: { principalType: "USER" } }).subscribe((res: ACL[]) => {
            // this.acls = res;
            this.showRole = false
            this.showPerdorues = true
            // })
        }
    }

    clearACLUpserForm() {
        this.aclNewEdit = new ACL();
        this.aclSpecifikeDataForm.reset();
        // this.editACL = false;
    }

    zgjidhACLNgaLista(acl) {
        if (this.aclNewEdit !== acl) {
            if (acl.principalType === "ROLE") {
                this.showPerdorues = false;
                this.showRole = true;
            } else if (acl.principalType === "USER") {
                this.showPerdorues = true;
                this.showRole = false;
            }

            this.aclNewEdit = acl;
            // this.editACL = true;
            // this.aclSpecifikeDataForm.controls.id.setValue(acl.id);
            this.aclSpecifikeDataForm.controls.model.setValue(acl.model);
            this.aclSpecifikeDataForm.controls.property.setValue(acl.property);
            this.aclSpecifikeDataForm.controls.accessType.setValue(acl.accessType);
            this.aclSpecifikeDataForm.controls.permission.setValue(acl.permission);
            this.aclSpecifikeDataForm.controls.principalType.setValue(acl.principalType);
            this.aclSpecifikeDataForm.controls.principalId.setValue(acl.principalId);
        }
    }

    upsertACL($ev, formValue) {
        $ev.preventDefault();
        for (let c in this.aclSpecifikeDataForm.controls) {
            this.aclSpecifikeDataForm.controls[c].markAsTouched();
        }
        if (this.aclSpecifikeDataForm.valid) {
            this._acls.upsertPatch(formValue).subscribe((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            }, () => {
                this.aclSpecifikeDataForm.reset();
                this.mbushMatricen();
            })
        }
    }

    fshiACL(acl) {
        this._acls.deleteById(acl.id).subscribe((res) => {
            console.log(res)
        }, (err) => {
            console.log(err);
        }, () => {
            this.mbushMatricen();
        })
    }

    mbushMatricen() {
        this.loading = true;
        let appModels = [];
        this._appModels.getModelNames().forEach((model) => {
            (model !== "RoleMapping" && model !== "Email") ? appModels.push(model) : null;
        }, (err) => {
            this.loading = false;
            this.toast = { type: "error", title: "API ERR", body: err.message };
            this._msToasterService.toastData(this.toast);
        })
        this.appModels = appModels;
        this._rolet.find({ where: { name: { neq: "root" } } }).subscribe((res: any[]) => {
            let everyOne = { name: "$everyone" };
            let authenticated = { name: "$authenticated" };
            let unAuthenticated = { name: "$unauthenticated" };
            let owner = { name: "$owner" };
            res.push(everyOne, authenticated, unAuthenticated, owner)
            this.rolet = res;
            this.roletTabele = [...res];
            this.roletTabele.forEach((role) => {
                role["acls"] = []
                this.appModels.forEach((appModel) => {
                    role["acls"].push({
                        model: appModel,
                        property: '*',
                        accessType: '*',
                        permission: 'DENY',
                        principalType: 'ROLE',
                        principalId: role.name
                    })
                })

            })
        }, (err) => {
            this.loading = false;
            this.toast = { type: "error", title: "API ERR", body: err.message };
            this._msToasterService.toastData(this.toast);
        }, () => {
            this._acls.find({ where: { principalId: { neq: "root" } } }).subscribe((res: ACL[]) => {
                this.acls = res;
                this.roletTabele.forEach((role) => {
                    this.acls.forEach((acl) => {
                        role.acls.forEach((roleAcl) => {
                            if (role.name === acl.principalId && acl.model === roleAcl.model) {
                                roleAcl.id = acl.id;
                                roleAcl.accessType = acl.accessType;
                                roleAcl.permission = acl.permission;
                                roleAcl.principalType = acl.principalType;
                            }
                        })
                    })
                })
            }, (err) => {
                this.loading = false;
                this.toast = { type: "error", title: "API ERR", body: err.message };
                this._msToasterService.toastData(this.toast);
            }, () => {
                this.loading = false;
            });
        });
    }
}
