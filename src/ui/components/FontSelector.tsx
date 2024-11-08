import React, { useEffect, useState } from 'react';

interface FontSelectorProps {
  primaryFont: string;
  secondaryFont: string;
  onChange: (fonts: { primary: string; secondary: string }) => void;
}

export default function FontSelector({ primaryFont, secondaryFont, onChange }: FontSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium">Fonts</label>
      <div className="space-y-2">
        <input
          type="text"
          value={primaryFont}
          onChange={(e) => onChange({ primary: e.target.value, secondary: secondaryFont })}
          placeholder="Primary Font"
          className="mt-1 block w-full rounded-md border-gray-300"
        />
        <input
          type="text"
          value={secondaryFont}
          onChange={(e) => onChange({ primary: primaryFont, secondary: e.target.value })}
          placeholder="Secondary Font"
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>
    </div>
  );
}