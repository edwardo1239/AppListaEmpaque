import { CajasSinPalletType, LoteType } from "../store/types";

export default function (CajasSinPalletType:CajasSinPalletType, seleccionado:string, loteActual:LoteType, cajas:number): CajasSinPalletType | string {
    let[enf, index] = seleccionado.split("/")

    if(enf !== loteActual.enf) return "No se puede sumar ese item debido a que no es el mismo predio Actual"

    CajasSinPalletType[enf][index][1] += cajas

    return CajasSinPalletType
}