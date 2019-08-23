/* tslint:disable */

declare var Object: any;
export interface KlientInterface {
  "emer": string;
  "mbiemer"?: string;
  "telefon"?: string;
  "email"?: string;
  "adresa"?: string;
  "id"?: any;
}

export class Klient implements KlientInterface {
  "emer": string;
  "mbiemer": string;
  "telefon": string;
  "email": string;
  "adresa": string;
  "id": any;
  constructor(data?: KlientInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Klient`.
   */
  public static getModelName() {
    return "Klient";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Klient for dynamic purposes.
  **/
  public static factory(data: KlientInterface): Klient{
    return new Klient(data);
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
      name: 'Klient',
      plural: 'Klients',
      path: 'Klients',
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
      }
    }
  }
}
