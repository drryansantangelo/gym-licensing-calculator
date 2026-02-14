export default function WhyDynamicMedia() {
  const features = [
    {
      icon: '🎵',
      title: 'Custom Playlists & Soundzones',
      description:
        'Tailor playlists to workout zones, set automatic schedules to match energy levels, and incorporate branded messaging.',
    },
    {
      icon: '📍',
      title: 'Multi-Location Control',
      description:
        'Manage music across all your gym locations — playlists, scheduling, and volume — from a single centralized portal.',
    },
    {
      icon: '🤝',
      title: 'White Glove Service',
      description:
        'Installation made easy with thousands of licensed technicians, plus U.S.-based customer service for all your questions.',
    },
    {
      icon: '💪',
      title: 'Music Drives Memberships',
      description:
        'The right music enhances member experience, extends workout time, and strengthens your gym\'s brand identity.',
    },
  ];

  return (
    <section className="section-light">
      <div className="container-dm">
        <div className="text-center mb-12">
          <span className="section-label">Why Dynamic Media</span>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--dm-text-primary)' }}>
            Trusted by 55,000+ Businesses for Licensed Music
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--dm-text-secondary)' }}>
            Here's why gyms and fitness centers across the U.S. choose Dynamic Media for
            their commercial music needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-5 p-6 rounded-xl transition-all"
              style={{
                backgroundColor: 'var(--dm-bg)',
                border: '1px solid var(--dm-border)',
              }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: 'var(--dm-primary-light)' }}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.7' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gym imagery row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-xl overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            <img
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80"
              alt="Gym fitness environment"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="rounded-xl overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            <img
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80"
              alt="Commercial gym equipment"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}