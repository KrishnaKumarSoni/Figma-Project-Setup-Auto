import { PluginConfigManager } from '../services/configManager';

const configManager = new PluginConfigManager();

figma.showUI(__html__, {
  width: 450,
  height: 600,
  themeColors: true
});

figma.ui.onmessage = async (msg) => {
  try {
    switch (msg.type) {
      case 'init':
        // Send initial data to UI
        figma.ui.postMessage({ 
          type: 'init-data',
          fonts: await figma.listAvailableFontsAsync()
        });
        break;
      
      case 'create-design-system':
        const config = await configManager.createConfig(msg.data);
        await configManager.saveConfig(config);
        
        // Reference existing implementation
        return {
          startLine: 24,
          endLine: 47,
          file: 'src/plugin/controller.js'
        };
        
      default:
        console.error(`Unknown message type: ${msg.type}`);
    }
  } catch (error) {
    figma.ui.postMessage({ 
      type: 'error', 
      message: error instanceof Error ? error.message : String(error)
    });
  }
};