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

  return (
    <section className="section-brand">
      <div className="container-dm">
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="inline-block text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
          >
            Free Resource
          </span>

          <h2 className="text-3xl font-bold mb-4" style={{ color: 'white' }}>
            The Gym Music Licensing Handbook
          </h2>

          <p className="text-base mb-8" style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.7' }}>
            Everything you need to know about music licensing for gyms and fitness facilities —
            in plain English. Understand your obligations, avoid fines, and learn how to simplify
            compliance.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              'What is music licensing',
              'The 4 PROs explained',
              'Background vs. class licensing',
              'How to stay compliant',
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <p className="text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {item}
                </p>
              </div>
            ))}
          </div>

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
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-lg px-4 py-3 text-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  color: 'var(--dm-text-primary)',
                }}
              />
              <button
                type="submit"
                className="rounded-lg px-6 py-3 font-semibold text-sm transition-all"
                style={{
                  backgroundColor: 'white',
                  color: 'var(--dm-primary)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Download Free Guide
              </button>
            </form>
          )}

          <p className="text-xs mt-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}