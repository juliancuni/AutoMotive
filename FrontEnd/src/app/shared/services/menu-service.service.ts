import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Menu, MenuApi } from '../sdk';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuData = new Subject<Menu[]>();
  cast = this.menuData.asObservable()

  constructor(
    private _menu: MenuApi
  ) { }

  rreshtoMenu() {
    this._menu.find().subscribe((res: Menu[]) => {
      this.menuData.next(res);
    })
  }
}
