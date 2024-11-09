var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ConfigTransformer {
    hexToRgb(hex) {
        try {
            const r = parseInt(hex.slice(1, 3), 16) / 255;
            const g = parseInt(hex.slice(3, 5), 16) / 255;
            const b = parseInt(hex.slice(5, 7), 16) / 255;
            return { r, g, b };
        }
        catch (error) {
            throw new Error(`Invalid hex color: ${hex}`);
        }
    }
    transformConfig(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    version: '1.0',
                    designSystem: {
                        colors: this.transformColors(inputs.colors),
                        typography: yield this.transformTypography(inputs.fonts),
                        spacing: this.createSpacingSystem(),
                        layout: this.transformLayout(inputs.layout)
                    },
                    branding: {
                        assets: yield this.transformAssets(inputs.brandAssets || []),
                        voice: this.transformBrandVoice(inputs.brandVoice || '')
                    },
                    components: []
                };
            }
            catch (error) {
                throw new Error(`Config transformation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        });
    }
    transformColors(colors) {
        const defaultColors = {
            primary: '#000000',
            secondary: '#000000',
            accent: '#000000',
            background: '#FFFFFF',
            text: '#000000'
        };
        return Object.assign(Object.assign({}, defaultColors), Object.entries(colors).reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {}));
    }
    transformTypography(fonts) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    createSpacingSystem() {
        return {
            base: 4,
            scale: 1.5,
            units: 'px'
        };
    }
    transformLayout(layout) {
        return {
            type: layout,
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
    transformAssets(files) {
        return __awaiter(this, void 0, void 0, function* () {
            return files.map(file => ({
                type: 'logo',
                file,
                dimensions: {
                    width: 0, // Will be updated when asset is loaded
                    height: 0
                }
            }));
        });
    }
    transformBrandVoice(voice) {
        return {
            tone: voice || '',
            guidelines: [],
            keywords: []
        };
    }
}
