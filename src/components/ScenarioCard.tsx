import React, { useState } from 'react';
import type { ScenarioResult } from '../utils/calculateScenarios';

type OrgName = 'ASCAP' | 'BMI' | 'SESAC' | 'GMR';

interface ScenarioCardProps {
  scenario: ScenarioResult;
  isRecommended?: boolean;
  onCTAClick?: (scenarioId: string, action: string) => void;
  onViewDetails?: (scenarioId: string) => void;
  onModalOpen?: (org: OrgName, contentType: 'calculation' | 'howto') => void;
}

export default function ScenarioCard({ 
  scenario, 
  isRecommended = false, 
  onCTAClick,
  onViewDetails,
  onModalOpen
}: ScenarioCardProps) {
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

  const getBorderColor = () => {
    if (isRecommended) return 'border-blue-500';
    if (scenario.scenarioId === 'baseline') return 'border-gray-300';
    return 'border-green-500';
  };

  const getBackgroundColor = () => {
    if (isRecommended) return 'bg-blue-50';
    if (scenario.scenarioId === 'baseline') return 'bg-white';
    return 'bg-green-50';
  };

  return (
    <div className={`border-2 ${getBorderColor()} rounded-lg overflow-hidden transition-all ${getBackgroundColor()}`}>
      {/* Header */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{scenario.title}</h3>
              {isRecommended && (
                <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                  RECOMMENDED
                </span>
              )}
              {scenario.scenarioId === 'ambient-optimized' && (
                <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded">
                  OPTIMIZED
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{scenario.subtitle}</p>
          </div>
          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-gray-900">
              ${scenario.totalPerLocationFee.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">per location/year</div>
          </div>
        </div>

        {/* Savings Badge */}
        {scenario.savings !== undefined && scenario.savings > 0 && (
          <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">
                You save ${scenario.savings.toFixed(2)}/year
              </span>
              <span className="text-sm font-semibold text-green-800">
                ({scenario.savingsPercentage?.toFixed(1)}% less)
              </span>
            </div>
          </div>
        )}

        {/* Description */}
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          {scenario.description}
        </p>

        {/* Toggle Details Button */}
        <button
          onClick={handleToggle}
          className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          {isExpanded ? '▼' : '▶'} {isExpanded ? 'Hide' : 'View'} detailed breakdown
        </button>
      </div>

      {/* Expandable Details */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-white">
          {/* Fee Breakdown */}
          <div className="space-y-4 mb-4">
            {scenario.fees.map((fee) => (
              <div key={fee.organizationName}>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {fee.organizationName}
                    {fee.message && (
                      <span className="text-xs font-normal text-gray-500 ml-2">
                        ({fee.message})
                      </span>
                    )}
                  </h4>
                  <span className="text-sm font-bold text-gray-900">
                    ${fee.perLocationFee.toFixed(2)}
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

                <div className="space-y-1 pl-3">
                  {fee.feeBreakdown.map((item, index) => {
                    const breakdownKey = `${fee.organizationName}-${scenario.scenarioId}-${index}`;
                    const isDiscount = item.description.includes('Discount');
                    const isMaxAdj = item.description.includes('maximum applies');
                    const isMinAdj = item.description.includes('minimum applies');
                    const isHfaAdj = item.description.includes('HFA');
                    
                    let textColor = 'text-gray-700';
                    if (isDiscount) {
                      textColor = 'text-green-600';
                    } else if (isMaxAdj || isMinAdj || isHfaAdj) {
                      textColor = 'text-blue-600';
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

          {/* Recommendations */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              {scenario.scenarioId === 'baseline' ? 'Considerations:' : 'Benefits:'}
            </h4>
            <ul className="space-y-1">
              {scenario.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className={scenario.scenarioId === 'baseline' ? 'text-gray-400' : 'text-green-600'}>
                    {scenario.scenarioId === 'baseline' ? '•' : '✓'}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* CTA Button */}
      {scenario.ctaText && scenario.ctaAction && (
        <div className="border-t border-gray-200 p-4 bg-white">
          <button
            onClick={handleCTAClick}
            className={`w-full py-3 px-4 rounded-md font-semibold transition-colors ${
              isRecommended
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {scenario.ctaText}
          </button>
        </div>
      )}
    </div>
  );
}
