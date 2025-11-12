
import React from 'react';
import { FontPairing } from '../types';

interface TypographyGuideProps {
  fontPairing: FontPairing;
}

const TypographyGuide: React.FC<TypographyGuideProps> = ({ fontPairing }) => {
  const { headerFont, bodyFont } = fontPairing;

  const headerStyle = { fontFamily: `'${headerFont}', sans-serif` };
  const bodyStyle = { fontFamily: `'${bodyFont}', sans-serif` };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Typography</h3>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">Header Font: {headerFont}</p>
          <h4 className="text-3xl font-bold text-gray-100 truncate" style={headerStyle}>
            The quick brown fox jumps
          </h4>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">Body Font: {bodyFont}</p>
          <p className="text-gray-300" style={bodyStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypographyGuide;
