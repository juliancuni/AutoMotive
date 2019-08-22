/* tslint:disable */

declare var Object: any;
export interface OrgInterface {
  "orgname"?: string;
  "domain"?: string;
  "slogan"?: string;
  "logo"?: string;
  "adresa"?: string;
  "telefon"?: string;
  "email"?: string;
  "nius"?: string;
  "id"?: any;
}

export class Org implements OrgInterface {
  "orgname": string;
  "domain": string;
  "slogan": string;
  "logo": string;
  "adresa": string;
  "telefon": string;
  "email": string;
  "nius": string;
  "id": any;
  constructor(data?: OrgInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Org`.
   */
  public static getModelName() {
    return "Org";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Org for dynamic purposes.
  **/
  public static factory(data: OrgInterface): Org{
    return new Org(data);
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
      name: 'Org',
      plural: 'Orgs',
      path: 'Orgs',
      idName: 'id',
      properties: {
        "orgname": {
          name: 'orgname',
          type: 'string'
        },
        "domain": {
          name: 'domain',
          type: 'string'
        },
        "slogan": {
          name: 'slogan',
          type: 'string'
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
