import {create} from 'zustand';
import {LoteType} from './types';

interface State {
  loteVaciando: LoteType;
  loteActual: LoteType;

  setLoteVaciando: (lote: LoteType) => Promise<void>;
  setLoteActual: (lote: LoteType) => void;
}

export const useLoteStore = create<State>(set => {
  return {
    loteVaciando: {enf: '', nombreLote: '', tipoFruta: 'Naranja'},
    loteActual: {enf: '', nombreLote: '', tipoFruta: 'Naranja'},

    setLoteVaciando: async (lote: LoteType) => {
      set({loteVaciando: lote});
    },

    setLoteActual: (lote: LoteType) => {
        set({ loteActual: lote })
    }
  };
});
