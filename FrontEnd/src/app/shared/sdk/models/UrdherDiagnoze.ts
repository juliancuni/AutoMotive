/* tslint:disable */
import {
  Mjeti,
  Klient,
  Perfaqesues,
  Perdorues
} from '../index';

declare var Object: any;
export interface UrdherDiagnozeInterface {
  "pershkrim"?: string;
  "leshoi"?: string;
  "prioriteti"?: number;
  "statusi"?: number;
  "krijuar"?: Date;
  "modifikuar"?: Date;
  "id"?: any;
  "mjetiId"?: any;
  "klientId"?: any;
  "perfaqesuesId"?: any;
  "perdoruesId"?: any;
  mjeti?: Mjeti;
  klient?: Klient;
  perfaqesues?: Perfaqesues;
  perdorues?: Perdorues;
}

export class UrdherDiagnoze implements UrdherDiagnozeInterface {
  "pershkrim": string;
  "leshoi": string;
  "prioriteti": number;
  "statusi": number;
  "krijuar": Date;
  "modifikuar": Date;
  "id": any;
  "mjetiId": any;
  "klientId": any;
  "perfaqesuesId": any;
  "perdoruesId": any;
  mjeti: Mjeti;
  klient: Klient;
  perfaqesues: Perfaqesues;
  perdorues: Perdorues;
  constructor(data?: UrdherDiagnozeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UrdherDiagnoze`.
   */
  public static getModelName() {
    return "UrdherDiagnoze";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UrdherDiagnoze for dynamic purposes.
  **/
  public static factory(data: UrdherDiagnozeInterface): UrdherDiagnoze{
    return new UrdherDiagnoze(data);
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
      name: 'UrdherDiagnoze',
      plural: 'UrdheraDiagnoze',
      path: 'UrdheraDiagnoze',
      idName: 'id',
      properties: {
        "pershkrim": {
          name: 'pershkrim',
          type: 'string'
        },
        "leshoi": {
          name: 'leshoi',
          type: 'string'
        },
        "prioriteti": {
          name: 'prioriteti',
          type: 'number'
        },
        "statusi": {
          name: 'statusi',
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
        "id": {
          name: 'id',
          type: 'any'
        },
        "mjetiId": {
          name: 'mjetiId',
          type: 'any'
        },
        "klientId": {
          name: 'klientId',
          type: 'any'
        },
        "perfaqesuesId": {
          name: 'perfaqesuesId',
          type: 'any'
        },
        "perdoruesId": {
          name: 'perdoruesId',
          type: 'any'
        },
      },
      relations: {
        mjeti: {
          name: 'mjeti',
          type: 'Mjeti',
          model: 'Mjeti',
          relationType: 'belongsTo',
                  keyFrom: 'mjetiId',
          keyTo: 'id'
        },
        klient: {
          name: 'klient',
          type: 'Klient',
          model: 'Klient',
          relationType: 'belongsTo',
                  keyFrom: 'klientId',
          keyTo: 'id'
        },
        perfaqesues: {
          name: 'perfaqesues',
          type: 'Perfaqesues',
          model: 'Perfaqesues',
          relationType: 'belongsTo',
                  keyFrom: 'perfaqesuesId',
          keyTo: 'id'
        },
        perdorues: {
          name: 'perdorues',
          type: 'Perdorues',
          model: 'Perdorues',
          relationType: 'belongsTo',
                  keyFrom: 'perdoruesId',
          keyTo: 'id'
        },
      }
    }
  }
}
