/* tslint:disable */

declare var Object: any;
export interface PjeseKembimiInterface {
  "kod"?: string;
  "pershkrim"?: string;
  "pozicioni"?: string;
  "cmimShitje"?: number;
  "id"?: any;
}

export class PjeseKembimi implements PjeseKembimiInterface {
  "kod": string;
  "pershkrim": string;
  "pozicioni": string;
  "cmimShitje": number;
  "id": any;
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
        "kod": {
          name: 'kod',
          type: 'string'
        },
        "pershkrim": {
          name: 'pershkrim',
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
