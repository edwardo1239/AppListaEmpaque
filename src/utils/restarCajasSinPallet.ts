import { CajasSinPalletType, LoteType } from "../store/types";

export default function (CajasSinPalletType:CajasSinPalletType, seleccionado:string, loteActual:LoteType, cajas:number):CajasSinPalletType|string{
    let [enf, index] = seleccionado.split("/")
    let cajasActuales = CajasSinPalletType[enf][index][1]
    if(loteActual.enf !== enf) return "No se pueden restar las cajas del item debido a que es un predio anterior"
    if((cajasActuales - cajas) < 0) return "Error el numero de cajas a restar es mayor al numero de cajas actual"
    else{
        CajasSinPalletType[enf][index][1] -= cajas
        return CajasSinPalletType;
    }
}