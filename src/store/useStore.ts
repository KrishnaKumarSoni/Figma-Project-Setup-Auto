import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PluginInputs {
  designType: 'mobile' | 'web' | 'social';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  layout: 'mobile_first' | 'web_first';
  fonts: {
    primary: string;
    secondary: string;
  };
  brandAssets: File[];
  brandVoice: string;
  cornerRadius: number;
  shadowStyle: 'flat' | 'minimal' | 'elevated';
}

interface Store extends PluginInputs {
  setField: <K extends keyof PluginInputs>(field: K, value: PluginInputs[K]) => void;
  reset: () => void;
}

const initialState: PluginInputs = {
  designType: 'web',
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#0066ff'
  },
  layout: 'web_first',
  fonts: {
    primary: 'Inter',
    secondary: 'Roboto'
  },
  brandAssets: [],
  brandVoice: '',
  cornerRadius: 8,
  shadowStyle: 'minimal'
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,
      setField: (field, value) => set((state) => ({ ...state, [field]: value })),
      reset: () => set(initialState)
    }),
    {
      name: 'figma-project-setup'
    }
  )
);
