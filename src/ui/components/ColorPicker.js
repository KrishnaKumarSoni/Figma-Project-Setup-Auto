import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ColorPicker({ label, value, onChange }) {
    return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "text-sm", children: label }), _jsx("input", { type: "color", value: value, onChange: (e) => onChange(e.target.value), className: "w-8 h-8 rounded" }), _jsx("input", { type: "text", value: value, onChange: (e) => onChange(e.target.value), className: "w-24 text-sm rounded-md border-gray-300", placeholder: "#000000" })] }));
}
