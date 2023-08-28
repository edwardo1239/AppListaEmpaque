import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,

} from 'react-native';

import SettingPalletLimon from '../modals/SettingPalletLimon';
import SettingPalletNaranja from '../modals/SettingPalletNaranja';

interface contenedoresObj {
  [key: string]: contenedoresObj;
}

type palletProps = {
  numeroContenedor: string;
  obtenerPallet: (pallet: string) => void;
  contenedores: any;
  configurarContenedor: (contenedores: contenedoresObj) => void;
  loteActual: any;
  obtenerSeleccionInformacion: (e:string) => void
  pallet:string
};

export default function Pallets(props: palletProps) {
 
  const [openModal, setOpenModal] = useState<boolean>(false);

  const palletPress = (e: string) => {

    //console.log(props.contenedores[props.numeroContenedor][pallet]);
    props.obtenerPallet(e);
    props.obtenerSeleccionInformacion('')
  };

  const openPalletSettings = (e: string) => {
    setOpenModal(true);
    props.obtenerPallet(e);
  };

  const closeModal = (e: boolean): void => {
    setOpenModal(e);
  };

  const guardarSettings = (
    radioButtonTipoCaja: string,
    radioButtonCalidad: number,
    radioButtonCalibre: number,
  ): void => {
    let contenedoresTemp = props.contenedores;
    if (!contenedoresTemp[props.numeroContenedor].hasOwnProperty('settings')) {
      contenedoresTemp[props.numeroContenedor][props.pallet]['settings'] = {};
    }
    contenedoresTemp[props.numeroContenedor][props.pallet]['settings']['tipoCaja'] =
      radioButtonTipoCaja;
    contenedoresTemp[props.numeroContenedor][props.pallet]['settings']['calidad'] =
      radioButtonCalidad;
    contenedoresTemp[props.numeroContenedor][props.pallet]['settings']['calibre'] =
      radioButtonCalibre;

    //console.log(contenedoresTemp);
    props.configurarContenedor(contenedoresTemp);
    setOpenModal(false);
  };

  return (
    <View style={styles.container}>
      {props.numeroContenedor !== '0' &&
        Object.keys(props.contenedores[props.numeroContenedor]).map(
          item =>
            item !== 'nombreCliente' && (
              <View style={styles.palletContainer} key={'view' + item}>
                <TouchableOpacity
                  key={'button' + item}
                  style={
                    props.pallet !== '0'  && props.pallet == item
                      ? styles.palletsPress
                      : styles.palletsButons
                  }
                  onPress={() => palletPress(item)}
                  onLongPress={() => openPalletSettings(item)}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'center',
                      gap: 10,
                    }}>
                    <Image
                      key={'img' + item}
                      source={require('../assets/palletIMG.png')}
                      style={styles.image}
                    />
                    <Text style={{fontSize: 20}}>
                      {props.contenedores[props.numeroContenedor][
                        item
                      ].hasOwnProperty('settings') &&
                        props.contenedores[props.numeroContenedor][item][
                          'settings'
                        ]['calibre']}
                    </Text>
                  </View>
                  <View style={{marginLeft: 25}}>
                    <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                      {props.contenedores[props.numeroContenedor][
                        item
                      ].hasOwnProperty('cajasTotal') &&
                        props.contenedores[props.numeroContenedor][item][
                          'cajasTotal'
                        ]}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.fonts} key={'pallet' + item}>
                  Pallet {item}
                </Text>
              </View>
            ),
        )}

        <View style={styles.palletContainer}>
          <TouchableOpacity     style={
                    props.pallet !== '0' &&  props.pallet === 'sinPallet'  
                      ? styles.palletsPress
                      : styles.palletsButons
                  }
                  onPress={() => palletPress('sinPallet')}
                  onLongPress={() => openPalletSettings('sinPallet')}>
                  <Text>Cajas Sin Pallet</Text>


          </TouchableOpacity>
        </View>


      {props.loteActual.tipoFurta === 'Limon' ? (
        <SettingPalletLimon
          openModal={openModal}
          pallet={props.pallet}
          guardarSettings={guardarSettings}
          closeModal={closeModal}
        />
      ) : (
     
        <SettingPalletNaranja
          openModal={openModal}
          pallet={props.pallet}
          guardarSettings={guardarSettings}
          closeModal={closeModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  palletsButons: {
    width: 115,
    height: 115,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    elevation: 20,
    shadowColor: '#52006A',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 900,
    flexWrap: 'wrap',
    margin: 30,
  },
  image: {
    width: 50,
    height: 50,
  },
  palletContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  fonts: {
    color: 'white',
    fontSize: 15,
  },
  palletsPress: {
    width: 115,
    height: 115,
    backgroundColor: '#D53B29',
    margin: 5,
    borderRadius: 10,
    elevation: 20,
    shadowColor: '#52006A',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  radioButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  }
})
