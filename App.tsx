/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Header from './src/components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import Pallets from './src/components/Pallets';
import Informacion from './src/components/Informacion';
import Footer from './src/components/Footer';
import  fetchData  from './src/utils/fetchData';

interface contenedoresObj {
  [key: string]: contenedoresObj;
}

type loteType = {
  enf: string;
  nombreLote: string;
  tipoFruta: 'Naranja' | 'Limon';
};

function App(): JSX.Element {
  let getLinksFlag: boolean = true;
  const [link, setLink] = useState<string>('');
  const [contenedores, setContenedores] = useState<contenedoresObj>({});
  const [numeroContenedor, setNumeroContenedor] = useState<string>('0');
  const [pallet, setPallet] = useState<string>('0');
  const [predio, setPredio] = useState<loteType>({
    enf: '',
    nombreLote: '',
    tipoFruta: 'Naranja',
  });
  const [loteActual, setLoteActual] = useState<loteType>({
    enf: '',
    nombreLote: '',
    tipoFruta: 'Naranja',
  });
  const [banderaNuevosContenedores, setBanderaNuevosContenedores] =
    useState<boolean>(false);
  const [banderaInternet, setBanderaInternet] = useState<boolean>(false);
  const [inforamcionSeleccion, setInformacionSeleccion] = useState<string>('');

  // use effect para obtener los links que indican la api actual
  useEffect((): void => {
    const getLinks = async () => {
      try {
        console.log('conectando con links');
        const responseJSON = await fetch(
          'https://script.google.com/macros/s/AKfycbyxbqQq58evRO8Hp5FE88TJPatYPc03coveFaBc9cFYYIii-j5I1tvxsUOQH7xfJ8KB/exec',
        );
        const response = await responseJSON.json();
        await setLink(response.listaEmpaque);
        getLinksFlag = false;
      } catch (e) {
        Alert.alert('Error obteniendo los links' + e);
      }
    };
    getLinks();
  }, [banderaInternet]);
  // use efect para obtener la listas de empaques por primera vez
  useEffect((): void => {
    const showContenedores = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('contenedores');
        let x = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log(x);
        if (x !== null) {
          setContenedores(x);
        }
      } catch (e) {
        console.error(e);
      }
    };

    showContenedores();
  }, []);
  // use efect con intervalos que obtienen el lote de vaciado actual
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        let numeroContenedores = Object.keys(contenedores).map(item => item);
        if (link === '') {
          Alert.alert('Intentando tener conexion con el servidor');
          setBanderaInternet(!banderaInternet);
        }
        //console.log(numeroContenedores)
        if (Object.keys(contenedores).length !== 0 && link !== '') {
          const responseJSON = await fetch(link, {
            method: 'POST',
            body: JSON.stringify({
              action: 'predioVaciando',
              contenedores: numeroContenedores,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
          const response = await responseJSON.json();
          setPredio(response.infoPredio);
          //console.log(response);
          if (response.bandera === 1) {
            //crear funcion para obtener el nuevo contenedor
            // let newContenedorJSON = await fetch(link + '?action=listaEmpaque');
            // let newContenedor = await newContenedorJSON.json()
            // await configurarContenedor(newContenedor)
          }
        }
      } catch (e: any) {
        console.log(e);
        Alert.alert(e);
      }
    }, 10000);
    return () => clearInterval(interval);
  });

  const contenedorTabla = (numeroContenedor: string): void => {
    setNumeroContenedor(numeroContenedor);
  };

  const obtenerPallet = (numeroPallet: string): void => {
    setPallet(numeroPallet);
  };

  const configurarContenedor = async (contenedores: contenedoresObj) => {
    setContenedores(contenedores);

    const contenedoresJSON = JSON.stringify(contenedores);
    await AsyncStorage.setItem('contenedores', contenedoresJSON);
  };

  const settingLoteActual = (predio: loteType) => {
    setLoteActual(predio);
  };

  const obtenerSeleccionInformacion = (e:string):void => {
    setInformacionSeleccion(e);
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Header
          obtenerContenedor={contenedorTabla}
          contenedores={contenedores}
          predio={predio}
          settingLoteActual={settingLoteActual}
        />
        <View style={styles.viewPallets}>
          <Pallets
            numeroContenedor={numeroContenedor}
            obtenerPallet={obtenerPallet}
            contenedores={contenedores}
            configurarContenedor={configurarContenedor}
            loteActual={loteActual}
            obtenerSeleccionInformacion={obtenerSeleccionInformacion}
            pallet={pallet}

          />
          <Informacion
              numeroContenedor={numeroContenedor}
              pallet={pallet}
              configurarContenedor={configurarContenedor}
              contenedores={contenedores}
              loteActual={loteActual}
              obtenerSeleccionInformacion={obtenerSeleccionInformacion}
              inforamcionSeleccion={inforamcionSeleccion}
          />
        </View>
        <Footer
          numeroContenedor={numeroContenedor}
          pallet={pallet}
          configurarContenedor={configurarContenedor}
          contenedores={contenedores}
          loteActual={loteActual}
          inforamcionSeleccion={inforamcionSeleccion}
          obtenerSeleccionInformacion={obtenerSeleccionInformacion}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#719DF5',
  },
  viewPallets: {
    display: 'flex',
    flexDirection: 'row',
  },
});
