/* tslint:disable */
import {
  Diagnoza,
  UrdherPune
} from '../index';

declare var Object: any;
export interface KategoriSherbimeshInterface {
  "emer"?: string;
  "pershkrim"?: string;
  "orePune"?: number;
  "cmimiPerOre"?: number;
  "id"?: any;
  diagnozat?: Diagnoza[];
  urdheraPune?: UrdherPune[];
}

export class KategoriSherbimesh implements KategoriSherbimeshInterface {
  "emer": string;
  "pershkrim": string;
  "orePune": number;
  "cmimiPerOre": number;
  "id": any;
  diagnozat: Diagnoza[];
  urdheraPune: UrdherPune[];
  constructor(data?: KategoriSherbimeshInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `KategoriSherbimesh`.
   */
  public static getModelName() {
    return "KategoriSherbimesh";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of KategoriSherbimesh for dynamic purposes.
  **/
  public static factory(data: KategoriSherbimeshInterface): KategoriSherbimesh{
    return new KategoriSherbimesh(data);
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
      name: 'KategoriSherbimesh',
      plural: 'KategoriSherbimesh',
      path: 'KategoriSherbimesh',
      idName: 'id',
      properties: {
        "emer": {
          name: 'emer',
          type: 'string'
        },
        "pershkrim": {
          name: 'pershkrim',
          type: 'string'
        },
        "orePune": {
          name: 'orePune',
          type: 'number'
        },
        "cmimiPerOre": {
          name: 'cmimiPerOre',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        diagnozat: {
          name: 'diagnozat',
          type: 'Diagnoza[]',
          model: 'Diagnoza',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'kategoriSherbimeshId'
        },
        urdheraPune: {
          name: 'urdheraPune',
          type: 'UrdherPune[]',
          model: 'UrdherPune',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'kategoriSherbimeshId'
        },
      }
    }
  }
}
