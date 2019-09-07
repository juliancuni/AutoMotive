/* tslint:disable */
import {
  Mjeti,
  Perfaqesues,
  UrdherDiagnoze,
  UrdherPune,
  Preventiv,
  LiberMjeti
} from '../index';

declare var Object: any;
export interface KlientInterface {
  "emer": string;
  "mbiemer"?: string;
  "telefon"?: string;
  "person": string;
  "nius"?: string;
  "email"?: string;
  "adresa"?: string;
  "krijuar"?: Date;
  "modifikuar"?: Date;
  "id"?: any;
  mjetet?: Mjeti[];
  perfaqesues?: Perfaqesues[];
  urdheraDiagnoze?: UrdherDiagnoze[];
  urdheraPune?: UrdherPune[];
  preventiva?: Preventiv[];
  liberMjeti?: LiberMjeti[];
}

export class Klient implements KlientInterface {
  "emer": string;
  "mbiemer": string;
  "telefon": string;
  "person": string;
  "nius": string;
  "email": string;
  "adresa": string;
  "krijuar": Date;
  "modifikuar": Date;
  "id": any;
  mjetet: Mjeti[];
  perfaqesues: Perfaqesues[];
  urdheraDiagnoze: UrdherDiagnoze[];
  urdheraPune: UrdherPune[];
  preventiva: Preventiv[];
  liberMjeti: LiberMjeti[];
  constructor(data?: KlientInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Klient`.
   */
  public static getModelName() {
    return "Klient";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Klient for dynamic purposes.
  **/
  public static factory(data: KlientInterface): Klient{
    return new Klient(data);
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
      name: 'Klient',
      plural: 'Klientet',
      path: 'Klientet',
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
        "telefon": {
          name: 'telefon',
          type: 'string'
        },
        "person": {
          name: 'person',
          type: 'string'
        },
        "nius": {
          name: 'nius',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "adresa": {
          name: 'adresa',
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
      },
      relations: {
        mjetet: {
          name: 'mjetet',
          type: 'Mjeti[]',
          model: 'Mjeti',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'klientId'
        },
        perfaqesues: {
          name: 'perfaqesues',
          type: 'Perfaqesues[]',
          model: 'Perfaqesues',
          relationType: 'hasMany',
          modelThrough: 'KlientPerfaqesuesMapper',
          keyThrough: 'perfaqesuesId',
          keyFrom: 'id',
          keyTo: 'klientId'
        },
        urdheraDiagnoze: {
          name: 'urdheraDiagnoze',
          type: 'UrdherDiagnoze[]',
          model: 'UrdherDiagnoze',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'klientId'
        },
        urdheraPune: {
          name: 'urdheraPune',
          type: 'UrdherPune[]',
          model: 'UrdherPune',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'klientId'
        },
        preventiva: {
          name: 'preventiva',
          type: 'Preventiv[]',
          model: 'Preventiv',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'klientId'
        },
        liberMjeti: {
          name: 'liberMjeti',
          type: 'LiberMjeti[]',
          model: 'LiberMjeti',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'klientId'
        },
      }
    }
  }
}
