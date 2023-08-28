import { useCajasSinPalletStore } from "../store/Cajas";

export default function guardarCajasSinPallet(vector:any, lote:string){

    const cajasSinPallet = useCajasSinPalletStore(state => state.CajasSinPallet);
    const newCajasSinPallet = cajasSinPallet
    let x:string;
    let y:number;

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
        }
    })
    return newCajasSinPallet


}