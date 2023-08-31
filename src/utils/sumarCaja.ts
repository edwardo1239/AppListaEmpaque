import {LoteType, contenedoresObj} from '../store/types';
import limiteCajasPallet from './limiteCajas';

export default function (
  contenedores: contenedoresObj,
  numeroContenedor: string,
  pallet: string,
  seleccionado: string,
  loteActual: LoteType,
  cajas: number,
): contenedoresObj | string {
  //if para saber si se va a sumar el pallet o si se sumara a un item especifico
  let settings = contenedores[numeroContenedor][pallet]['settings'];
  let tipoCaja = settings.tipoCaja;
  let calibre = settings.calibre;
  let calidad = settings.calidad;
  let [enf, index] = seleccionado.split("/")
  if (seleccionado == '') {
    let x: string; //obtiene el numero de cajas del vector
    let y: number; //es el resultado de la suma de numero de cajas mas las que ingresa del vector
    let flag: boolean = true; //si la bandera es true es que sexistia un vector con los mismos datos y se agrego el numero de cajas
    let fecha = new Date();

    if (
      !contenedores[numeroContenedor][pallet].hasOwnProperty(loteActual.enf)
    ) {
      contenedores[numeroContenedor][pallet][loteActual.enf] = [];
    }
    if (!contenedores[numeroContenedor][pallet].hasOwnProperty('cajasTotal')) {
      contenedores[numeroContenedor][pallet]['cajasTotal'] = 0;
    }

    let cajasTotal =
      contenedores[numeroContenedor][pallet]['cajasTotal'] + cajas;
    // se mira si la cantidad de cajas no supera el limite por pallet
    if (!limiteCajasPallet(settings, cajasTotal)) return 'Error en el numero de cajas';
    else {
      contenedores[numeroContenedor][pallet]['cajasTotal'] += cajas;
      //se ingresa la informacion general
      let palletTemp = contenedores[numeroContenedor][pallet][loteActual.enf];
      palletTemp.map((item: any, index: number) => {
        //se revisa si los datos son iguales a los datos previamente ingresados
        if (
          tipoCaja == item[2] &&
          calibre == item[3] &&
          calidad == item[4] &&
          fecha.getDate() == new Date(item[5]).getDate()
        ) {
          x = contenedores[numeroContenedor][pallet][loteActual.enf][index][1];
          y = parseInt(x) + cajas;
          contenedores[numeroContenedor][pallet][loteActual.enf][index][1] = y;
          flag = false;
        }
      });
      if (flag) {
        //si no se encuentran que los datos son iguales se ingresa un nuevo vector en el objeto enf correspondiente
        contenedores[numeroContenedor][pallet][loteActual.enf].push([
          loteActual.nombreLote,
          cajas,
          tipoCaja,
          calibre,
          calidad,
          fecha,
        ]);
      }
    }
  } else {
    if(enf != loteActual.enf ) return "Error no se puede sumer este item, debido a que es un predio ya vaciado"
    let cajasTotal:number = contenedores[numeroContenedor][pallet][enf][index][1] + cajas;
    if (!limiteCajasPallet(settings, cajasTotal)) return 'Error en el numero de cajas';
    contenedores[numeroContenedor][pallet]['cajasTotal'] += cajas
    contenedores[numeroContenedor][pallet][enf][index][1] += cajas
  }
  return contenedores;
}
