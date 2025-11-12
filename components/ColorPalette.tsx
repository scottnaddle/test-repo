
import React from 'react';
import { Color } from '../types';

interface ColorPaletteProps {
  colors: Color[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a small notification here if desired
  };
  
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Color Palette</h3>
      <div className="space-y-4">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-lg border-2 border-gray-600" 
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="flex-1">
              <p className="font-semibold text-white">{color.name}</p>
              <p className="text-gray-400 text-sm">{color.usage}</p>
              <button 
                onClick={() => copyToClipboard(color.hex)}
                className="mt-1 text-indigo-400 font-mono text-xs hover:text-indigo-300 transition-colors"
                title="Copy to clipboard"
              >
                {color.hex}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
