import { z } from 'zod';
import type { 
  PluginConfig, 
  FontConfig,
  ColorSystem,
  TypographySystem,
  LayoutSystem 
} from '../types/config';

export class ConfigValidator {
  private fontSchema = z.object({
    family: z.string(),
    size: z.number(),
    weight: z.number()
  });

  private colorSchema = z.object({
    primary: z.string().regex(/^#[0-9A-F]{6}$/i),
    secondary: z.string().regex(/^#[0-9A-F]{6}$/i),
    accent: z.string().regex(/^#[0-9A-F]{6}$/i),
    background: z.string().regex(/^#[0-9A-F]{6}$/i),
    text: z.string().regex(/^#[0-9A-F]{6}$/i)
  }) satisfies z.ZodType<ColorSystem>;

  private typographySchema = z.object({
    primary: this.fontSchema,
    secondary: this.fontSchema,
    heading: this.fontSchema,
    body: this.fontSchema
  }) satisfies z.ZodType<TypographySystem>;

  private layoutSchema = z.object({
    type: z.enum(['mobile_first', 'web_first']),
    dimensions: z.object({
      width: z.number(),
      height: z.number()
    }),
    grid: z.object({
      columns: z.number(),
      gutter: z.number(),
      margin: z.number()
    })
  }) satisfies z.ZodType<LayoutSystem>;

  async validateConfig(config: PluginConfig): Promise<{
    valid: boolean;
    errors?: string[];
  }> {
    try {
      const results = await Promise.all([
        this.colorSchema.safeParseAsync(config.designSystem.colors),
        this.typographySchema.safeParseAsync(config.designSystem.typography),
        this.layoutSchema.safeParseAsync(config.designSystem.layout)
      ]);

      const errors = results
        .filter(result => !result.success)
        .flatMap(result => !result.success ? result.error.errors.map(e => e.message) : []);

      return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined
      };
    } catch (error) {
      return {
        valid: false,
        errors: ['Unknown validation error']
      };
    }
  }
}