import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {useContenedoresStore} from '../store/Contenedores';

type modalLimonTypes = {
  openModal: boolean;
  guardarSettings: (
    radioButtonTipoCaja: string,
    radioButtonCalidad: number,
    radioButtonCalibre: number,
  ) => void;
  guardarLiberacion: (
    rotulado: boolean,
    paletizado: boolean,
    enzunchado: boolean,
    estadoCajas: boolean,
    estiba: boolean,
  ) => void;
  closeModal: (e: boolean) => void;
};

export default function SettingPalletNaranja(props: modalLimonTypes) {
  useEffect(() => {
    if (numeroContenedor == '0' || pallet == '0') {
    } else {
      if (
        contenedores[numeroContenedor][pallet].hasOwnProperty(
          'listaLiberarPallet',
        )
      ) {
        const infoLiberacion =
          contenedores[numeroContenedor][pallet]['listaLiberarPallet'];
        setRotulado(infoLiberacion['rotulado']);
        setPaletizado(infoLiberacion['paletizado']);
        setEnzunchado(infoLiberacion['enzunchado']);
        setEstadoCajas(infoLiberacion['estadoCajas']);
        setEstiba(infoLiberacion['estiba']);
      } else {
        setRotulado(false);
        setPaletizado(false);
        setEnzunchado(false);
        setEstadoCajas(false);
        setEstiba(false);
      }
    }
  }, [props.openModal]);

  const pallet = useContenedoresStore(state => state.pallet);
  const contenedores = useContenedoresStore(state => state.contenedores);
  const numeroContenedor = useContenedoresStore(
    state => state.numeroContenedor,
  );
  const setContenedores = useContenedoresStore(state => state.setContenedores)

  const [radioButtonTipoCaja, setRadioButtonTipoCaja] = useState<string>('');
  const [radioButtonCalidad, setRadioButtonCalidad] = useState<number>(0);
  const [radioButtonCalibre, setRadioButtonCalibre] = useState<number>(0);

  const [rotulado, setRotulado] = useState<boolean>(false);
  const [paletizado, setPaletizado] = useState<boolean>(false);
  const [enzunchado, setEnzunchado] = useState<boolean>(false);
  const [estadoCajas, setEstadoCajas] = useState<boolean>(false);
  const [estiba, setEstiba] = useState<boolean>(false);

  const clickGuardar = (): void => {
    if (
      !(
        radioButtonTipoCaja == '' &&
        radioButtonCalidad == 0 &&
        radioButtonCalibre == 0
      )
    ) {
      props.guardarSettings(
        radioButtonTipoCaja,
        radioButtonCalidad,
        radioButtonCalibre,
      );
      setRadioButtonTipoCaja('');
      setRadioButtonCalidad(0);
      setRadioButtonCalibre(0);
      props.closeModal(false);
    } else {
      Alert.alert('No ha seleccionado ninguna configuracion');
    }
  };

  const clickGuardarLiberacion = (): void => {
    props.guardarLiberacion(
      rotulado,
      paletizado,
      enzunchado,
      estadoCajas,
      estiba,
    );
    setRotulado(false);
    setPaletizado(false);
    setEnzunchado(false);
    setEstadoCajas(false);
    setEstiba(false);
    props.closeModal(false);
  };

  const liberarPallet = (): void =>{
    contenedores[numeroContenedor][pallet]['liberado'] = true
    setContenedores(contenedores)
    setRotulado(false);
    setPaletizado(false);
    setEnzunchado(false);
    setEstadoCajas(false);
    setEstiba(false);
    props.closeModal(false);
  }

  return (
    <Modal transparent={true} visible={props.openModal} animationType="fade">
      <View style={styles.centerModal}>
        <View style={styles.viewModal}>
          <View style={styles.modal}>
            <Text style={styles.tituloModal}>Configurar Pallet {pallet}</Text>
            <View style={styles.containerConfigurarPallet}>
              <Text>Tipo de caja</Text>
              <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
                <TouchableOpacity
                  onPress={() => setRadioButtonTipoCaja('G-30')}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonTipoCaja == 'G-30' ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>G-30</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setRadioButtonTipoCaja('G-40')}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonTipoCaja == 'G-40' ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>G-40</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setRadioButtonTipoCaja('B-30')}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonTipoCaja == 'B-30' ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>B-30</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setRadioButtonTipoCaja('B-40')}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonTipoCaja == 'B-40' ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>B-40</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerConfigurarPallet}>
              <Text>Calidad</Text>
              <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
                <TouchableOpacity onPress={() => setRadioButtonCalidad(1)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalidad == 1 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>1</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRadioButtonCalidad(1.5)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalidad == 1.5 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>1.5</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerConfigurarPallet}>
              <Text>Calibre</Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => setRadioButtonCalibre(138)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 138 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>138</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRadioButtonCalibre(113)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 113 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>113</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRadioButtonCalibre(100)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 100 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>100</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setRadioButtonCalibre(84)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 84 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>84</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setRadioButtonCalibre(76)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 76 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>76</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRadioButtonCalibre(60)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 60 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>60</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRadioButtonCalibre(56)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 56 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>56</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerButtonsModal}>
              <Button title="Guardar" onPress={clickGuardar} />
              <Button
                title="Cancelar"
                onPress={() => props.closeModal(false)}
              />
            </View>
          </View>
          <View>
            <View style={styles.modal}>
              <Text style={styles.tituloModal}>Liberacion pallets</Text>
            </View>
            <View style={styles.contenedorLiberacionPallet}>
              <TouchableOpacity onPress={() => setRotulado(!rotulado)}>
                <View style={styles.radioButton}>
                  <View style={styles.radio}>
                    {rotulado ? <View style={styles.radioBg}></View> : null}
                  </View>
                  <Text>Rotulado</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPaletizado(!paletizado)}>
                <View style={styles.radioButton}>
                  <View style={styles.radio}>
                    {paletizado ? <View style={styles.radioBg}></View> : null}
                  </View>
                  <Text>Paletizado</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEnzunchado(!enzunchado)}>
                <View style={styles.radioButton}>
                  <View style={styles.radio}>
                    {enzunchado ? <View style={styles.radioBg}></View> : null}
                  </View>
                  <Text>Enzunchado</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEstadoCajas(!estadoCajas)}>
                <View style={styles.radioButton}>
                  <View style={styles.radio}>
                    {estadoCajas ? <View style={styles.radioBg}></View> : null}
                  </View>
                  <Text>Estado cajas</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEstiba(!estiba)}>
                <View style={styles.radioButton}>
                  <View style={styles.radio}>
                    {estiba ? <View style={styles.radioBg}></View> : null}
                  </View>
                  <Text>Estiba tipo exportación</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.viewButtonsLiberacionPallet}>
              <Button title="Guardar" onPress={clickGuardarLiberacion} />
              <Button
                title="Cancelar"
                onPress={() => props.closeModal(false)}
              />
              <Button
                title="Liberar Pallet"
                onPress={liberarPallet}
                disabled={
                  contenedores.hasOwnProperty('numeroContenedor') &&
                  contenedores[numeroContenedor].hasOwnProperty('pallet') &&
                  contenedores[numeroContenedor][pallet].hasOwnProperty('listaLiberarPallet') && (
                    contenedores[numeroContenedor][pallet]['listaLiberarPallet']['rotulado'] && 
                    contenedores[numeroContenedor][pallet]['listaLiberarPallet']['estadoCajas'] && 
                    contenedores[numeroContenedor][pallet]['listaLiberarPallet']['estiba'] && 
                    contenedores[numeroContenedor][pallet]['listaLiberarPallet']['paletizado'] && 
                    contenedores[numeroContenedor][pallet]['listaLiberarPallet']['enzunchado'] )
                    ? false
                    : true
                }
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: '10%',
  },
  viewModal: {
    display: 'flex',
    backgroundColor: 'white',
    width: 850,
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingTop: 10,
    marginLeft: '10%',
    gap: 50,
    shadowColor: '#52006A',
    elevation: 20,
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    padding: 20,
    borderRightColor: '#999999',
    borderRightWidth: 1,
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerConfigurarPallet: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 10,
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
  radio: {
    width: 30,
    height: 30,
    borderColor: '#0074D9',
    borderRadius: 15,
    borderWidth: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioBg: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0074D9',
  },
  containerButtonsModal: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 15,
  },
  contenedorLiberacionPallet: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  viewButtonsLiberacionPallet: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    paddingTop: 35,
  },
});
