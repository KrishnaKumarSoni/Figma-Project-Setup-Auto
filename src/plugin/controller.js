var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PluginConfigManager } from '../services/configManager';
import { CanvasGenerator } from '../services/canvasGenerator';
const configManager = new PluginConfigManager();
const canvasGenerator = new CanvasGenerator();
figma.showUI(__html__, {
    width: 450,
    height: 600,
    themeColors: true
});
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        switch (msg.type) {
            case 'init':
                // Send initial data to UI
                figma.ui.postMessage({
                    type: 'init-data',
                    fonts: yield figma.listAvailableFontsAsync()
                });
                break;
            case 'create-design-system':
                const config = yield configManager.createConfig(msg.data);
                yield configManager.saveConfig(config);
                // Generate Figma canvas
                yield canvasGenerator.generateCanvas(config);
                figma.ui.postMessage({ type: 'system-created' });
                break;
            default:
                console.error(`Unknown message type: ${msg.type}`);
        }
    }
    catch (error) {
        figma.ui.postMessage({
            type: 'error',
            message: error instanceof Error ? error.message : String(error)
        });
    }
});
