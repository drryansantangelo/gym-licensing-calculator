interface FinalCtaProps {
  onTalkToSpecialist: () => void;
}

export default function FinalCta({ onTalkToSpecialist }: FinalCtaProps) {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="section-dark">
      <div className="container-dm text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--dm-text-on-dark)' }}>
          Ready to Resolve Your Licensing Risk?
        </h2>
        <p
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--dm-text-on-dark-muted)', lineHeight: '1.7' }}
        >
          Whether you've been contacted by a PRO or just want to make sure you're covered,
          our team can walk you through everything — no pressure, no commitment.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={onTalkToSpecialist} className="btn-primary btn-primary-lg">
            Talk to a Licensing Specialist
          </button>
          <button onClick={scrollToCalculator} className="btn-outline btn-primary-lg">
            Check My Exposure Again
          </button>
        </div>

        <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
          Free consultation · No pressure · Response within 1 business day
        </p>
      </div>

      {/* Footer */}
      <div
        className="mt-16 pt-8"
        style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
      >
        <div className="container-dm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/DM-logo@4x.png"
              alt="Dynamic Media"
              className="h-8 w-auto"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.6 }}
            />
            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              © {new Date().getFullYear()} Dynamic Media. All rights reserved.
            </p>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
            Licensed reseller of Sirius XM for Business and Soundtrack
          </p>
        </div>
      </div>
    </section>
  );
}
