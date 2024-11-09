var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CanvasGenerator {
    generateCanvas(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const mainPage = figma.createPage();
            mainPage.name = 'Design System';
            const styleGuidePage = figma.createPage();
            styleGuidePage.name = 'Style Guide';
            const componentsPage = figma.createPage();
            componentsPage.name = 'Components';
            // Generate main frames
            yield this.generateMainFrame(mainPage, config);
            yield this.generateStyleGuideFrame(styleGuidePage, config);
            yield this.generateComponentsFrame(componentsPage, config);
        });
    }
    generateMainFrame(page, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const frame = figma.createFrame();
            frame.name = 'Main Layout';
            this.setupLayout(frame, config.designSystem.layout);
            page.appendChild(frame);
            return frame;
        });
    }
    generateStyleGuideFrame(page, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const frame = figma.createFrame();
            frame.name = 'Style Guide';
            this.setupLayout(frame, config.designSystem.layout);
            page.appendChild(frame);
            return frame;
        });
    }
    generateComponentsFrame(page, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const frame = figma.createFrame();
            frame.name = 'Components';
            this.setupLayout(frame, config.designSystem.layout);
            page.appendChild(frame);
            return frame;
        });
    }
    setupLayout(frame, layout) {
        // Set frame dimensions based on layout type
        frame.resize(layout.dimensions.width, layout.dimensions.height);
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
