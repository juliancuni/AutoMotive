/* tslint:disable */

declare var Object: any;
export interface KlientFinancaInterface {
  "id"?: number;
  "kodi"?: string;
  "pershkrimi"?: string;
  "nipt"?: string;
  "nrLicence"?: string;
  "perfaqesues"?: string;
  "adresa1"?: string;
  "adresa2"?: string;
  "adresa3"?: string;
  "emertimi"?: string;
  "telefon1"?: string;
  "telefon2"?: string;
  "fax"?: string;
  "llogariBanke"?: string;
  "email"?: string;
  "internet"?: string;
  "qellim"?: string;
}

export class KlientFinanca implements KlientFinancaInterface {
  "id": number;
  "kodi": string;
  "pershkrimi": string;
  "nipt": string;
  "nrLicence": string;
  "perfaqesues": string;
  "adresa1": string;
  "adresa2": string;
  "adresa3": string;
  "emertimi": string;
  "telefon1": string;
  "telefon2": string;
  "fax": string;
  "llogariBanke": string;
  "email": string;
  "internet": string;
  "qellim": string;
  constructor(data?: KlientFinancaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `KlientFinanca`.
   */
  public static getModelName() {
    return "KlientFinanca";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of KlientFinanca for dynamic purposes.
  **/
  public static factory(data: KlientFinancaInterface): KlientFinanca{
    return new KlientFinanca(data);
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
      name: 'KlientFinanca',
      plural: 'KlientetFinanca',
      path: 'KlientetFinanca',
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
        "nipt": {
          name: 'nipt',
          type: 'string'
        },
        "nrLicence": {
          name: 'nrLicence',
          type: 'string'
        },
        "perfaqesues": {
          name: 'perfaqesues',
          type: 'string'
        },
        "adresa1": {
          name: 'adresa1',
          type: 'string'
        },
        "adresa2": {
          name: 'adresa2',
          type: 'string'
        },
        "adresa3": {
          name: 'adresa3',
          type: 'string'
        },
        "emertimi": {
          name: 'emertimi',
          type: 'string'
        },
        "telefon1": {
          name: 'telefon1',
          type: 'string'
        },
        "telefon2": {
          name: 'telefon2',
          type: 'string'
        },
        "fax": {
          name: 'fax',
          type: 'string'
        },
        "llogariBanke": {
          name: 'llogariBanke',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "internet": {
          name: 'internet',
          type: 'string'
        },
        "qellim": {
          name: 'qellim',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
