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
