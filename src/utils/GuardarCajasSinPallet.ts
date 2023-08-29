import { useCajasSinPalletStore } from "../store/Cajas";

export default function guardarCajasSinPallet(cajasSinPallet:any, vector:any, lote:string){

   
    const newCajasSinPallet = cajasSinPallet
    console.log(newCajasSinPallet)
    let x:string;
    let y:number;
    let flag:boolean = true //si la bandera es true es que sexistia un vector con los mismos datos y se agrego el numero de cajas

    if(!newCajasSinPallet.hasOwnProperty(lote)){
        newCajasSinPallet[lote] = []
        newCajasSinPallet[lote].push(vector)
        return newCajasSinPallet
    }

    cajasSinPallet[lote].map((item:any, index:number) => {
        if(vector[2] == item[2] && vector[3] == item[3] && vector[4] == item[4] && new Date(vector[5]).getDate() == new Date(item[5]).getDate()){
              x = newCajasSinPallet[lote][index][1] 
              y = parseInt(x) + vector[1];
              newCajasSinPallet[lote][index][1]  = y;
              flag = false
        }
    })
    if(flag){
        //si no se encuentran que los datos son iguales se ingresa un nuevo vector en el objeto enf correspondiente
        newCajasSinPallet[lote].push(vector)
    }
    return newCajasSinPallet


}