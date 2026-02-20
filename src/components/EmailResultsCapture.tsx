import { useState } from 'react';
import type { ScenarioResult } from '../utils/calculateScenarios';
import type { GymDetails } from '../types';

interface EmailResultsCaptureProps {
  scenario: ScenarioResult;
  gymDetails: GymDetails;
}

/**
 * HubSpot Integration Stub
 * 
 * When embedding this calculator on a HubSpot page, replace the
 * console.log below with a HubSpot Forms API submission:
 * 
 * ```
 * const portalId = 'YOUR_PORTAL_ID';
 * const formGuid = 'YOUR_FORM_GUID';
 * 
 * fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     fields: [
 *       { name: 'email', value: email },
 *       { name: 'number_of_locations', value: String(data.numberOfLocations) },
 *       { name: 'total_members', value: String(data.totalMembers) },
 *       { name: 'square_footage', value: String(data.squareFootage) },
 *       { name: 'music_use_types', value: data.musicUseTypes.join(', ') },
 *       { name: 'estimated_annual_cost', value: String(data.estimatedAnnualCost) },
 *       { name: 'pro_breakdown', value: data.proBreakdown },
 *       { name: 'has_instructor_led', value: String(data.hasInstructorLed) },
 *     ],
 *     context: {
 *       hutk: document.cookie.match(/hubspotutk=([^;]*)/)?.[1],
 *       pageUri: window.location.href,
 *       pageName: 'Music Licensing Calculator',
 *     },
 *   }),
 * });
 * ```
 * 
 * You can also push an event to HubSpot's tracking:
 * window._hsq = window._hsq || [];
 * window._hsq.push(['trackEvent', { id: 'calculator_email_captured' }]);
 */
function submitToHubSpot(email: string, data: Record<string, any>) {
  // TODO: Replace with HubSpot Forms API call (see above)
  console.log('📧 Email capture submitted:', { email, ...data });
  console.log('Ready to wire to HubSpot Forms API — see comments in EmailResultsCapture.tsx');
}

export default function EmailResultsCapture({ 
  scenario,
  gymDetails
}: EmailResultsCaptureProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);

    // Build the data payload
    const payload = {
      numberOfLocations: gymDetails.numberOfLocations,
      totalMembers: gymDetails.totalMembers,
      squareFootage: gymDetails.squareFootage,
      musicUseTypes: gymDetails.musicUseTypes,
      hasInstructorLed: gymDetails.musicUseTypes.includes('group'),
      isHfaMember: gymDetails.isHfaMember,
      estimatedAnnualCost: scenario.totalPerLocationFee,
      proBreakdown: scenario.fees
        .map(f => `${f.organizationName}: $${f.perLocationFee.toFixed(2)}/yr`)
        .join(' | '),
      timestamp: new Date().toISOString(),
    };

    submitToHubSpot(email, payload);

    // Brief delay to feel real
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  if (submitted) {
    return (
      <div className="rounded-lg p-3 flex items-center gap-2" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
        <span className="text-sm">✓</span>
        <p className="text-xs font-medium" style={{ color: '#166534' }}>
          Sent to {email} — check your inbox for your licensing breakdown.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg p-3" style={{ backgroundColor: 'var(--dm-bg)', border: '1px solid var(--dm-border)' }}>
      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
        Want a copy of this estimate?
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="input-field flex-1 text-sm"
          style={{ padding: '0.5rem 0.75rem' }}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary text-xs whitespace-nowrap"
          style={{ padding: '0.5rem 1rem' }}
        >
          {isSubmitting ? 'Sending...' : 'Send My Results'}
        </button>
      </div>
      <p className="text-xs mt-1.5" style={{ color: 'var(--dm-text-muted)' }}>
        We'll email your licensing breakdown. No spam.
      </p>
    </form>
  );
}
