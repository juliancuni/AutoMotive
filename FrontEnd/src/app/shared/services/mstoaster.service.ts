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
        console.log(err);
        let type = "error";
        let title = err.status + ": " + err.name;
        let body = err["error"].error ? err["error"].error.message : err.message;
        // status: 401
        // statusText: "Unauthorized"
        if (err.status === 401) {
            if (err.error.error.code === "PERDORUES_NUK_EGZISTON" || err.error.error.code === "FJALEKALIMI_GABIM") {
                title = err.status.toString();
                body = err.error.error.message;
            } else {
                title = err.status + ": " + err.statusText;
                body = "Nuk keni autorizim \n " + err.url;
            }
        }
        this.toastConfigData.next({ type: type, title: title, body: body });
    }

} 