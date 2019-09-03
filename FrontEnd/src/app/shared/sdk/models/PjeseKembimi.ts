/* tslint:disable */

declare var Object: any;
export interface PjeseKembimiInterface {
  "id"?: number;
  "kodi"?: string;
  "pershkrimi"?: string;
  "pozicioni"?: string;
  "cmimShitje"?: number;
}

export class PjeseKembimi implements PjeseKembimiInterface {
  "id": number;
  "kodi": string;
  "pershkrimi": string;
  "pozicioni": string;
  "cmimShitje": number;
  constructor(data?: PjeseKembimiInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PjeseKembimi`.
   */
  public static getModelName() {
    return "PjeseKembimi";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PjeseKembimi for dynamic purposes.
  **/
  public static factory(data: PjeseKembimiInterface): PjeseKembimi{
    return new PjeseKembimi(data);
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
      name: 'PjeseKembimi',
      plural: 'PjeseKembimi',
      path: 'PjeseKembimi',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "kodi": {
          name: 'kodi',
          type: 'string'
        },
        "pershkrimi": {
          name: 'pershkrimi',
          type: 'string'
        },
        "pozicioni": {
          name: 'pozicioni',
          type: 'string'
        },
        "cmimShitje": {
          name: 'cmimShitje',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
