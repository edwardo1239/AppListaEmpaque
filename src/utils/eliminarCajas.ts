export default function (contenedores:any, numeroContenedor:string, pallet:string, informacionSeleccion:string, loteActual:loteType, loteVaciando:loteType){
    let [enf, index] = informacionSeleccion.split("/");
    let cajas_a_eliminar = contenedores[numeroContenedor][pallet][enf][index][1];

    if(loteActual.enf === enf || loteVaciando.enf === enf){
        contenedores[numeroContenedor][pallet]['cajasTotal'] -= cajas_a_eliminar
         contenedores[numeroContenedor][pallet][enf].splice(index,1);
        return contenedores
    }
    else {
        return "Error"
    }

}

type loteType = {
    enf: string;
    nombreLote: string;
    tipoFruta: 'Naranja' | 'Limon';
  };