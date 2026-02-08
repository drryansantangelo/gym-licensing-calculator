import type { ScenarioResult } from '../utils/calculateScenarios';
import type { GymDetails } from '../types';

interface SimpleBaselineCostProps {
  scenario: ScenarioResult;
  numberOfLocations: number;
  hasInstructorLed: boolean;
  gymDetails: GymDetails;
}

export default function SimpleBaselineCost({ 
  scenario,
  numberOfLocations,
  hasInstructorLed,
  gymDetails,
}: SimpleBaselineCostProps) {
  // Build inputs summary parts
  const inputParts: string[] = [];
  if (gymDetails.totalMembers > 0) {
    inputParts.push(`${gymDetails.totalMembers.toLocaleString()} members`);
  }
  if (gymDetails.musicUseTypes.includes('ambient') && gymDetails.squareFootage > 0) {
    inputParts.push(`${gymDetails.squareFootage.toLocaleString()} sq ft`);
  }
  if (gymDetails.musicUseTypes.includes('group') && gymDetails.rooms.length > 0) {
    const totalClasses = gymDetails.rooms.reduce((sum, room) => sum + room.classesPerWeek, 0);
    inputParts.push(`${totalClasses} classes/wk`);
  }
  if (numberOfLocations > 1) {
    inputParts.push(`${numberOfLocations} locations`);
  }

  // Build inline PRO breakdown string
  const proBreakdown = scenario.fees
    .map(fee => `${fee.organizationName} $${fee.perLocationFee.toFixed(0)}`)
    .join(' · ');

  return (
    <div className="card card-elevated animate-fadeIn">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'var(--dm-primary)' }}>1</span>
        <span className="text-xs font-semibold" style={{ color: 'var(--dm-text-muted)' }}>Your licensing baseline</span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
        Your estimated annual licensing cost
      </h2>
      <p className="text-sm mb-5" style={{ color: 'var(--dm-text-secondary)' }}>
        This is what your gym would pay to license music directly with each PRO (Performing Rights Organization).{' '}
        {hasInstructorLed 
          ? 'Includes background music and instructor-led class licensing.'
          : 'Covers background music throughout your facility.'}
      </p>

      {/* Unified Cost Box — receipt style */}
      <div className="rounded-lg p-6 mb-4" style={{ backgroundColor: 'var(--dm-bg)', border: '2px solid var(--dm-border)' }}>
        {/* Cost */}
        <div className="text-center mb-4">
          <div className="text-4xl font-bold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
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
        <div className="mb-3" style={{ borderTop: '1px solid var(--dm-border)' }} />

        {/* PRO breakdown — inline receipt line */}
        <p className="text-xs text-center mb-2 font-medium" style={{ color: 'var(--dm-text-secondary)' }}>
          {proBreakdown}
        </p>

        {/* Inputs recap */}
        {inputParts.length > 0 && (
          <p className="text-xs text-center" style={{ color: 'var(--dm-text-muted)' }}>
            Based on {inputParts.join(' · ')}
          </p>
        )}
      </div>

    </div>
  );
}
