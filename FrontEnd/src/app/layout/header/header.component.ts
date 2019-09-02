import { Component, OnInit, ViewChild, Input } from '@angular/core';
const screenfull = require('screenfull');

import { UserblockService } from '../sidebar/userblock/userblock.service';
import { SettingsService } from '../../core/settings/settings.service';

import { Router } from '@angular/router';
import {
    PerdoruesApi,
    // MenuApi,
    Ndermarrje,
    // Menu
} from 'src/app/shared/sdk';

// import { MenuService } from 'src/app/shared/services/menu-service.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    navCollapsed = true; // for horizontal layout
    menuItems = []; // for horizontal layout
    isNavSearchVisible: boolean;

    @Input() ndermarrje: Ndermarrje;
    @ViewChild('fsbutton', { static: true }) fsbutton;  // the fullscreen button

    constructor(
        // public _menuService: MenuService,
        // public _menu: MenuApi,
        public userblockService: UserblockService,
        public settings: SettingsService,
        private _perdorues: PerdoruesApi,
        private _router: Router,
    ) {
        // this._menuService.rreshtoMenu();
        // this._menuService.cast.subscribe((menu: Menu[]) => {
        //     this.menuItems = menu;
        // })
        // this.menuItems = this.menuItems.slice(0, 4); // for horizontal layout
    }

    ngOnInit() {
        this.ndermarrje = JSON.parse(localStorage.getItem("NdermarrjeData"));
        this.isNavSearchVisible = false;

        var ua = window.navigator.userAgent;
        if (ua.indexOf("MSIE ") > 0 || !!ua.match(/Trident.*rv\:11\./)) { // Not supported under IE
            this.fsbutton.nativeElement.style.display = 'none';
        }

        // Switch fullscreen icon indicator
        const el = this.fsbutton.nativeElement.firstElementChild;
        screenfull.on('change', () => {
            if (el)
                el.className = screenfull.isFullscreen ? 'fa fa-compress' : 'fa fa-expand';
        });
    }

    toggleUserBlock(event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    }

    openNavSearch(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    }

    setNavSearchVisible(stat: boolean) {
        // console.log(stat);
        this.isNavSearchVisible = stat;
    }

    getNavSearchVisible() {
        return this.isNavSearchVisible;
    }

    toggleOffsidebar() {
        this.settings.toggleLayoutSetting('offsidebarOpen');
    }

    toggleCollapsedSideabar() {
        this.settings.toggleLayoutSetting('isCollapsed');
    }

    isCollapsedText() {
        return this.settings.getLayoutSetting('isCollapsedText');
    }

    toggleFullScreen(event) {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    }

    logOut() {
        this.postLogOut();
    }
    postLogOut(): void {
        localStorage.removeItem("PerdoruesData");
        localStorage.removeItem("NdermarrjeData");
        this._perdorues.logout().subscribe();
        this._router.navigate(['/login']);
    }
}
