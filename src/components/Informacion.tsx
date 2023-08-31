import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useContenedoresStore } from '../store/Contenedores';
import { useCajasSinPalletStore } from '../store/Cajas';


function Informacion() {

const {contenedores} = useContenedoresStore(state => state)
const numeroContenedor = useContenedoresStore(state => state.numeroContenedor)
const pallet = useContenedoresStore(state => state.pallet)
const setSeleccion = useContenedoresStore(state => state.setSeleccion)
const seleccion = useContenedoresStore(state => state.seleccion)

const cajasSinPallet = useCajasSinPalletStore(state => state.CajasSinPallet)


  return (
    <>
    {pallet == 'sinPallet' ? 
      <ScrollView style={styles.scrollStyle}>
        {pallet == 'sinPallet' && 
        cajasSinPallet &&
          Object.keys(cajasSinPallet).map(item => 
            cajasSinPallet[item].length > 0 && (
              <View key={item+'view'} style={styles.container}>
                <View key={item+'view1'} style={styles.containerHeader}>
                  <View key={item+'view2'}>
                    <Text key={item} style={styles.textHeaders}>{item}</Text>
                  </View>
                  <View key={item+'view3'}>
                   <View style={{display:'flex',flexDirection:'row'}} key={item+'view4'}>
                      <Text  key={item + 'nombrPredioHeader'} style={styles.textHeaders}>Nombre Predio: </Text>
                      <Text key={item + 'nombrPredio'} style={styles.textHeaders}>
                            {cajasSinPallet[item][0][0]}
                      </Text> 
                   </View>
                  </View>
                </View>
                {cajasSinPallet[item].map((elementoActual:any, index:number )=> (
                      <TouchableOpacity key={elementoActual +'touchable'}  style={(seleccion == item+'/'+index) ? styles.touchablePress : styles.touchable} onPress={() => setSeleccion(item+"/"+index)}>
                      <View style={{display:'flex',flexDirection:'row'}} key={elementoActual+item+'view1'}>
                        <Text>No. Cajas:  </Text>
                        <Text key={elementoActual + item + 'noCajas'}>{elementoActual[1]}</Text>
                      </View>
                      <View style={{display:'flex',flexDirection:'row',gap:20}} key={elementoActual+item+'view2'}>
                        <View style={{display:'flex',flexDirection:'row'}} key={elementoActual+item+'view3'}>
                          <Text>Tipo Caja:  </Text>
                          <Text key={elementoActual+item+'tipoCaja'}>{elementoActual[2]}</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row'}} key={elementoActual+item+'view4'}>
                          <Text>Calibre:  </Text>
                          <Text key={elementoActual+item+'calibre'}>{elementoActual[3]}</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row'}} key={elementoActual+item+'view5'}>
                          <Text>Calidad:  </Text>
                          <Text key={elementoActual+item+'calidad'}>{elementoActual[4]}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                ))}
              </View>
            ))}
      </ScrollView>
      :
      <ScrollView style={styles.scrollStyle}>
      {pallet !== '0'  &&
        Object.keys(
          contenedores[numeroContenedor][pallet],
        ).map(
          item =>
            item !== 'settings' &&
            item !== 'cajasTotal' &&
            contenedores[numeroContenedor][pallet][item].length > 0 &&
             (   
                <View style={styles.container} key={item+'view1'}>
                  <View style={styles.containerHeader}>
                    <View key={item+'view2'}>
                      <Text key={item} style={styles.textHeaders}>{item}</Text>
                    </View>
                    <View key={item+'view3'}>
                      <View style={{display:'flex',flexDirection:'row'}} key={item+'view4'}>
                        <Text key={item + 'nombrPredioHeader'} style={styles.textHeaders}>Nombre Predio: </Text>
                        <Text key={item + 'nombrPredio'} style={styles.textHeaders}>
                          {contenedores[numeroContenedor][pallet][item][0][0]}
                        </Text> 
                      </View>
                    </View>
                  </View>
                  
                  {contenedores[numeroContenedor][pallet][item].map((elementoActual:any, index:number )=> (
                    <TouchableOpacity key={elementoActual +'touchable'} style={(seleccion == item+'/'+index) ? styles.touchablePress : styles.touchable}  onPress={() => setSeleccion(item+"/"+index)}>
                      <View style={{display:'flex',flexDirection:'row'}} key={elementoActual+item+'view1'}>
                        <Text>No. Cajas:  </Text>
                        <Text key={elementoActual + item + 'noCajas'}>{elementoActual[1]}</Text>
                      </View>
                      <View style={{display:'flex',flexDirection:'row',gap:20}} key={elementoActual+item+'view2'}>
                        <View style={{display:'flex',flexDirection:'row'}} key={elementoActual+item+'view3'}>
                          <Text>Tipo Caja:  </Text>
                          <Text key={elementoActual+item+'tipoCaja'}>{elementoActual[2]}</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row'}} key={elementoActual+item+'view4'}>
                          <Text>Calibre:  </Text>
                          <Text key={elementoActual+item+'calibre'}>{elementoActual[3]}</Text>
                        </View>
                        <View style={{display:'flex',flexDirection:'row'}} key={elementoActual+item+'view5'}>
                          <Text>Calidad:  </Text>
                          <Text key={elementoActual+item+'calidad'}>{elementoActual[4]}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
      
            ),
        )}
    </ScrollView>
      }
   
  </>
  );
}

export default Informacion;

const styles = StyleSheet.create({
  scrollStyle: {
    backgroundColor: '#FFE6FF',
    padding: 5,
    flex: 2,

    elevation: 10,
    shadowColor: '#52006A',
  },
  container: {
    margin:5
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth:1,
    borderColor:'#4D4D4D',
    overflow:'scroll'
  },
  textHeaders:{
    fontSize:18,fontWeight:'bold'
  },
  touchable:{
    backgroundColor:'white',
    marginTop:8,
    padding:5,
    borderRadius:8
  },
  touchablePress:{
    backgroundColor:'white',
    marginTop:8,
    padding:5,
    borderRadius:8,
    borderColor:'red',
    borderWidth:2
  }
});
