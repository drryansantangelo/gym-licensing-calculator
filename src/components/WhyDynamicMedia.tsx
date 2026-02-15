export default function WhyDynamicMedia() {
  const pillars = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
        </svg>
      ),
      title: 'Fully Licensed Music Platform',
      description:
        '100M+ songs cleared for commercial use. No ads, no interruptions, no individual PRO contracts required.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: 'Custom Playlists & Zone Control',
      description:
        'Create, schedule, and control music across workout zones — or legally import approved Spotify playlists.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      title: 'AI-Powered Programming',
      description:
        'Smart stations that auto-refresh with new licensed music. Build by mood, genre, or artist in seconds.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: 'Multi-Location Control & White-Glove Support',
      description:
        'Centralized management across all locations, backed by U.S.-based support and nationwide installation.',
    },
  ];

  const trustedBrands = [
    {
      name: 'VASA Fitness',
      logo: '/logos/vasa-fitness.png',
      fallbackColor: '#1E40AF',
      fallbackInitials: 'VF',
    },
    {
      name: 'Club Pilates',
      logo: '/logos/club-pilates.png',
      fallbackColor: '#1E3A5F',
      fallbackInitials: 'CP',
    },
    {
      name: 'Powerhouse Gym',
      logo: '/logos/powerhouse-gym.png',
      fallbackColor: '#B91C1C',
      fallbackInitials: 'PG',
    },
  ];

  return (
    <section className="section-light">
      <div className="container-dm">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-label">Why Dynamic Media</span>
          <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--dm-text-primary)' }}>
            Trusted by 55,000+ Locations Nationwide
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--dm-text-secondary)' }}>
            From boutique studios to regional chains — fully licensed commercial music, simplified.
          </p>
        </div>

        {/* Brand logos — clean trust bar */}
        <div className="flex items-center justify-center gap-12 mb-14 flex-wrap">
          {trustedBrands.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center gap-2"
              style={{ opacity: 0.6 }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="object-contain"
                style={{ height: '40px', width: 'auto', maxWidth: '130px', filter: 'grayscale(100%)' }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--dm-text-muted)' }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* 4-pillar feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex gap-4 p-5 rounded-xl"
              style={{
                backgroundColor: 'var(--dm-bg)',
                border: '1px solid var(--dm-border)',
              }}
            >
              <div
                className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--dm-primary-light)', color: 'var(--dm-primary)' }}
              >
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                  {pillar.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
