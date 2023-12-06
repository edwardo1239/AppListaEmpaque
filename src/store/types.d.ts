export interface LoteType {
  enf: string;
  nombreLote: string;
  tipoFruta: 'Naranja' | 'Limon';
}

export interface contenedoresObj {
  [key: string]: contenedorType;
}

export interface CajasSinPalletType {
  [key: string]: CustomArray[[]];
}

interface contenedorType {
  [key: string]: pallet;
  infoContenedor: infoContenedorType;
}

interface infoContenedorType {
  nombreCliente: String
  tipoFruta:string
  tipoEmpaque:'Caja'|'Saco'
  fechaInicio: Date
}

interface pallet {
  [key: string]: CustomArray[[]];
  settings: settings;
  cajasTotal: number;
}

interface settings {
  tipoCaja: string;
  calibre: number;
  calidad: number;
}

type CustomArray = (string | number | Date)[];

export type serverResponse = {
  status:number
  data:any
}

export type uploadServerType = {
  caja:number
  tipoCaja:string
}