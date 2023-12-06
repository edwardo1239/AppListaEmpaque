/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import Header from './src/components/Header';
import Pallets from './src/components/Pallets';
import Informacion from './src/components/Informacion';
import Footer from './src/components/Footer';
import {useContenedoresStore} from './src/store/Contenedores';
import {useLoteStore} from './src/store/Predios';
import {useCajasSinPalletStore} from './src/store/Cajas';
import {LoteType, contenedoresObj, serverResponse, uploadServerType} from './src/store/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {io} from 'socket.io-client';

const socket = io('http://192.168.0.172:3001/');

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
  const {contenedores} = useContenedoresStore(state => state);
  const setSeleccion = useContenedoresStore(state => state.setSeleccion);
  const numeroContenedor = useContenedoresStore(state => state.numeroContenedor);
  const pallet = useContenedoresStore(state => state.pallet);

  // use Effect que obtiene los ocntenedores de memoria
  useEffect(() => {
    socket.on('connect_error', function (err) {
      Alert.alert(`connect_error due to ${err.message}`);
      console.log(`connect_error due to ${err.message}`);
    });
    const funcionFetchContenedores = async () => {
      await fetchContenedores();
      await fetchCajasSinPallet();
    };
    funcionFetchContenedores();
  }, []);

  //useefffect que crea los eventos con el servidor
  useEffect(() => {
    const fnAsync = async () => {
      socket.on('loteVaciando', (data: any) => {
        console.log(data);
        setLoteVaciando({
          enf: data.enf,
          nombreLote: data.nombreLote,
          tipoFruta: data.tipoFruta,
        });
      });

      //OBTENER ENF
      const requestENF = {data: {action: 'obtenerLoteVaciando'}, id: socket.id};
      const response: serverResponse = await new Promise((resolve, reject) => {
        socket.emit(
          'listaDeEmpaque',
          requestENF,
          (serverResponse: serverResponse) => {
            if (serverResponse.status === 200) {
              resolve(serverResponse);
            } else {
              resolve({status: 400, data: {}});
            }
          },
        );
      });
      if (response.status === 200) {
        setLoteVaciando({
          enf: response.data.enf,
          nombreLote: response.data.nombreLote,
          tipoFruta: response.data.tipoFruta,
        });
      } else {
        Alert.alert(
          `${response.status} Error obteniendo Lote: ${response.data}`,
        );
      }
      //OBTENER CONTENEDORES
      const requestListaEmpaque = {
        data: {action: 'obtenerListaEmpaque'},
        id: socket.id,
      };
      const responseListaEmpaque: serverResponse = await new Promise(
        (resolve, reject) => {
          socket.emit(
            'listaDeEmpaque',
            requestListaEmpaque,
            (serverResponse: serverResponse) => {
              if (serverResponse.status === 200) {
                resolve(serverResponse);
              } else {
                resolve({status: 400, data: {}});
              }
            },
          );
        },
      );
      if (responseListaEmpaque.status === 200) {
        setContenedores(responseListaEmpaque.data);
      } else {
        Alert.alert(
          `${responseListaEmpaque.status} Error obteniendo Lote: ${responseListaEmpaque.data}`,
        );
      }

      socket.on('nuevoContenedorToApp', async data => {
        console.log(data);
        const jsonValue: any = await AsyncStorage.getItem('contenedores');
        const contenedoresNuevo = await JSON.parse(jsonValue);
        const numeroContenedorNuevo: string[] = Object.keys(data);
        contenedoresNuevo[numeroContenedorNuevo[0]] =
          data[numeroContenedorNuevo[0]];

        setContenedores(contenedoresNuevo);
      });

    };
    fnAsync();
  }, []);

  const sincronizarConServidor = async () => {
      console.log("funcion pendiente")
  };

  const cerrarContenedor = async (numeroContenedor: string) => {
    try {
      const jsonValue: any = await AsyncStorage.getItem('contenedores');
      const contenedoresCerrar = await JSON.parse(jsonValue);

      const requestData = {action:'cerrarContenedor', numeroContenedor:numeroContenedor}
      const request = {data:requestData, id:socket.id}
      socket.emit('listaDeEmpaque', request, (serverResponse:serverResponse) =>{
        if(serverResponse.status === 200){
          Alert.alert("Contenedor cerrado con exito")
        }else{
          Alert.alert("ERROR AL CERRAR CONTENEDOR")
        }
      })

      delete contenedoresCerrar[numeroContenedor];

      const jsonValue2 = JSON.stringify(contenedoresCerrar);
      await AsyncStorage.setItem('contenedores', jsonValue2);

      setNumeroContenedor('0');
      setContenedores(contenedoresCerrar);
      setPallet('0');
      setSeleccion('');
    } catch (e) {
      console.error(e);
    }
  };

  const uploadServer = async (data:uploadServerType) => {
    try {
      const requestData = {action:'uploadInfo', 
                            pallet:contenedores[numeroContenedor][pallet], 
                            numeroContenedor:numeroContenedor, 
                            numeroPallet:pallet, 
                            dataIngreso:data}

      const request = {data:requestData, id:socket.id}
      socket.emit('listaDeEmpaque', request, (serverResponse:serverResponse) =>{
        console.log(serverResponse)
      })
    } catch (e) {
      Alert.alert('Error subiendo los datos');
    }
  };

  const uploadContenedor = async () =>{
    try {
      const requestData = {action:'uploadContenedor', contenedor:contenedores[numeroContenedor], numeroContenedor:numeroContenedor}
      const request = {data:requestData, id:socket.id}
      socket.emit('listaDeEmpaque', request, (serverResponse:serverResponse) =>{
        console.log(serverResponse)
      })
    } catch (e) {
      Alert.alert('Error subiendo los datos');
    }
  };

  const uploadLoteServer = async (data:uploadServerType) => {
    try{
      const requestData = {action:'uploadLote', tipoCaja:data.tipoCaja, cajasTotal:data.caja }
      const request = {data:requestData, id:socket.id}
      socket.emit('listaDeEmpaque', request, (serverResponse:serverResponse) =>{
        console.log(serverResponse)
      })
    } catch (e:any) {
      Alert.alert(`${e.name}: ${e.message}`)
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Header
          cerrarContenedor={cerrarContenedor}
          sincronizarConServidor={sincronizarConServidor}
        />

        <View style={styles.viewPallets}>
          <View>
            <Pallets uploadServer={uploadServer} uploadLoteServer={uploadLoteServer}/>
          </View>
          <View style={{height: 600, minWidth: 400}}>
            <Informacion />
          </View>
        </View>

        <Footer uploadServer={uploadServer} uploadContenedor={uploadContenedor}/>
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
