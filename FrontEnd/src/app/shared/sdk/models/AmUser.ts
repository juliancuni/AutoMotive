/* tslint:disable */

declare var Object: any;
export interface AmUserInterface {
  "emer": string;
  "mbiemer": string;
  "email": string;
  "telefon"?: string;
  "datelindja"?: Date;
  "avatar": string;
  "enabled": boolean;
  "adresa"?: string;
  "realm"?: string;
  "username"?: string;
  "emailVerified"?: boolean;
  "id"?: any;
  "password"?: string;
  accessTokens?: any[];
}

export class AmUser implements AmUserInterface {
  "emer": string;
  "mbiemer": string;
  "email": string;
  "telefon": string;
  "datelindja": Date;
  "avatar": string;
  "enabled": boolean;
  "adresa": string;
  "realm": string;
  "username": string;
  "emailVerified": boolean;
  "id": any;
  "password": string;
  accessTokens: any[];
  constructor(data?: AmUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AmUser`.
   */
  public static getModelName() {
    return "AmUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AmUser for dynamic purposes.
  **/
  public static factory(data: AmUserInterface): AmUser{
    return new AmUser(data);
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
      name: 'AmUser',
      plural: 'AmUsers',
      path: 'AmUsers',
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
        "avatar": {
          name: 'avatar',
          type: 'string',
          default: 'assets/img/usernopic.png'
        },
        "enabled": {
          name: 'enabled',
          type: 'boolean',
          default: true
        },
        "adresa": {
          name: 'adresa',
          type: 'string'
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
