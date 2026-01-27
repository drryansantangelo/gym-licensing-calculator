import React from 'react';

const tableData = [
  { usage: 'Group Fitness Classes', rate: '$0.3670' },
  { usage: 'Ambient Music Only', rate: '$0.2570' },
  { usage: 'TV/Radio Only', rate: '$0.1590' },
];

const ModalContent = () => {
  return (
    <div className="text-sm text-gray-700 space-y-4">
      <p>
        BMI charges a per-member fee based on the highest applicable category of use.
      </p>
      
      <div className="space-y-3">
        <Table headers={['Usage Type', 'Rate per Member']} data={tableData} />
        <p className="font-semibold bg-orange-50 p-3 rounded-lg">
          ✅ Only one category applies — the highest one selected.
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="font-bold text-gray-800">📏 Fee Boundaries</h4>
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