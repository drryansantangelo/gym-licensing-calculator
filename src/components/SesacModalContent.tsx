import React from 'react';

const tableData = [
    { footage: '0 – 5,000 sq ft', fee: '$408' },
    { footage: '5,001 – 15,000 sq ft', fee: '$612' },
    { footage: '15,001 – 25,000 sq ft', fee: '$816' },
    { footage: '25,001+ sq ft', fee: '$1,020' },
];

const ModalContent = () => {
  return (
    <div className="text-sm text-gray-700 space-y-4">
      <p>
        SESAC uses a flat-rate model based on the square footage of your facility.
      </p>
      
      <div className="space-y-3">
        <Table headers={['Square Footage', 'Annual Fee']} data={tableData} />
        <p className="font-semibold bg-yellow-50 p-3 rounded-lg">
            ✅ SESAC does not use member counts or room capacity.
        </p>
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