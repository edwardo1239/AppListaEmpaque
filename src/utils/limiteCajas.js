//Funcion que verifica la cantidad de cajas que se permite en el pallet 

export default function limiteCajasPallet(settings,numeroCajas){

    try{
        switch(settings['tipoCaja']){
            case 'G-40':
            case 'B-40':
                if(numeroCajas > 64) return false;
                else return true;
            case 'B-30':
            case 'G-30':
                if(numeroCajas > 90) return false;
                else return true;
            case 'G-37':
            case 'B-37':
                if(numeroCajas > 70) return false;
                else return true;
            case 'G-4.5':
                if(numeroCajas > 70) return false;
                else return true;
            default: return settings['tipoCaja']
        }
    }catch(e){
        return e
    }
}

