/* tslint:disable */
import {
  Mjeti,
  Klient,
  Perdorues,
  Perfaqesues,
  KategoriSherbimesh,
  LiberMjeti,
  PjeseKembimi
} from '../index';

declare var Object: any;
export interface UrdherPuneInterface {
  "sasia"?: number;
  "shenim"?: string;
  "prioriteti"?: number;
  "statusi"?: number;
  "krijuar"?: Date;
  "modifikuar"?: Date;
  "id"?: any;
  "mjetiId"?: any;
  "klientId"?: any;
  "perdoruesMorriId"?: any;
  "perfaqesuesId"?: any;
  "perdoruesId"?: any;
  "kategoriMjeteshId"?: any;
  "liberMjetiId"?: any;
  mjeti?: Mjeti;
  klient?: Klient;
  perdoruesMorri?: Perdorues;
  perfaqesues?: Perfaqesues;
  kategoriSherbimesh?: KategoriSherbimesh[];
  liberMjeti?: LiberMjeti;
  pjeseKembimi?: PjeseKembimi[];
}

export class UrdherPune implements UrdherPuneInterface {
  "sasia": number;
  "shenim": string;
  "prioriteti": number;
  "statusi": number;
  "krijuar": Date;
  "modifikuar": Date;
  "id": any;
  "mjetiId": any;
  "klientId": any;
  "perdoruesMorriId": any;
  "perfaqesuesId": any;
  "perdoruesId": any;
  "kategoriMjeteshId": any;
  "liberMjetiId": any;
  mjeti: Mjeti;
  klient: Klient;
  perdoruesMorri: Perdorues;
  perfaqesues: Perfaqesues;
  kategoriSherbimesh: KategoriSherbimesh[];
  liberMjeti: LiberMjeti;
  pjeseKembimi: PjeseKembimi[];
  constructor(data?: UrdherPuneInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UrdherPune`.
   */
  public static getModelName() {
    return "UrdherPune";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UrdherPune for dynamic purposes.
  **/
  public static factory(data: UrdherPuneInterface): UrdherPune{
    return new UrdherPune(data);
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
      name: 'UrdherPune',
      plural: 'UrdheraPune',
      path: 'UrdheraPune',
      idName: 'id',
      properties: {
        "sasia": {
          name: 'sasia',
          type: 'number'
        },
        "shenim": {
          name: 'shenim',
          type: 'string'
        },
        "prioriteti": {
          name: 'prioriteti',
          type: 'number'
        },
        "statusi": {
          name: 'statusi',
          type: 'number'
        },
        "krijuar": {
          name: 'krijuar',
          type: 'Date'
        },
        "modifikuar": {
          name: 'modifikuar',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "mjetiId": {
          name: 'mjetiId',
          type: 'any'
        },
        "klientId": {
          name: 'klientId',
          type: 'any'
        },
        "perdoruesMorriId": {
          name: 'perdoruesMorriId',
          type: 'any'
        },
        "perfaqesuesId": {
          name: 'perfaqesuesId',
          type: 'any'
        },
        "perdoruesId": {
          name: 'perdoruesId',
          type: 'any'
        },
        "kategoriMjeteshId": {
          name: 'kategoriMjeteshId',
          type: 'any'
        },
        "liberMjetiId": {
          name: 'liberMjetiId',
          type: 'any'
        },
      },
      relations: {
        mjeti: {
          name: 'mjeti',
          type: 'Mjeti',
          model: 'Mjeti',
          relationType: 'belongsTo',
                  keyFrom: 'mjetiId',
          keyTo: 'id'
        },
        klient: {
          name: 'klient',
          type: 'Klient',
          model: 'Klient',
          relationType: 'belongsTo',
                  keyFrom: 'klientId',
          keyTo: 'id'
        },
        perdoruesMorri: {
          name: 'perdoruesMorri',
          type: 'Perdorues',
          model: 'Perdorues',
          relationType: 'belongsTo',
                  keyFrom: 'perdoruesMorriId',
          keyTo: 'id'
        },
        perfaqesues: {
          name: 'perfaqesues',
          type: 'Perfaqesues',
          model: 'Perfaqesues',
          relationType: 'belongsTo',
                  keyFrom: 'perfaqesuesId',
          keyTo: 'id'
        },
        kategoriSherbimesh: {
          name: 'kategoriSherbimesh',
          type: 'KategoriSherbimesh[]',
          model: 'KategoriSherbimesh',
          relationType: 'hasMany',
          modelThrough: 'UrdherPuneKategoriSherbimesh',
          keyThrough: 'kategoriSherbimeshId',
          keyFrom: 'id',
          keyTo: 'urdherPuneId'
        },
        liberMjeti: {
          name: 'liberMjeti',
          type: 'LiberMjeti',
          model: 'LiberMjeti',
          relationType: 'belongsTo',
                  keyFrom: 'liberMjetiId',
          keyTo: 'id'
        },
        pjeseKembimi: {
          name: 'pjeseKembimi',
          type: 'PjeseKembimi[]',
          model: 'PjeseKembimi',
          relationType: 'hasMany',
          modelThrough: 'UrdherPunePjeseKembimi',
          keyThrough: 'pjeseKembimiId',
          keyFrom: 'id',
          keyTo: 'urdherPuneId'
        },
      }
    }
  }
}
