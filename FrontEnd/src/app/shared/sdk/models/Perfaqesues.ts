/* tslint:disable */
import {
  Klient
} from '../index';

declare var Object: any;
export interface PerfaqesuesInterface {
  "emer": string;
  "mbiemer"?: string;
  "telefon"?: string;
  "email"?: string;
  "adresa"?: string;
  "id"?: any;
  klientet?: Klient[];
}

export class Perfaqesues implements PerfaqesuesInterface {
  "emer": string;
  "mbiemer": string;
  "telefon": string;
  "email": string;
  "adresa": string;
  "id": any;
  klientet: Klient[];
  constructor(data?: PerfaqesuesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Perfaqesues`.
   */
  public static getModelName() {
    return "Perfaqesues";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Perfaqesues for dynamic purposes.
  **/
  public static factory(data: PerfaqesuesInterface): Perfaqesues{
    return new Perfaqesues(data);
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
      name: 'Perfaqesues',
      plural: 'Perfaqesuesit',
      path: 'Perfaqesuesit',
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
        "email": {
          name: 'email',
          type: 'string'
        },
        "adresa": {
          name: 'adresa',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        klientet: {
          name: 'klientet',
          type: 'Klient[]',
          model: 'Klient',
          relationType: 'hasMany',
          modelThrough: 'KlientPerfaqesuesMapper',
          keyThrough: 'klientId',
          keyFrom: 'id',
          keyTo: 'perfaqesuesId'
        },
      }
    }
  }
}