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
  Switch,
} from 'react-native';
import { useContenedoresStore } from '../store/Contenedores'; 
import { useLoteStore } from '../store/Predios';
import { useCajasSinPalletStore } from '../store/Cajas';


export default function Header(): JSX.Element {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [cliente, setCliente] = useState<string>('Contenedores');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [loteActualHeader, setLoteActualHeader] = useState<string>('');


  const contenedores = useContenedoresStore(state => state.contenedores);
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


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require('../assets/CELIFRUT.png')}
          style={styles.image}
        />
      </View>

      <View>
        <Text>Predio Vaciando:</Text>
        <Text>{loteVaciando.enf + '  ' + loteVaciando.nombreLote}</Text>
      </View>
 
      <View>
        <Text>Predio Actual:</Text>
        <Text>{loteActual.enf + '  ' + loteActual.nombreLote}</Text>
      </View>

      { <View>
        <Text>Cajas Total:</Text>
        <Text>{ contenedores[numeroContenedor]
        &&
        Object.keys(contenedores[numeroContenedor]).reduce((acu:number, item:any) => {
          if(item === 'config' || item === 'nombreCliente'){}
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
        onPress={() => setLoteActual(loteVaciando)}>
        <Text>Obtener Lote</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContenedores}
        onPress={() => setModalVisible(true)}>
        <Text>{cliente}</Text>
      </TouchableOpacity>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.centerModal}>
          <View style={styles.viewModal}>
            <FlatList
              data={Object.keys(contenedores)}
              style={styles.pressableStyle}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setCliente(
                      item + '-' + contenedores[item]['nombreCliente'],
                    );
                    // props.obtenerContenedor(item);
                    setNumeroContenedor(item);
                    setModalVisible(false);
                    setPallet('0')
                    
                  }}>
                  {item != 'config' && (
                    <Text style={styles.textList}>
                      {item + '-' + contenedores[item]['nombreCliente']}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
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
});
