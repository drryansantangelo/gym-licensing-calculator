import React, { useState } from 'react';
import type { ScenarioResult } from '../utils/calculateScenarios';

type OrgName = 'ASCAP' | 'BMI' | 'SESAC' | 'GMR';

interface AlternativeScenariosProps {
  baseline: ScenarioResult;
  ambientOnly?: ScenarioResult;
  currentRecommendation: ScenarioResult;
  hasInstructorLed: boolean;
  onModalOpen?: (org: OrgName, contentType: 'calculation' | 'howto') => void;
}

export default function AlternativeScenarios({ 
  baseline,
  ambientOnly,
  currentRecommendation,
  hasInstructorLed,
  onModalOpen
}: AlternativeScenariosProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl text-gray-600">{isExpanded ? '▼' : '▶'}</span>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">See other scenarios</h3>
            <p className="text-sm text-gray-600">Compare different approaches (for reference only)</p>
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="border-t border-gray-300 p-6 bg-white space-y-6">
          
          {/* Direct Licensing Scenario */}
          <div className="border-l-4 border-gray-400 pl-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  Direct Licensing Approach
                </h4>
                <p className="text-sm text-gray-600">
                  What gyms typically pay when licensing music directly through each PRO
                </p>
              </div>
              <span className="text-2xl font-bold text-gray-700">
                ${baseline.totalPerLocationFee.toFixed(2)}/year
              </span>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
              <p className="text-xs text-gray-700">
                <strong>Note:</strong> This estimate reflects licensing fees only and doesn't include the cost 
                of a music service. Most gyms also pay for Spotify, Apple Music, or other services that aren't 
                legally licensed for commercial use.
              </p>
            </div>

            <div className="space-y-3">
              {baseline.fees.map((fee) => (
                <div key={fee.organizationName} className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="text-sm font-semibold text-gray-900">
                      {fee.organizationName}
                      {fee.message && (
                        <span className="text-xs font-normal text-gray-500 ml-2">({fee.message})</span>
                      )}
                    </h5>
                    <span className="text-sm font-bold text-gray-900">
                      ${fee.perLocationFee.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="text-xs space-x-2">
                    <button 
                      onClick={() => onModalOpen?.(fee.organizationName as OrgName, 'calculation')} 
                      className="text-blue-600 hover:underline"
                    >
                      [How is this calculated?]
                    </button>
                    <span className="text-gray-400">•</span>
                    <button 
                      onClick={() => onModalOpen?.(fee.organizationName as OrgName, 'howto')} 
                      className="text-blue-600 hover:underline"
                    >
                      [How do I get this?]
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <p className="text-xs text-gray-600">
                <strong>Considerations:</strong> Requires managing 4 separate PRO relationships, complex renewal 
                tracking, and separate music service costs. Risk of over-licensing or coverage gaps.
              </p>
            </div>
          </div>

          {/* Ambient-Only Scenario (if applicable) */}
          {ambientOnly && !hasInstructorLed && (
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    Ambient Music Only Setup
                  </h4>
                  <p className="text-sm text-gray-600">
                    If your gym uses music only in common areas (no instructor-led classes)
                  </p>
                </div>
                <span className="text-2xl font-bold text-green-700">
                  ${ambientOnly.totalPerLocationFee.toFixed(2)}/year
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-3">
                Ambient-only facilities have simpler licensing needs. Using a licensed music platform like 
                Soundtrack Your Brand eliminates the need for separate SESAC contracts and simplifies PRO obligations.
              </p>

              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="text-xs text-gray-700">
                  <strong>Good for:</strong> Gyms without group fitness classes that want straightforward, 
                  compliant music with minimal administrative overhead.
                </p>
              </div>
            </div>
          )}

          {/* Why the Recommendation is Different */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              Why we recommend the setup above
            </h4>
            <p className="text-sm text-gray-800 leading-relaxed">
              {hasInstructorLed ? (
                <>
                  For gyms with instructor-led classes, the recommended approach balances simplicity with 
                  compliance. You get a single music platform for the facility while ensuring instructor-led 
                  licensing is handled correctly. This prevents overpaying on unnecessary licenses (like SESAC) 
                  while maintaining proper coverage where it's required.
                </>
              ) : (
                <>
                  For ambient-only gyms, the recommended approach eliminates unnecessary complexity. Instead 
                  of managing multiple PRO contracts and sourcing music separately, you get both music and 
                  licensing through a single platform. This is the most common setup for gyms in your situation.
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
