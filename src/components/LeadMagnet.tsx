import { useState } from 'react';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    // TODO: Wire to HubSpot or email service
    console.log('Handbook download requested:', email);
    setSubmitted(true);
  };

  const chapters = [
    'What is music licensing',
    'The 4 PROs explained',
    'Background vs. class licensing',
    'How to stay compliant',
  ];

  return (
    <section className="section-brand">
      <div className="container-dm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Book mockup */}
          <div className="flex justify-center">
            <div className="relative" style={{ perspective: '800px' }}>
              {/* Shadow */}
              <div
                className="absolute -bottom-4 left-6 right-6 h-8 rounded-xl"
                style={{
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)',
                }}
              />
              {/* Book cover */}
              <div
                className="relative rounded-lg overflow-hidden"
                style={{
                  width: '280px',
                  height: '380px',
                  background: 'linear-gradient(160deg, #FFFFFF 0%, #F0F4F8 100%)',
                  boxShadow: '8px 8px 30px rgba(0,0,0,0.3), -2px 0 6px rgba(0,0,0,0.1)',
                  transform: 'rotateY(-5deg)',
                }}
              >
                {/* Spine accent */}
                <div
                  className="absolute left-0 top-0 bottom-0"
                  style={{
                    width: '6px',
                    background: 'linear-gradient(180deg, var(--dm-primary) 0%, var(--dm-primary-dark) 100%)',
                  }}
                />

                {/* Content */}
                <div className="p-8 pt-10 pl-10 h-full flex flex-col">
                  {/* Badge */}
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-4"
                    style={{
                      backgroundColor: 'var(--dm-primary-light)',
                      color: 'var(--dm-primary)',
                      width: 'fit-content',
                    }}
                  >
                    Free Guide
                  </span>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-2 leading-tight"
                    style={{ color: 'var(--dm-text-primary)' }}
                  >
                    The Gym Music Licensing Handbook
                  </h3>

                  <p
                    className="text-xs mb-6"
                    style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.5' }}
                  >
                    Everything you need to know — in plain English
                  </p>

                  {/* Chapter list */}
                  <div className="space-y-2 flex-1">
                    {chapters.map((chapter, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                          style={{
                            backgroundColor: 'var(--dm-primary-light)',
                            color: 'var(--dm-primary)',
                            fontSize: '8px',
                            fontWeight: 700,
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--dm-text-secondary)' }}>
                          {chapter}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div
                    className="pt-4 mt-auto flex items-center justify-between"
                    style={{ borderTop: '1px solid var(--dm-border)' }}
                  >
                    <img
                      src="/DM-logo@4x.png"
                      alt="Dynamic Media"
                      className="h-5 w-auto"
                      style={{ opacity: 0.5 }}
                    />
                    <span className="text-xs font-medium" style={{ color: 'var(--dm-text-muted)' }}>
                      PDF
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Copy + form */}
          <div>
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            >
              Free Download
            </span>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'white' }}>
              The Gym Music Licensing Handbook
            </h2>

            <p className="text-base mb-3" style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.7' }}>
              Everything you need to know about music licensing for gyms and fitness
              facilities — in plain English. Understand your obligations, avoid fines,
              and learn how to simplify compliance.
            </p>

            <p
              className="text-sm mb-8 font-medium"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              Free PDF · 12 pages · No fluff
            </p>

            {submitted ? (
              <div className="animate-fadeIn">
                <div
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-4"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                >
                  <span className="text-white text-lg">✓</span>
                  <p className="text-sm font-medium" style={{ color: 'white' }}>
                    Check your inbox — we've sent the handbook to {email}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 rounded-lg px-4 py-3.5 text-sm"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      color: 'var(--dm-text-primary)',
                    }}
                  />
                  <button
                    type="submit"
                    className="rounded-lg px-6 py-3.5 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: 'white',
                      color: 'var(--dm-primary)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Free Handbook
                  </button>
                </div>
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}