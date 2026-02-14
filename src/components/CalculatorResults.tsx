import { useState } from 'react';
import type { ScenarioResult } from '../utils/calculateScenarios';
import type { GymDetails } from '../types';
import EmailResultsCapture from './EmailResultsCapture';

interface CalculatorResultsProps {
  scenario: ScenarioResult;
  gymDetails: GymDetails;
  onGetQuote: () => void;
}

export default function CalculatorResults({
  scenario,
  gymDetails,
  onGetQuote,
}: CalculatorResultsProps) {
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const hasInstructorLed = gymDetails.musicUseTypes.includes('group');
  const numberOfLocations = gymDetails.numberOfLocations;
  const dynamicMediaMonthly = 29.99;
  const dynamicMediaAnnual = dynamicMediaMonthly * 12;
  const estimatedSavings = Math.max(0, scenario.totalPerLocationFee - dynamicMediaAnnual);

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

  return (
    <section className="section-gray" style={{ paddingTop: 0 }}>
      <div className="container-dm">
        <div className="container-narrow">
          {/* Calculating animation */}
          <div className="animate-fadeIn">
            {/* Part A: Your estimated cost */}
            <div className="card card-elevated p-8 mb-6">
              <p className="text-sm font-semibold mb-5" style={{ color: 'var(--dm-text-muted)' }}>
                Your estimated annual licensing cost
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
                This is what your gym would owe annually if licensing directly with each PRO.
                {hasInstructorLed
                  ? ' Includes background music and instructor-led class licensing.'
                  : ' Covers background music throughout your facility.'}
              </p>
            </div>

            {/* Part B: Dynamic Media solution */}
            <div
              className="rounded-xl p-8 mb-6 animate-fadeIn-delay-1"
              style={{
                background: 'linear-gradient(135deg, var(--dm-primary-light) 0%, #f0f9ff 100%)',
                border: '2px solid var(--dm-primary)',
                boxShadow: 'var(--dm-shadow-lg)',
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--dm-primary)' }}>
                    The simpler path
                  </p>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--dm-text-primary)' }}>
                    With Dynamic Media, background music licensing is included.
                  </h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs" style={{ color: 'var(--dm-text-muted)' }}>starting at</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--dm-text-primary)' }}>$29.99/mo</p>
                  <p className="text-xs" style={{ color: 'var(--dm-text-muted)' }}>per location</p>
                </div>
              </div>

              <p className="text-sm mb-5" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.7' }}>
                One subscription covers your commercial music platform and all background music
                licensing — ASCAP, BMI, SESAC, and GMR. No separate contracts. No paperwork.
              </p>

              {hasInstructorLed && (
                <div
                  className="rounded-lg p-4 mb-5"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', border: '1px solid var(--dm-border)' }}
                >
                  <p className="text-sm font-medium" style={{ color: 'var(--dm-text-primary)' }}>
                    For instructor-led classes
                  </p>
                  <p className="text-sm" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
                    Additional licensing is required for group fitness classes — regardless of platform.
                    We'll help you navigate exactly what's needed and make sure you don't overpay.
                  </p>
                </div>
              )}

              {/* Savings */}
              {estimatedSavings > 100 && (
                <div className="mb-6 pt-5" style={{ borderTop: '1px solid rgba(0, 174, 239, 0.2)' }}>
                  <p className="text-2xl font-bold" style={{ color: 'var(--dm-primary)' }}>
                    Save ~${estimatedSavings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/year
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--dm-text-secondary)' }}>
                    vs. licensing directly — plus a full commercial music platform included
                  </p>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={onGetQuote} className="btn-primary btn-primary-lg flex-1">
                  Get Your Custom Quote — Free
                </button>
                <button
                  onClick={() => setShowEmailCapture(!showEmailCapture)}
                  className="flex-1 font-semibold text-sm py-3 px-6 rounded-lg transition-all"
                  style={{
                    color: 'var(--dm-primary)',
                    border: '2px solid var(--dm-primary)',
                    backgroundColor: showEmailCapture ? 'var(--dm-primary-light)' : 'white',
                  }}
                >
                  Send Me These Results
                </button>
              </div>

              <p className="text-xs text-center mt-3" style={{ color: 'var(--dm-text-muted)' }}>
                A licensing specialist will confirm exact costs. No commitment.
              </p>

              {/* Email capture — expandable */}
              {showEmailCapture && (
                <div className="mt-5 pt-5 animate-fadeIn" style={{ borderTop: '1px solid rgba(0, 174, 239, 0.2)' }}>
                  <EmailResultsCapture scenario={scenario} gymDetails={gymDetails} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}