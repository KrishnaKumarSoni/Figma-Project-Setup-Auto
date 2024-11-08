import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function FileUpload({ files, onChange }) {
    const handleFileChange = (e) => {
        if (e.target.files) {
            onChange(Array.from(e.target.files));
        }
    };
    return (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium", children: "Brand Assets" }), _jsx("input", { type: "file", multiple: true, onChange: handleFileChange, className: "mt-1 block w-full", accept: "image/*" }), files.length > 0 && (_jsxs("div", { className: "mt-2", children: [_jsx("p", { className: "text-sm text-gray-500", children: "Selected files:" }), _jsx("ul", { className: "text-sm", children: files.map((file, i) => (_jsx("li", { children: file.name }, i))) })] }))] }));
}
