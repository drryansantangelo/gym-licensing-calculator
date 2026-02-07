import React, { useState } from 'react';
import type { ScenarioResult } from '../utils/calculateScenarios';
import type { LicenseFee } from '../types';

type OrgName = 'ASCAP' | 'BMI' | 'SESAC' | 'GMR';

interface DynamicMediaCardProps {
  scenario: ScenarioResult;
  onCTAClick?: (scenarioId: string, action: string) => void;
  onViewDetails?: (scenarioId: string) => void;
  onModalOpen?: (org: OrgName, contentType: 'calculation' | 'howto') => void;
}

export default function DynamicMediaCard({ 
  scenario, 
  onCTAClick,
  onViewDetails,
  onModalOpen
}: DynamicMediaCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    if (newExpanded && onViewDetails) {
      onViewDetails(scenario.scenarioId);
    }
  };

  const handleCTAClick = () => {
    if (scenario.ctaAction && onCTAClick) {
      onCTAClick(scenario.scenarioId, scenario.ctaAction);
    }
  };

  const hasInstructorLedFees = scenario.fees && scenario.fees.length > 0;
  const instructorLedTotal = hasInstructorLedFees 
    ? scenario.fees.reduce((sum, fee) => sum + fee.perLocationFee, 0)
    : 0;

  return (
    <div className={`border-2 rounded-lg overflow-hidden transition-all ${
      scenario.isPrimary 
        ? 'border-blue-600 bg-blue-50 shadow-lg' 
        : 'border-blue-400 bg-white'
    }`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-900">{scenario.title}</h3>
              {scenario.isPrimary && (
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase">
                  Recommended
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 font-medium">{scenario.subtitle}</p>
          </div>
        </div>

        {/* Pricing Display */}
        <div className="mb-4 p-4 bg-white rounded-lg border-2 border-blue-200">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-blue-600">
              ${scenario.monthlyPrice?.toFixed(2)}
            </span>
            <span className="text-gray-600 font-medium">/month per location</span>
          </div>
          <div className="text-sm text-gray-600">
            ${scenario.totalPerLocationFee.toFixed(2)} billed annually per location
          </div>
          
          {hasInstructorLedFees && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-semibold">Plus:</span> Instructor-led licensing (handled separately)
              </div>
              <div className="text-sm text-gray-600">
                Estimated: ${instructorLedTotal.toFixed(2)}/year per location
              </div>
            </div>
          )}
        </div>

        {/* Savings Badge */}
        {scenario.savings !== undefined && scenario.savings > 0 && (
          <div className="mb-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-green-800">
                Save ${scenario.savings.toFixed(2)}/year per location
              </span>
              <span className="text-sm font-bold text-green-800">
                ({scenario.savingsPercentage?.toFixed(0)}% less than direct licensing)
              </span>
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          {scenario.description}
        </p>

        {/* Benefits List */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">What's included:</h4>
          <ul className="space-y-2">
            {scenario.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Toggle Licensing Details (for instructor-led) */}
        {hasInstructorLedFees && (
          <button
            onClick={handleToggle}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 mb-4"
          >
            {isExpanded ? '▼' : '▶'} {isExpanded ? 'Hide' : 'View'} instructor-led licensing breakdown
          </button>
        )}

        {/* CTA Button */}
        {scenario.ctaText && scenario.ctaAction && (
          <button
            onClick={handleCTAClick}
            className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
              scenario.isPrimary
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {scenario.ctaText}
          </button>
        )}
      </div>

      {/* Expandable Licensing Details */}
      {isExpanded && hasInstructorLedFees && (
        <div className="border-t-2 border-gray-200 p-6 bg-gray-50">
          <h4 className="text-sm font-bold text-gray-900 mb-3">
            Instructor-Led Licensing Breakdown (Handled Separately)
          </h4>
          <p className="text-xs text-gray-600 mb-4">
            These costs are separate from your Dynamic Media subscription. We guide you through obtaining 
            the correct licensing and help you avoid overpaying.
          </p>
          
          <div className="space-y-4">
            {scenario.fees.map((fee) => (
              <div key={fee.organizationName} className="bg-white p-3 rounded border border-gray-200">
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
                    className="font-normal text-blue-600 hover:underline"
                  >
                    [How is this calculated?]
                  </button>
                  <span className="text-gray-400">•</span>
                  <button 
                    onClick={() => onModalOpen?.(fee.organizationName as OrgName, 'howto')} 
                    className="font-normal text-blue-600 hover:underline"
                  >
                    [How do I get this license?]
                  </button>
                </div>

                <div className="space-y-1 pl-2">
                  {fee.feeBreakdown.map((item, index) => {
                    const breakdownKey = `${fee.organizationName}-${scenario.scenarioId}-${index}`;
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
  );
}
