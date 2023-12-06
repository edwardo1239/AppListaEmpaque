import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from 'react-native';
import { useContenedoresStore } from '../store/Contenedores'; 
import { useLoteStore } from '../store/Predios';
import { useCajasSinPalletStore } from '../store/Cajas';
import { contenedorType } from '../store/types';

type headerType = {
  cerrarContenedor: (numeroContenedor:string) => void
  sincronizarConServidor: () => void
}

export default function Header(props:headerType): JSX.Element {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [cliente, setCliente] = useState<string>('Contenedores');

  const [confirmacionModal, setConfirmacionModal] = useState<boolean>(false)
  const [confirmacion, setConfirmacion] = useState<string>('')



  const {contenedores} = useContenedoresStore(state => state);
  const setNumeroContenedor = useContenedoresStore(state => state.setNumeroContenedor);
  const loteVaciando = useLoteStore(state => state.loteVaciando);
  const setLoteActual = useLoteStore(state => state.setLoteActual);
  const loteActual = useLoteStore(state => state.loteActual)
  const numeroContenedor = useContenedoresStore(state => state.numeroContenedor)
  const cajasSinPallet = useCajasSinPalletStore(state => state.CajasSinPallet)
  const setPallet = useContenedoresStore(state => state.setPallet)
  
  // const toggleSwitch = (): void =>
  //   setIsEnabled(previousState => !previousState);

  // const obtenerLoteActual = () => {
  //   props.settingLoteActual(props.predio);
  //   setLoteActualHeader(props.predio.enf + '  ' + props.predio.nombreLote);
  // };

  const obtenerGuardarInfo = async () =>{
    setLoteActual(loteVaciando)
  }

  const clickOpenConfirmacion = (e:string) =>{

    if(e === '¿Deseas cerrar el contenedor?'){
      setConfirmacion(e)
      setConfirmacionModal(true)
     
    }
    else if (e === '¿Desea sincronizar los datos con el servidor?'){
      setConfirmacion(e)
      setConfirmacionModal(true)
     
    }
  }

  const clickCerrarContenedor = () => {

    setConfirmacionModal(false)
    let flagCerrarContenedor = true

    Object.keys(contenedores[numeroContenedor]).map((item) => {
      if(item !== 'infoContenedor'){
        if(!contenedores[numeroContenedor][item].hasOwnProperty('liberado')){
          flagCerrarContenedor = false
        }
        if(contenedores[numeroContenedor][item]['liberado'] == false){
          flagCerrarContenedor = false
        }
      }
    });

    if(flagCerrarContenedor){
      props.cerrarContenedor(numeroContenedor)
    }
    else {
      Alert.alert("Se deben liberar todos los pallets antes de cerrar el contenedor")
    }
   
  }

  const clickAceptar = () =>{
    if(confirmacion === '¿Deseas cerrar el contenedor?'){
     
      clickCerrarContenedor()
    }
    else if (confirmacion === '¿Desea sincronizar los datos con el servidor?'){
      props.sincronizarConServidor()
      setConfirmacionModal(false)

    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => clickOpenConfirmacion('¿Desea sincronizar los datos con el servidor?')}>
        <Image
          source={require('../assets/CELIFRUT.png')}
          style={styles.image}
          
        />
      </TouchableOpacity>

      <View>
        <Button title='Cerrar Contenedor' onPress={() => clickOpenConfirmacion('¿Deseas cerrar el contenedor?')}/>
      </View>

      <View>
        <Text>Predio Vaciando:</Text>
        <Text>{loteVaciando.enf + '  ' + loteVaciando.nombreLote}</Text>
      </View>

      <View>
        <Image
          source={loteVaciando.tipoFruta === 'Limon' ?  require('../assets/limon.jpg') : require('../assets/naranja.jpg')}
          style={styles.image}
          />
      </View>
 
      <View>
        <Text>Predio Actual:</Text>
        <Text>{loteActual.enf + '  ' + loteActual.nombreLote}</Text>
      </View>
      
      <View>
        <Image
           source={loteActual.tipoFruta === 'Limon' ?  require('../assets/limon.jpg') : require('../assets/naranja.jpg')}
          style={styles.image}
          />
      </View>

      { <View>
        <Text>Cajas Total:</Text>
        <Text>{contenedores && contenedores[numeroContenedor] && cajasSinPallet
        &&
        Object.keys(contenedores[numeroContenedor]).reduce((acu:number, item:any) => {
          if(item === 'config' || item === 'infoContenedor'){}
          else
           {
           
            if(contenedores[numeroContenedor][item].hasOwnProperty('cajasTotal')){

              acu += (contenedores[numeroContenedor][item]['cajasTotal'])
            }
            
          }
          
          return acu
        }, 0)
        
        +

        Object.keys(cajasSinPallet).reduce((acu1, item1) => acu1 + cajasSinPallet[item1].reduce((acu2:number, item2:number[]) => acu2 + item2[1],0),0)

        }</Text>
      </View> }

  
        <TouchableOpacity
        style={styles.buttonContenedores}
        onPress={obtenerGuardarInfo}>
        <Text>Obtener Lote</Text>
      </TouchableOpacity>
      
    
      <TouchableOpacity
        style={styles.buttonContenedores}
        onPress={() => {
        if(Object.keys(contenedores).length !== 0)
        setModalVisible(true)}}>
        <Text>{cliente}</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.centerModal}>
          <View style={styles.viewModal}>
            <FlatList
              data={contenedores && Object.keys(contenedores)}
              style={styles.pressableStyle}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setCliente(
                      item + '-' + contenedores[item]['infoContenedor']['nombreCliente'],
                    );
                    // props.obtenerContenedor(item);
                    setNumeroContenedor(item);
                    setModalVisible(false);
                    setPallet('0')
                    
                  }}>
                  {item != 'config' && (
                    <Text style={styles.textList}>
                      {item + '-' + contenedores[item]['infoContenedor']['nombreCliente']}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={confirmacionModal} animationType="fade">
        <TouchableOpacity  style={styles.centerConfimarcionModal} onPress={() => setModalVisible(false)}>
          <View style={styles.viewModalConfirmacion}>
            <Text style={styles.titleModalConfirmacion}>{confirmacion}</Text>
            <View style={styles.modalButtonsConfirmacion}>
              <Button title='aceptar' onPress={clickAceptar}/>
              <Button title='Cancelar' onPress={() => setConfirmacionModal(false)}/>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    top: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,

    paddingRight: 10,
    elevation: 40,
    shadowColor: '#52006A',

  },

  image: {
    width: 60,
    height: 60,
  },

  buttonContenedores: {
    backgroundColor: 'white',
    width: 150,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#7D9F3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerModal: {
    flex: 1,
    alignItems: 'center',
    marginTop: '6%',
    backgroundColor:'rgba(0,0,0,0.25'
  },
  viewModal: {
    display: 'flex',
    backgroundColor: 'white',
    width: 350,
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
    marginLeft: '65%',
    gap: 50,
  },
  pressableStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  textList: {
    color: 'black',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    fontSize: 20,
  },
  centerConfimarcionModal:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'10%'
  },
  viewModalConfirmacion:{
    width:450,
    height:200,
    backgroundColor:'white',
    borderRadius:20,
    elevation:20,
    display:'flex',
    flexDirection: 'column',
    justifyContent:'center',
    gap:50,
    textAlign:'center'
  },
  titleModalConfirmacion:{
    fontSize:25,
    fontWeight:'bold',
    marginLeft:60
  },
  modalButtonsConfirmacion:{
    display:'flex',
    flexDirection:'row',
    gap:25,
    justifyContent:'center'
  }
});
