/* tslint:disable */

declare var Object: any;
export interface UrdherPuneInterface {
  "sasia"?: number;
  "shenim"?: string;
  "prioriteti"?: number;
  "statusi"?: number;
  "id"?: any;
  "klientId"?: any;
  "kategoriMjeteshId"?: any;
  "mjetiId"?: any;
  "kategoriSherbimeshId"?: any;
}

export class UrdherPune implements UrdherPuneInterface {
  "sasia": number;
  "shenim": string;
  "prioriteti": number;
  "statusi": number;
  "id": any;
  "klientId": any;
  "kategoriMjeteshId": any;
  "mjetiId": any;
  "kategoriSherbimeshId": any;
  constructor(data?: UrdherPuneInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UrdherPune`.
   */
  public static getModelName() {
    return "UrdherPune";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UrdherPune for dynamic purposes.
  **/
  public static factory(data: UrdherPuneInterface): UrdherPune{
    return new UrdherPune(data);
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
      name: 'UrdherPune',
      plural: 'UrdheraPune',
      path: 'UrdheraPune',
      idName: 'id',
      properties: {
        "sasia": {
          name: 'sasia',
          type: 'number'
        },
        "shenim": {
          name: 'shenim',
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
        "klientId": {
          name: 'klientId',
          type: 'any'
        },
        "kategoriMjeteshId": {
          name: 'kategoriMjeteshId',
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
      },
      relations: {
      }
    }
  }
}
