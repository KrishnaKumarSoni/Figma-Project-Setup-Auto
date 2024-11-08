import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const initialState = {
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
export const useStore = create()(persist((set) => (Object.assign(Object.assign({}, initialState), { setField: (field, value) => set((state) => (Object.assign(Object.assign({}, state), { [field]: value }))), reset: () => set(initialState) })), {
    name: 'figma-project-setup'
}));
