interface LandingHeroProps {
  onTalkToSpecialist: () => void;
}

export default function LandingHero({ onTalkToSpecialist }: LandingHeroProps) {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--dm-bg-dark) 0%, #162840 100%)',
        minHeight: '600px',
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
        }}
      />

      <div className="relative container-dm flex flex-col justify-center" style={{ minHeight: '600px' }}>
        <div className="max-w-2xl">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/DM-logo@4x.png"
              alt="Dynamic Media"
              className="h-10 w-auto"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
            />
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: 'var(--dm-text-on-dark)' }}
          >
            Are You Legally Covered to Play Music in Your Gym?
          </h1>

          <p
            className="text-xl font-semibold mb-4"
            style={{ color: 'var(--dm-primary)' }}
          >
            Free 60-Second Licensing Cost Calculator
          </p>

          <p
            className="text-lg mb-8"
            style={{ color: 'var(--dm-text-on-dark-muted)', lineHeight: '1.7' }}
          >
            Instantly estimate what ASCAP, BMI, SESAC & GMR may require from your gym.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              'Instant estimate based on your gym size and classes',
              'Works for single locations and multi-site gyms',
              '100% free with no obligation',
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-base"
                style={{ color: 'var(--dm-text-on-dark-muted)' }}
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: 'var(--dm-primary)', color: 'white' }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <button onClick={scrollToCalculator} className="btn-primary btn-primary-lg">
              Calculate My Licensing Cost
            </button>
            <button onClick={onTalkToSpecialist} className="btn-outline btn-primary-lg">
              Talk to a Specialist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}