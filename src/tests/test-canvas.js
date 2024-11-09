var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ConfigTransformer } from '../services/transformer';
import { CanvasGenerator } from '../services/canvasGenerator';
const sampleInput = {
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
function testCanvasGeneration() {
    return __awaiter(this, void 0, void 0, function* () {
        const transformer = new ConfigTransformer();
        const canvasGenerator = new CanvasGenerator();
        try {
            const config = yield transformer.transformConfig(sampleInput);
            yield canvasGenerator.generateCanvas(config);
            console.log('Canvas generation successful');
        }
        catch (error) {
            console.error('Canvas generation failed:', error);
        }
    });
}
testCanvasGeneration();
