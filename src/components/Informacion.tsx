import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface contenedoresObj {
  [key: string]: contenedoresObj;
}

type loteType = {
  enf: string;
  nombreLote: string;
  tipoFruta: 'Naranja' | 'Limon';
};

type infoType = {
  numeroContenedor: string;
  pallet: string;
  configurarContenedor: (contenedores: contenedoresObj) => void;
  contenedores: any;
  loteActual: loteType;
  obtenerSeleccionInformacion: (e:string) => void
  inforamcionSeleccion:string
};

function Informacion(props: infoType) {


  const selectItem = (e:string) => {

    props.obtenerSeleccionInformacion(e);
  }

  return (
    <ScrollView style={styles.scrollStyle}>
      {props.pallet !== '0' &&
        Object.keys(
          props.contenedores[props.numeroContenedor][props.pallet],
        ).map(
          item =>
            item !== 'settings' &&
            item !== 'cajasTotal' &&
            props.contenedores[props.numeroContenedor][props.pallet][item].length > 0 &&
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
                          {props.contenedores[props.numeroContenedor][props.pallet][item][0][0]}
                        </Text> 
                      </View>
                    </View>
                  </View>
                  
                  {props.contenedores[props.numeroContenedor][props.pallet][item].map((elementoActual:any, index:number )=> (
                    <TouchableOpacity key={elementoActual +'touchable'} style={(props.inforamcionSeleccion == item+'/'+index) ? styles.touchablePress : styles.touchable} onPress={() => selectItem(item+'/'+index)}>
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
