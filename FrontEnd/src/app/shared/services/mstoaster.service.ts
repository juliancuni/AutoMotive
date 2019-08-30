import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ToastModel } from '../msInterfaces/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()

export class MsToasterService {
    private toastConfigData = new Subject<ToastModel>();
    cast = this.toastConfigData.asObservable();

    constructor() { }

    toastData(newToast: ToastModel) {
        this.toastConfigData.next(newToast);
    }

    toastErr(err: HttpErrorResponse) {
        let type = "error";
        let title = err.status + ": " + err.statusText;
        let body = err["error"].error ? err["error"].error.message : err.statusText;
        this.toastConfigData.next({ type: type, title: title, body: body });
    }

} 