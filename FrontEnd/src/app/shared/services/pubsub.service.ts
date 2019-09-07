import { Injectable } from '@angular/core';
import { PerdoruesApi, RealTime } from '../sdk';

@Injectable({
    providedIn: 'root'
})
export class PubsubService {

    constructor(
        private _perdorues: PerdoruesApi,
        private _rt: RealTime

    ) { }

    public rtConnect(): void {
        if (this._perdorues.isAuthenticated() && !this._rt.connection.isConnected()) this._rt.onReady().subscribe();
    }

    public rtDisconnect(): void {
        if (this._rt.connection.isConnected()) this._rt.connection.disconnect();
    }

    public subscribe(channel: string): object {
        return {};
    }

    public publish(channel: string, msg: any): void {

    }
}
