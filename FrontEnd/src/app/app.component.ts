import { Component, HostBinding, OnInit } from '@angular/core';

import { SettingsService } from './core/settings/settings.service';

import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { MsToasterService } from './shared/services/mstoaster.service';
import { ToastModel } from './shared/msInterfaces/interfaces';
import { LoopBackConfig } from './shared/sdk/lb.config';
import { environment } from '../environments/environment'
import { ThemesService } from './core/themes/themes.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    // TOASTER
    toaster: ToastModel;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });


    @HostBinding('class.layout-fixed') get isFixed() { return this.settings.getLayoutSetting('isFixed'); };
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.getLayoutSetting('isCollapsed'); };
    @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.getLayoutSetting('isBoxed'); };
    @HostBinding('class.layout-fs') get useFullLayout() { return this.settings.getLayoutSetting('useFullLayout'); };
    @HostBinding('class.hidden-footer') get hiddenFooter() { return this.settings.getLayoutSetting('hiddenFooter'); };
    @HostBinding('class.layout-h') get horizontal() { return this.settings.getLayoutSetting('horizontal'); };
    @HostBinding('class.aside-float') get isFloat() { return this.settings.getLayoutSetting('isFloat'); };
    @HostBinding('class.offsidebar-open') get offsidebarOpen() { return this.settings.getLayoutSetting('offsidebarOpen'); };
    @HostBinding('class.aside-toggled') get asideToggled() { return this.settings.getLayoutSetting('asideToggled'); };
    @HostBinding('class.aside-collapsed-text') get isCollapsedText() { return this.settings.getLayoutSetting('isCollapsedText'); };

    constructor(
        public settings: SettingsService,
        public _toasterService: ToasterService,
        public _msToasterService: MsToasterService,
        public _themesService: ThemesService,
    ) { }

    ngOnInit() {
        // prevent empty links to reload the page
        this._themesService.setTheme('A');
        LoopBackConfig.setBaseURL(environment.API_BASE_PATH);
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' && ['', '#'].indexOf(target.getAttribute('href')) > -1)
                e.preventDefault();
        });
        this._msToasterService.cast.subscribe((toastRemote: ToastModel) => {
            if (toastRemote != null) {
                this.toaster = toastRemote;
                this.pop(toastRemote);
            }
        });
    }

    // TOSATER METHOD
    pop(toastRemote: ToastModel) {
        this._toasterService.pop(toastRemote);
    };
}
