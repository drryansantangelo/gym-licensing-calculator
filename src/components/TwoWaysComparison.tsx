// TwoWaysComparison component

interface TwoWaysComparisonProps {
  baselineCost: number;
  onSeeRecommendedSetup: () => void;
}

export default function TwoWaysComparison({ 
  baselineCost,
  onSeeRecommendedSetup
}: TwoWaysComparisonProps) {
  const dynamicMediaMonthly = 29.99;
  const dynamicMediaAnnual = dynamicMediaMonthly * 12;
  const estimatedSavings = Math.max(0, baselineCost - dynamicMediaAnnual);

  return (
    <div className="card card-elevated animate-fadeIn">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'var(--dm-primary)' }}>2</span>
        <span className="text-xs font-semibold" style={{ color: 'var(--dm-text-muted)' }}>Your options</span>
      </div>

      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
        Two paths to get covered
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--dm-text-secondary)' }}>
        You can license directly with each PRO, or simplify everything through a single subscription.
      </p>

      {/* Card 1: Direct Licensing — compact, muted */}
      <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'var(--dm-bg)', border: '1px solid var(--dm-border)' }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-base font-bold mb-1" style={{ color: 'var(--dm-text-secondary)' }}>
              License directly with the PROs
            </h3>
            <p className="text-xs mb-3" style={{ color: 'var(--dm-text-muted)' }}>
              Manage separate contracts with ASCAP, BMI, SESAC, and GMR individually.
            </p>
            <div className="space-y-1">
              <p className="text-xs flex items-start gap-2" style={{ color: 'var(--dm-text-muted)' }}>
                <span>—</span>
                <span>4 separate license agreements</span>
              </p>
              <p className="text-xs flex items-start gap-2" style={{ color: 'var(--dm-text-muted)' }}>
                <span>—</span>
                <span>You handle compliance, renewals, and reporting</span>
              </p>
              <p className="text-xs flex items-start gap-2" style={{ color: 'var(--dm-text-muted)' }}>
                <span>—</span>
                <span>Music service not included</span>
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold" style={{ color: 'var(--dm-text-secondary)' }}>
              ~${baselineCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr
            </div>
            <div className="text-xs" style={{ color: 'var(--dm-text-muted)' }}>licensing only</div>
          </div>
        </div>
      </div>

      {/* Card 2: Dynamic Media (Recommended) — prominent, full weight */}
      <div className="rounded-lg p-5 relative" style={{ backgroundColor: 'var(--dm-primary-light)', border: '2px solid var(--dm-primary)' }}>
        <div className="absolute -top-3 left-5 text-white px-3 py-0.5 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: 'var(--dm-primary)' }}>
          Recommended
        </div>
        
        <h3 className="text-lg font-bold mb-1 mt-1" style={{ color: 'var(--dm-text-primary)' }}>
          Simplify with Dynamic Media
        </h3>
        <p className="text-sm font-medium mb-4" style={{ color: 'var(--dm-primary)' }}>
          One subscription. Licensing included. No paperwork.
        </p>
        
        <div className="space-y-2 mb-5">
          <p className="text-sm flex items-start gap-2" style={{ color: 'var(--dm-text-primary)' }}>
            <span className="font-bold mt-0.5" style={{ color: 'var(--dm-primary)' }}>✓</span>
            <span>Unlimited commercial music via Soundtrack (backed by Spotify)</span>
          </p>
          <p className="text-sm flex items-start gap-2" style={{ color: 'var(--dm-text-primary)' }}>
            <span className="font-bold mt-0.5" style={{ color: 'var(--dm-primary)' }}>✓</span>
            <span>Background music licensing fully included — no PRO contracts needed</span>
          </p>
          <p className="text-sm flex items-start gap-2" style={{ color: 'var(--dm-text-primary)' }}>
            <span className="font-bold mt-0.5" style={{ color: 'var(--dm-primary)' }}>✓</span>
            <span>Expert compliance guidance — we make sure you're fully covered</span>
          </p>
        </div>

        <div className="flex items-baseline justify-between mb-5 pt-4" style={{ borderTop: '1px solid rgba(0, 174, 239, 0.2)' }}>
          <div>
            <span className="text-xs font-medium" style={{ color: 'var(--dm-primary)' }}>Starting at </span>
            <span className="text-xl font-bold" style={{ color: 'var(--dm-text-primary)' }}>$29.99/mo</span>
            <span className="text-xs ml-1" style={{ color: 'var(--dm-text-muted)' }}>per location</span>
          </div>
          {estimatedSavings > 100 && (
            <span className="text-sm font-bold" style={{ color: 'var(--dm-primary)' }}>
              Save ~${estimatedSavings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr
            </span>
          )}
        </div>

        <button
          onClick={onSeeRecommendedSetup}
          className="btn-primary w-full text-sm"
        >
          See my recommended setup →
        </button>
      </div>
    </div>
  );
}
