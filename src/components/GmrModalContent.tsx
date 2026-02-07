import React from 'react';

const ModalContent = () => {
  return (
    <div className="text-sm text-gray-700 space-y-6">
      {/* Educational Introduction */}
      <div className="space-y-3">
        <p style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
          GMR (Global Music Rights) is a performing rights organization that represents a catalog of works from select songwriters and publishers.
        </p>
        <p style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
          For U.S. fitness facilities, GMR licensing is typically a flat annual fee per location.
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '2px solid var(--dm-border)', paddingTop: '1.5rem' }}>
        <h4 className="font-semibold mb-3" style={{ color: 'var(--dm-text-primary)' }}>How this fee is calculated</h4>
      </div>

      {/* Calculation Details */}
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

      <p className="font-semibold p-3 rounded-lg" style={{ backgroundColor: 'var(--dm-primary-light)', color: 'var(--dm-text-primary)' }}>
        Most businesses will need to reach out directly to GMR for a quote.
      </p>

      {/* GMR Clarification */}
      <p className="text-sm" style={{ color: 'var(--dm-text-muted)', fontStyle: 'italic' }}>
        For gyms, this fee is commonly $650 per year per location.
      </p>
    </div>
  );
};

export default ModalContent; 