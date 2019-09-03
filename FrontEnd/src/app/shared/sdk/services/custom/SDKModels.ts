/* tslint:disable */
import { Injectable } from '@angular/core';
import { ACL } from '../../models/ACL';
import { RoleMapping } from '../../models/RoleMapping';
import { Role } from '../../models/Role';
import { Email } from '../../models/Email';
import { Perdorues } from '../../models/Perdorues';
import { Ndermarrje } from '../../models/Ndermarrje';
import { Klient } from '../../models/Klient';
import { Menu } from '../../models/Menu';
import { KategoriMjetesh } from '../../models/KategoriMjetesh';
import { Mjeti } from '../../models/Mjeti';
import { Perfaqesues } from '../../models/Perfaqesues';
import { UrdherDiagnoze } from '../../models/UrdherDiagnoze';
import { KategoriSherbimesh } from '../../models/KategoriSherbimesh';
import { Diagnoza } from '../../models/Diagnoza';
import { PjeseKembimi } from '../../models/PjeseKembimi';
import { UrdherPune } from '../../models/UrdherPune';
import { Preventiv } from '../../models/Preventiv';
import { LiberMjeti } from '../../models/LiberMjeti';
import { KlientFinanca } from '../../models/KlientFinanca';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    ACL: ACL,
    RoleMapping: RoleMapping,
    Role: Role,
    Email: Email,
    Perdorues: Perdorues,
    Ndermarrje: Ndermarrje,
    Klient: Klient,
    Menu: Menu,
    KategoriMjetesh: KategoriMjetesh,
    Mjeti: Mjeti,
    Perfaqesues: Perfaqesues,
    UrdherDiagnoze: UrdherDiagnoze,
    KategoriSherbimesh: KategoriSherbimesh,
    Diagnoza: Diagnoza,
    PjeseKembimi: PjeseKembimi,
    UrdherPune: UrdherPune,
    Preventiv: Preventiv,
    LiberMjeti: LiberMjeti,
    KlientFinanca: KlientFinanca,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
