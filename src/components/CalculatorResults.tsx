import { useState } from 'react';
import type { ScenarioResult } from '../utils/calculateScenarios';
import type { GymDetails } from '../types';
import EmailResultsCapture from './EmailResultsCapture';

interface CalculatorResultsProps {
  scenario: ScenarioResult;
  dmScenario: ScenarioResult;
  gymDetails: GymDetails;
  onGetQuote: () => void;
}

export default function CalculatorResults({
  scenario,
  dmScenario,
  gymDetails,
  onGetQuote,
}: CalculatorResultsProps) {
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const hasInstructorLed = gymDetails.musicUseTypes.includes('group');
  const numberOfLocations = gymDetails.numberOfLocations;

  // Use pre-computed savings from the correct DM scenario
  const estimatedSavings = dmScenario.savings ?? 0;

  // Build inline PRO breakdown
  const proBreakdown = scenario.fees
    .map(fee => `${fee.organizationName} $${fee.perLocationFee.toFixed(0)}`)
    .join('  ·  ');

  // Build inputs summary
  const inputParts: string[] = [];
  if (gymDetails.totalMembers > 0) inputParts.push(`${gymDetails.totalMembers.toLocaleString()} members`);
  if (gymDetails.musicUseTypes.includes('ambient') && gymDetails.squareFootage > 0) {
    inputParts.push(`${gymDetails.squareFootage.toLocaleString()} sq ft`);
  }
  if (gymDetails.musicUseTypes.includes('group') && gymDetails.rooms.length > 0) {
    const totalClasses = gymDetails.rooms.reduce((sum, room) => sum + room.classesPerWeek, 0);
    inputParts.push(`${totalClasses} classes/wk`);
  }
  if (numberOfLocations > 1) inputParts.push(`${numberOfLocations} locations`);

  const diyBullets = [
    'Manage 4 separate PRO contracts',
    'Separate billing and renewal dates',
    'No music platform included',
  ];

  const dmBullets = [
    'Single subscription covers everything',
    'All background music licensing included',
    'Fully compliant — zero liability',
    '100M+ tracks via Soundtrack, backed by Spotify',
  ];

  return (
    <section className="section-gray" style={{ paddingTop: 0 }}>
      <div className="container-dm">
        <div className="container-narrow">
          <div className="animate-fadeIn">
            {/* Part A: Your estimated cost — fear anchor */}
            <div className="card card-elevated p-8 mb-6">
              <p className="text-sm font-semibold mb-5" style={{ color: '#991B1B' }}>
                If you handle licensing directly, you may owe:
              </p>

              <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
                  ${scenario.totalPerLocationFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--dm-text-secondary)' }}>
                  per location / year
                </p>
                {numberOfLocations > 1 && (
                  <p className="text-xs mt-1" style={{ color: 'var(--dm-text-muted)' }}>
                    ${(scenario.totalPerLocationFee * numberOfLocations).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total across {numberOfLocations} locations
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="mb-4" style={{ borderTop: '1px solid var(--dm-border)' }} />

              {/* PRO breakdown */}
              <p className="text-xs text-center mb-2 font-medium" style={{ color: 'var(--dm-text-secondary)' }}>
                {proBreakdown}
              </p>

              {/* Inputs recap */}
              {inputParts.length > 0 && (
                <p className="text-xs text-center" style={{ color: 'var(--dm-text-muted)' }}>
                  Based on {inputParts.join(' · ')}
                </p>
              )}

              <p className="text-xs text-center mt-4" style={{ color: 'var(--dm-text-muted)' }}>
                {hasInstructorLed
                  ? 'Includes background music and instructor-led class licensing.'
                  : 'Covers background music throughout your facility.'}
              </p>
            </div>

            {/* Part B: Two-column comparison — VISUAL PEAK */}
            <div className="mb-8 animate-fadeIn-delay-1" style={{ marginTop: '2rem' }}>
              <p
                className="text-center text-base font-bold mb-6"
                style={{ color: 'var(--dm-text-primary)' }}
              >
                You have two paths forward
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* DIY Column — Red/danger treatment (darkened) */}
                <div
                  className="rounded-xl p-6 relative"
                  style={{
                    backgroundColor: '#FEE2E2',
                    border: '2px solid #F87171',
                    borderLeft: '5px solid #DC2626',
                    boxShadow: '0 4px 24px rgba(239, 68, 68, 0.2)',
                  }}
                >

                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ color: '#991B1B' }}
                  >
                    License on your own
                  </p>

                  {/* Bold warning line */}
                  <div
                    className="flex items-center gap-2 mb-4 pb-4"
                    style={{ borderBottom: '1px solid #FECACA' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#DC2626" stroke="none">
                      <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
                    </svg>
                    <p className="text-sm font-bold" style={{ color: '#991B1B' }}>
                      Legal responsibility falls on you.
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {diyBullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#7F1D1D' }}>
                        <span className="flex-shrink-0 mt-0.5" style={{ color: '#DC2626' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="rounded-lg p-4 text-center"
                    style={{ backgroundColor: '#FECACA', border: '1px solid #F87171' }}
                  >
                    <p className="text-xs mb-1" style={{ color: '#991B1B' }}>Estimated annual cost</p>
                    <p className="text-2xl font-bold" style={{ color: '#DC2626' }}>
                      ${scenario.totalPerLocationFee.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr
                    </p>
                    <p className="text-xs" style={{ color: '#991B1B' }}>per location</p>
                  </div>
                </div>

                {/* Dynamic Media Column — Green/safe treatment (stronger) */}
                <div
                  className="rounded-xl p-6 relative"
                  style={{
                    backgroundColor: '#DCFCE7',
                    border: '2px solid #16A34A',
                    borderLeft: '5px solid #15803D',
                    boxShadow: '0 4px 24px rgba(34, 197, 94, 0.2)',
                  }}
                >
                  {/* Recommended badge */}
                  <div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: '#16A34A',
                      color: 'white',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)',
                    }}
                  >
                    Recommended
                  </div>

                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ color: '#14532D' }}
                  >
                    Fully Compliant — One Subscription
                  </p>

                  <ul className="space-y-3 mb-6">
                    {dmBullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#14532D' }}>
                        <span className="flex-shrink-0 mt-0.5" style={{ color: '#16A34A' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="rounded-lg p-4 text-center"
                    style={{ backgroundColor: '#BBF7D0', border: '1px solid #86EFAC' }}
                  >
                    <p className="text-xs mb-1" style={{ color: '#14532D' }}>Starting at</p>
                    <p className="text-2xl font-bold" style={{ color: '#15803D' }}>
                      $29.99/mo
                    </p>
                    <p className="text-xs" style={{ color: '#14532D' }}>per location</p>
                    <p className="text-xs mt-1" style={{ color: '#14532D', opacity: 0.8 }}>
                      No contracts with individual PROs required.
                    </p>
                  </div>

                  {/* Savings callout */}
                  {estimatedSavings > 100 && (
                    <div
                      className="mt-4 text-center rounded-lg p-3"
                      style={{ backgroundColor: '#BBF7D0' }}
                    >
                      <p className="text-lg font-bold" style={{ color: '#15803D' }}>
                        Save ~${estimatedSavings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/year
                      </p>
                      <p className="text-xs" style={{ color: '#14532D' }}>
                        {hasInstructorLed
                          ? 'SESAC licensing included with your subscription.'
                          : 'Zero legal exposure. Full music platform included.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Instructor-led shared note */}
              {hasInstructorLed && (
                <div
                  className="mt-4 rounded-lg p-4 flex items-start gap-3"
                  style={{ backgroundColor: 'var(--dm-bg)', border: '1px solid var(--dm-border)' }}
                >
                  <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--dm-primary)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </span>
                  <p className="text-sm" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
                    Instructor-led class licensing from the PROs is required regardless of which path you
                    choose — Dynamic Media helps you navigate it so you don't overpay.
                  </p>
                </div>
              )}
            </div>

            {/* Testimonial */}
            <div
              className="rounded-xl px-8 py-6"
              style={{
                backgroundColor: '#EEF1F6',
                border: '1px solid var(--dm-border)',
                marginTop: '2rem',
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wider mb-3 text-center"
                style={{ color: 'var(--dm-primary)', letterSpacing: '0.1em' }}
              >
                After Receiving a BMI Call…
              </p>
              <blockquote className="text-center">
                <p
                  className="italic mb-3"
                  style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.8', fontSize: '1.0625rem' }}
                >
                  "We received a call from BMI and honestly had no idea what we were supposed to do.
                  We were paying for a Spotify subscription and assumed that meant we were covered.
                  When we saw what we actually owed, switching to a fully licensed solution was
                  an easy decision. Now we don't worry about compliance at all."
                </p>
                <cite
                  className="text-xs not-italic font-medium"
                  style={{ color: 'var(--dm-text-muted)' }}
                >
                  — Owner, 3-Location Fitness Studio
                </cite>
              </blockquote>
            </div>

            {/* CTAs — elevated with spacing */}
            <div
              className="rounded-xl p-8 mb-6"
              style={{
                backgroundColor: 'var(--dm-bg)',
                border: '1px solid var(--dm-border)',
                marginTop: '0.75rem',
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetQuote}
                  className="flex-1 whitespace-nowrap font-bold rounded-xl transition-all cta-pulse"
                  style={{
                    backgroundColor: '#16A34A',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.125rem',
                    padding: '1.125rem 2rem',
                    boxShadow: '0 6px 20px rgba(22, 163, 74, 0.35), 0 0 0 0 rgba(22, 163, 74, 0.4)',
                  }}
                >
                  Get Fully Compliant Now
                </button>
                <button
                  onClick={() => setShowEmailCapture(!showEmailCapture)}
                  className="flex-1 font-semibold text-sm py-3.5 px-6 rounded-xl transition-all whitespace-nowrap"
                  style={{
                    color: 'var(--dm-primary)',
                    border: '2px solid var(--dm-primary)',
                    backgroundColor: showEmailCapture ? 'var(--dm-primary-light)' : 'white',
                  }}
                >
                  Send Me These Results
                </button>
              </div>

              <p className="text-xs text-center mt-4" style={{ color: 'var(--dm-text-muted)' }}>
                A licensing specialist will confirm exact costs. No commitment.
              </p>

              {/* Email capture — expandable */}
              {showEmailCapture && (
                <div className="mt-5 pt-5 animate-fadeIn" style={{ borderTop: '1px solid var(--dm-border)' }}>
                  <EmailResultsCapture scenario={scenario} gymDetails={gymDetails} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pulse animation for primary CTA */}
      <style>{`
        @keyframes ctaPulse {
          0% { box-shadow: 0 6px 20px rgba(22, 163, 74, 0.35), 0 0 0 0 rgba(22, 163, 74, 0.4); }
          70% { box-shadow: 0 6px 20px rgba(22, 163, 74, 0.35), 0 0 0 8px rgba(22, 163, 74, 0); }
          100% { box-shadow: 0 6px 20px rgba(22, 163, 74, 0.35), 0 0 0 0 rgba(22, 163, 74, 0); }
        }
        .cta-pulse {
          animation: ctaPulse 2.5s ease-in-out infinite;
        }
        .cta-pulse:hover {
          animation: none;
          box-shadow: 0 8px 28px rgba(22, 163, 74, 0.45) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}
