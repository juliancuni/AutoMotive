/* tslint:disable */
import {
  Klient,
  Mjeti,
  Diagnoza
} from '../index';

declare var Object: any;
export interface PreventivInterface {
  "klienti"?: string;
  "perfaqesuesi"?: string;
  "sherbimi"?: string;
  "sasia"?: string;
  "parashikimDorezimi"?: Date;
  "cmimi"?: string;
  "vlera"?: string;
  "krijuar"?: Date;
  "modifikuar"?: Date;
  "id"?: any;
  "klientId"?: any;
  "mjetiId"?: any;
  klient?: Klient;
  mjeti?: Mjeti;
  diagnozat?: Diagnoza[];
}

export class Preventiv implements PreventivInterface {
  "klienti": string;
  "perfaqesuesi": string;
  "sherbimi": string;
  "sasia": string;
  "parashikimDorezimi": Date;
  "cmimi": string;
  "vlera": string;
  "krijuar": Date;
  "modifikuar": Date;
  "id": any;
  "klientId": any;
  "mjetiId": any;
  klient: Klient;
  mjeti: Mjeti;
  diagnozat: Diagnoza[];
  constructor(data?: PreventivInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Preventiv`.
   */
  public static getModelName() {
    return "Preventiv";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Preventiv for dynamic purposes.
  **/
  public static factory(data: PreventivInterface): Preventiv{
    return new Preventiv(data);
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
      name: 'Preventiv',
      plural: 'Preventivet',
      path: 'Preventivet',
      idName: 'id',
      properties: {
        "klienti": {
          name: 'klienti',
          type: 'string'
        },
        "perfaqesuesi": {
          name: 'perfaqesuesi',
          type: 'string'
        },
        "sherbimi": {
          name: 'sherbimi',
          type: 'string'
        },
        "sasia": {
          name: 'sasia',
          type: 'string'
        },
        "parashikimDorezimi": {
          name: 'parashikimDorezimi',
          type: 'Date'
        },
        "cmimi": {
          name: 'cmimi',
          type: 'string'
        },
        "vlera": {
          name: 'vlera',
          type: 'string'
        },
        "krijuar": {
          name: 'krijuar',
          type: 'Date'
        },
        "modifikuar": {
          name: 'modifikuar',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "klientId": {
          name: 'klientId',
          type: 'any'
        },
        "mjetiId": {
          name: 'mjetiId',
          type: 'any'
        },
      },
      relations: {
        klient: {
          name: 'klient',
          type: 'Klient',
          model: 'Klient',
          relationType: 'belongsTo',
                  keyFrom: 'klientId',
          keyTo: 'id'
        },
        mjeti: {
          name: 'mjeti',
          type: 'Mjeti',
          model: 'Mjeti',
          relationType: 'belongsTo',
                  keyFrom: 'mjetiId',
          keyTo: 'id'
        },
        diagnozat: {
          name: 'diagnozat',
          type: 'Diagnoza[]',
          model: 'Diagnoza',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'preventivId'
        },
      }
    }
  }
}
