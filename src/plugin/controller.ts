import { PluginConfigManager } from '../services/configManager';
import { CanvasGenerator } from '../services/canvasGenerator';

const configManager = new PluginConfigManager();
const canvasGenerator = new CanvasGenerator();

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
        
        // Generate Figma canvas
        await canvasGenerator.generateCanvas(config);
        
        figma.ui.postMessage({ type: 'system-created' });
        break;
      
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