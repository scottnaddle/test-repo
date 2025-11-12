
import React from 'react';

interface LogoDisplayProps {
  primaryLogo: string;
  secondaryMarks: string[];
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg ${className}`}>
    {children}
  </div>
);

const LogoImage: React.FC<{ base64: string, alt: string }> = ({ base64, alt }) => (
    <img 
        src={`data:image/png;base64,${base64}`} 
        alt={alt} 
        className="object-contain w-full h-full"
    />
);


const LogoDisplay: React.FC<LogoDisplayProps> = ({ primaryLogo, secondaryMarks }) => {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-white mb-4">Logos & Marks</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Primary Logo</h4>
          <div className="bg-white rounded-lg p-4 h-48 flex items-center justify-center">
            <LogoImage base64={primaryLogo} alt="Primary Logo" />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Secondary Marks</h4>
          <div className="grid grid-cols-2 gap-4">
            {secondaryMarks.map((mark, index) => (
              <div key={index} className="bg-white rounded-lg p-3 h-24 flex items-center justify-center">
                 <LogoImage base64={mark} alt={`Secondary Mark ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LogoDisplay;
