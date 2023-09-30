import limiteCajasPallet from "./limiteCajas";

type loteType = {
  enf: string,
  nombreLote: string,
  tipoFruta: "Naranja" | "Limon",
}


export default function actualizarPallet(contenedores:any, numeroContenedor:string, pallet:string,  loteActual:loteType, entrada:string){
    let fecha = new Date()
    let settingsTemp = contenedores[numeroContenedor][pallet]['settings'];
    let tipoCajaTemp = settingsTemp['tipoCaja'];
    let calibreTemp = settingsTemp['calibre'];
    let calidadTemp = settingsTemp['calidad'];
    let x:string //obtiene el numero de cajas del vector
    let y:number //es el resultado de la suma de numero de cajas mas las que ingresa del vector
    let flag:boolean = true //si la bandera es true es que sexistia un vector con los mismos datos y se agrego el numero de cajas
    let cajas:number = 0 

        if(!contenedores[numeroContenedor]['infoContenedor'].hasOwnProperty('fechaInicio')){
          contenedores[numeroContenedor]['infoContenedor']['fechaInicio'] = new Date();
        }

        if (!contenedores[numeroContenedor][pallet].hasOwnProperty(loteActual.enf)) 
        {
          contenedores[numeroContenedor][pallet][loteActual.enf] = [];
          
        }
        if(!contenedores[numeroContenedor][pallet].hasOwnProperty('cajasTotal')){
          contenedores[numeroContenedor][pallet]['cajasTotal'] = 0;
        }
        //se ingresa el total de las cajas en el pallet
        let cajasActuales = contenedores[numeroContenedor][pallet]['cajasTotal'];
        cajas = parseInt(entrada) - parseInt(cajasActuales);


        if((cajas < 0) || (!limiteCajasPallet(settingsTemp, entrada))) return 'Error en el numero de cajas'
        else{
          contenedores[numeroContenedor][pallet]['cajasTotal'] += cajas;
          //se ingresa la informacion general
          let palletTemp =   contenedores[numeroContenedor][pallet][loteActual.enf] 
          palletTemp.map((item:any, index:number) => {
      
            //se revisa si los datos son iguales a los datos previamente ingresados
            if(tipoCajaTemp == item[2] && calibreTemp == item[3] && calidadTemp == item[4] && fecha.getDate() == new Date(item[5]).getDate()){
              x = contenedores[numeroContenedor][pallet][loteActual.enf][index][1]
              y = parseInt(x) + cajas;
              contenedores[numeroContenedor][pallet][loteActual.enf][index][1] = y;
              flag = false
            }
          })
          if(flag){
                    //si no se encuentran que los datos son iguales se ingresa un nuevo vector en el objeto enf correspondiente
                    contenedores[numeroContenedor][pallet][loteActual.enf]
                    .push([loteActual.nombreLote, cajas, tipoCajaTemp, calibreTemp, calidadTemp, fecha])
          }
        }
      

   
    return contenedores;


}