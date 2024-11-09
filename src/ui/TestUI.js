import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function TestUI() {
    const testConfig = {
        colors: {
            primary: '#FF0000',
            secondary: '#00FF00',
            accent: '#0000FF',
            background: '#FFFFFF',
            text: '#000000'
        },
        fonts: {
            primary: 'Inter',
            secondary: 'Roboto'
        },
        layout: 'mobile_first',
        brandVoice: 'Professional and modern'
    };
    const handleTest = () => {
        parent.postMessage({
            pluginMessage: {
                type: 'create-design-system',
                data: testConfig
            }
        }, '*');
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("h1", { className: "text-lg font-bold mb-4", children: "Canvas Generator Test" }), _jsx("button", { onClick: handleTest, className: "bg-blue-500 text-white px-4 py-2 rounded", children: "Generate Test Canvas" })] }));
}
