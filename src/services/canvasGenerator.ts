import { PluginConfig, LayoutSystem } from '../types/config';

export class CanvasGenerator {
  async generateCanvas(config: PluginConfig): Promise<void> {
    const mainPage = figma.createPage();
    mainPage.name = 'Design System';

    const styleGuidePage = figma.createPage();
    styleGuidePage.name = 'Style Guide';

    const componentsPage = figma.createPage();
    componentsPage.name = 'Components';

    // Generate main frames
    await this.generateMainFrame(mainPage, config);
    await this.generateStyleGuideFrame(styleGuidePage, config);
    await this.generateComponentsFrame(componentsPage, config);
  }

  private async generateMainFrame(page: PageNode, config: PluginConfig): Promise<FrameNode> {
    const frame = figma.createFrame();
    frame.name = 'Main Layout';
    this.setupLayout(frame, config.designSystem.layout);
    page.appendChild(frame);
    return frame;
  }

  private async generateStyleGuideFrame(page: PageNode, config: PluginConfig): Promise<FrameNode> {
    const frame = figma.createFrame();
    frame.name = 'Style Guide';
    this.setupLayout(frame, config.designSystem.layout);
    page.appendChild(frame);
    return frame;
  }

  private async generateComponentsFrame(page: PageNode, config: PluginConfig): Promise<FrameNode> {
    const frame = figma.createFrame();
    frame.name = 'Components';
    this.setupLayout(frame, config.designSystem.layout);
    page.appendChild(frame);
    return frame;
  }

  private setupLayout(frame: FrameNode, layout: LayoutSystem): void {
    // Set frame dimensions based on layout type
    frame.resize(
      layout.dimensions.width,
      layout.dimensions.height
    );

    // Set up layout grid
    frame.layoutGrids = [{
      pattern: 'COLUMNS',
      alignment: 'STRETCH',
      gutterSize: layout.grid.gutter,
      count: layout.grid.columns,
      offset: layout.grid.margin
    }];

    // Set up auto-layout
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'FIXED';
    frame.itemSpacing = layout.grid.gutter;
    frame.paddingLeft = frame.paddingRight = layout.grid.margin;
  }
}