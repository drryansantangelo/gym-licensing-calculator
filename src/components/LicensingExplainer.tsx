export default function LicensingExplainer() {
  const pros = [
    { name: 'ASCAP', description: 'American Society of Composers, Authors and Publishers' },
    { name: 'BMI', description: 'Broadcast Music, Inc.' },
    { name: 'SESAC', description: 'Originally: Society of European Stage Authors and Composers' },
    { name: 'GMR', description: 'Global Music Rights' },
  ];

  const burdenBullets = [
    'Multiple organizations',
    'Separate agreements',
    'Separate billing cycles',
    'Ongoing compliance management',
  ];

  return (
    <section className="section-light">
      <div className="container-dm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: explanation */}
          <div>
            <span className="section-label">Understanding the Basics</span>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--dm-text-primary)' }}>
              Why Music Licensing for Gyms Is More Complex Than It Sounds
            </h2>
            <p className="text-base mb-4" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.8' }}>
              Under U.S. copyright law, playing music in a gym is considered a{' '}
              <strong style={{ color: 'var(--dm-text-primary)' }}>public performance</strong>.
            </p>
            <p className="text-base mb-4" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.8' }}>
              That means your business — not your instructor — is responsible for proper licensing.
            </p>
            <p className="text-base mb-4" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.8' }}>
              If you license music directly, compliance may involve agreements with multiple{' '}
              <strong style={{ color: 'var(--dm-text-primary)' }}>Performing Rights Organizations (PROs)</strong>,
              including ASCAP, BMI, SESAC, and GMR.
            </p>
            <p className="text-base" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.8' }}>
              Each PRO represents a different catalog of music. Depending on how music is sourced
              and used in your facility, you may need coverage from more than one organization.
            </p>
          </div>

          {/* Right: PRO cards + burden block */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {pros.map((pro) => (
                <div
                  key={pro.name}
                  className="rounded-xl p-6 text-center transition-all"
                  style={{
                    backgroundColor: 'white',
                    border: '2px solid #CBD5E1',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--dm-primary)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 174, 239, 0.12)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#CBD5E1';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    className="text-2xl font-bold mb-2"
                    style={{ color: '#0F172A' }}
                  >
                    {pro.name}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.5' }}>
                    {pro.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Administrative burden block — cool gray-blue */}
            <div
              className="rounded-xl"
              style={{
                backgroundColor: '#F1F5F9',
                border: '1px solid #CBD5E1',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Sub-headline */}
              <div style={{ padding: '1.5rem 1.5rem 0 1.5rem' }}>
                <p
                  className="font-bold mb-1"
                  style={{ color: '#1E293B', fontSize: '1.1rem' }}
                >
                  Direct licensing often means:
                </p>
              </div>

              {/* Bullet list — generous spacing for weight */}
              <ul style={{ padding: '1rem 1.5rem 0 1.5rem' }} className="space-y-4">
                {burdenBullets.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: '#475569' }}>
                    <span
                      className="flex-shrink-0 w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#94A3B8' }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Emotional bridge line */}
              <div style={{ padding: '1.25rem 1.5rem 0 1.5rem' }}>
                <p
                  className="text-sm italic"
                  style={{ color: '#334155', lineHeight: '1.6' }}
                >
                  Most gym owners don't realize how fragmented direct licensing can be — until they're contacted.
                </p>
              </div>

              {/* Pivot line */}
              <div
                className="text-center"
                style={{
                  margin: '1.25rem 1.5rem 0 1.5rem',
                  padding: '1.25rem 0',
                  borderTop: '1px solid #CBD5E1',
                }}
              >
                <p
                  className="font-bold"
                  style={{ color: 'var(--dm-primary)', fontSize: '1.1rem' }}
                >
                  Or you can simplify it.
                </p>
              </div>

              {/* Bottom padding */}
              <div style={{ height: '1.25rem' }} />
            </div>
          </div>
        </div>

        {/* Transition block into calculator */}
        <div className="text-center max-w-2xl mx-auto" style={{ marginTop: '3rem' }}>
          <p
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--dm-text-primary)' }}
          >
            See what your gym could owe this year.
          </p>
          <p
            className="text-base"
            style={{ color: 'var(--dm-text-secondary)' }}
          >
            Use the calculator below to see what your gym could owe annually if licensing directly.
          </p>
        </div>
      </div>
    </section>
  );
}
