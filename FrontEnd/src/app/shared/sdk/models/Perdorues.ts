/* tslint:disable */
import {
  Role
} from '../index';

declare var Object: any;
export interface PerdoruesInterface {
  "emer": string;
  "mbiemer": string;
  "email": string;
  "telefon"?: string;
  "datelindja"?: Date;
  "avatar"?: string;
  "enabled": boolean;
  "adresa"?: string;
  "realm"?: string;
  "username"?: string;
  "emailVerified"?: boolean;
  "id"?: any;
  "password"?: string;
  accessTokens?: any[];
  rolet?: Role[];
}

export class Perdorues implements PerdoruesInterface {
  "emer": string;
  "mbiemer": string;
  "email": string;
  "telefon": string;
  "datelindja": Date;
  "avatar": string;
  "enabled": boolean;
  "adresa": string;
  "realm": string;
  "username": string;
  "emailVerified": boolean;
  "id": any;
  "password": string;
  accessTokens: any[];
  rolet: Role[];
  constructor(data?: PerdoruesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Perdorues`.
   */
  public static getModelName() {
    return "Perdorues";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Perdorues for dynamic purposes.
  **/
  public static factory(data: PerdoruesInterface): Perdorues{
    return new Perdorues(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Perdorues',
      plural: 'Perdoruesit',
      path: 'Perdoruesit',
      idName: 'id',
      properties: {
        "emer": {
          name: 'emer',
          type: 'string'
        },
        "mbiemer": {
          name: 'mbiemer',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "telefon": {
          name: 'telefon',
          type: 'string'
        },
        "datelindja": {
          name: 'datelindja',
          type: 'Date'
        },
        "avatar": {
          name: 'avatar',
          type: 'string'
        },
        "enabled": {
          name: 'enabled',
          type: 'boolean',
          default: true
        },
        "adresa": {
          name: 'adresa',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        rolet: {
          name: 'rolet',
          type: 'Role[]',
          model: 'Role',
          relationType: 'hasMany',
          modelThrough: 'RoleMapping',
          keyThrough: 'roleId',
          keyFrom: 'id',
          keyTo: 'principalId'
        },
      }
    }
  }
}
