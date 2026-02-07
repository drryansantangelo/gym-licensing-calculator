import React from 'react';

interface RecommendedSetupPanelProps {
  hasInstructorLed: boolean;
  instructorLedCost?: number;
  onConfirmReview: () => void;
}

export default function RecommendedSetupPanel({ 
  hasInstructorLed,
  instructorLedCost,
  onConfirmReview
}: RecommendedSetupPanelProps) {
  const monthlyPrice = 29.99;
  const annualPrice = monthlyPrice * 12;

  return (
    <div className="rounded-lg p-8 mt-6 animate-fadeIn" style={{ backgroundColor: 'var(--dm-primary-light)', border: '2px solid var(--dm-primary)', boxShadow: 'var(--dm-shadow-lg)' }}>
      <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--dm-text-primary)' }}>
        Recommended setup for your gym
      </h3>
      
      <p className="text-base mb-8" style={{ color: 'var(--dm-text-secondary)' }}>
        Based on your inputs, here's the simplest compliant path.
      </p>

      <div className="card p-6 mb-8">
        {/* Ambient Music Section - Primary */}
        <div className="pb-8 mb-8" style={{ borderBottom: '2px solid var(--dm-border)' }}>
          <div className="flex justify-between items-baseline mb-3">
            <h3 className="text-xl font-bold" style={{ color: 'var(--dm-text-primary)' }}>
              Ambient (Background) Music — Fully Covered
            </h3>
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ color: 'var(--dm-text-primary)' }}>
                ${monthlyPrice}/month
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--dm-text-muted)' }}>
                month to month, no long-term contracts
              </div>
            </div>
          </div>
          
          <p className="text-lg font-semibold mb-4" style={{ color: 'var(--dm-text-primary)', lineHeight: '1.5' }}>
            This subscription covers everything you need for background music.
          </p>
          
          <p className="text-base" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
            The Dynamic Media subscription covers all ambient music licensing — no separate PRO contracts, no paperwork, no reporting required from you. Includes full commercial music platform (Soundtrack, backed by Spotify).
          </p>
        </div>

        {/* Instructor-Led Section - Only show if instructor-led classes selected */}
        {hasInstructorLed && (
          <div className="pb-8 mb-8" style={{ borderBottom: '1px solid var(--dm-border)' }}>
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--dm-text-primary)' }}>
              Instructor-Led Fitness Classes — Additional Licensing Required
            </h4>
            
            <p className="text-base mb-3" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
              For instructor-led fitness classes, you need to contract directly with the licensing organizations.
            </p>
            
            {instructorLedCost && instructorLedCost > 0 && (
              <p className="text-base mb-4" style={{ color: 'var(--dm-text-primary)', lineHeight: '1.6' }}>
                Your estimated direct licensing cost, based on your inputs, would be approximately <strong>${instructorLedCost.toFixed(0)}/year</strong>.
              </p>
            )}
            
            <p className="text-base mb-4" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
              You can still use the Dynamic Media platform (Soundtrack, backed by Spotify) for your classes.
            </p>
            
            <div className="rounded-lg px-4 py-3" style={{ backgroundColor: 'var(--dm-bg)', border: '1px solid var(--dm-border)' }}>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
                Platform benefits:
              </p>
              <ul className="text-sm space-y-1" style={{ color: 'var(--dm-text-secondary)' }}>
                <li>• Custom playlists and song-by-song control available</li>
                <li>• Fully licensed for business use</li>
                <li>• We guide you through the licensing requirements</li>
              </ul>
            </div>
          </div>
        )}

        {/* What's Included - Supporting Details */}
        <div className="pt-2">
          <div className="text-base font-semibold mb-4" style={{ color: 'var(--dm-text-primary)' }}>What's included:</div>
          <ul className="space-y-2.5">
            <li className="text-base flex items-start gap-3" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.5' }}>
              <span className="font-bold" style={{ color: 'var(--dm-primary)' }}>✓</span>
              <span>Unlimited commercial music for your facility via Soundtrack (backed by Spotify)</span>
            </li>
            <li className="text-base flex items-start gap-3" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.5' }}>
              <span className="font-bold" style={{ color: 'var(--dm-primary)' }}>✓</span>
              <span>Ambient music licensing handled through the platform</span>
            </li>
            <li className="text-base flex items-start gap-3" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.5' }}>
              <span className="font-bold" style={{ color: 'var(--dm-primary)' }}>✓</span>
              <span>Expert guidance on compliance and coverage</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onConfirmReview}
        className="btn-primary w-full text-lg"
      >
        Get My Custom Setup & Quote
      </button>
      
      <p className="text-sm text-center mt-4" style={{ color: 'var(--dm-text-secondary)' }}>
        We'll create a personalized plan based on your gym's specific needs
      </p>
    </div>
  );
}
