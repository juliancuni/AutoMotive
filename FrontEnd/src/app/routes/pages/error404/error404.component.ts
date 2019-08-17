import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { OrgApi, Org } from 'src/app/shared/sdk';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {
  private org: Org;
  constructor(
    public settings: SettingsService,
    private _org: OrgApi) { }

  ngOnInit() {
    let userlocalStorage = localStorage.getItem("OrgData");
    if (userlocalStorage) {
        this.org = JSON.parse(userlocalStorage);
    } else {
        this._org.findOne({ where: { domain: { like: window.location.hostname } } }).subscribe((res: Org) => {
            this.org = res;
        }, (err) => {
            console.log(err);
        }, () => {
            localStorage.setItem("OrgData", JSON.stringify(this.org))
        })
    }
  }

}
