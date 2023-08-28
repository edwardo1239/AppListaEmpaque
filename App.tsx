/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import _ from 'lodash';
import Header from './src/components/Header';
import Pallets from './src/components/Pallets';
import Informacion from './src/components/Informacion';
import Footer from './src/components/Footer';
import {useContenedoresStore} from './src/store/Contenedores';
import { useLoteStore } from './src/store/Predios';
import { useCajasSinPalletStore } from './src/store/Cajas';

function App(): JSX.Element {

  //storage variables
  const fetchContenedores = useContenedoresStore(state => state.fetchContenedores);
  const fetchCajasSinPallet = useCajasSinPalletStore(state => state.fetchCajasSinPallet)
  const contenedores = useContenedoresStore(state => state.contenedores);
  const setLoteVaciando = useLoteStore(state => state.setLoteVaciando)
  const loteVaciando = useLoteStore(state => state.loteVaciando)



  //constantes contexion internet

  const [link, setLink] = useState<string>('');
 


  // const [banderaNuevosContenedores, setBanderaNuevosContenedores] =
  //   useState<boolean>(false);
  // const [inforamcionSeleccion, setInformacionSeleccion] = useState<string>('');



  //use Effect que obtiene los ocntenedores de memoria
  useEffect(()=> {
    const funcionFetchContenedores = async () => {
      fetchContenedores();
      fetchCajasSinPallet();
    }
    funcionFetchContenedores()
  }, [])

 
  //use efect con intervalos que obtienen el lote de vaciado actual
  useEffect(() => {
    const getLinks = async () => {
      try {
        console.log('conectando con links');
        const responseJSON = await fetch(
          'https://script.google.com/macros/s/AKfycbyxbqQq58evRO8Hp5FE88TJPatYPc03coveFaBc9cFYYIii-j5I1tvxsUOQH7xfJ8KB/exec',
        );
        const response = await responseJSON.json();
       
         setLink(response.listaEmpaque);
         const responseJSON1 = await fetch(link + '?action=predioVaciando');
         const loteVaciando = await responseJSON1.json();
         await setLoteVaciando(loteVaciando)
        console.log(link)
      } catch (e) {
        Alert.alert('Error obteniendo los links' + e);
      }
    };
    //console.log(contenedores)
    const interval = setInterval(async () => {
      //console.log("contenedores")
      try {
        console.log(link)
        if(link !== ''){
          console.log('fetchimg the lote')
          const responseJSON = await fetch(link + '?action=predioVaciando');
          const loteVaciando = await responseJSON.json();
          await setLoteVaciando(loteVaciando)
        }
        else{
          
          await getLinks();
        }
        
         
          //setLoteVaciando(response.infoPredio);

          // if (response.bandera === 1) {
          //   //crear funcion para obtener el nuevo contenedor
          //   // let newContenedorJSON = await fetch(link + '?action=listaEmpaque');
          //   // let newContenedor = await newContenedorJSON.json()
          //   // await configurarContenedor(newContenedor)
          // }
        
      } catch (e: any) {
        console.log(e);
        Alert.alert(e);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // const contenedorTabla = (numeroContenedor: string): void => {
  //   setNumeroContenedor(numeroContenedor);
  // };

  // const obtenerPallet = (numeroPallet: string): void => {
  //   setPallet(numeroPallet);
  // };

  // const configurarContenedor = async (contenedores: contenedoresObj) => {

  //   const contenedoresJSON = JSON.stringify(contenedores);
  //   await AsyncStorage.setItem('contenedores', contenedoresJSON);
  // };

  // const settingLoteActual = (predio: LoteType) => {
  //   setLoteActual(predio);
  // };

  // const obtenerSeleccionInformacion = (e:string):void => {
  //   setInformacionSeleccion(e);
  // }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Header />

        <View style={styles.viewPallets}>
          <Pallets />
          
          <Informacion />
            
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
