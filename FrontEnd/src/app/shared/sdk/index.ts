/* tslint:disable */
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root 
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { SocketBrowser } from './sockets/socket.browser';
import { SocketDriver } from './sockets/socket.driver';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { ACLApi } from './services/custom/ACL';
import { RoleMappingApi } from './services/custom/RoleMapping';
import { RoleApi } from './services/custom/Role';
import { EmailApi } from './services/custom/Email';
import { PerdoruesApi } from './services/custom/Perdorues';
import { NdermarrjeApi } from './services/custom/Ndermarrje';
import { KlientApi } from './services/custom/Klient';
import { MenuApi } from './services/custom/Menu';
import { KategoriMjeteshApi } from './services/custom/KategoriMjetesh';
import { MjetiApi } from './services/custom/Mjeti';
import { PerfaqesuesApi } from './services/custom/Perfaqesues';
import { UrdherDiagnozeApi } from './services/custom/UrdherDiagnoze';
import { KategoriSherbimeshApi } from './services/custom/KategoriSherbimesh';
import { DiagnozaApi } from './services/custom/Diagnoza';
import { PjeseKembimiApi } from './services/custom/PjeseKembimi';
import { UrdherPuneApi } from './services/custom/UrdherPune';
import { PreventivApi } from './services/custom/Preventiv';
import { LiberMjetiApi } from './services/custom/LiberMjeti';
import { KlientFinancaApi } from './services/custom/KlientFinanca';
import { KategoriKontrolleshApi } from './services/custom/KategoriKontrollesh';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler,
    SocketConnection
  ]
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        SDKModels,
        RealTime,
        ACLApi,
        RoleMappingApi,
        RoleApi,
        EmailApi,
        PerdoruesApi,
        NdermarrjeApi,
        KlientApi,
        MenuApi,
        KategoriMjeteshApi,
        MjetiApi,
        PerfaqesuesApi,
        UrdherDiagnozeApi,
        KategoriSherbimeshApi,
        DiagnozaApi,
        PjeseKembimiApi,
        UrdherPuneApi,
        PreventivApi,
        LiberMjetiApi,
        KlientFinancaApi,
        KategoriKontrolleshApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser },
        { provide: SocketDriver, useClass: SocketBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';

