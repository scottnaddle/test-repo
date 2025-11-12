
import React, { useEffect } from 'react';
import { BrandBible } from '../types';
import LogoDisplay from './LogoDisplay';
import ColorPalette from './ColorPalette';
import TypographyGuide from './TypographyGuide';

interface BrandBibleDisplayProps {
  brandBible: BrandBible;
}

const BrandBibleDisplay: React.FC<BrandBibleDisplayProps> = ({ brandBible }) => {
  const { primaryLogo, secondaryMarks, colorPalette, fontPairing, companyName } = brandBible;

  useEffect(() => {
    if (fontPairing) {
      const headerFont = fontPairing.headerFont.replace(/ /g, '+');
      const bodyFont = fontPairing.bodyFont.replace(/ /g, '+');
      const fontUrl = `https://fonts.googleapis.com/css2?family=${headerFont}:wght@400;700&family=${bodyFont}:wght@400;700&display=swap`;
      
      const linkId = 'dynamic-google-fonts';
      let link = document.getElementById(linkId) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      link.href = fontUrl;
    }
  }, [fontPairing]);

  return (
    <div className="animate-fade-in space-y-12">
      <h2 className="text-3xl font-bold text-center text-white">Your Brand Bible for <span className="text-indigo-400">{companyName}</span></h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <LogoDisplay primaryLogo={primaryLogo} secondaryMarks={secondaryMarks} />
          <TypographyGuide fontPairing={fontPairing} />
        </div>
        <ColorPalette colors={colorPalette} />
      </div>
    </div>
  );
};

export default BrandBibleDisplay;
