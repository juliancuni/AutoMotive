import { Component, OnInit } from '@angular/core';
import { SDKModels, RoleApi, Role, ACL, ACLApi } from 'src/app/shared/sdk';

@Component({
    selector: 'app-acl',
    templateUrl: './acl.component.html',
    styleUrls: ['./acl.component.scss']
})
export class AclComponent implements OnInit {

    private appModels = [];
    private rolet: Role[];
    private acls: ACL[];
    private roletTabele = [];
    private loading: boolean = false;
    private aclsPerUpload: ACL[] = [];

    constructor(
        private _appModels: SDKModels,
        private _rolet: RoleApi,
        private _acls: ACLApi,
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
    ngOnInit() {
        this.mbushMatricen();
    }

    mbushMatricen() {
        this.loading = true;
        let startTime = Date.now();
        console.log(startTime)
        let appModels = [];
        this._appModels.getModelNames().forEach((model) => {
            (model !== "RoleMapping" && model !== "Email") ? appModels.push(model) : null;
        })
        this.appModels = appModels;
        this._rolet.find().subscribe((res: Role[]) => {
            console.log("Kohezgjatja Roleve: " + (Date.now() - startTime))
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

        }, () => {
            this._acls.find().subscribe((res: ACL[]) => {
                console.log("Kohezgjatja ACL-ve: " + (Date.now() - startTime))

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

            }, () => {
                console.log("Kohezgjatja Total: " + (Date.now() - startTime))
                this.loading = false;
            });
        });
    }
}
