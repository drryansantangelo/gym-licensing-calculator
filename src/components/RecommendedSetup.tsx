import React from 'react';
import type { ScenarioResult } from '../utils/calculateScenarios';

interface RecommendedSetupProps {
  scenario: ScenarioResult;
  hasInstructorLed: boolean;
  onCTAClick?: (action: string) => void;
}

export default function RecommendedSetup({ 
  scenario, 
  hasInstructorLed,
  onCTAClick 
}: RecommendedSetupProps) {
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick('review-setup');
    }
  };

  const subscriptionAnnual = 359.88; // $29.99 * 12
  const instructorLedTotal = hasInstructorLed && scenario.fees 
    ? scenario.fees.reduce((sum, fee) => sum + fee.perLocationFee, 0) 
    : 0;

  return (
    <div className="bg-white border-2 border-blue-400 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          Recommended Setup for Your Gym
        </h3>
        <p className="text-blue-100 text-sm">
          Based on your inputs, here's the most common and efficient way gyms handle this
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Explanation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-800 leading-relaxed">
            {hasInstructorLed ? (
              <>
                Since your facility offers instructor-led classes, you need both music and the appropriate 
                licensing. The most efficient approach is to use a licensed music platform (like Soundtrack 
                Your Brand through Dynamic Media) for your facility-wide music, which simplifies ambient 
                licensing. Instructor-led licensing is handled separately to ensure correct coverage.
              </>
            ) : (
              <>
                For ambient music only, the most efficient approach is to use a licensed music platform 
                (like Soundtrack Your Brand through Dynamic Media). This provides commercial-use music 
                while simplifying your licensing obligations—no separate PRO contracts to manage.
              </>
            )}
          </p>
        </div>

        {/* Music Subscription */}
        <div className="space-y-3">
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <h4 className="text-lg font-semibold text-gray-900">Music Service (Dynamic Media)</h4>
              <span className="text-2xl font-bold text-gray-900">${subscriptionAnnual.toFixed(2)}/year</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Commercial-licensed music platform • Includes ambient music licensing
            </p>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Unlimited commercial music via Soundtrack Your Brand</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Ambient music licensing handled through the platform</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>No separate SESAC contract required</span>
              </li>
            </ul>
          </div>

          {/* Instructor-Led Note */}
          {hasInstructorLed && (
            <div className="border-t-2 border-gray-200 pt-4">
              <div className="flex items-baseline justify-between mb-1">
                <h4 className="text-lg font-semibold text-gray-900">Instructor-Led Licensing</h4>
                <span className="text-2xl font-bold text-gray-900">
                  ${instructorLedTotal.toFixed(2)}/year
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Handled separately • Dynamic Media provides guidance
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded p-3">
                <p className="text-sm text-gray-800 leading-relaxed">
                  <strong className="text-gray-900">Note:</strong> Instructor-led classes still require 
                  licensing from ASCAP, BMI, and GMR. Dynamic Media doesn't eliminate required licensing—we 
                  help you get the correct coverage, avoid unnecessary fees, and simplify the compliance process.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* What This Means */}
        <div className="border-t-2 border-gray-200 pt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">What this means for you:</h4>
          <ul className="space-y-2">
            <li className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>One music platform for your entire facility</span>
            </li>
            <li className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Ambient licensing simplified (no separate SESAC or multiple PRO contracts)</span>
            </li>
            {hasInstructorLed && (
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span>Expert guidance on instructor-led licensing requirements</span>
              </li>
            )}
            <li className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">✓</span>
              <span>Reduced complexity and compliance risk</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={handleCTAClick}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Have us review and confirm this setup
        </button>

        <p className="text-xs text-center text-gray-500">
          No obligation • Free consultation with licensing expert
        </p>
      </div>
    </div>
  );
}
