/* tslint:disable */

declare var Object: any;
export interface ClientInterface {
  "emer": string;
  "mbiemer": string;
  "email": string;
  "telefon"?: string;
  "datelindja"?: Date;
  "enabled": boolean;
  "realm"?: string;
  "username"?: string;
  "emailVerified"?: boolean;
  "id"?: any;
  "password"?: string;
  accessTokens?: any[];
}

export class Client implements ClientInterface {
  "emer": string;
  "mbiemer": string;
  "email": string;
  "telefon": string;
  "datelindja": Date;
  "enabled": boolean;
  "realm": string;
  "username": string;
  "emailVerified": boolean;
  "id": any;
  "password": string;
  accessTokens: any[];
  constructor(data?: ClientInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Client`.
   */
  public static getModelName() {
    return "Client";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Client for dynamic purposes.
  **/
  public static factory(data: ClientInterface): Client{
    return new Client(data);
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
      name: 'Client',
      plural: 'Clients',
      path: 'Clients',
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
        "email": {
          name: 'email',
          type: 'string'
        },
        "telefon": {
          name: 'telefon',
          type: 'string'
        },
        "datelindja": {
          name: 'datelindja',
          type: 'Date'
        },
        "enabled": {
          name: 'enabled',
          type: 'boolean',
          default: true
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
