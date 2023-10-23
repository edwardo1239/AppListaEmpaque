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
import {LoteType, contenedoresObj} from './src/store/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {io} from 'socket.io-client';

const socket = io('ws://192.168.0.168:3001/');

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
  const setPallet = useContenedoresStore(state => state.setPallet);
  const { contenedores } = useContenedoresStore(state => state);
  const setSeleccion = useContenedoresStore(state => state.setSeleccion);

  let contador = 0;

  // use Effect que obtiene los ocntenedores de memoria
  useEffect(() => {
    const funcionFetchContenedores = async  () => {
      await fetchContenedores();
      await fetchCajasSinPallet();
    };
    funcionFetchContenedores();
    let numeroContenedores = Object.keys(contenedores);
    socket.emit('checkContenedoresUpdates', numeroContenedores);
    socket.emit('obtenerLoteVaciando')
  }, []);

 
  useEffect(() => {
    const timeInterval = setInterval(async () => {
     
        const jsonValue = await AsyncStorage.getItem('contenedores');
        const contenedores = jsonValue != null ? JSON.parse(jsonValue) : null;
        socket.emit('actualizarListaEmpaqueServidor', contenedores)
      
    }, 10_000);

    return () => clearTimeout(timeInterval); // Limpia el temporizador al desmontar el componente
  }, []);

  socket.on('loteVaciando', (data: any) => {
    setLoteVaciando(data);
  });

  socket.on('infoLoteVaciando', (data)=>{
    setLoteVaciando(data);
  })

  socket.on('listaEmpaque', data => {
    setContenedores(data);
  });

  socket.on('nuevoContenedor', async data => {
    const jsonValue: any = await AsyncStorage.getItem('contenedores');
    const contenedoresNuevo = await JSON.parse(jsonValue);
    const numeroContenedorNuevo: string[] = Object.keys(data);
    contenedoresNuevo[numeroContenedorNuevo[0]] =
      data[numeroContenedorNuevo[0]];

    setContenedores(contenedoresNuevo);
  });

  socket.on('nuevosContenedores', async data => {
    const jsonValue: any = await AsyncStorage.getItem('contenedores');
    const contenedoresNuevos = await JSON.parse(jsonValue);
    const numeroContenedoresNuevo: string[] = Object.keys(data);
    if(data.hasOwnProperty('status') && data.status === 200){
      console.log(data.message)
    }
    else{
      numeroContenedoresNuevo.forEach(numero => {
        contenedoresNuevos[numero] = data[numero];
      });
  
      setContenedores(contenedoresNuevos);
    }

  });

 
  const sincronizarConServidor = async () => {
    socket.emit('obtenerListaEmpaque');
  };

  const cerrarContenedor = async (numeroContenedor: string) => {
    try {
      const jsonValue: any = await AsyncStorage.getItem('contenedores');
      const contenedoresCerrar = await JSON.parse(jsonValue);

      socket.emit('cerrarContenedor', numeroContenedor)

      delete contenedoresCerrar[numeroContenedor];
     

      const jsonValue2 = JSON.stringify(contenedoresCerrar);
      await AsyncStorage.setItem('contenedores', jsonValue2);

      setNumeroContenedor('0');
      setContenedores(contenedoresCerrar);
      setPallet('0')
      setSeleccion('')
      
      
      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Header
          cerrarContenedor={cerrarContenedor}
          sincronizarConServidor={sincronizarConServidor}
          url={''}
        />

        <View style={styles.viewPallets}>
          <View>
            <Pallets />
          </View>
          <View style={{height: 600, minWidth: 400}}>
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
