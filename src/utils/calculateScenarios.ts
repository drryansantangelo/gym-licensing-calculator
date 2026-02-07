import { GymDetails, LicenseFee } from '../types';
import { calculateTotalFees } from './calculateFees';

// Dynamic Media subscription pricing
export const DYNAMIC_MEDIA_MONTHLY_PRICE = 29.99;
export const DYNAMIC_MEDIA_ANNUAL_PRICE = DYNAMIC_MEDIA_MONTHLY_PRICE * 12; // $359.88

export interface ScenarioResult {
  scenarioId: 'baseline' | 'dynamic-media-ambient' | 'dynamic-media-instructed';
  title: string;
  subtitle: string;
  fees: LicenseFee[];
  totalPerLocationFee: number;
  monthlyPrice?: number;
  savings?: number;
  savingsPercentage?: number;
  description: string;
  recommendations: string[];
  ctaText?: string;
  ctaAction?: string;
  isPrimary?: boolean;
}

/**
 * BASELINE (Educational Only): "What gyms typically pay when licensing directly"
 * Shows full calculated cost including all applicable PROs - for comparison only
 */
export function calculateBaselineScenario(gymDetails: GymDetails): ScenarioResult {
  // Always calculate as if NOT using Soundtrack for baseline
  const baselineDetails = { ...gymDetails, isSoundtrackUser: false };
  const fees = calculateTotalFees(baselineDetails);
  const totalPerLocationFee = fees.reduce((sum, fee) => sum + fee.perLocationFee, 0);

  const hasInstructorLed = gymDetails.musicUseTypes.includes('group');

  let description = 'This is what gyms typically pay when licensing directly through each PRO (ASCAP, BMI, SESAC, GMR) and sourcing their own music. This is for educational comparison only.';
  
  if (hasInstructorLed) {
    description += ' Includes instructor-led group fitness licensing costs.';
  }

  return {
    scenarioId: 'baseline',
    title: 'What Gyms Often Pay When Licensing Directly',
    subtitle: 'For comparison only',
    fees,
    totalPerLocationFee,
    description,
    recommendations: [
      'Requires managing 4 separate PRO relationships',
      'Complex renewal and compliance tracking',
      'Separate music service costs not included here',
      'Potential for over-licensing or gaps in coverage'
    ]
  };
}

/**
 * DYNAMIC MEDIA - AMBIENT ONLY
 * Subscription includes all ambient music licensing
 */
export function calculateDynamicMediaAmbientScenario(
  gymDetails: GymDetails, 
  baselineScenario: ScenarioResult
): ScenarioResult {
  const isAmbientOnly = gymDetails.musicUseTypes.includes('ambient') && !gymDetails.musicUseTypes.includes('group');
  
  const totalPerLocationFee = DYNAMIC_MEDIA_ANNUAL_PRICE;
  const savings = baselineScenario.totalPerLocationFee - totalPerLocationFee;
  const savingsPercentage = (savings / baselineScenario.totalPerLocationFee) * 100;

  return {
    scenarioId: 'dynamic-media-ambient',
    title: 'Dynamic Media Music Subscription',
    subtitle: 'Includes all ambient music licensing',
    fees: [], // Not showing individual PRO fees - it's included
    totalPerLocationFee,
    monthlyPrice: DYNAMIC_MEDIA_MONTHLY_PRICE,
    savings: savings > 0 ? savings : undefined,
    savingsPercentage: savings > 0 ? savingsPercentage : undefined,
    description: 'Get unlimited commercial music for your facility with all required ambient music licensing included. No separate PRO contracts to manage.',
    recommendations: [
      'Unlimited commercial music via Soundtrack Your Brand',
      'All required ambient music licensing included (ASCAP, BMI, SESAC, GMR)',
      'No separate PRO licensing contracts to manage',
      'Fully compliant for gym floor, lobby, common areas',
      'Cancel anytime—no long-term contracts'
    ],
    ctaText: 'Get Started with Dynamic Media',
    ctaAction: 'get-started',
    isPrimary: isAmbientOnly
  };
}

/**
 * DYNAMIC MEDIA - WITH INSTRUCTOR-LED FITNESS
 * Subscription + separate instructor-led licensing (we concierge)
 */
export function calculateDynamicMediaInstructedScenario(
  gymDetails: GymDetails,
  baselineScenario: ScenarioResult
): ScenarioResult {
  const hasInstructorLed = gymDetails.musicUseTypes.includes('group');
  
  // Calculate instructor-led licensing costs separately
  // Use Soundtrack (SESAC removed), but keep instructor-led fees
  const instructedDetails = { ...gymDetails, isSoundtrackUser: true };
  const fees = calculateTotalFees(instructedDetails);
  
  // Extract only the instructor-led licensing fees (ASCAP, BMI, GMR for group fitness)
  const instructedLicensingFee = fees.reduce((sum, fee) => sum + fee.perLocationFee, 0);
  
  // Total = Dynamic Media subscription + instructor-led licensing
  const totalPerLocationFee = DYNAMIC_MEDIA_ANNUAL_PRICE + instructedLicensingFee;
  
  const savings = baselineScenario.totalPerLocationFee - totalPerLocationFee;
  const savingsPercentage = (savings / baselineScenario.totalPerLocationFee) * 100;

  let description = 'Get our full music subscription for your entire facility. Instructor-led fitness licensing (ASCAP, BMI, GMR) is handled separately—we guide you through the process to ensure correct coverage and avoid overpaying.';

  const recommendations = [
    'Same music subscription across your facility ($29.99/month)',
    'We guide you through instructor-led fitness licensing',
    'Avoid overpaying and confusion with expert support',
    'Keep one platform for all zones (studio, floor, lobby)',
    'Simplified compliance management'
  ];

  return {
    scenarioId: 'dynamic-media-instructed',
    title: 'Dynamic Media + Licensing Concierge for Instructor-Led Classes',
    subtitle: 'Instructor-led licensing handled separately',
    fees: hasInstructorLed ? fees : [], // Show fees only if applicable
    totalPerLocationFee,
    monthlyPrice: DYNAMIC_MEDIA_MONTHLY_PRICE,
    savings: savings > 0 ? savings : undefined,
    savingsPercentage: savings > 0 ? savingsPercentage : undefined,
    description,
    recommendations,
    ctaText: 'Get a Custom Recommendation',
    ctaAction: 'get-recommendation',
    isPrimary: hasInstructorLed
  };
}

/**
 * Calculate all scenarios based on gym details
 */
export function calculateAllScenarios(gymDetails: GymDetails): {
  baseline: ScenarioResult;
  dynamicMediaAmbient: ScenarioResult;
  dynamicMediaInstructed: ScenarioResult;
} {
  const baseline = calculateBaselineScenario(gymDetails);
  const dynamicMediaAmbient = calculateDynamicMediaAmbientScenario(gymDetails, baseline);
  const dynamicMediaInstructed = calculateDynamicMediaInstructedScenario(gymDetails, baseline);

  return {
    baseline,
    dynamicMediaAmbient,
    dynamicMediaInstructed
  };
}
