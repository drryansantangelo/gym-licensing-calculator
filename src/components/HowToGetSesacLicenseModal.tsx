import React from 'react';

const HowToModalContent = () => {
  return (
    <div className="text-sm text-gray-700 space-y-4">
        <p>SESAC operates by direct contact only. Here's how to apply:</p>
        <p className="font-semibold">Visit:</p>
        <a href="https://www.sesac.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
            👉 https://www.sesac.com
        </a>
        <ol className="list-decimal list-inside space-y-2">
            <li>Click on "Licensing"</li>
            <li>Use the contact form or call their licensing department</li>
            <li>A SESAC rep will assign your rate tier and send paperwork</li>
        </ol>
    </div>
  );
};

export default HowToModalContent; 