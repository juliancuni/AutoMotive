/* tslint:disable */
import {
  KategoriMjetesh,
  Klient
} from '../index';

declare var Object: any;
export interface MjetiInterface {
  "brand"?: string;
  "model"?: string;
  "viti"?: number;
  "nrShasise"?: string;
  "targa"?: string;
  "nePark"?: boolean;
  "neOficine"?: boolean;
  "id"?: any;
  "kategoriId"?: any;
  "klientId"?: any;
  "kategoriMjeteshId"?: any;
  kategori?: KategoriMjetesh;
  klient?: Klient;
}

export class Mjeti implements MjetiInterface {
  "brand": string;
  "model": string;
  "viti": number;
  "nrShasise": string;
  "targa": string;
  "nePark": boolean;
  "neOficine": boolean;
  "id": any;
  "kategoriId": any;
  "klientId": any;
  "kategoriMjeteshId": any;
  kategori: KategoriMjetesh;
  klient: Klient;
  constructor(data?: MjetiInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Mjeti`.
   */
  public static getModelName() {
    return "Mjeti";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Mjeti for dynamic purposes.
  **/
  public static factory(data: MjetiInterface): Mjeti{
    return new Mjeti(data);
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
      name: 'Mjeti',
      plural: 'Mjetet',
      path: 'Mjetet',
      idName: 'id',
      properties: {
        "brand": {
          name: 'brand',
          type: 'string',
          default: 'model'
        },
        "model": {
          name: 'model',
          type: 'string'
        },
        "viti": {
          name: 'viti',
          type: 'number'
        },
        "nrShasise": {
          name: 'nrShasise',
          type: 'string'
        },
        "targa": {
          name: 'targa',
          type: 'string'
        },
        "nePark": {
          name: 'nePark',
          type: 'boolean'
        },
        "neOficine": {
          name: 'neOficine',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "kategoriId": {
          name: 'kategoriId',
          type: 'any'
        },
        "klientId": {
          name: 'klientId',
          type: 'any'
        },
        "kategoriMjeteshId": {
          name: 'kategoriMjeteshId',
          type: 'any'
        },
      },
      relations: {
        kategori: {
          name: 'kategori',
          type: 'KategoriMjetesh',
          model: 'KategoriMjetesh',
          relationType: 'belongsTo',
                  keyFrom: 'kategoriId',
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
      }
    }
  }
}
