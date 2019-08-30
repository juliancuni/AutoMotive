import { Injectable } from '@angular/core';
import { MsToasterService } from '../mstoaster.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrHanlderService {
    public onlineFlag = navigator.onLine;

    constructor(
        private _toasterService: MsToasterService
    ) { }

    public handleErr(err: any) {
        if (!window.navigator.onLine) {
            err.statusText = "Internet down";
        }
        this._toasterService.toastErr(err);
    }
}
