import { PluginConfig } from '../types/config';
import { ConfigValidator } from '../services/validation.js';
import { ConfigTransformer } from '../services/transformer.js';

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

async function test() {
  const transformer = new ConfigTransformer();
  const validator = new ConfigValidator();
  
  try {
    const config = await transformer.transformConfig(sampleInput);
    const validationResult = await validator.validateConfig(config);
    console.log('Transformation result:', config);
    console.log('Validation result:', validationResult);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

test();
