import React from 'react';

const HowToModalContent = () => {
  return (
    <div className="text-sm text-gray-700 space-y-4">
        <p>GMR licenses are custom-negotiated for each organization:</p>
        <p className="font-semibold">Go to:</p>
        <a href="https://globalmusicrights.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
            👉 https://globalmusicrights.com
        </a>
        <ol className="list-decimal list-inside space-y-2">
            <li>Click "Licensing" in the navigation</li>
            <li>Fill out the inquiry form with your usage details</li>
            <li>A GMR rep will contact you directly with pricing and next steps</li>
        </ol>
    </div>
  );
};

export default HowToModalContent; 