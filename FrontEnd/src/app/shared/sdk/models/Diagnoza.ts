/* tslint:disable */
import {
  UrdherDiagnoze,
  Mjeti,
  KategoriSherbimesh
} from '../index';

declare var Object: any;
export interface DiagnozaInterface {
  "shenime"?: string;
  "sasia"?: number;
  "gjendjaDifektit"?: number;
  "kilometrazhi"?: number;
  "id"?: any;
  "urdherDiagnozeId"?: any;
  "mjetiId"?: any;
  "kategoriSherbimeshId"?: any;
  "kategoriMjeteshId"?: any;
  "preventivId"?: any;
  urdherDiagnoze?: UrdherDiagnoze;
  mjeti?: Mjeti;
  kategoriSherbimesh?: KategoriSherbimesh;
}

export class Diagnoza implements DiagnozaInterface {
  "shenime": string;
  "sasia": number;
  "gjendjaDifektit": number;
  "kilometrazhi": number;
  "id": any;
  "urdherDiagnozeId": any;
  "mjetiId": any;
  "kategoriSherbimeshId": any;
  "kategoriMjeteshId": any;
  "preventivId": any;
  urdherDiagnoze: UrdherDiagnoze;
  mjeti: Mjeti;
  kategoriSherbimesh: KategoriSherbimesh;
  constructor(data?: DiagnozaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Diagnoza`.
   */
  public static getModelName() {
    return "Diagnoza";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Diagnoza for dynamic purposes.
  **/
  public static factory(data: DiagnozaInterface): Diagnoza{
    return new Diagnoza(data);
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
      name: 'Diagnoza',
      plural: 'Diagnozat',
      path: 'Diagnozat',
      idName: 'id',
      properties: {
        "shenime": {
          name: 'shenime',
          type: 'string'
        },
        "sasia": {
          name: 'sasia',
          type: 'number'
        },
        "gjendjaDifektit": {
          name: 'gjendjaDifektit',
          type: 'number'
        },
        "kilometrazhi": {
          name: 'kilometrazhi',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "urdherDiagnozeId": {
          name: 'urdherDiagnozeId',
          type: 'any'
        },
        "mjetiId": {
          name: 'mjetiId',
          type: 'any'
        },
        "kategoriSherbimeshId": {
          name: 'kategoriSherbimeshId',
          type: 'any'
        },
        "kategoriMjeteshId": {
          name: 'kategoriMjeteshId',
          type: 'any'
        },
        "preventivId": {
          name: 'preventivId',
          type: 'any'
        },
      },
      relations: {
        urdherDiagnoze: {
          name: 'urdherDiagnoze',
          type: 'UrdherDiagnoze',
          model: 'UrdherDiagnoze',
          relationType: 'belongsTo',
                  keyFrom: 'urdherDiagnozeId',
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
        kategoriSherbimesh: {
          name: 'kategoriSherbimesh',
          type: 'KategoriSherbimesh',
          model: 'KategoriSherbimesh',
          relationType: 'belongsTo',
                  keyFrom: 'kategoriSherbimeshId',
          keyTo: 'id'
        },
      }
    }
  }
}
