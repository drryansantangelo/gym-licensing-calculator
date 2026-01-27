import React from 'react';

const ModalContent = () => {
  return (
    <div className="text-sm text-gray-700 space-y-4">
      <p>
        GMR does not publish standard rates. Their licenses are custom-negotiated, especially for larger organizations.
      </p>
      
      <div className="space-y-2">
        <h4 className="font-bold text-gray-800">Key factors include:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Number of locations</li>
          <li>Type of music use</li>
          <li>Brand visibility</li>
          <li>Budget or market presence</li>
        </ul>
      </div>

      <p className="font-semibold bg-blue-50 p-3 rounded-lg">
        📞 Most businesses will need to reach out directly to GMR for a quote.
      </p>
    </div>
  );
};

export default ModalContent; 