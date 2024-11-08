var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
figma.showUI(__html__, {
    width: 450,
    height: 600,
    themeColors: true
});
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        switch (msg.type) {
            case 'init':
                // Send initial data to UI
                figma.ui.postMessage({
                    type: 'init-data',
                    fonts: yield figma.listAvailableFontsAsync()
                });
                break;
            case 'create-design-system':
                const { designType, colors, fonts, cornerRadius, shadowStyle, layout, brandVoice } = msg.data;
                // Create main page
                const page = figma.createPage();
                page.name = `${designType} Design System`;
                // Create color styles
                yield createColorStyles(colors);
                // Create text styles
                yield createTextStyles(fonts);
                // Create effect styles
                yield createEffectStyles(shadowStyle, cornerRadius);
                // Handle layout-specific setup
                yield setupLayout(layout, designType);
                // Handle brand voice if GPT-4 integration is ready
                if (brandVoice) {
                    yield handleBrandVoice(brandVoice);
                }
                figma.ui.postMessage({ type: 'system-created' });
                break;
            default:
                console.error(`Unknown message type: ${msg.type}`);
        }
    }
    catch (error) {
        figma.ui.postMessage({
            type: 'error',
            message: error instanceof Error ? error.message : String(error)
        });
    }
});
function createColorStyles(colors) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const [name, color] of Object.entries(colors)) {
            const style = figma.createPaintStyle();
            style.name = name;
            style.paints = [{
                    type: 'SOLID',
                    color: hexToRgb(color)
                }];
        }
    });
}
function createTextStyles(fonts) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const [name, font] of Object.entries(fonts)) {
            const style = figma.createTextStyle();
            style.name = name;
            yield figma.loadFontAsync(font);
            style.fontSize = 16;
            style.textDecoration = 'NONE';
        }
    });
}
function createEffectStyles(shadowStyle, cornerRadius) {
    return __awaiter(this, void 0, void 0, function* () {
        const style = figma.createEffectStyle();
        style.name = 'Shadow/' + shadowStyle;
        style.effects = [{
                type: 'DROP_SHADOW',
                color: { r: 0, g: 0, b: 0, a: 0.1 },
                offset: { x: 0, y: 2 },
                radius: cornerRadius,
                spread: 0,
                visible: true,
                blendMode: 'NORMAL'
            }];
    });
}
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return { r, g, b };
}
function setupLayout(layout, designType) {
    return __awaiter(this, void 0, void 0, function* () {
        const frame = figma.createFrame();
        frame.name = `${layout} - ${designType}`;
        if (layout === 'mobile_first') {
            frame.resize(375, 812); // iPhone dimensions
        }
        else {
            frame.resize(1440, 900); // Desktop dimensions
        }
        return frame;
    });
}
function handleBrandVoice(brandVoice) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key not configured');
        }
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        try {
            const response = yield openai.chat.completions.create({
                model: "gpt-4",
                messages: [{
                        role: "system",
                        content: `Generate brand voice guidelines based on: ${brandVoice}`
                    }]
            });
            return response.choices[0].message.content;
        }
        catch (error) {
            console.error('GPT API Error:', error);
            throw error;
        }
    });
}
