var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { z } from 'zod';
export class ConfigValidator {
    constructor() {
        this.fontSchema = z.object({
            family: z.string(),
            size: z.number(),
            weight: z.number()
        });
        this.colorSchema = z.object({
            primary: z.string().regex(/^#[0-9A-F]{6}$/i),
            secondary: z.string().regex(/^#[0-9A-F]{6}$/i),
            accent: z.string().regex(/^#[0-9A-F]{6}$/i),
            background: z.string().regex(/^#[0-9A-F]{6}$/i),
            text: z.string().regex(/^#[0-9A-F]{6}$/i)
        });
        this.typographySchema = z.object({
            primary: this.fontSchema,
            secondary: this.fontSchema,
            heading: this.fontSchema,
            body: this.fontSchema
        });
        this.layoutSchema = z.object({
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
        });
    }
    validateConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield Promise.all([
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
            }
            catch (error) {
                return {
                    valid: false,
                    errors: ['Unknown validation error']
                };
            }
        });
    }
}
