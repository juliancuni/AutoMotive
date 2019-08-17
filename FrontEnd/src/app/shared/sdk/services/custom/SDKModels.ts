/* tslint:disable */
import { Injectable } from '@angular/core';
import { ACL } from '../../models/ACL';
import { Role } from '../../models/Role';
import { Email } from '../../models/Email';
import { AmUser } from '../../models/AmUser';
import { Org } from '../../models/Org';
import { Client } from '../../models/Client';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    ACL: ACL,
    Role: Role,
    Email: Email,
    AmUser: AmUser,
    Org: Org,
    Client: Client,
    
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
