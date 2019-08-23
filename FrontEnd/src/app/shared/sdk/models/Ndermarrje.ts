/* tslint:disable */

declare var Object: any;
export interface NdermarrjeInterface {
  "emer": string;
  "domain": string;
  "slogan": string;
  "logo"?: string;
  "adresa"?: string;
  "telefon"?: string;
  "email"?: string;
  "nius"?: string;
  "id"?: any;
}

export class Ndermarrje implements NdermarrjeInterface {
  "emer": string;
  "domain": string;
  "slogan": string;
  "logo": string;
  "adresa": string;
  "telefon": string;
  "email": string;
  "nius": string;
  "id": any;
  constructor(data?: NdermarrjeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Ndermarrje`.
   */
  public static getModelName() {
    return "Ndermarrje";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Ndermarrje for dynamic purposes.
  **/
  public static factory(data: NdermarrjeInterface): Ndermarrje{
    return new Ndermarrje(data);
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
      name: 'Ndermarrje',
      plural: 'Ndermarrjes',
      path: 'Ndermarrjes',
      idName: 'id',
      properties: {
        "emer": {
          name: 'emer',
          type: 'string'
        },
        "domain": {
          name: 'domain',
          type: 'string'
        },
        "slogan": {
          name: 'slogan',
          type: 'string',
          default: 'N/A'
        },
        "logo": {
          name: 'logo',
          type: 'string'
        },
        "adresa": {
          name: 'adresa',
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
        "nius": {
          name: 'nius',
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
