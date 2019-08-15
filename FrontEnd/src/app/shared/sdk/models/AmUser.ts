/* tslint:disable */

declare var Object: any;
export interface AmUserInterface {
  "username"?: string;
  "name"?: string;
  "surname"?: string;
  "middlename"?: string;
  "avatar"?: string;
  "birthday"?: string;
  "realm"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "password"?: string;
  accessTokens?: any[];
}

export class AmUser implements AmUserInterface {
  "username": string;
  "name": string;
  "surname": string;
  "middlename": string;
  "avatar": string;
  "birthday": string;
  "realm": string;
  "email": string;
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
        "username": {
          name: 'username',
          type: 'string'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "surname": {
          name: 'surname',
          type: 'string'
        },
        "middlename": {
          name: 'middlename',
          type: 'string'
        },
        "avatar": {
          name: 'avatar',
          type: 'string'
        },
        "birthday": {
          name: 'birthday',
          type: 'string'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "email": {
          name: 'email',
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
