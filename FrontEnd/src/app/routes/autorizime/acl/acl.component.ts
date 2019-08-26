import { Component, OnInit } from '@angular/core';
import { SDKModels, RoleApi, Role } from 'src/app/shared/sdk';

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.scss']
})
export class AclComponent implements OnInit {
  
  private appModels = [];
  private rolet: Role[];

  constructor(
    private _appModels: SDKModels,
    private _rolet: RoleApi,
  ) { }

  ngOnInit() {
    let appModels = [];
    this._appModels.getModelNames().forEach((model) => {
      (model !== "RoleMapping" && model !== "Role" && model !== "Email") ? appModels.push(model) : null;
    })
    this.appModels = appModels;
    this._rolet.find().subscribe((res: Role[]) => {
      this.rolet = res;
    })
  }

}
