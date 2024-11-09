interface FontConfig {
  family: string;
  size: number;
  weight: number;
}

interface ColorSystem {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface TypographySystem {
  primary: FontConfig;
  secondary: FontConfig;
  heading: FontConfig;
  body: FontConfig;
}

interface SpacingSystem {
  base: number;
  scale: number;
  units: 'px' | 'rem';
}

interface LayoutSystem {
  type: 'mobile_first' | 'web_first';
  dimensions: {
    width: number;
    height: number;
  };
  grid: {
    columns: number;
    gutter: number;
    margin: number;
  };
}

interface AssetConfig {
  type: 'logo' | 'icon' | 'image';
  file: File;
  dimensions: {
    width: number;
    height: number;
  };
}

interface BrandVoiceConfig {
  tone: string;
  guidelines: string[];
  keywords: string[];
}

interface ComponentConfig {
  type: string;
  styles: Record<string, any>;
  variants: string[];
}

export interface PluginConfig {
  version: string;
  designSystem: {
    colors: ColorSystem;
    typography: TypographySystem;
    spacing: SpacingSystem;
    layout: LayoutSystem;
  };
  branding: {
    assets: AssetConfig[];
    voice: BrandVoiceConfig;
  };
  components: ComponentConfig[];
}

export type {
  FontConfig,
  ColorSystem,
  TypographySystem,
  SpacingSystem,
  LayoutSystem,
  AssetConfig,
  BrandVoiceConfig,
  ComponentConfig
};