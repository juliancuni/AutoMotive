import { Component, OnInit } from '@angular/core';
import { SDKModels, RoleApi, Role, ACL, ACLApi, RoleMappingApi, RoleMapping, PerdoruesApi, Perdorues } from 'src/app/shared/sdk';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const swal = require('sweetalert');

@Component({
    selector: 'app-acl',
    templateUrl: './acl.component.html',
    styleUrls: ['./acl.component.scss']
})
export class AclComponent implements OnInit {

    public appModels = [];
    private rolet: Role[];
    public acls: ACL[];
    public aclNewEdit: ACL;
    private roleMapping: RoleMapping[];
    public perdoruesit: Perdorues[];
    public roletTabele = [];

    public loading: boolean = false;
    public showPerdorues: boolean = false;
    public showRole: boolean = false;
    // private editACL: boolean = false;
    private aclsPerUpload: ACL[] = [];

    public roletDataForm: FormGroup;
    public aclSpecifikeDataForm: FormGroup;

    constructor(
        private _appModels: SDKModels,
        private _rolet: RoleApi,
        private _acls: ACLApi,
        private _roleMappings: RoleMappingApi,
        private _perdorues: PerdoruesApi,
        private _fb: FormBuilder,
    ) { }

    onRoleChange($event, accessType, acl: ACL) {
        this.loading = true;
        acl.accessType = accessType
        if ($event.target.checked) {
            acl.permission = 'ALLOW'
            acl.accessType = accessType;
            acl.permission = "ALLOW";
            // if (acl.id) {
            //     delete acl.id;
            // }
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
                        this._acls.deleteById(acl.id).subscribe((res) => { })
                    })
                }, () => {
                    this._roleMappings.findOne({ where: { roleId: role.id } }).subscribe((res: RoleMapping) => {
                        this._roleMappings.deleteById(res.id).subscribe((res) => { })
                    })
                    this._rolet.deleteById(role.id).subscribe((res: Role) => { })
                })
            }
        })
    }

    ngOnInit() {
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
            this.aclSpecifikeDataForm.controls.principalType.setValue("ROLE");
            // })
        }
        if (value.target.value === "perdoruesRadio") {
            // this._acls.find({ where: { principalType: "USER" } }).subscribe((res: ACL[]) => {
            // this.acls = res;
            this.aclSpecifikeDataForm.controls.principalType.setValue("USER");
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
        console.log(acl);
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

    upsertACL($ev, formValue: ACL) {
        $ev.preventDefault();
        for (let c in this.aclSpecifikeDataForm.controls) {
            this.aclSpecifikeDataForm.controls[c].markAsTouched();
        }
        if (this.aclSpecifikeDataForm.valid) {
            formValue.id = this.aclNewEdit.id;
            // this._acls.upsert
            this._acls.upsert(formValue).subscribe((res: ACL) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            }, () => {
                this.aclSpecifikeDataForm.reset();
                this.mbushMatricen();
            })
        } else {
            console.log(formValue);
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
        })
        this.appModels = appModels;
        this._perdorues.find({ where: { username: { neq: 'root' } } }).subscribe((res: Perdorues[]) => {
            this.perdoruesit = res;
        }, (err) => {
            this.loading= false;
        }, () => {
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
                }, () => {
                    this.loading = false;
                });
            });
        })
        
    }
}
