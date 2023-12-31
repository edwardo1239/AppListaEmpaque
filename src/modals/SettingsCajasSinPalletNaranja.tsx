import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData
} from 'react-native';
import {useContenedoresStore} from '../store/Contenedores';
import { useCajasSinPalletStore } from '../store/Cajas';
import { useLoteStore } from '../store/Predios';
import  guardarCajasSinPallet  from '../utils/GuardarCajasSinPallet';
import { uploadServerType } from '../store/types';

type modalTypes = {
    openModalSinPallet: boolean
    closeModalSinPallet: (e:boolean) => void
    uploadLoteServer: (data:uploadServerType) => void

}

export default function SettingsCajasSinPalletNaranja(props: modalTypes) {

  const predio = useLoteStore(state => state.loteActual);
  const setCajasSinPallet = useCajasSinPalletStore(state => state.setCajasSinPallet);
  const cajasSinPallet = useCajasSinPalletStore(state => state.CajasSinPallet);
  const pallet = useContenedoresStore(state => state.pallet)

  const [radioButtonTipoCaja, setRadioButtonTipoCaja] = useState<string>('');
  const [radioButtonCalidad, setRadioButtonCalidad] = useState<number>(0);
  const [radioButtonCalibre, setRadioButtonCalibre] = useState<number>(0);
  const [cajas, setCajas] = useState<string>('')

  const getInput = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ): void => {

    setCajas(e.nativeEvent.text);
  };

  const clickGuardar = (): void => {
    if(predio.enf === '') return Alert.alert("No ha seleccionado predio")
    if((cajas !== '')){
      if (
        !(
          radioButtonTipoCaja == '' ||
          radioButtonCalidad == 0 ||
          radioButtonCalibre == 0 
        
        )
      ) {
  
        let fecha = new Date()
        let cajasInt:number = parseInt(cajas)
        let cajasVector:any = [predio.nombreLote, cajasInt, radioButtonTipoCaja, radioButtonCalibre, radioButtonCalidad, fecha]
       
        let newCajasSinPallet = guardarCajasSinPallet(cajasSinPallet, cajasVector, predio.enf)
        setCajasSinPallet(newCajasSinPallet)


        props.uploadLoteServer({caja:cajasInt, tipoCaja:radioButtonTipoCaja})
        setCajas('');
        setRadioButtonTipoCaja('');
        setRadioButtonCalidad(0);
        setRadioButtonCalibre(0);
        props.closeModalSinPallet(false);
      } else {
        Alert.alert('No ha seleccionado ninguna configuracion');
      }
    } else Alert.alert("Ingrese las cajas")
   
  };
    return (
        <Modal transparent={true} visible={props.openModalSinPallet} animationType="fade">
        <View style={styles.centerModal}>
          <View style={styles.viewModal}>
            <View style={styles.modal}>
              <Text style={styles.tituloModal}>
                Configurar Pallet {pallet}
              </Text>
              <View style={styles.containerConfigurarPallet}>
                <Text>Tipo de caja</Text>
                <View
                  style={{display: 'flex', flexDirection: 'row', gap: 20}}>
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
                <View
                  style={{display: 'flex', flexDirection: 'row', gap: 20}}>
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
                  <TouchableOpacity
                    onPress={() => setRadioButtonCalidad(1.5)}>
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
                  <TouchableOpacity
                    onPress={() => setRadioButtonCalibre(138)}>
                    <View style={styles.radioButton}>
                      <View style={styles.radio}>
                        {radioButtonCalibre == 138 ? (
                          <View style={styles.radioBg}></View>
                        ) : null}
                      </View>
                      <Text>138</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setRadioButtonCalibre(113)}>
                    <View style={styles.radioButton}>
                      <View style={styles.radio}>
                        {radioButtonCalibre == 113 ? (
                          <View style={styles.radioBg}></View>
                        ) : null}
                      </View>
                      <Text>113</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setRadioButtonCalibre(100)}>
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
             
            </View>
            <View style={styles.modalCajas}>
            <View style={styles.modal}>
              <Text style={styles.tituloModal}>
                Ingresar El numero de cajas{' '}
              </Text>
            </View>
            <View style={{marginLeft:15,marginTop:20}}>
              <TextInput style={styles.inputCajas} onChange={(e) => getInput(e)} keyboardType="numeric" value={cajas}></TextInput>
            </View>
            <View style={{display:'flex',flexDirection:'row',gap:15,marginTop:40,justifyContent:'center',marginRight:45}}>
              <Button title="Guardar" onPress={clickGuardar} />
              <Button
                title="Cancelar"
                onPress={() => props.closeModalSinPallet(false)}
              />
            </View>
          </View>
          </View>
        </View>
      </Modal>
      )
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
        display:'flex',
        justifyContent:'center',
        marginLeft:10
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
      inputCajas: {
        borderWidth: 1,
        borderRadius: 15,
        width:'80%'
      },
      modalCajas:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center'
      }
    });
    