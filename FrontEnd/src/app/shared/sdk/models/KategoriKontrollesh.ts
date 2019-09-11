/* tslint:disable */
import {
  Diagnoza
} from '../index';

declare var Object: any;
export interface KategoriKontrolleshInterface {
  "emer": string;
  "id"?: any;
  diagnozat?: Diagnoza[];
}

export class KategoriKontrollesh implements KategoriKontrolleshInterface {
  "emer": string;
  "id": any;
  diagnozat: Diagnoza[];
  constructor(data?: KategoriKontrolleshInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `KategoriKontrollesh`.
   */
  public static getModelName() {
    return "KategoriKontrollesh";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of KategoriKontrollesh for dynamic purposes.
  **/
  public static factory(data: KategoriKontrolleshInterface): KategoriKontrollesh{
    return new KategoriKontrollesh(data);
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
      name: 'KategoriKontrollesh',
      plural: 'kategoriKontrollesh',
      path: 'kategoriKontrollesh',
      idName: 'id',
      properties: {
        "emer": {
          name: 'emer',
          type: 'string'
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
          keyTo: 'kategoriKontrolleshId'
        },
      }
    }
  }
}
