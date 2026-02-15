export default function ProContactBlock() {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pros = ['ASCAP', 'BMI', 'SESAC', 'GMR'];

  return (
    <section
      className="relative"
      style={{
        backgroundColor: '#F8FAFC',
        borderTop: '1px solid var(--dm-border)',
        borderBottom: '1px solid var(--dm-border)',
      }}
    >
      <div className="container-dm" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: 'var(--dm-text-primary)' }}
          >
            Have You Been Contacted About Music Licensing?
          </h3>
          <p
            className="text-sm mb-5"
            style={{ color: 'var(--dm-text-secondary)' }}
          >
            By ASCAP, BMI, SESAC or GMR?
          </p>

          {/* PRO badges — clickable */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {pros.map((pro) => (
              <button
                key={pro}
                onClick={scrollToCalculator}
                className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all"
                style={{
                  backgroundColor: 'white',
                  color: 'var(--dm-text-primary)',
                  border: '2px solid var(--dm-border)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--dm-primary)';
                  e.currentTarget.style.color = 'var(--dm-primary)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 174, 239, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--dm-border)';
                  e.currentTarget.style.color = 'var(--dm-text-primary)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {pro}
              </button>
            ))}
          </div>

          <p
            className="text-sm mb-2"
            style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.7' }}
          >
            These notices can lead to required licensing agreements or fines if ignored.
          </p>
          <p
            className="text-sm mb-5"
            style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.7' }}
          >
            You're not alone. Thousands of gym owners receive these every year.
          </p>

          <p
            className="text-base font-semibold mb-4"
            style={{ color: 'var(--dm-text-primary)' }}
          >
            See what your gym may be responsible for.
          </p>

          <button
            onClick={scrollToCalculator}
            className="btn-primary"
          >
            Check My Exposure
          </button>
        </div>
      </div>
    </section>
  );
}
