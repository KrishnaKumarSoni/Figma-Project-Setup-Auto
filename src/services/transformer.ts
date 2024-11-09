import { 
  PluginConfig, 
  ColorSystem, 
  TypographySystem, 
  SpacingSystem, 
  LayoutSystem,
  AssetConfig,
  BrandVoiceConfig,
  FontConfig 
} from '../types/config';

interface TransformerInput {
  colors: Record<string, string>;
  fonts: {
    primary?: string;
    secondary?: string;
  };
  layout: 'mobile_first' | 'web_first';
  brandAssets?: File[];
  brandVoice?: string;
}

export class ConfigTransformer {
  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    try {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return { r, g, b };
    } catch (error) {
      throw new Error(`Invalid hex color: ${hex}`);
    }
  }

  async transformConfig(inputs: TransformerInput): Promise<PluginConfig> {
    try {
      return {
        version: '1.0',
        designSystem: {
          colors: this.transformColors(inputs.colors),
          typography: await this.transformTypography(inputs.fonts),
          spacing: this.createSpacingSystem(),
          layout: this.transformLayout(inputs.layout)
        },
        branding: {
          assets: await this.transformAssets(inputs.brandAssets || []),
          voice: this.transformBrandVoice(inputs.brandVoice || '')
        },
        components: []
      };
    } catch (error) {
      throw new Error(`Config transformation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private transformColors(colors: Record<string, string>): ColorSystem {
    const defaultColors: ColorSystem = {
      primary: '#000000',
      secondary: '#000000',
      accent: '#000000',
      background: '#FFFFFF',
      text: '#000000'
    };

    return {
      ...defaultColors,
      ...Object.entries(colors).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value
      }), {})
    };
  }

  private async transformTypography(fonts: Record<string, any>): Promise<TypographySystem> {
    return {
      primary: {
        family: fonts.primary || 'Inter',
        size: 16,
        weight: 400
      },
      secondary: {
        family: fonts.secondary || 'Inter',
        size: 14,
        weight: 400
      },
      heading: {
        family: fonts.primary || 'Inter',
        size: 24,
        weight: 600
      },
      body: {
        family: fonts.secondary || 'Inter',
        size: 16,
        weight: 400
      }
    };
  }

  private createSpacingSystem(): SpacingSystem {
    return {
      base: 4,
      scale: 1.5,
      units: 'px'
    };
  }

  private transformLayout(layout: string): LayoutSystem {
    return {
      type: layout as 'mobile_first' | 'web_first',
      dimensions: layout === 'mobile_first' 
        ? { width: 375, height: 812 }
        : { width: 1440, height: 900 },
      grid: {
        columns: 12,
        gutter: 16,
        margin: 24
      }
    };
  }

  private async transformAssets(files: File[]): Promise<AssetConfig[]> {
    return files.map(file => ({
      type: 'logo',
      file,
      dimensions: {
        width: 0,  // Will be updated when asset is loaded
        height: 0
      }
    }));
  }

  private transformBrandVoice(voice: string): BrandVoiceConfig {
    return {
      tone: voice || '',
      guidelines: [],
      keywords: []
    };
  }
}