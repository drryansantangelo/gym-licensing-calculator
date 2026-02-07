import React, { useState } from 'react';
import type { ScenarioResult } from '../utils/calculateScenarios';
import type { GymDetails } from '../types';

type OrgName = 'ASCAP' | 'BMI' | 'SESAC' | 'GMR';

interface SimpleBaselineCostProps {
  scenario: ScenarioResult;
  numberOfLocations: number;
  hasInstructorLed: boolean;
  gymDetails: GymDetails;
  onBreakdownOpened?: () => void;
  onModalOpen?: (org: OrgName, contentType: 'calculation' | 'howto') => void;
}

export default function SimpleBaselineCost({ 
  scenario,
  numberOfLocations,
  hasInstructorLed,
  gymDetails,
  onBreakdownOpened,
  onModalOpen
}: SimpleBaselineCostProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showWhyThisNumber, setShowWhyThisNumber] = useState(false);
  
  // Calculate SESAC cost for savings calculation
  const sesacFee = scenario.fees.find(fee => fee.organizationName === 'SESAC')?.perLocationFee || 0;
  const dynamicMediaAnnualCost = 359.88;
  
  // Calculate savings based on music use type
  const savingsAmount = hasInstructorLed 
    ? sesacFee  // For instructor-led, savings is primarily SESAC elimination
    : Math.max(0, scenario.totalPerLocationFee - dynamicMediaAnnualCost); // For ambient-only, full savings

  const handleToggleBreakdown = () => {
    if (!showBreakdown && onBreakdownOpened) {
      onBreakdownOpened();
    }
    setShowBreakdown(!showBreakdown);
  };

  return (
    <div className="card card-elevated">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
        Your estimated annual music licensing cost
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--dm-text-muted)', maxWidth: '600px' }}>
        If you license directly with the performance rights organizations (ASCAP, BMI, GMR, SESAC).
      </p>

      {/* Split View: Cost + Savings Side-by-Side */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Left: Direct PRO Cost */}
        <div className="rounded-lg p-6 text-center" style={{ backgroundColor: 'var(--dm-bg)', border: '2px solid var(--dm-border)' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--dm-text-secondary)' }}>
            Direct PRO Cost
          </p>
          <div className="text-5xl font-bold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
            ${scenario.totalPerLocationFee.toFixed(2)}
          </div>
          <p className="text-sm" style={{ color: 'var(--dm-text-muted)' }}>
            per location / year
          </p>
          {numberOfLocations > 1 && (
            <p className="text-xs mt-2" style={{ color: 'var(--dm-text-muted)' }}>
              ${(scenario.totalPerLocationFee * numberOfLocations).toFixed(2)} for {numberOfLocations} locations
            </p>
          )}
        </div>

        {/* Right: With DM You Save */}
        <div className="rounded-lg p-6 text-center" style={{ backgroundColor: 'var(--dm-primary-light)', border: '2px solid var(--dm-primary)' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--dm-primary)' }}>
            With Dynamic Media You Save
          </p>
          <div className="text-5xl font-bold mb-2" style={{ color: 'var(--dm-primary)' }}>
            ${savingsAmount.toFixed(0)}
          </div>
          <p className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>
            {hasInstructorLed ? 'per year' : 'in Year 1'}
          </p>
        </div>
      </div>

      {/* Credibility Line */}
      <p className="text-xs mb-4" style={{ color: 'var(--dm-text-muted)', lineHeight: '1.5' }}>
        Based on official ASCAP, BMI, GMR, and SESAC rate schedules for U.S. fitness facilities.
      </p>

      {/* Detail Links */}
      <div className="space-y-2">
        <button
          onClick={handleToggleBreakdown}
          className="btn-secondary flex items-center gap-2"
        >
          <span>{showBreakdown ? '▼' : '▶'}</span>
          {showBreakdown ? 'Hide breakdown' : 'See how this is calculated (ASCAP, BMI, GMR, SESAC)'}
        </button>
        
        <button
          onClick={() => setShowWhyThisNumber(!showWhyThisNumber)}
          className="btn-secondary flex items-center gap-2"
        >
          <span>{showWhyThisNumber ? '▼' : '▶'}</span>
          {showWhyThisNumber ? 'Hide details' : 'Why is my number higher/lower than expected?'}
        </button>
      </div>

      {showBreakdown && (
        <div className="mt-6 pt-6 space-y-4" style={{ borderTop: '1px solid var(--dm-border)' }}>
          {scenario.fees.map((fee) => (
            <div key={fee.organizationName} className="rounded-lg p-4" style={{ backgroundColor: 'var(--dm-bg)', border: '1px solid var(--dm-border)' }}>
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-base font-semibold" style={{ color: 'var(--dm-text-primary)' }}>
                  {fee.organizationName}
                  {fee.message && (
                    <span className="text-sm font-normal ml-2" style={{ color: 'var(--dm-text-muted)' }}>
                      ({fee.message})
                    </span>
                  )}
                </h4>
                <span className="text-base font-bold" style={{ color: 'var(--dm-text-primary)' }}>
                  ${fee.perLocationFee.toFixed(2)}/year
                </span>
              </div>
              
              <div className="text-sm space-x-3">
                <button 
                  onClick={() => onModalOpen?.(fee.organizationName as OrgName, 'calculation')} 
                  className="btn-secondary text-xs"
                >
                  [How is this calculated?]
                </button>
                <span style={{ color: 'var(--dm-text-muted)' }}>•</span>
                <button 
                  onClick={() => onModalOpen?.(fee.organizationName as OrgName, 'howto')} 
                  className="btn-secondary text-xs"
                >
                  [How do I get this?]
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showWhyThisNumber && (
        <div className="mt-6 pt-6 space-y-4" style={{ borderTop: '1px solid var(--dm-border)' }}>
          <p className="text-base font-semibold mb-4" style={{ color: 'var(--dm-text-primary)' }}>
            Your estimate is based on:
          </p>

          <div className="space-y-3">
            {gymDetails.musicUseTypes.includes('ambient') && (
              <div className="flex items-start gap-3">
                <span className="font-bold mt-0.5" style={{ color: 'var(--dm-primary)' }}>✓</span>
                <div>
                  <p className="text-base font-semibold" style={{ color: 'var(--dm-text-primary)' }}>
                    Square footage: {gymDetails.squareFootage.toLocaleString()} sq ft
                  </p>
                  <p className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>
                    Drives ASCAP ambient rates and SESAC fees
                  </p>
                </div>
              </div>
            )}

            {gymDetails.totalMembers > 0 && (
              <div className="flex items-start gap-3">
                <span className="font-bold mt-0.5" style={{ color: 'var(--dm-primary)' }}>✓</span>
                <div>
                  <p className="text-base font-semibold" style={{ color: 'var(--dm-text-primary)' }}>
                    Membership: {gymDetails.totalMembers.toLocaleString()} members
                  </p>
                  <p className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>
                    BMI charges per member
                  </p>
                </div>
              </div>
            )}

            {gymDetails.musicUseTypes.includes('group') && gymDetails.rooms.length > 0 && (
              <div className="flex items-start gap-3">
                <span className="font-bold mt-0.5" style={{ color: 'var(--dm-primary)' }}>✓</span>
                <div>
                  <p className="text-base font-semibold" style={{ color: 'var(--dm-text-primary)' }}>
                    Group fitness: {gymDetails.rooms.reduce((sum, room) => sum + room.classesPerWeek, 0)} classes/week
                  </p>
                  <p className="text-sm" style={{ color: 'var(--dm-text-secondary)' }}>
                    Increases ASCAP fees and requires GMR licensing
                  </p>
                </div>
              </div>
            )}
          </div>

          <p className="text-sm pt-4" style={{ color: 'var(--dm-text-muted)', lineHeight: '1.6', borderTop: '1px solid var(--dm-border)' }}>
            Higher usage = higher fees. That's how PRO rates work for everyone — not just Dynamic Media estimates.
          </p>
        </div>
      )}
    </div>
  );
}
