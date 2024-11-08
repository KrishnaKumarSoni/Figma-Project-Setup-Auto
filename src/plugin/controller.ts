import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

figma.showUI(__html__, {
  width: 450,
  height: 600,
  themeColors: true
});

figma.ui.onmessage = async (msg) => {
  try {
    switch (msg.type) {
      case 'init':
        // Send initial data to UI
        figma.ui.postMessage({ 
          type: 'init-data',
          fonts: await figma.listAvailableFontsAsync()
        });
        break;
      
      case 'create-design-system':
        const { designType, colors, fonts, cornerRadius, shadowStyle, layout, brandVoice } = msg.data;
        
        // Create main page
        const page = figma.createPage();
        page.name = `${designType} Design System`;
        
        // Create color styles
        await createColorStyles(colors);
        
        // Create text styles
        await createTextStyles(fonts);
        
        // Create effect styles
        await createEffectStyles(shadowStyle, cornerRadius);
        
        // Handle layout-specific setup
        await setupLayout(layout, designType);
        
        // Handle brand voice if GPT-4 integration is ready
        if (brandVoice) {
          await handleBrandVoice(brandVoice);
        }
        
        figma.ui.postMessage({ type: 'system-created' });
        break;
      
      default:
        console.error(`Unknown message type: ${msg.type}`);
    }
  } catch (error) {
    figma.ui.postMessage({ 
      type: 'error', 
      message: error instanceof Error ? error.message : String(error)
    });
  }
};

async function createColorStyles(colors: Record<string, string>) {
  for (const [name, color] of Object.entries(colors)) {
    const style = figma.createPaintStyle();
    style.name = name;
    style.paints = [{
      type: 'SOLID',
      color: hexToRgb(color)
    }];
  }
}

async function createTextStyles(fonts: Record<string, any>) {
  for (const [name, font] of Object.entries(fonts)) {
    const style = figma.createTextStyle();
    style.name = name;
    await figma.loadFontAsync(font);
    style.fontSize = 16;
    style.textDecoration = 'NONE';
  }
}

async function createEffectStyles(shadowStyle: string, cornerRadius: number) {
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
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
}

async function setupLayout(layout: 'mobile_first' | 'web_first', designType: string) {
  const frame = figma.createFrame();
  frame.name = `${layout} - ${designType}`;
  
  if (layout === 'mobile_first') {
    frame.resize(375, 812); // iPhone dimensions
  } else {
    frame.resize(1440, 900); // Desktop dimensions
  }
  
  return frame;
}

async function handleBrandVoice(brandVoice: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: `Generate brand voice guidelines based on: ${brandVoice}`
      }]
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('GPT API Error:', error);
    throw error;
  }
}