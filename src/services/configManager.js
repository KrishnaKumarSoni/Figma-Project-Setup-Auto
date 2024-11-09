var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ConfigValidator } from './validation';
import { ConfigTransformer } from './transformer';
export class PluginConfigManager {
    constructor() {
        this.validator = new ConfigValidator();
        this.transformer = new ConfigTransformer();
    }
    createConfig(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield this.transformer.transformConfig(inputs);
            if (!(yield this.validator.validateConfig(config))) {
                throw new Error('Invalid configuration');
            }
            return config;
        });
    }
    saveConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield figma.clientStorage.setAsync('pluginConfig', config);
            }
            catch (error) {
                console.error('Failed to save config:', error);
                throw error;
            }
        });
    }
    loadConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield figma.clientStorage.getAsync('pluginConfig');
            }
            catch (error) {
                console.error('Failed to load config:', error);
                return null;
            }
        });
    }
}
