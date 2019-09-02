/* tslint:disable */
import {
  Mjeti
} from '../index';

declare var Object: any;
export interface KategoriMjeteshInterface {
  "emer": string;
  "pershkrim"?: string;
  "id"?: any;
  mjetet?: Mjeti[];
}

export class KategoriMjetesh implements KategoriMjeteshInterface {
  "emer": string;
  "pershkrim": string;
  "id": any;
  mjetet: Mjeti[];
  constructor(data?: KategoriMjeteshInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `KategoriMjetesh`.
   */
  public static getModelName() {
    return "KategoriMjetesh";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of KategoriMjetesh for dynamic purposes.
  **/
  public static factory(data: KategoriMjeteshInterface): KategoriMjetesh{
    return new KategoriMjetesh(data);
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
      name: 'KategoriMjetesh',
      plural: 'KategoriMjetesh',
      path: 'KategoriMjetesh',
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
          keyTo: 'kategoriMjeteshId'
        },
      }
    }
  }
}
