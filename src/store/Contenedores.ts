import {create} from 'zustand';
import {contenedoresObj} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface State {
  contenedores: contenedoresObj
  numeroContenedor: string
  pallet: string
  seleccion: string
  fetchContenedores: () => Promise<void>
  setNumeroContenedor: (numeroContenedor:string) => void
  setPallet: (pallet:string) => void
  setSeleccion: (seleccion: string) => void
  setContenedores: (contenedor:contenedoresObj) => void

}

export const useContenedoresStore = create<State>((set, get) => {
  return {
    contenedores: {},
    numeroContenedor: '0',
    pallet:'0',
    seleccion:'',

    fetchContenedores: async () => {
      const jsonValue = await AsyncStorage.getItem('contenedores');
      const contenedores = jsonValue != null ? JSON.parse(jsonValue) : null;

      set({contenedores})
    },
    setNumeroContenedor: (numero:string) => {
      set({numeroContenedor: numero})
    },
    setPallet: (numero:string) => {
      set({pallet: numero})
    },
    setSeleccion: (enfIndex:string) => {
      set({ seleccion: enfIndex })
    },
    setContenedores: async (contenedor:contenedoresObj) =>{
      try {
        const jsonValue = JSON.stringify(contenedor);
        await AsyncStorage.setItem('contenedores', jsonValue);
      } catch (e) {
        
      }
      set({ contenedores: contenedor})

    }

  };
});
