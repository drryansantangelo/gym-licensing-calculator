export default function LicensingExplainer() {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pros = [
    { name: 'ASCAP', description: 'American Society of Composers, Authors and Publishers' },
    { name: 'BMI', description: 'Broadcast Music, Inc.' },
    { name: 'SESAC', description: 'Originally: Society of European Stage Authors and Composers' },
    { name: 'GMR', description: 'Global Music Rights' },
  ];

  return (
    <section className="section-light">
      <div className="container-dm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: explanation */}
          <div>
            <span className="section-label">Understanding the Basics</span>
            <h2 className="text-3xl font-bold mb-5" style={{ color: 'var(--dm-text-primary)' }}>
              What Is Music Licensing?
            </h2>
            <p className="text-base mb-4" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.8' }}>
              Under U.S. copyright law, playing music in a business open to the public is
              considered a <strong style={{ color: 'var(--dm-text-primary)' }}>public performance</strong>.
              This applies to gyms, studios, and fitness facilities of any size.
            </p>
            <p className="text-base mb-4" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.8' }}>
              To legally play music in your gym, you need licenses from
              {' '}<strong style={{ color: 'var(--dm-text-primary)' }}>Performing Rights Organizations (PROs)</strong> —
              the organizations that collect royalties on behalf of songwriters and publishers.
            </p>
            <p className="text-base mb-6" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.8' }}>
              There are four PROs in the United States. Each represents a different catalog of
              music, and you need coverage from all four to be fully compliant.
            </p>
            <button onClick={scrollToCalculator} className="btn-primary">
              Calculate What You'd Owe
            </button>
          </div>

          {/* Right: PRO cards */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              {pros.map((pro) => (
                <div
                  key={pro.name}
                  className="rounded-xl p-5 text-center"
                  style={{
                    backgroundColor: 'var(--dm-bg)',
                    border: '1px solid var(--dm-border)',
                  }}
                >
                  <div
                    className="text-2xl font-bold mb-2"
                    style={{ color: 'var(--dm-primary)' }}
                  >
                    {pro.name}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--dm-text-muted)', lineHeight: '1.5' }}>
                    {pro.description}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="mt-4 rounded-xl p-4 text-center"
              style={{
                backgroundColor: 'var(--dm-primary-light)',
                border: '1px solid rgba(0, 174, 239, 0.2)',
              }}
            >
              <p className="text-sm font-semibold" style={{ color: 'var(--dm-text-primary)' }}>
                4 organizations &middot; 4 separate contracts &middot; 4 separate fees
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--dm-text-secondary)' }}>
                That's what direct licensing looks like — or you can simplify it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}