import {create} from 'zustand';
import {CajasSinPalletType} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface State{
    CajasSinPallet: CajasSinPalletType

    fetchCajasSinPallet: () => Promise<void>
    setCajasSinPallet: (cajasSinPallet:CajasSinPalletType) => void

}

export const useCajasSinPalletStore = create<State>((set, get) => {
    return {
        CajasSinPallet: {},
     

        fetchCajasSinPallet: async () =>{
            const jsonValue = await AsyncStorage.getItem('cajasSinPallet');
            const CajasSinPallet = jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log(CajasSinPallet)
            set({CajasSinPallet})
        },
        setCajasSinPallet: async (cajasSinPallet:CajasSinPalletType) => {
            try {
                const jsonValue = JSON.stringify(cajasSinPallet);
                await AsyncStorage.setItem('cajasSinPallet', jsonValue);
              } catch (e) {
                
              }
            set({ CajasSinPallet: cajasSinPallet})
        },

    }
})