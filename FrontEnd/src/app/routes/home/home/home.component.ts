import { Component, OnInit } from '@angular/core';
import { Org } from 'src/app/shared/sdk';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    private org: Org;

    constructor() { }

    ngOnInit() {
        this.org = JSON.parse(localStorage.getItem("OrgData"));
    }

}
