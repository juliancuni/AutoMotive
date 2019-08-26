/* tslint:disable */
import {
  RoleMapping
} from '../index';

declare var Object: any;
export interface PrivilegjetInterface {
  "id"?: any;
  "name": string;
  "description"?: string;
  "created"?: Date;
  "modified"?: Date;
  principals?: RoleMapping[];
}

export class Privilegjet implements PrivilegjetInterface {
  "id": any;
  "name": string;
  "description": string;
  "created": Date;
  "modified": Date;
  principals: RoleMapping[];
  constructor(data?: PrivilegjetInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Privilegjet`.
   */
  public static getModelName() {
    return "Privilegjet";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Privilegjet for dynamic purposes.
  **/
  public static factory(data: PrivilegjetInterface): Privilegjet{
    return new Privilegjet(data);
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
      name: 'Privilegjet',
      plural: 'Privilegjet',
      path: 'Privilegjet',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "modified": {
          name: 'modified',
          type: 'Date'
        },
      },
      relations: {
        principals: {
          name: 'principals',
          type: 'RoleMapping[]',
          model: 'RoleMapping',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'roleId'
        },
      }
    }
  }
}
