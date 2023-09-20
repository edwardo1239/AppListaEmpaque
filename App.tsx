/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import _ from 'lodash';
import Header from './src/components/Header';
import Pallets from './src/components/Pallets';
import Informacion from './src/components/Informacion';
import Footer from './src/components/Footer';
import {useContenedoresStore} from './src/store/Contenedores';
import {useLoteStore} from './src/store/Predios';
import {useCajasSinPalletStore} from './src/store/Cajas';
import {contenedoresObj} from './src/store/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  //storage variables
  const fetchContenedores = useContenedoresStore(
    state => state.fetchContenedores,
  );
  const fetchCajasSinPallet = useCajasSinPalletStore(
    state => state.fetchCajasSinPallet,
  );
  const setLoteVaciando = useLoteStore(state => state.setLoteVaciando);
  const setContenedores = useContenedoresStore(state => state.setContenedores);
  const setNumeroContenedor = useContenedoresStore(
    state => state.setNumeroContenedor,
  );
  const contenedores = useContenedoresStore(state => state.contenedores);

  const [url, setUrl] = useState<string>('');

  var link: string = '';
  let contador = 0;

  // use Effect que obtiene los ocntenedores de memoria
  useEffect(() => {
    const funcionFetchContenedores = () => {
      fetchContenedores();
      fetchCajasSinPallet();
    };
    funcionFetchContenedores();
  }, []);

  //use efect con intervalos que obtienen el lote de vaciado actual
  useEffect(() => {
    const getLinks = async () => {
      try {
        const responseJSON = await fetch(
          'https://script.google.com/macros/s/AKfycbyxbqQq58evRO8Hp5FE88TJPatYPc03coveFaBc9cFYYIii-j5I1tvxsUOQH7xfJ8KB/exec',
        );
        const response = await responseJSON.json();

        //link = response.listaEmpaque;
        link = response.listaEmpaque;
      } catch (e) {
        Alert.alert('Error obteniendo los links' + e);
      }
    };

    const interval = setInterval(async () => {
      try {
        contador++;
        setUrl(link);

        if (link !== '') {
          const responseJSON = await fetch(link + '?action=predioVaciando');
          const loteVaciando = await responseJSON.json();

          //console.log(loteVaciando)
          await setLoteVaciando(loteVaciando);
        } else {
          await getLinks();
        }
        if (contador >= 120) {
          setUrl(link);
          await enviarDataContenedores(link);
          contador = 0;
        }
      } catch (e: any) {
        console.log(e);
        Alert.alert(e);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cerrarContenedor = async (numeroContenedor: string) => {
    try {
      const jsonValue: any = await AsyncStorage.getItem('contenedores');
      const contenedoresCerrar = await JSON.parse(jsonValue);
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          action: 'cerrarContenedor',
          contenedor: contenedoresCerrar[numeroContenedor],
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const responseJson = await response.json();

      console.log(responseJson);

      delete contenedoresCerrar[numeroContenedor];

      setNumeroContenedor('0');
      setContenedores(contenedoresCerrar);

      console.log(contenedoresCerrar);
    } catch (e) {
      console.error(e);
    }
  };

  const sincronizarConServidor = async () => {
    let newContenedorJSON = await fetch(url + '?action=listaEmpaque');
    let newContenedor = await newContenedorJSON.json();
    //console.log(newContenedor)
    setContenedores(newContenedor);
  };

  const enviarDataContenedores = async (url:string) => {
    const jsonValuex: any = await AsyncStorage.getItem('contenedores');
    const contenedoresOut = await JSON.parse(jsonValuex);

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        action: 'actualizar',
        contenedores: contenedoresOut,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const responseJson = await response.json();

    if (responseJson === 'Listas de empaque actualizadas') {
      console.log('Listas de empaque actualizadas');
      Alert.alert('Guardado con exito');
    } else {
      let key: any = Object.keys(responseJson);
      contenedoresOut[key[0]] = responseJson[key[0]];

      console.log(responseJson);
      setContenedores(contenedoresOut);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container} >
        <Header
          cerrarContenedor={cerrarContenedor}
          sincronizarConServidor={sincronizarConServidor}
          enviarDataContenedores={enviarDataContenedores}
          url={url}
        />

        <View style={styles.viewPallets}>
          <View><Pallets /></View>
          <View style={{height:600}}>
          <Informacion />
          </View>
        </View>

        <Footer />
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
