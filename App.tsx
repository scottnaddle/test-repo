
import React, { useState, useCallback } from 'react';
import { BrandBible } from './types';
import { generateBrandIdentity } from './services/geminiService';
import BrandInputForm from './components/BrandInputForm';
import BrandBibleDisplay from './components/BrandBibleDisplay';
import LoadingState from './components/LoadingState';

function App() {
  const [mission, setMission] = useState<string>('');
  const [brandBible, setBrandBible] = useState<BrandBible | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (missionStatement: string) => {
    if (!missionStatement.trim()) {
      setError('Please enter a company mission or description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBrandBible(null);

    try {
      const result = await generateBrandIdentity(missionStatement, (message) => {
        setLoadingMessage(message);
      });
      setBrandBible(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred during brand generation.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Brand Identity Generator
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Describe your company's mission and let Gemini craft a unique brand identity for you, complete with logos, colors, and fonts.
          </p>
        </header>

        <main className="w-full">
          <BrandInputForm
            mission={mission}
            setMission={setMission}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {isLoading && <LoadingState message={loadingMessage} />}

          {brandBible && !isLoading && (
            <div className="mt-12">
              <BrandBibleDisplay brandBible={brandBible} />
            </div>
          )}
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
