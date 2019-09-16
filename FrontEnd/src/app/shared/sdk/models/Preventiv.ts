/* tslint:disable */
import {
  Klient,
  Mjeti,
  Diagnoza,
  UrdherDiagnoze
} from '../index';

declare var Object: any;
export interface PreventivInterface {
  "klienti"?: string;
  "perfaqesuesi"?: string;
  "sasia"?: number;
  "parashikimDorezimi"?: Date;
  "cmimi"?: number;
  "vlera"?: number;
  "ulje"?: number;
  "krijuar"?: Date;
  "modifikuar"?: Date;
  "sherbimet"?: Array<any>;
  "pjeset"?: Array<any>;
  "id"?: any;
  "klientId"?: any;
  "mjetiId"?: any;
  "urdherDiagnozeId"?: any;
  "liberMjetiId"?: any;
  klient?: Klient;
  mjeti?: Mjeti;
  diagnozat?: Diagnoza[];
  urdherDiagnoze?: UrdherDiagnoze;
}

export class Preventiv implements PreventivInterface {
  "klienti": string;
  "perfaqesuesi": string;
  "sasia": number;
  "parashikimDorezimi": Date;
  "cmimi": number;
  "vlera": number;
  "ulje": number;
  "krijuar": Date;
  "modifikuar": Date;
  "sherbimet": Array<any>;
  "pjeset": Array<any>;
  "id": any;
  "klientId": any;
  "mjetiId": any;
  "urdherDiagnozeId": any;
  "liberMjetiId": any;
  klient: Klient;
  mjeti: Mjeti;
  diagnozat: Diagnoza[];
  urdherDiagnoze: UrdherDiagnoze;
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
        "sasia": {
          name: 'sasia',
          type: 'number'
        },
        "parashikimDorezimi": {
          name: 'parashikimDorezimi',
          type: 'Date'
        },
        "cmimi": {
          name: 'cmimi',
          type: 'number'
        },
        "vlera": {
          name: 'vlera',
          type: 'number'
        },
        "ulje": {
          name: 'ulje',
          type: 'number'
        },
        "krijuar": {
          name: 'krijuar',
          type: 'Date'
        },
        "modifikuar": {
          name: 'modifikuar',
          type: 'Date'
        },
        "sherbimet": {
          name: 'sherbimet',
          type: 'Array&lt;any&gt;'
        },
        "pjeset": {
          name: 'pjeset',
          type: 'Array&lt;any&gt;'
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
        "urdherDiagnozeId": {
          name: 'urdherDiagnozeId',
          type: 'any'
        },
        "liberMjetiId": {
          name: 'liberMjetiId',
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
        urdherDiagnoze: {
          name: 'urdherDiagnoze',
          type: 'UrdherDiagnoze',
          model: 'UrdherDiagnoze',
          relationType: 'belongsTo',
                  keyFrom: 'urdherDiagnozeId',
          keyTo: 'id'
        },
      }
    }
  }
}
