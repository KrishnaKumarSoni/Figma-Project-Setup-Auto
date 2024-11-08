import React from 'react';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
}

export default function FileUpload({ files, onChange }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(Array.from(e.target.files));
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium">Brand Assets</label>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="mt-1 block w-full"
        accept="image/*"
      />
      {files.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Selected files:</p>
          <ul className="text-sm">
            {files.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}