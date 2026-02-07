import React from 'react';

interface TwoWaysComparisonProps {
  baselineCost: number;
  onSeeRecommendedSetup: () => void;
}

export default function TwoWaysComparison({ 
  baselineCost,
  onSeeRecommendedSetup
}: TwoWaysComparisonProps) {
  return (
    <div className="card card-elevated">
      <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--dm-text-primary)' }}>
        You have two ways to handle this
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Card 1: Direct Licensing */}
        <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--dm-bg)', border: '2px solid var(--dm-border)' }}>
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
            License directly with the PROs
          </h3>
          <p className="text-base font-semibold mb-5" style={{ color: 'var(--dm-text-muted)' }}>
            Complex: Manage 4 separate contracts, track renewals, risk non-compliance
          </p>
          
          <ul className="space-y-3 mb-6">
            <li className="text-base flex items-start gap-3" style={{ color: 'var(--dm-text-secondary)' }}>
              <span className="mt-1" style={{ color: 'var(--dm-text-muted)' }}>•</span>
              <span>Separate licenses with ASCAP, BMI, GMR, and SESAC</span>
            </li>
            <li className="text-base flex items-start gap-3" style={{ color: 'var(--dm-text-secondary)' }}>
              <span className="mt-1" style={{ color: 'var(--dm-text-muted)' }}>•</span>
              <span>You manage compliance + renewals yourself</span>
            </li>
            <li className="text-base flex items-start gap-3" style={{ color: 'var(--dm-text-secondary)' }}>
              <span className="mt-1" style={{ color: 'var(--dm-text-muted)' }}>•</span>
              <span>Music service not included</span>
            </li>
          </ul>

          <div className="pt-5 mt-5" style={{ borderTop: '1px solid var(--dm-border)' }}>
            <div className="text-sm mb-2" style={{ color: 'var(--dm-text-secondary)' }}>Estimated cost:</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--dm-text-primary)' }}>
              ~${baselineCost.toFixed(2)} / year
            </div>
            <div className="text-sm mt-1" style={{ color: 'var(--dm-text-muted)' }}>(licensing only)</div>
          </div>
        </div>

        {/* Card 2: Dynamic Media (Recommended) */}
        <div className="rounded-lg p-6 relative" style={{ backgroundColor: 'var(--dm-primary-light)', border: '2px solid var(--dm-primary)' }}>
          <div className="absolute -top-3 left-6 text-white px-4 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: 'var(--dm-primary)' }}>
            Recommended
          </div>
          
          <h3 className="text-xl font-bold mb-2 mt-2" style={{ color: 'var(--dm-text-primary)' }}>
            Optimize with Dynamic Media
          </h3>
          <p className="text-base font-semibold mb-5" style={{ color: 'var(--dm-primary)' }}>
            Simple: One subscription, zero paperwork, always compliant
          </p>
          
          <ul className="space-y-3 mb-8">
            <li className="text-base flex items-start gap-3" style={{ color: 'var(--dm-text-primary)' }}>
              <span className="font-bold mt-1" style={{ color: 'var(--dm-primary)' }}>✓</span>
              <span>Unlimited commercial music — fully licensed for business use</span>
            </li>
            <li className="text-base flex items-start gap-3" style={{ color: 'var(--dm-text-primary)' }}>
              <span className="font-bold mt-1" style={{ color: 'var(--dm-primary)' }}>✓</span>
              <span>Ambient music licensing fully handled — no contracts, paperwork, or reporting</span>
            </li>
            <li className="text-base flex items-start gap-3" style={{ color: 'var(--dm-text-primary)' }}>
              <span className="font-bold mt-1" style={{ color: 'var(--dm-primary)' }}>✓</span>
              <span>Expert compliance guidance — we ensure you're fully covered without overpaying</span>
            </li>
          </ul>

          <button
            onClick={onSeeRecommendedSetup}
            className="btn-primary w-full text-base"
          >
            See my recommended setup
          </button>
        </div>
      </div>
    </div>
  );
}
