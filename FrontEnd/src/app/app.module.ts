import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeAl from '@angular/common/locales/sq';
registerLocaleData(localeAl, 'al');
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';

import { SDKBrowserModule } from './shared/sdk/index';
import { AuthModule } from './auth/auth.module';
import { MsToasterService } from './shared/services/mstoaster.service';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ErrHanlderService } from './shared/services/httpInterceptor/err-hanlder.service';
import { HttpInterceptorService } from './shared/services/httpInterceptor/http-interceptor.service';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule,
        AuthModule,
        LoadingBarRouterModule,
        SDKBrowserModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        ToasterService,
        MsToasterService,
        { provide: LOCALE_ID, useValue: 'al' },
        ErrHanlderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
