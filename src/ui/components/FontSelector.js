import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function FontSelector({ primaryFont, secondaryFont, onChange }) {
    return (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium", children: "Fonts" }), _jsxs("div", { className: "space-y-2", children: [_jsx("input", { type: "text", value: primaryFont, onChange: (e) => onChange({ primary: e.target.value, secondary: secondaryFont }), placeholder: "Primary Font", className: "mt-1 block w-full rounded-md border-gray-300" }), _jsx("input", { type: "text", value: secondaryFont, onChange: (e) => onChange({ primary: primaryFont, secondary: e.target.value }), placeholder: "Secondary Font", className: "mt-1 block w-full rounded-md border-gray-300" })] })] }));
}
