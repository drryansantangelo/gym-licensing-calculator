import React from 'react';

const HowToModalContent = () => {
  return (
    <div className="text-sm text-gray-700 space-y-4">
      <p className="font-semibold">Visit the official ASCAP licensing portal:</p>
      <a href="https://www.ascap.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
        👉 https://www.ascap.com/
      </a>
      <ol className="list-decimal list-inside space-y-2">
        <li>Click “Licensing” &gt; “Businesses & Venues”</li>
        <li>Choose “Fitness Clubs” and follow the guided sign-up flow</li>
        <li>Fill in your business details and submit your fee calculation</li>
        <li>Pay online and download your license</li>
      </ol>
    </div>
  );
};

export default HowToModalContent; 