import React from 'react';

const tableData = {
  groupFitness: [
    { participants: '1 – 500', fee: '$529' },
    { participants: '501 – 1,000', fee: '$687' },
    { participants: '1,001 – 1,500', fee: '$805' },
    { participants: '1,501 – 2,000', fee: '$923' },
    { participants: '2,001 – 3,000', fee: '$1,242' },
    { participants: '3,001 – 4,000', fee: '$1,398' },
    { participants: '4,001+', fee: '$0.34 per participant' },
  ],
  ambient: [
    { footage: 'Up to 3,750 sq ft', fee: '$372' },
    { footage: '3,751 – 10,000 sq ft', fee: '$435' },
    { footage: 'Over 10,000 sq ft', fee: '$499' },
  ],
};

const ModalContent = () => {
  return (
    <div className="text-sm text-gray-700 space-y-6">
      {/* Educational Introduction */}
      <div className="space-y-3">
        <p style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
          ASCAP (American Society of Composers, Authors and Publishers) is a U.S. performing rights organization that licenses public performance rights for musical works and distributes royalties to songwriters and publishers.
        </p>
        <p style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
          Gyms typically need an ASCAP license when music is played in public areas or during instructor-led fitness classes.
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '2px solid var(--dm-border)', paddingTop: '1.5rem' }}>
        <h4 className="font-semibold mb-3" style={{ color: 'var(--dm-text-primary)' }}>How this fee is calculated</h4>
      </div>

      {/* Calculation Details */}
      <p>
        ASCAP bases its license fee on different categories of use, with group classes as the primary factor. The model uses capacity, square footage, and optional features like virtual classes and social events.
      </p>
      
      <div className="space-y-3">
        <h4 className="font-bold text-gray-800">Group Fitness Classes</h4>
        <p>Calculated using weekly participant capacity: (# of classes per week × room capacity for each room or pool)</p>
        <Table headers={['Total Weekly Participants', 'Annual Fee']} data={tableData.groupFitness} />
      </div>

      <div className="space-y-3">
        <h4 className="font-bold text-gray-800">Ambient Music</h4>
        <p>Charged only if Group Fitness is not selected.</p>
        <Table headers={['Square Footage', 'Annual Fee']} data={tableData.ambient} />
      </div>

      <p className="font-semibold p-3 rounded-lg" style={{ backgroundColor: 'var(--dm-primary-light)', color: 'var(--dm-text-primary)' }}>
        If Group Fitness Classes is selected, ambient use is included at no additional charge.
      </p>
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