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
  config: string;
  Version: string;
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

