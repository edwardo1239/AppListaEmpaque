import { LoteType, contenedoresObj } from "../store/types";

export default function (contenedores:contenedoresObj, numeroContenedor:string, pallet:string, seleccionado:string,loteActual:LoteType,cajas:number):contenedoresObj|string{
    let [enf, index] = seleccionado.split("/");
    let cajasActuales = contenedores[numeroContenedor][pallet][enf][index][1]
    
    if(loteActual.enf !== enf) return "No se pueden restar las cajas del item debido a que es un predio anterior"
    if((cajasActuales - cajas) < 0) return "Error el numero de cajas a restar es mayor al numero de cajas actual"

    contenedores[numeroContenedor][pallet]['cajasTotal'] -= cajas
    contenedores[numeroContenedor][pallet][enf][index][1] -= cajas

    return contenedores
}