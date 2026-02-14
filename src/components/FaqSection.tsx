import { useState } from 'react';

const faqs = [
  {
    question: 'I use Spotify at my gym. Isn\'t that legal?',
    answer:
      'No. Consumer streaming services like Spotify, Apple Music, and YouTube are licensed for personal, non-commercial use only. Playing them in a business setting is a public performance under U.S. copyright law, and that requires separate commercial licensing. Dynamic Media provides fully licensed music specifically for business environments.',
  },
  {
    question: 'Has anyone actually been fined for playing unlicensed music?',
    answer:
      'Yes. Performing Rights Organizations (PROs) actively audit businesses for compliance. Under the Copyright Act, statutory fines can reach $150,000 per song played without a license. Fitness facilities are a known enforcement target because of the high-volume, public nature of music use in gyms.',
  },
  {
    question: 'What is a PRO (Performing Rights Organization)?',
    answer:
      'A PRO collects royalties on behalf of songwriters and music publishers. There are four in the U.S.: ASCAP, BMI, SESAC, and GMR. Each represents a different catalog of music. You can\'t pick just one — virtually every song has rights managed by one of these organizations, so full compliance requires coverage from all four.',
  },
  {
    question: 'What\'s the difference between background music licensing and instructor-led class licensing?',
    answer:
      'Background music (lobby, gym floor, locker rooms) requires one type of license. Instructor-led classes where music is integral to the experience (spin, group fitness, yoga) require additional licensing. Most gym owners don\'t realize these are separate categories with different fees.',
  },
  {
    question: 'How does a $29.99/mo subscription cover all of my licensing?',
    answer:
      'Dynamic Media is a licensed reseller of Soundtrack, a commercial music platform backed by Spotify. The subscription includes both the music platform and the public performance licensing for background music. The licensing isn\'t free — it\'s bundled into the subscription instead of requiring four separate PRO contracts.',
  },
  {
    question: 'What music do I actually get?',
    answer:
      'Soundtrack\'s library includes over 100 million tracks, backed by Spotify\'s catalog. You get curated playlists for fitness, the ability to create your own, import from Spotify, and set up different soundzones and schedules. It\'s not elevator music — it\'s the same songs your members listen to at home, properly licensed for business use.',
  },
  {
    question: 'How accurate is this calculator?',
    answer:
      'Estimates are based on published rate schedules from ASCAP, BMI, SESAC, and GMR for the current year. Actual costs may vary slightly based on specific usage, class formats, and whether you qualify for association discounts. The calculator gives you a reliable baseline — a licensing specialist can confirm exact costs for free.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-gray">
      <div className="container-dm">
        <div className="text-center mb-12">
          <span className="section-label">Common Questions</span>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--dm-text-primary)' }}>
            About Gym Music Licensing
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--dm-text-secondary)' }}>
            Here are the most common questions gym owners ask about music licensing
            and how to stay compliant.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-3 rounded-xl overflow-hidden transition-all"
              style={{
                backgroundColor: 'var(--dm-card)',
                border: `1px solid ${openIndex === index ? 'var(--dm-primary)' : 'var(--dm-border)'}`,
                boxShadow: openIndex === index ? 'var(--dm-shadow-md)' : 'none',
              }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                style={{ cursor: 'pointer', background: 'none', border: 'none' }}
              >
                <span
                  className="text-base font-semibold"
                  style={{ color: 'var(--dm-text-primary)' }}
                >
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 text-lg font-bold transition-transform"
                  style={{
                    color: 'var(--dm-primary)',
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 animate-fadeIn">
                  <p
                    className="text-sm"
                    style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.8' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}