import { PluginConfig } from '../types/config';
import { ConfigTransformer } from '../services/transformer';
import { ConfigValidator } from '../services/validation';

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
  layout: 'mobile_first' as 'mobile_first' | 'web_first',
  brandVoice: 'Professional and modern'
};

async function testCanvasConfig() {
  const transformer = new ConfigTransformer();
  const validator = new ConfigValidator();
  
  try {
    const config = await transformer.transformConfig(sampleInput);
    const validationResult = await validator.validateConfig(config);
    
    console.log('Canvas config validation:', {
      config: config.designSystem.layout,
      isValid: validationResult.valid
    });
  } catch (error) {
    console.error('Config validation failed:', error);
  }
}

testCanvasConfig();
