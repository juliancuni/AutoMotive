import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { NdermarrjeApi, Ndermarrje } from 'src/app/shared/sdk';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {
  private ndermarrje: Ndermarrje
  constructor(
    public settings: SettingsService,
    private _ndermarrje: NdermarrjeApi) { }

  ngOnInit() {
    let userlocalStorage = localStorage.getItem("NdermarrjeData");
    if (userlocalStorage) {
        this.ndermarrje = JSON.parse(userlocalStorage);
    } else {
        this._ndermarrje.findOne({ where: { domain: { like: window.location.hostname } } }).subscribe((res: Ndermarrje) => {
            this.ndermarrje = res;
        }, (err) => {
            console.log(err);
        }, () => {
            localStorage.setItem("NdermarrjeData", JSON.stringify(this.ndermarrje))
        })
    }
  }

}
