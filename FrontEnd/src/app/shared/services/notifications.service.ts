import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ndermarrje, Perdorues } from '../sdk';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private ndermarrjeData = new Subject<Ndermarrje>();
  private perdoruesData = new Subject<Perdorues>();

  public castNdermarrje = this.ndermarrjeData.asObservable();
  public castPerdorues = this.perdoruesData.asObservable();

  constructor() { }

  ndermarrjeDataChanged(ndermarrjeChanged: Ndermarrje) {
    this.ndermarrjeData.next(ndermarrjeChanged);
  }

  perdoruesDataChanged(perdoruesChanged: Perdorues) {
    this.perdoruesData.next(perdoruesChanged);
  }
}
