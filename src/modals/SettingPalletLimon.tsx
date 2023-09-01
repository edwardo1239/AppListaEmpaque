import React, {useState, useEffect} from 'react';
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

export default function SettingPalletLimon(props: modalLimonTypes) {
  useEffect(() => {
    if (numeroContenedor == '0' || pallet == '0') {
    } else {
      if (
        pallet !== '0' &&
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
    props.closeModal(false)
   0
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

  const readyToBeFree = ():boolean => {
   
  
    if(numeroContenedor == '0') return true
    if(pallet == '0' || pallet == 'sinPallet') return true
    else if(contenedores[numeroContenedor][pallet].hasOwnProperty('listaLiberarPallet')){
      if( contenedores[numeroContenedor][pallet]['listaLiberarPallet']['rotulado'] && 
      contenedores[numeroContenedor][pallet]['listaLiberarPallet']['estadoCajas'] && 
      contenedores[numeroContenedor][pallet]['listaLiberarPallet']['estiba'] && 
      contenedores[numeroContenedor][pallet]['listaLiberarPallet']['paletizado'] && 
      contenedores[numeroContenedor][pallet]['listaLiberarPallet']['enzunchado'] ) {
        return false
      }
    }
  
    return true
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
                  onPress={() => setRadioButtonTipoCaja('G-37')}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonTipoCaja == 'G-37' ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>G-37</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setRadioButtonTipoCaja('G-4.5')}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonTipoCaja == 'G-4.5' ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>G-4.5</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setRadioButtonTipoCaja('B-37')}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonTipoCaja == 'B-37' ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>B-37</Text>
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
                <TouchableOpacity onPress={() => setRadioButtonCalibre(250)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 250 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>250</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRadioButtonCalibre(230)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 230 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>230</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRadioButtonCalibre(200)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 200 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>200</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setRadioButtonCalibre(175)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 175 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>175</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setRadioButtonCalibre(150)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 150 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>150</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRadioButtonCalibre(110)}>
                  <View style={styles.radioButton}>
                    <View style={styles.radio}>
                      {radioButtonCalibre == 110 ? (
                        <View style={styles.radioBg}></View>
                      ) : null}
                    </View>
                    <Text>110</Text>
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
                disabled={readyToBeFree()}
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
