// RecommendedSetupPanel component
import type { ScenarioResult } from '../utils/calculateScenarios';
import type { GymDetails } from '../types';
import EmailResultsCapture from './EmailResultsCapture';

interface RecommendedSetupPanelProps {
  hasInstructorLed: boolean;
  instructorLedCost?: number;
  baselineCost: number;
  scenario: ScenarioResult;
  gymDetails: GymDetails;
  onConfirmReview: () => void;
  onContactSpecialist?: () => void;
}

export default function RecommendedSetupPanel({ 
  hasInstructorLed,
  instructorLedCost,
  baselineCost,
  scenario,
  gymDetails,
  onConfirmReview,
  onContactSpecialist
}: RecommendedSetupPanelProps) {
  const monthlyPrice = 29.99;
  const annualPrice = monthlyPrice * 12;

  // Calculate total DM cost and savings
  const totalDmAnnual = annualPrice + (hasInstructorLed && instructorLedCost ? instructorLedCost : 0);
  const estimatedSavings = Math.max(0, baselineCost - totalDmAnnual);

  return (
    <div className="animate-fadeIn" style={{ outline: 'none' }}>
      <div className="rounded-lg p-6 mb-5" style={{ backgroundColor: 'var(--dm-primary-light)', border: '2px solid var(--dm-primary)', boxShadow: 'var(--dm-shadow-lg)' }}>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'var(--dm-primary)' }}>3</span>
          <span className="text-xs font-semibold" style={{ color: 'var(--dm-text-muted)' }}>Your Dynamic Media setup</span>
        </div>

        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
          Here's what your plan looks like
        </h3>
        
        <p className="text-sm mb-6" style={{ color: 'var(--dm-text-secondary)' }}>
          Based on your gym's details, here's everything you'd get — music platform, licensing, and compliance — in one setup.
        </p>

        <div className="card p-5 mb-5">
          {/* Ambient Music Section - Primary */}
          <div className={hasInstructorLed ? "pb-5 mb-5" : ""} style={hasInstructorLed ? { borderBottom: '2px solid var(--dm-border)' } : {}}>
            <div className="flex items-baseline justify-between mb-3 gap-2">
              <h3 className="text-lg font-bold" style={{ color: 'var(--dm-text-primary)' }}>
                Soundtrack by Dynamic Media
              </h3>
              <div className="flex-shrink-0">
                <span className="text-xs" style={{ color: 'var(--dm-text-muted)' }}>starting at </span>
                <span className="text-xl font-bold" style={{ color: 'var(--dm-text-primary)' }}>
                  ${monthlyPrice}/mo
                </span>
              </div>
            </div>
            <p className="text-xs mb-1" style={{ color: 'var(--dm-text-muted)' }}>
              per location · month to month · cancel anytime
            </p>
            
            <p className="text-sm font-medium mb-3 mt-3" style={{ color: 'var(--dm-text-primary)', lineHeight: '1.5' }}>
              Background music — fully covered. One subscription includes your music platform and all licensing.
            </p>
            
            <div className="space-y-1.5 mb-3">
              <p className="text-sm flex items-start gap-2" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.5' }}>
                <span className="font-bold mt-0.5" style={{ color: 'var(--dm-primary)' }}>✓</span>
                <span>ASCAP, BMI, SESAC & GMR licensing included — no separate contracts</span>
              </p>
              <p className="text-sm flex items-start gap-2" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.5' }}>
                <span className="font-bold mt-0.5" style={{ color: 'var(--dm-primary)' }}>✓</span>
                <span>Backed by Spotify — 100M+ tracks, curated playlists for fitness</span>
              </p>
              <p className="text-sm flex items-start gap-2" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.5' }}>
                <span className="font-bold mt-0.5" style={{ color: 'var(--dm-primary)' }}>✓</span>
                <span>Soundzones, scheduled playlists, multi-location control</span>
              </p>
            </div>

            <p className="text-xs" style={{ color: 'var(--dm-text-muted)' }}>
              No paperwork. No reporting. Fully covered from day one.
            </p>
          </div>

          {/* Instructor-Led Section */}
          {hasInstructorLed && (
            <div className="pb-5 mb-5" style={{ borderBottom: '1px solid var(--dm-border)' }}>
              <h4 className="text-base font-semibold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
                Instructor-Led Classes — We'll Guide You
              </h4>
              
              <p className="text-sm mb-3" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.5' }}>
                Instructor-led classes require additional licensing regardless of platform. We'll walk you through exactly what's needed.
              </p>
              
              {instructorLedCost && instructorLedCost > 0 && (
                <div className="rounded-lg px-4 py-2.5 mb-3" style={{ backgroundColor: 'var(--dm-bg)', border: '1px solid var(--dm-border)' }}>
                  <p className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>
                    Estimated cost: <strong style={{ color: 'var(--dm-text-primary)' }}>${instructorLedCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/year</strong>
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--dm-text-muted)' }}>
                    Depends on class format and frequency. We'll confirm the exact amount.
                  </p>
                </div>
              )}
              
              <div className="space-y-1">
                <p className="text-xs flex items-start gap-2" style={{ color: 'var(--dm-text-secondary)' }}>
                  <span className="font-bold" style={{ color: 'var(--dm-primary)' }}>✓</span>
                  <span>Same music platform for classes — custom playlists, Spotify imports</span>
                </p>
                <p className="text-xs flex items-start gap-2" style={{ color: 'var(--dm-text-secondary)' }}>
                  <span className="font-bold" style={{ color: 'var(--dm-primary)' }}>✓</span>
                  <span>We navigate PRO requirements so you don't overpay</span>
                </p>
              </div>
            </div>
          )}

          {/* Savings Summary */}
          {estimatedSavings > 100 && (
            <div className="rounded-lg p-3" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <p className="text-sm font-bold" style={{ color: '#166534' }}>
                Estimated savings: ${estimatedSavings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/year vs. licensing directly
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#16A34A' }}>
                Plus a full commercial music platform — which you'd pay for separately with direct licensing
              </p>
            </div>
          )}
        </div>

        {/* Trust Signal */}
        <p className="text-xs text-center mb-5 font-medium" style={{ color: 'var(--dm-text-muted)' }}>
          Trusted by 55,000+ businesses · Licensed reseller of Sirius XM for Business and Soundtrack
        </p>

        {/* Primary CTA */}
        <button
          onClick={onConfirmReview}
          className="btn-primary w-full text-base"
        >
          Get Your Custom Quote — Free
        </button>
        
        <p className="text-xs text-center mt-3" style={{ color: 'var(--dm-text-secondary)' }}>
          A licensing specialist will review your setup and confirm exact costs. No commitment.
        </p>

        {/* Alternative: email results for later */}
        <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(0, 174, 239, 0.2)' }}>
          <p className="text-xs text-center mb-3" style={{ color: 'var(--dm-text-muted)' }}>
            Not ready yet? Send yourself a copy to review later.
          </p>
          <EmailResultsCapture scenario={scenario} gymDetails={gymDetails} />
        </div>
      </div>

      {/* Reassurance section — merged from former Block 4 */}
      <div className="rounded-lg p-5" style={{ backgroundColor: 'var(--dm-bg)', border: '1px solid var(--dm-border)' }}>
        {/* Urgency / consequence framing */}
        <div className="rounded-lg p-3 mb-4" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <p className="text-xs font-medium" style={{ color: '#92400E', lineHeight: '1.5' }}>
            <strong>Worth knowing:</strong> PROs actively audit businesses for compliance. 
            Fines can reach $150,000 per song played without a license. Most gym owners don't realize 
            they're at risk until they receive a letter.
          </p>
        </div>

        <p className="text-sm font-semibold text-center mb-1" style={{ color: 'var(--dm-text-primary)' }}>
          Not sure what your gym needs?
        </p>
        <p className="text-sm text-center mb-4" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.5' }}>
          Our specialists have helped thousands of gyms get properly covered — and they'll tell you honestly if you don't need something.
        </p>
        
        <div className="text-center">
          <button
            onClick={onContactSpecialist}
            className="btn-primary text-sm"
          >
            Talk to a Licensing Specialist
          </button>
          <p className="text-xs mt-2" style={{ color: 'var(--dm-text-muted)' }}>
            Free consultation · No pressure
          </p>
        </div>
      </div>
    </div>
  );
}
