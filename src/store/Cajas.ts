import {create} from 'zustand';
import {CajasSinPalletType} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface State{
    CajasSinPallet: CajasSinPalletType
    fetchCajasSinPallet: () => Promise<void>
    addCajasSinPallet: (cajasSinPallet:CajasSinPalletType) => void
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
        addCajasSinPallet: async (cajasSinPallet:CajasSinPalletType) => {
           
            set({ CajasSinPallet: cajasSinPallet})
        }
    }
})