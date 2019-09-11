/* tslint:disable */
import {
  Klient,
  Mjeti,
  UrdherDiagnoze,
  UrdherPune,
  Preventiv,
  Diagnoza
} from '../index';

declare var Object: any;
export interface LiberMjetiInterface {
  "data"?: Date;
  "shenime"?: string;
  "odometer"?: number;
  "diferencaOdoMeter"?: number;
  "krijuar"?: Date;
  "modifikuar"?: Date;
  "id"?: any;
  "klientId"?: any;
  "mjetiId"?: any;
  klient?: Klient;
  mjeti?: Mjeti;
  urdheraDiagnoze?: UrdherDiagnoze[];
  urdheraPune?: UrdherPune[];
  preventivet?: Preventiv[];
  diagnozat?: Diagnoza[];
}

export class LiberMjeti implements LiberMjetiInterface {
  "data": Date;
  "shenime": string;
  "odometer": number;
  "diferencaOdoMeter": number;
  "krijuar": Date;
  "modifikuar": Date;
  "id": any;
  "klientId": any;
  "mjetiId": any;
  klient: Klient;
  mjeti: Mjeti;
  urdheraDiagnoze: UrdherDiagnoze[];
  urdheraPune: UrdherPune[];
  preventivet: Preventiv[];
  diagnozat: Diagnoza[];
  constructor(data?: LiberMjetiInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `LiberMjeti`.
   */
  public static getModelName() {
    return "LiberMjeti";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of LiberMjeti for dynamic purposes.
  **/
  public static factory(data: LiberMjetiInterface): LiberMjeti{
    return new LiberMjeti(data);
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
      name: 'LiberMjeti',
      plural: 'LiberMjetis',
      path: 'LiberMjetis',
      idName: 'id',
      properties: {
        "data": {
          name: 'data',
          type: 'Date'
        },
        "shenime": {
          name: 'shenime',
          type: 'string'
        },
        "odometer": {
          name: 'odometer',
          type: 'number'
        },
        "diferencaOdoMeter": {
          name: 'diferencaOdoMeter',
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
        urdheraDiagnoze: {
          name: 'urdheraDiagnoze',
          type: 'UrdherDiagnoze[]',
          model: 'UrdherDiagnoze',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'liberMjetiId'
        },
        urdheraPune: {
          name: 'urdheraPune',
          type: 'UrdherPune[]',
          model: 'UrdherPune',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'liberMjetiId'
        },
        preventivet: {
          name: 'preventivet',
          type: 'Preventiv[]',
          model: 'Preventiv',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'liberMjetiId'
        },
        diagnozat: {
          name: 'diagnozat',
          type: 'Diagnoza[]',
          model: 'Diagnoza',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'liberMjetiId'
        },
      }
    }
  }
}
