import {CajasSinPalletType, contenedoresObj} from '../store/types';

export default function (
  contenedor: contenedoresObj,
  numeroContenedor: string,
  pallet: string,
  seleccionado: string,
  nuevoPallet: string,
  cajasSinPallet: CajasSinPalletType,
  nCajas: number,
) {
  let [enf, index] = seleccionado.split('/');
  let item = contenedor[numeroContenedor][pallet][enf][index];
  let newItem = [...item];
  let resCajas = item[1] - nCajas;
  let x: string; //obtiene el numero de cajas del vector
  let y: number; //es el resultado de la suma de numero de cajas mas las que ingresa del vector
  let flag: boolean = true; //si la bandera es true es que sexistia un vector con los mismos datos y se agrego el numero de cajas

  //se restan las cajas del lote actual y se elimina el item si es necesario o se le resta las cajas
  if (resCajas == 0) {
    contenedor[numeroContenedor][pallet][enf].splice(index, 1);
  } else if (resCajas > 0) {
    contenedor[numeroContenedor][pallet][enf][index][1] = resCajas;
  } else {
    return contenedor;
  }
  contenedor[numeroContenedor][pallet]['cajasTotal'] -= nCajas;

  // se ingresan las cajas en el nuevo pallet

  newItem[1] = nCajas;

  //se se desean mover cajas al pallet sin pallet
  if (nuevoPallet == '0') {
    if(cajasSinPallet.hasOwnProperty(enf)){
      cajasSinPallet[enf].map((itemActual:any, index:number) =>{
        if (
          itemActual[2] == item[2] &&
          itemActual[3] == item[3] &&
          itemActual[4] == item[4] &&
          new Date(itemActual[5]).getDate() == new Date(item[5]).getDate()
        ){
          x = cajasSinPallet[enf][index][1];
          y = parseInt(x) + nCajas;
          cajasSinPallet[enf][index][1] = y;
          flag = false;
        }
      });
      if (flag) {
        
        //si no se encuentran que los datos son iguales se ingresa un nuevo vector en el objeto enf correspondiente
        cajasSinPallet[enf] = [];
        cajasSinPallet[enf].push(newItem);
      } 
    }
    else {
      cajasSinPallet[enf] = [];
      cajasSinPallet[enf].push(newItem);
    }
    return cajasSinPallet

    ////si es otro pallet
  } else {
    console.log(nuevoPallet)
    if (
      !contenedor[numeroContenedor][nuevoPallet].hasOwnProperty('cajasTotal')
    ) {
      contenedor[numeroContenedor][nuevoPallet]['cajasTotal'] = 0;
    }
    if (contenedor[numeroContenedor][nuevoPallet].hasOwnProperty(enf)) {
      contenedor[numeroContenedor][nuevoPallet][enf].map(
        (itemActual: any, index: number) => {
          //se revisa si los datos son iguales a los datos previamente ingresados
          if (
            itemActual[2] == item[2] &&
            itemActual[3] == item[3] &&
            itemActual[4] == item[4] &&
            new Date(itemActual[5]).getDate() == new Date(item[5]).getDate()
          ) {
            x = contenedor[numeroContenedor][nuevoPallet][enf][index][1];
            y = parseInt(x) + nCajas;
            contenedor[numeroContenedor][nuevoPallet][enf][index][1] = y;
            flag = false;
          }
        },
      );
      if (flag) {
        //si no se encuentran que los datos son iguales se ingresa un nuevo vector en el objeto enf correspondiente
        contenedor[numeroContenedor][nuevoPallet][enf].push(newItem);
      }
    } else {
      contenedor[numeroContenedor][nuevoPallet][enf] = [];

      contenedor[numeroContenedor][nuevoPallet][enf].push(newItem);
    }

    contenedor[numeroContenedor][nuevoPallet]['cajasTotal'] += nCajas;

    return contenedor;
  }
}
