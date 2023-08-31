import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Alert} from 'react-native';

import SettingPalletLimon from '../modals/SettingPalletLimon';
import SettingPalletNaranja from '../modals/SettingPalletNaranja';

import {useContenedoresStore} from '../store/Contenedores';
import {useLoteStore} from '../store/Predios';
import SettingsCajasSinPalletLimon from '../modals/SettingsCajasSinPalletLimon';
import SettingsCajasSinPalletNaranja from '../modals/SettingsCajasSinPalletNaranja';
import {useCajasSinPalletStore} from '../store/Cajas';
import { contenedoresObj } from '../store/types';


export default function Pallets() {
  const setPallet = useContenedoresStore(state => state.setPallet);
  const setContenedores = useContenedoresStore(state => state.setContenedores);
  const { contenedores } = useContenedoresStore(state => state);
  const numeroContenedor = useContenedoresStore(
    state => state.numeroContenedor,
  );
  const pallet = useContenedoresStore(state => state.pallet);
  const setSeleccion = useContenedoresStore(state => state.setSeleccion);
  const loteActual = useLoteStore(state => state.loteActual);

  const cajasSinPallet = useCajasSinPalletStore(state => state.CajasSinPallet);

  useEffect(()=>{
    
    setRerender(!rerender)},[setContenedores])

   

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalSinPallet, setOpenModalSinPallet] = useState<boolean>(false);
  const [rerender, setRerender] = useState({})
  // const [sinPallet, setSinPallet] = useState<string>('0')

  const palletPress = (e: string) => {
    setPallet(e);
    setSeleccion('');
  };

  const openPalletSettings = (e: string) => {
    setOpenModal(true);
    setPallet(e);
  };

  const openSinPalletSettings = () => {
    setOpenModalSinPallet(true);
    setPallet('sinPallet');
    //setSinPallet('sinPallet');
  };

  const closeModal = (e: boolean): void => {
    setOpenModal(e);
  };
  const closeModalSinPallet = (e: boolean): void => {
    setOpenModalSinPallet(e);
  };

  const guardarSettings = (
    radioButtonTipoCaja: string,
    radioButtonCalidad: number,
    radioButtonCalibre: number,
  ): void => {
    let contenedoresTemp: any = contenedores;
    if (!contenedoresTemp[numeroContenedor].hasOwnProperty('settings')) {
      contenedoresTemp[numeroContenedor][pallet]['settings'] = {};
    }
    contenedoresTemp[numeroContenedor][pallet]['settings']['tipoCaja'] =
      radioButtonTipoCaja;
    contenedoresTemp[numeroContenedor][pallet]['settings']['calidad'] =
      radioButtonCalidad;
    contenedoresTemp[numeroContenedor][pallet]['settings']['calibre'] =
      radioButtonCalibre;

    setContenedores(contenedoresTemp);
    setOpenModal(false);
  };

  const guardarLiberacion = (
    rotulado: boolean,
    paletizado: boolean,
    enzunchado: boolean,
    estadoCajas: boolean,
    estiba: boolean,
  ) => {
    if (
      !contenedores[numeroContenedor][pallet].hasOwnProperty(
        'listaLiberarPallet',
      )
    ) {
      contenedores[numeroContenedor][pallet]['listaLiberarPallet'] = {};
    }
    contenedores[numeroContenedor][pallet]['listaLiberarPallet']['rotulado'] =
      rotulado;
    contenedores[numeroContenedor][pallet]['listaLiberarPallet']['paletizado'] =
      paletizado;
    contenedores[numeroContenedor][pallet]['listaLiberarPallet']['enzunchado'] =
      enzunchado;
    contenedores[numeroContenedor][pallet]['listaLiberarPallet'][
      'estadoCajas'
    ] = estadoCajas;
    contenedores[numeroContenedor][pallet]['listaLiberarPallet']['estiba'] =
      estiba;

    setContenedores(contenedores);
    Alert.alert("Guardado con exito")
  };

  return (
    <View
      style={
        numeroContenedor === '0'
          ? {minHeight: 525, width: 925}
          : styles.container
      }>
      {numeroContenedor !== '0' &&
        Object.keys(contenedores[numeroContenedor]).map(
          item =>
            item !== 'nombreCliente' && (
              <View style={styles.palletContainer} key={'view' + item}>
                {contenedores[numeroContenedor][item].hasOwnProperty(
                  'liberado',
                ) ? (
                  <View style={styles.palletsButonsLiberado}>
                    <Image
                      key={'img' + item}
                      source={require('../assets/palletIMG.png')}
                      style={styles.image}
                    />
                    <View style={{marginLeft: 25}}>
                      <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                        {contenedores[numeroContenedor][item].hasOwnProperty(
                          'cajasTotal',
                        ) && contenedores[numeroContenedor][item]['cajasTotal']}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={
                      pallet !== '0' && pallet == item
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
                        {contenedores[numeroContenedor][item].hasOwnProperty(
                          'settings',
                        ) &&
                          contenedores[numeroContenedor][item]['settings'][
                            'calibre'
                          ]}
                      </Text>
                    </View>
                    <View style={{marginLeft: 25}}>
                      <Text style={{fontSize: 50, fontWeight: 'bold'}}>
                        {contenedores[numeroContenedor][item].hasOwnProperty(
                          'cajasTotal',
                        ) && contenedores[numeroContenedor][item]['cajasTotal']}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                <Text style={styles.fonts} key={'pallet' + item}>
                  Pallet {item}
                </Text>
              </View>
            ),
        )}

      <View style={styles.palletContainer}>
        <TouchableOpacity
          style={
            pallet !== '0' && pallet === 'sinPallet'
              ? styles.palletsPress
              : styles.palletsButons
          }
          onPress={() => palletPress('sinPallet')}
          onLongPress={() => openSinPalletSettings()}>
          <Text style={{marginLeft: 8, fontWeight: '500'}}>
            Cajas Sin Pallet
          </Text>
          <Text style={{fontSize: 40, fontWeight: 'bold', marginLeft: 10}}>
            {cajasSinPallet && Object.keys(cajasSinPallet).reduce(
              (acu1, item1) =>
                acu1 +
                cajasSinPallet[item1].reduce(
                  (acu2: number, item2: number[]) => acu2 + item2[1],
                  0,
                ),
              0,
            )}
          </Text>
        </TouchableOpacity>
        
      </View>
  
      {loteActual.tipoFruta === 'Limon' ? (
        <SettingPalletLimon
          openModal={openModal}
          guardarSettings={guardarSettings}
          closeModal={closeModal}
          guardarLiberacion={guardarLiberacion}
        />
      ) : (
        <SettingPalletNaranja
          openModal={openModal}
          guardarSettings={guardarSettings}
          closeModal={closeModal}
          guardarLiberacion={guardarLiberacion}
        />
      )}

      {loteActual.tipoFruta === 'Limon' ? (
        <SettingsCajasSinPalletLimon
          openModalSinPallet={openModalSinPallet}
          closeModalSinPallet={closeModalSinPallet}
        />
      ) : (
        <SettingsCajasSinPalletNaranja
          openModalSinPallet={openModalSinPallet}
          closeModalSinPallet={closeModalSinPallet}
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
    minHeight: 155,
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
  },
  palletsButonsLiberado:{
    width: 115,
    height: 115,
    backgroundColor: '#FF22',
    margin: 5,
    borderRadius: 10,

  }
});
