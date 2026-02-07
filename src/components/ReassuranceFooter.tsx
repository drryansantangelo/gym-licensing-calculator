import React from 'react';

interface ReassuranceFooterProps {
  onContactSpecialist?: () => void;
}

export default function ReassuranceFooter({ onContactSpecialist }: ReassuranceFooterProps) {
  return (
    <div className="rounded-lg p-8 text-center" style={{ backgroundColor: 'var(--dm-bg)', border: '1px solid var(--dm-border)' }}>
      <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--dm-text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
        Every gym is different. Some need instructor-led licensing, some don't. Our job is to make 
        sure you're covered without paying for things you don't need.
      </p>
      
      <button
        onClick={onContactSpecialist}
        className="btn-secondary text-base"
      >
        Questions? Talk to a licensing specialist →
      </button>
    </div>
  );
}
