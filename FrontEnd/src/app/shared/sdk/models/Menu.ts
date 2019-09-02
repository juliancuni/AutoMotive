/* tslint:disable */

declare var Object: any;
export interface MenuInterface {
  "text": string;
  "heading"?: boolean;
  "link"?: string;
  "icon"?: string;
  "elink"?: string;
  "target"?: string;
  "alert"?: string;
  "kategoria"?: string;
  "protected": boolean;
  "index"?: number;
  "id"?: any;
}

export class Menu implements MenuInterface {
  "text": string;
  "heading": boolean;
  "link": string;
  "icon": string;
  "elink": string;
  "target": string;
  "alert": string;
  "kategoria": string;
  "protected": boolean;
  "index": number;
  "id": any;
  constructor(data?: MenuInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Menu`.
   */
  public static getModelName() {
    return "Menu";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Menu for dynamic purposes.
  **/
  public static factory(data: MenuInterface): Menu{
    return new Menu(data);
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
      name: 'Menu',
      plural: 'Menu',
      path: 'Menu',
      idName: 'id',
      properties: {
        "text": {
          name: 'text',
          type: 'string'
        },
        "heading": {
          name: 'heading',
          type: 'boolean'
        },
        "link": {
          name: 'link',
          type: 'string'
        },
        "icon": {
          name: 'icon',
          type: 'string'
        },
        "elink": {
          name: 'elink',
          type: 'string'
        },
        "target": {
          name: 'target',
          type: 'string'
        },
        "alert": {
          name: 'alert',
          type: 'string'
        },
        "kategoria": {
          name: 'kategoria',
          type: 'string'
        },
        "protected": {
          name: 'protected',
          type: 'boolean',
          default: true
        },
        "index": {
          name: 'index',
          type: 'number'
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
