import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import  { ToastModel } from '../msInterfaces/interfaces';
@Injectable()

export class MsToasterService {
    private toastConfigData = new Subject<ToastModel>();
    cast = this.toastConfigData.asObservable();

    constructor() { }

    toastData(newToast: ToastModel) {
        this.toastConfigData.next(newToast);
    }

} 