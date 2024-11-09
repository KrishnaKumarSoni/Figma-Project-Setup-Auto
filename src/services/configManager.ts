import { PluginConfig } from '../types/config';
import { ConfigValidator } from './validation';
import { ConfigTransformer } from './transformer';

export class PluginConfigManager {
  private validator: ConfigValidator;
  private transformer: ConfigTransformer;

  constructor() {
    this.validator = new ConfigValidator();
    this.transformer = new ConfigTransformer();
  }

  async createConfig(inputs: any): Promise<PluginConfig> {
    const config = await this.transformer.transformConfig(inputs);
    
    if (!await this.validator.validateConfig(config)) {
      throw new Error('Invalid configuration');
    }

    return config;
  }

  async saveConfig(config: PluginConfig): Promise<void> {
    try {
      await figma.clientStorage.setAsync('pluginConfig', config);
    } catch (error) {
      console.error('Failed to save config:', error);
      throw error;
    }
  }

  async loadConfig(): Promise<PluginConfig | null> {
    try {
      return await figma.clientStorage.getAsync('pluginConfig');
    } catch (error) {
      console.error('Failed to load config:', error);
      return null;
    }
  }
}