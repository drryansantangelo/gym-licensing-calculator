import React from 'react';

const HowToModalContent = () => {
  return (
    <div className="text-sm text-gray-700 space-y-4">
      <p className="font-semibold">Go to:</p>
      <a href="https://www.bmi.com/licensing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
        👉 https://www.bmi.com/licensing
      </a>
      <ol className="list-decimal list-inside space-y-2">
        <li>Choose "Fitness Centers"</li>
        <li>Provide your member count and usage type</li>
        <li>Complete the application and submit payment</li>
        <li>Your license is emailed upon processing</li>
      </ol>
    </div>
  );
};

export default HowToModalContent; 