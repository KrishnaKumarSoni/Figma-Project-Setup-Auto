import React from 'react';

export default function TestUI() {
  const testConfig = {
    colors: {
      primary: '#FF0000',
      secondary: '#00FF00',
      accent: '#0000FF',
      background: '#FFFFFF',
      text: '#000000'
    },
    fonts: {
      primary: 'Inter',
      secondary: 'Roboto'
    },
    layout: 'mobile_first',
    brandVoice: 'Professional and modern'
  };

  const handleTest = () => {
    parent.postMessage({ 
      pluginMessage: { 
        type: 'create-design-system', 
        data: testConfig 
      }
    }, '*');
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Canvas Generator Test</h1>
      <button
        onClick={handleTest}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Test Canvas
      </button>
    </div>
  );
}
