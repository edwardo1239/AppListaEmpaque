import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Button,
  Alert,
} from 'react-native';
import actualizarPallet from '../utils/actualizarPallet';
import eliminarCajas from '../utils/eliminarCajas';
import { useContenedoresStore } from '../store/Contenedores';
import { useLoteStore } from '../store/Predios';



export default function Footer() {

  const contenedores = useContenedoresStore(state => state.contenedores);
  const setContenedores = useContenedoresStore(state => state.setContenedores)
  const numeroContenedor = useContenedoresStore(state => state.numeroContenedor);
  const pallet = useContenedoresStore(state => state.pallet);
  const seleccionado = useContenedoresStore(state => state.seleccion);
  const loteActual = useLoteStore(state => state.loteActual);
  const loteVaciando = useLoteStore(state => state.loteVaciando);

  const [entrada, setEntrada] = useState<string>('');

  const getInput = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    setEntrada(e.nativeEvent.text);
  };

  const clickActualizarPallet = () => {
    //console.log(contenedores[numeroContenedor][pallet]);

    // let newContenedor = props.contenedores;
    // newContenedor[props.numeroContenedor][props.pallet]['cajasTotal'] = 0
    // newContenedor[props.numeroContenedor][props.pallet][props.loteActual.enf][0][1]= 0
    // props.configurarContenedor(newContenedor);
    // console.log(newContenedor[props.numeroContenedor][props.pallet])

    if (!(entrada === '' )) {
      if(!(pallet === '0')){
        if (
          contenedores[numeroContenedor][pallet].hasOwnProperty(
            'settings',
          )
        ) {
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
              setContenedores(newContenedor)
              setEntrada('');
              Alert.alert('Guardado con exito');
            }
          } else Alert.alert('No ha obtenido el lote');
          
        } else Alert.alert('Configure el pallet');
        
      } else Alert.alert("Error, no se puede actualizar las cajas sin pallet")
     
    } else Alert.alert('Error ingrese el numero de cajas ');
  };

  const clickEliminar = () => {
    if (seleccionado !== '') {
      let newContenedor = eliminarCajas(
        contenedores,
        numeroContenedor,
        pallet,
        seleccionado,
        loteActual,
        loteVaciando
      );
      if (newContenedor === 'Error')
        Alert.alert(
          'No se puede eliminar ese item debido a que es de un lote pasado',
        );
      else {
        setContenedores(newContenedor)
        Alert.alert("Eliminado con exito")
        //console.log(newContenedor)
        // props.configurarContenedor(newContenedor);
        // props.obtenerSeleccionInformacion('');
      }
    } else {
      Alert.alert('No ha seleccionado las cajas que desea eliminar');
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
        <Button title="Eliminar" onPress={clickEliminar} />
      </View>
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
});
