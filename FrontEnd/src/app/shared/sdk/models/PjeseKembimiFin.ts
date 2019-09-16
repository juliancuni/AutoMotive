/* tslint:disable */
import {
  UrdherPune
} from '../index';

declare var Object: any;
export interface PjeseKembimiFinInterface {
  "id"?: number;
  "kodi"?: string;
  "pershkrimi"?: string;
  "pozicioni"?: string;
  "cmimShitje"?: number;
  urdheraPune?: UrdherPune[];
}

export class PjeseKembimiFin implements PjeseKembimiFinInterface {
  "id": number;
  "kodi": string;
  "pershkrimi": string;
  "pozicioni": string;
  "cmimShitje": number;
  urdheraPune: UrdherPune[];
  constructor(data?: PjeseKembimiFinInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PjeseKembimiFin`.
   */
  public static getModelName() {
    return "PjeseKembimiFin";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PjeseKembimiFin for dynamic purposes.
  **/
  public static factory(data: PjeseKembimiFinInterface): PjeseKembimiFin{
    return new PjeseKembimiFin(data);
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
      name: 'PjeseKembimiFin',
      plural: 'PjeseKembimiFin',
      path: 'PjeseKembimiFin',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "kodi": {
          name: 'kodi',
          type: 'string'
        },
        "pershkrimi": {
          name: 'pershkrimi',
          type: 'string'
        },
        "pozicioni": {
          name: 'pozicioni',
          type: 'string'
        },
        "cmimShitje": {
          name: 'cmimShitje',
          type: 'number'
        },
      },
      relations: {
        urdheraPune: {
          name: 'urdheraPune',
          type: 'UrdherPune[]',
          model: 'UrdherPune',
          relationType: 'hasMany',
          modelThrough: 'PjeseKembimiFinUrdherPune',
          keyThrough: 'urdherPuneId',
          keyFrom: 'id',
          keyTo: 'pjeseKembimiFinId'
        },
      }
    }
  }
}
