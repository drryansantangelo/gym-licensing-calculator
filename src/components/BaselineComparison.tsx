import React, { useState } from 'react';
import type { ScenarioResult } from '../utils/calculateScenarios';

type OrgName = 'ASCAP' | 'BMI' | 'SESAC' | 'GMR';

interface BaselineComparisonProps {
  scenario: ScenarioResult;
  numberOfLocations: number;
  onViewDetails?: (scenarioId: string) => void;
  onModalOpen?: (org: OrgName, contentType: 'calculation' | 'howto') => void;
}

export default function BaselineComparison({ 
  scenario,
  numberOfLocations, 
  onViewDetails,
  onModalOpen
}: BaselineComparisonProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const totalAnnual = scenario.totalPerLocationFee * numberOfLocations;

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gray-100 border-b-2 border-gray-300 p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Estimated Annual Licensing Cost (Direct to PROs)
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          This reflects what gyms typically pay when licensing music directly through the performance 
          rights organizations (ASCAP, BMI, GMR, and SESAC), without optimization or guidance.
        </p>
      </div>

      {/* Cost Display */}
      <div className="p-6">
        <div className="flex items-baseline justify-between mb-4 pb-4 border-b-2 border-gray-200">
          <div>
            <div className="text-sm text-gray-600 mb-1">Per location annual cost:</div>
            <div className="text-4xl font-bold text-gray-900">
              ${scenario.totalPerLocationFee.toFixed(2)}
            </div>
          </div>
          {numberOfLocations > 1 && (
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Total for {numberOfLocations} locations:</div>
              <div className="text-3xl font-bold text-gray-900">
                ${totalAnnual.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-800 leading-relaxed">
            <strong className="text-gray-900">Important:</strong> This is an estimate of PRO licensing costs only. 
            It does not include the cost of a music service. Most gyms also pay for Spotify, Apple Music, or other 
            platforms—which aren't legally licensed for commercial use in fitness facilities.
          </p>
        </div>

        {/* Toggle Breakdown */}
        <button
          onClick={() => {
            setShowBreakdown(!showBreakdown);
            if (!showBreakdown && onViewDetails) {
              onViewDetails(scenario.scenarioId);
            }
          }}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 mb-4"
        >
          {showBreakdown ? '▼' : '▶'} {showBreakdown ? 'Hide' : 'View'} detailed PRO breakdown
        </button>

        {/* Breakdown */}
        {showBreakdown && (
          <div className="border-t border-gray-300 pt-4">
            <div className="space-y-4">
              {scenario.fees.map((fee) => (
                <div key={fee.organizationName} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-sm font-semibold text-gray-900">
                      {fee.organizationName}
                      {fee.message && (
                        <span className="text-xs font-normal text-gray-500 ml-2">
                          ({fee.message})
                        </span>
                      )}
                    </h5>
                    <span className="text-sm font-bold text-gray-900">
                      ${fee.perLocationFee.toFixed(2)}/year
                    </span>
                  </div>
                  
                  <div className="text-xs space-x-2 mb-2">
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

                  <div className="space-y-1 pl-2">
                    {fee.feeBreakdown.map((item, index) => {
                      const breakdownKey = `${fee.organizationName}-baseline-${index}`;
                      const isDiscount = item.description.includes('Discount');
                      
                      let textColor = 'text-gray-700';
                      if (isDiscount) {
                        textColor = 'text-green-600';
                      }

                      return (
                        <div key={breakdownKey} className="flex justify-between text-xs">
                          <span className="text-gray-600">{item.description}</span>
                          <span className={textColor}>
                            {item.amount >= 0 ? '+' : ''}${item.amount.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
