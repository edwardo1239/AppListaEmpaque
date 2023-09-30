import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Button,
  Alert,
  Modal,
  Text,
} from 'react-native';
import actualizarPallet from '../utils/actualizarPallet';
import eliminarCajas from '../utils/eliminarCajas';
import {useContenedoresStore} from '../store/Contenedores';
import {useLoteStore} from '../store/Predios';
import { useCajasSinPalletStore } from '../store/Cajas';
import eliminarCajasSinPallet from '../utils/eliminarCajasSinPallet';
import moverCajas from '../utils/moverCajas';
import moverCajasSinPallet from '../utils/moverCajasSinPallet';
import { CajasSinPalletType, contenedoresObj } from '../store/types';
import sumarCaja from '../utils/sumarCaja';
import sumarCajasSinPallet from '../utils/sumarCajasSinPallet';
import restarCajasSinPallet from '../utils/restarCajasSinPallet';
import restarCajas from '../utils/restarCajas';


export default function Footer() {
  //varables del contenedor
  const contenedores = useContenedoresStore(state => state.contenedores);
  const setContenedores = useContenedoresStore(state => state.setContenedores);
  const numeroContenedor = useContenedoresStore(state => state.numeroContenedor);
  const pallet = useContenedoresStore(state => state.pallet);
  const seleccionado = useContenedoresStore(state => state.seleccion);
  const setSeleccionado = useContenedoresStore(state => state.setSeleccion)

  //variables de los predios
  const loteActual = useLoteStore(state => state.loteActual);
  const loteVaciando = useLoteStore(state => state.loteVaciando);

  //variables de las cajas sin pallet
  const cajasSinPallet = useCajasSinPalletStore(state => state.CajasSinPallet);
  const setCajasSinPallet = useCajasSinPalletStore(state => state.setCajasSinPallet);

  const [entrada, setEntrada] = useState<string>('');
  const [entradaModalPallet, setEntradaModalPallet] = useState<string>('');
  const [entradaModalCajas, setEntradaModalCajas] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [update, forceUpdate] = useState<boolean>(false)


  //Funcion que obtiene el dato de la entrada en el footer
  const getInput = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    setEntrada(e.nativeEvent.text);
  };

  const getInputModalPallet = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    setEntradaModalPallet(e.nativeEvent.text);
  };

  const getInputModalCajas = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    setEntradaModalCajas(e.nativeEvent.text);
  };
//Funcion que actualiza el pallet
  const clickActualizarPallet = () => {


    // let newContenedor = props.contenedores;
    // newContenedor[props.numeroContenedor][props.pallet]['cajasTotal'] = 0
    // newContenedor[props.numeroContenedor][props.pallet][props.loteActual.enf][0][1]= 0
    // props.configurarContenedor(newContenedor);


    if (!(entrada === '')) {
      if (!(pallet === 'sinPallet' || pallet === '0')) {
        if (contenedores[numeroContenedor][pallet].hasOwnProperty('settings')) {
          if (loteActual.enf !== '') {
            let newContenedor = actualizarPallet(
              contenedores,
              numeroContenedor,
              pallet,
              loteActual,
              entrada,
            );
            if (newContenedor === 'Error en el numero de cajas')
              Alert.alert(newContenedor);
            else {
              forceUpdate(!update)
              setContenedores(newContenedor);
              setEntrada('');
    
            }
          } else Alert.alert('No ha obtenido el lote');
        } else Alert.alert('Configure el pallet');
      } else Alert.alert('Error, no se puede actualizar las cajas sin pallet');
    } else Alert.alert('Error ingrese el numero de cajas ');
  };
//funcion que elimina el elemento del pallet
  const clickEliminar = () => {
    let newContenedor;
    let newCajasSinPallet;

    
    if (seleccionado !== '') {
      if (pallet !== 'sinPallet') {
        newContenedor = eliminarCajas(
          contenedores,
          numeroContenedor,
          pallet,
          seleccionado,
          loteActual,
          loteVaciando,
        );
        
      if (newContenedor === 'Error') { Alert.alert('No se puede eliminar ese item')}
      else {
        setContenedores(newContenedor);
       

        // props.configurarContenedor(newContenedor);
        // props.obtenerSeleccionInformacion('');
      }
    } else{
        newCajasSinPallet = eliminarCajasSinPallet(
          cajasSinPallet,
          seleccionado
        )
        setCajasSinPallet(newCajasSinPallet)
        setSeleccionado('')
      
        
      }}
      else {
        Alert.alert('No ha seleccionado las cajas que desea eliminar');
      }
        

 
  };
//funcion que abre el modal para mover los items
  const clickOpenMoverCajas = () => {
    if(pallet == '0') return Alert.alert("Seleccione un pallet")
    if(seleccionado == '') return Alert.alert("Seleccione un item que desee mover a otro pallet")
    setOpenModal(true)
  };
//funcion que llama ala funcion que mueve elementos de una pallet a otro
  const clickMoverCajas = () => {
    
    let newContenedor: contenedoresObj;
    let newCajasSinPallet: CajasSinPalletType;
    if(entradaModalPallet == '') return Alert.alert("Ingrese el pallet al que desea mover las cajas");
    if(entradaModalCajas == '') return Alert.alert("Ingrese el numero de cajas que desea mover");
    if(pallet == 'sinPallet'){
      //si el translado es entre las cajas sin pallet y un pallet
      let intModalPallet:number = parseInt(entradaModalPallet)
      let intModalCajas:number = parseInt(entradaModalCajas)
      let [enf, index] = seleccionado.split("/")
      if( intModalPallet <= 0 || intModalPallet > Object.keys(contenedores[numeroContenedor]).length -1) return Alert.alert("Ingrese un numero de pallet correcto");
      if( intModalCajas > cajasSinPallet[enf][index][1] || intModalCajas <= 0) return Alert.alert("Ingrese un numero de cajas correcto");
      [newContenedor, newCajasSinPallet] = moverCajasSinPallet(contenedores, numeroContenedor, cajasSinPallet, seleccionado, entradaModalPallet, intModalCajas);
      setContenedores(newContenedor)
      setCajasSinPallet(newCajasSinPallet)
      setOpenModal(false)
      setEntradaModalCajas('')
      setEntradaModalPallet('')
    } else {
      //SI el translado es entre pallets
  
      let intModalPallet:number = parseInt(entradaModalPallet)
      let intModalCajas:number = parseInt(entradaModalCajas)
      let [enf, index] = seleccionado.split("/")
      if( intModalPallet < 0 || intModalPallet > Object.keys(contenedores[numeroContenedor]).length -1) return Alert.alert("Ingrese un numero de pallet correcto");
      if( intModalCajas > contenedores[numeroContenedor][pallet][enf][index][1] || intModalCajas <= 0) return Alert.alert("Ingrese un numero de cajas correcto");
      if( intModalPallet == 0){
        let newCajasSinPallet = moverCajas(contenedores, numeroContenedor, pallet, seleccionado, entradaModalPallet, cajasSinPallet, intModalCajas);
        setCajasSinPallet(newCajasSinPallet)
        console.log(newCajasSinPallet)
      } else{
        let newContenedor = moverCajas(contenedores, numeroContenedor, pallet, seleccionado, entradaModalPallet, cajasSinPallet, intModalCajas);
        setContenedores(newContenedor)
      }
      setOpenModal(false)
      setEntradaModalCajas('')
      setEntradaModalPallet('')
    }
  };
//funcion para sumar cajas al item
  const clickSumarCajas = () => {

    if(entrada == '') return Alert.alert("Ingrese el numero de cajas que desea sumar al item")
    if(pallet == '0') return Alert.alert("Seleccione un pallet")
    if(loteActual.enf == '') return Alert.alert("Seleccione lote")
    
    //if para saber si es un pallet o es cajasSinPallet
    if(pallet == 'sinPallet'){
      if(seleccionado == '') return Alert.alert("Seleccione el item al que desea sumarle cajas")
      let newCajasSinPallet = sumarCajasSinPallet(cajasSinPallet, seleccionado, loteActual, parseInt(entrada))
    if(typeof(newCajasSinPallet) == 'string') return Alert.alert(newCajasSinPallet)
    else{

      setCajasSinPallet(newCajasSinPallet)
    }
    }
    else {
      if(!contenedores[numeroContenedor][pallet].hasOwnProperty("settings")) return Alert.alert("Configure el lote")
      let newContenedores = sumarCaja(contenedores, numeroContenedor, pallet, seleccionado, loteActual, parseInt(entrada))
      if(typeof(newContenedores) == 'string') return Alert.alert(newContenedores)
      else{
   
        setContenedores(newContenedores)
      }
    }
      


    setEntrada('')
    
  };
  //funcion para restar cajas
  const clickRestarCajas = () => {
    if(pallet == '0') return Alert.alert("Seleccione un pallet")
    if(entrada == '') return Alert.alert("Ingrese el numero de cajas")
    if(seleccionado == '') return Alert.alert("Seleccione el item al que desea restar cajas")

    
    if(pallet == 'sinPallet'){
      let newCajasSinPallet = restarCajasSinPallet(cajasSinPallet,seleccionado,loteActual,parseInt(entrada))
      if(typeof(newCajasSinPallet) == 'string') return Alert.alert(newCajasSinPallet);
      else{
        setCajasSinPallet(newCajasSinPallet)
       
        setEntrada('')
      }
    }
    else{
      let newContenedores = restarCajas(contenedores,numeroContenedor,pallet,seleccionado,loteActual,parseInt(entrada))
      if(typeof(newContenedores) == 'string') return Alert.alert(newContenedores);
      else{
        setContenedores(newContenedores)
      
        setEntrada('')
      }
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Button title="Actualizar Pallet" onPress={clickActualizarPallet} />
      </View>
      <View style={styles.viewTextInput}>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          value={entrada}
          onChange={e => getInput(e)}></TextInput>
      </View>
      <View>
        <Button title="Sumar" onPress={clickSumarCajas}/>
      </View>
      <View>
        <Button title="Restar" onPress={clickRestarCajas}/>
      </View>
      <View>
        <Button title="Mover" onPress={clickOpenMoverCajas}/>
      </View>
      <View>
        <Button title="Eliminar" onPress={clickEliminar} />
      </View>


      {/* Modal */}
    <Modal transparent={true} visible={openModal} animationType="fade">

      <View style={styles.centerModal}>
        <View style={styles.viewModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.textModalHeader}>Ingrese el numero del pallet al que desea mover el item</Text>
          </View>
          <View style={styles.modalInputView}>
            <TextInput keyboardType="numeric" style={styles.modalInput} onChange={(e) => getInputModalPallet(e)} value={entradaModalPallet}></TextInput>
          </View>
          <View style={styles.modalHeader}>
            <Text style={styles.textModalHeader}>Ingrese el numero de cajas que desea mover</Text>
          </View>
          <View style={styles.modalInputView}>
            <TextInput keyboardType="numeric" style={styles.modalInput} onChange={(e) => getInputModalCajas(e)} value={entradaModalCajas}></TextInput>
          </View>
          <View style={styles.viewButtonsModal}>
            <Button title='Mover' onPress={clickMoverCajas}/>
            <Button title='Cancelar' onPress={() => setOpenModal(false)}/>
          </View>
        </View>
      </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8B9E39',
    height: '180%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 40,
  },
  buttons: {
    backgroundColor: '#390D52',
    width: 120,
    height: 60,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  textInput: {
    width: 150,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  viewTextInput: {
    display: 'flex',
  },
  centerModal:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'10%'
  },
  viewModal:{
    width:500,
    height:350,
    backgroundColor:'white',
    borderRadius:20,
    elevation:30,
    shadowColor:'black',
    padding:10
  },
  modalHeader:{
    padding:10
  },
  textModalHeader:{
    fontSize:18,
    fontWeight:'500'
  },
  modalInputView:{
    margin:10,
    paddingRight:50,
    paddingLeft:10
  },
  modalInput:{
    borderWidth:1,
    borderRadius:10,
    borderColor:'#7D9F3A',
    backgroundColor:'#F5F5F5'
  },
  viewButtonsModal:{
    display:'flex',
    flexDirection:'row',
    gap:50,
    alignItems:'center',
    justifyContent:'center',
    marginTop:30
  }

});
