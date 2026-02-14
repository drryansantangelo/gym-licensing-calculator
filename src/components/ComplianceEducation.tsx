export default function ComplianceEducation() {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const platforms = [
    {
      name: 'Spotify',
      quote:
        'We grant to you limited, non-exclusive, revocable permission to make personal, non-commercial use of the Spotify Service.',
      source: 'Spotify Terms of Service',
    },
    {
      name: 'Apple Music',
      quote:
        'You may use the Services and Content only for personal, noncommercial purposes.',
      source: 'Apple Media Services Terms',
    },
    {
      name: 'YouTube',
      quote:
        'You may access and use the Service as made available to you, as long as you comply with this Agreement. You may view or listen to Content for your personal, non-commercial use.',
      source: 'YouTube Terms of Service',
    },
  ];

  return (
    <section className="section-dark">
      <div className="container-dm">
        <div className="text-center mb-12">
          <span className="section-label section-label-light">The Problem</span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--dm-text-on-dark)' }}
          >
            Most Gyms Are Using Music That Isn't Fully Licensed
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--dm-text-on-dark-muted)', lineHeight: '1.7' }}
          >
            Many gym owners use Spotify, Apple Music, or YouTube without realizing these
            platforms are not licensed for commercial use. This can expose your business to
            fines and unexpected licensing fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="rounded-xl p-6"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--dm-text-on-dark)' }}
              >
                {platform.name}
              </h3>
              <p
                className="text-sm italic mb-3"
                style={{ color: 'var(--dm-text-on-dark-muted)', lineHeight: '1.7' }}
              >
                "{platform.quote}"
              </p>
              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                — {platform.source}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom line callout */}
        <div
          className="rounded-xl p-6 text-center max-w-3xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 174, 239, 0.15) 0%, rgba(0, 174, 239, 0.05) 100%)',
            border: '1px solid rgba(0, 174, 239, 0.3)',
          }}
        >
          <p
            className="text-lg font-semibold mb-1"
            style={{ color: 'var(--dm-text-on-dark)' }}
          >
            Bottom Line
          </p>
          <p className="text-base mb-5" style={{ color: 'var(--dm-text-on-dark-muted)' }}>
            If you're using consumer music apps in your gym, you may not be fully licensed —
            and the fines can reach <strong style={{ color: '#FBBF24' }}>$150,000 per song</strong>.
          </p>
          <button onClick={scrollToCalculator} className="btn-primary">
            Find Out What Your Gym Owes
          </button>
        </div>
      </div>
    </section>
  );
}