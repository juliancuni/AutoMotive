import './vendor.ts';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LoopBackConfig } from './app/shared/sdk';

if (environment.production) {
    enableProdMode();
    LoopBackConfig.setSecureWebSockets();
    LoopBackConfig.setBaseURL(environment["apiUrl"]);
} else {
    LoopBackConfig.setBaseURL("//localhost:3000");
}

let p = platformBrowserDynamic().bootstrapModule(AppModule);
p.then(() => { (<any>window).appBootstrap && (<any>window).appBootstrap(); })
// .catch(err => console.error(err));
