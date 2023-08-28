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

interface contenedoresObj {
  [key: string]: contenedoresObj;
}

type loteType = {
  enf: string;
  nombreLote: string;
  tipoFruta: 'Naranja' | 'Limon';
};

type footerInfo = {
  numeroContenedor: string;
  pallet: string;
  configurarContenedor: (contenedores: contenedoresObj) => void;
  contenedores: any;
  loteActual: loteType;
  inforamcionSeleccion: string;
  obtenerSeleccionInformacion: (e: string) => void;
};

export default function Footer(props: footerInfo) {
  const [entrada, setEntrada] = useState<string>('');

  const getInput = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {
    setEntrada(e.nativeEvent.text);
  };

  const clickActualizarPallet = () => {
    console.log(props.contenedores[props.numeroContenedor][props.pallet]);

    // let newContenedor = props.contenedores;
    // newContenedor[props.numeroContenedor][props.pallet]['cajasTotal'] = 0
    // newContenedor[props.numeroContenedor][props.pallet][props.loteActual.enf][0][1]= 0
    // props.configurarContenedor(newContenedor);
    // console.log(newContenedor[props.numeroContenedor][props.pallet])

    if (!(entrada === '')) {
      if (
        props.contenedores[props.numeroContenedor][props.pallet].hasOwnProperty(
          'settings',
        )
      ) {
        if (props.loteActual.enf !== '') {
          let newContenedor = actualizarPallet(
            props.contenedores,
            props.numeroContenedor,
            props.pallet,
            props.loteActual,
            entrada,
          );
          if (newContenedor === 'Error en el numero de cajas')
            Alert.alert(newContenedor);
          else {
            setEntrada('');
            Alert.alert('Guardado con exito');
            props.configurarContenedor(newContenedor);
          }
        } else {
          Alert.alert('No ha obtenido el lote');
        }
      } else {
        Alert.alert('Configure el pallet');
      }
    } else Alert.alert('ingrese el numero de cajas');
  };

  const clickEliminar = () => {
    if (props.inforamcionSeleccion !== '') {
      let newContenedor = eliminarCajas(
        props.contenedores,
        props.numeroContenedor,
        props.pallet,
        props.inforamcionSeleccion,
        props.loteActual,
      );
      if (newContenedor === 'Error')
        Alert.alert(
          'No se puede eliminar ese item debido a que es de un lote pasado',
        );
      else {
        //console.log(newContenedor)
        props.configurarContenedor(newContenedor);
        props.obtenerSeleccionInformacion('');
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
