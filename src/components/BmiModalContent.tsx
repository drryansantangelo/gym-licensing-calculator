import React from 'react';

const tableData = [
  { usage: 'Group Fitness Classes', rate: '$0.3670' },
  { usage: 'Ambient Music Only', rate: '$0.2570' },
  { usage: 'TV/Radio Only', rate: '$0.1590' },
];

const ModalContent = () => {
  return (
    <div className="text-sm text-gray-700 space-y-6">
      {/* Educational Introduction */}
      <div className="space-y-3">
        <p style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
          BMI (Broadcast Music, Inc.) is a U.S. performing rights organization that licenses public performances of music on behalf of songwriters, composers, and publishers.
        </p>
        <p style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
          BMI licenses are commonly required when music is played throughout fitness facilities, including workout floors, studios, and common areas.
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '2px solid var(--dm-border)', paddingTop: '1.5rem' }}>
        <h4 className="font-semibold mb-3" style={{ color: 'var(--dm-text-primary)' }}>How this fee is calculated</h4>
      </div>

      {/* Calculation Details */}
      <p>
        BMI charges a per-member fee based on the highest applicable category of use.
      </p>
      
      <div className="space-y-3">
        <Table headers={['Usage Type', 'Rate per Member']} data={tableData} />
        <p className="font-semibold p-3 rounded-lg" style={{ backgroundColor: 'var(--dm-primary-light)', color: 'var(--dm-text-primary)' }}>
          Only one category applies — the highest one selected.
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="font-bold text-gray-800">Fee Boundaries</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Minimum Annual Fee: $410</li>
          <li>Maximum Annual Fee: $2,790</li>
        </ul>
        <p>If your calculated fee falls below or above those limits, it is adjusted to match — and the adjustment is shown in the calculator.</p>
      </div>
    </div>
  );
};

interface TableProps {
  headers: string[];
  data: Record<string, string>[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="text-left">
        <tr>
          {headers.map(header => <th key={header} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{header}</th>)}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((cell, j) => <td key={j} className="whitespace-nowrap px-4 py-2 text-gray-700">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


export default ModalContent; 