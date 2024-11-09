export interface PluginMessage {
  type: 'init' | 'create-design-system' | 'system-created' | 'error';
  data?: any;
  message?: string;
  fonts?: FontName[];
}

export interface StyleConfig {
  name: string;
  type: 'PAINT' | 'TEXT' | 'EFFECT';
  properties: Record<string, any>;
}
