/* tslint:disable */
import {
  Mjeti,
  Perdorues
} from '../index';

declare var Object: any;
export interface UrdherDiagnozeInterface {
  "pershkrim"?: string;
  "prioriteti"?: number;
  "statusi"?: number;
  "id"?: any;
  "mejtiId"?: any;
  "leshuarPerdoruesId"?: any;
  "destinuarPerdoruesId"?: any;
  "leshoiPerdoruesId"?: any;
  "mjetiId"?: any;
  mjeti?: Mjeti;
  leshuarNga?: Perdorues;
  destinuarPer?: Perdorues;
}

export class UrdherDiagnoze implements UrdherDiagnozeInterface {
  "pershkrim": string;
  "prioriteti": number;
  "statusi": number;
  "id": any;
  "mejtiId": any;
  "leshuarPerdoruesId": any;
  "destinuarPerdoruesId": any;
  "leshoiPerdoruesId": any;
  "mjetiId": any;
  mjeti: Mjeti;
  leshuarNga: Perdorues;
  destinuarPer: Perdorues;
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
        "prioriteti": {
          name: 'prioriteti',
          type: 'number'
        },
        "statusi": {
          name: 'statusi',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "mejtiId": {
          name: 'mejtiId',
          type: 'any'
        },
        "leshuarPerdoruesId": {
          name: 'leshuarPerdoruesId',
          type: 'any'
        },
        "destinuarPerdoruesId": {
          name: 'destinuarPerdoruesId',
          type: 'any'
        },
        "leshoiPerdoruesId": {
          name: 'leshoiPerdoruesId',
          type: 'any'
        },
        "mjetiId": {
          name: 'mjetiId',
          type: 'any'
        },
      },
      relations: {
        mjeti: {
          name: 'mjeti',
          type: 'Mjeti',
          model: 'Mjeti',
          relationType: 'belongsTo',
                  keyFrom: 'mejtiId',
          keyTo: 'id'
        },
        leshuarNga: {
          name: 'leshuarNga',
          type: 'Perdorues',
          model: 'Perdorues',
          relationType: 'belongsTo',
                  keyFrom: 'leshuarPerdoruesId',
          keyTo: 'id'
        },
        destinuarPer: {
          name: 'destinuarPer',
          type: 'Perdorues',
          model: 'Perdorues',
          relationType: 'belongsTo',
                  keyFrom: 'destinuarPerdoruesId',
          keyTo: 'id'
        },
      }
    }
  }
}
