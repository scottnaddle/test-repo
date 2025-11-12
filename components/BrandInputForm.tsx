
import React from 'react';

interface BrandInputFormProps {
  mission: string;
  setMission: (mission: string) => void;
  onGenerate: (mission: string) => void;
  isLoading: boolean;
}

const BrandInputForm: React.FC<BrandInputFormProps> = ({ mission, setMission, onGenerate, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(mission);
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-sm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="mission" className="block text-lg font-medium text-gray-300">
          Company Mission or Description
        </label>
        <p className="text-sm text-gray-500 mb-4">What does your company do? What are its values? Who is your audience?</p>
        <textarea
          id="mission"
          name="mission"
          rows={6}
          className="block w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          placeholder="e.g., 'An eco-friendly coffee subscription box that delivers ethically sourced beans from around the world to conscious consumers.'"
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          disabled={isLoading}
        />
        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={isLoading || !mission.trim()}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {isLoading ? 'Generating...' : 'Generate Brand Identity'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandInputForm;
