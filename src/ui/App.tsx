import React from 'react';
import { useStore } from '../store/useStore';
import ColorPicker from './components/ColorPicker';
import FontSelector from './components/FontSelector';
import FileUpload from './components/FileUpload';

export default function App() {
  const store = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send data to plugin
    parent.postMessage({ pluginMessage: { type: 'create-design-system', data: store } }, '*');
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Design Type</label>
          <select
            value={store.designType}
            onChange={(e) => store.setField('designType', e.target.value as any)}
            className="mt-1 block w-full rounded-md border-gray-300"
          >
            <option value="mobile">Mobile</option>
            <option value="web">Web</option>
            <option value="social">Social</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Colors</label>
          <div className="space-y-2">
            <ColorPicker
              label="Primary"
              value={store.colors.primary}
              onChange={(color) => 
                store.setField('colors', { ...store.colors, primary: color })
              }
            />
            <ColorPicker
              label="Secondary"
              value={store.colors.secondary}
              onChange={(color) => 
                store.setField('colors', { ...store.colors, secondary: color })
              }
            />
            <ColorPicker
              label="Accent"
              value={store.colors.accent}
              onChange={(color) => 
                store.setField('colors', { ...store.colors, accent: color })
              }
            />
          </div>
        </div>

        <FontSelector
          primaryFont={store.fonts.primary}
          secondaryFont={store.fonts.secondary}
          onChange={(fonts) => store.setField('fonts', fonts)}
        />

        <FileUpload
          files={store.brandAssets}
          onChange={(files) => store.setField('brandAssets', files)}
        />

        <div>
          <label className="block text-sm font-medium">Corner Radius</label>
          <input
            type="number"
            value={store.cornerRadius}
            onChange={(e) => store.setField('cornerRadius', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Shadow Style</label>
          <select
            value={store.shadowStyle}
            onChange={(e) => store.setField('shadowStyle', e.target.value as any)}
            className="mt-1 block w-full rounded-md border-gray-300"
          >
            <option value="flat">Flat</option>
            <option value="minimal">Minimal</option>
            <option value="elevated">Elevated</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Layout Preference</label>
          <select
            value={store.layout}
            onChange={(e) => store.setField('layout', e.target.value as 'mobile_first' | 'web_first')}
            className="mt-1 block w-full rounded-md border-gray-300"
          >
            <option value="mobile_first">Mobile First</option>
            <option value="web_first">Web First</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Brand Voice</label>
          <textarea
            value={store.brandVoice}
            onChange={(e) => store.setField('brandVoice', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300"
            rows={3}
            placeholder="Describe your brand's voice and tone..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2"
        >
          Generate Design System
        </button>
      </form>
    </div>
  );
}