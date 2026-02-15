import { useState } from 'react';

const faqs = [
  {
    question: 'I use Spotify at my gym. Isn\'t that legal?',
    answer:
      'No. Consumer streaming services like Spotify, Apple Music, and YouTube are licensed for personal, non-commercial use only.\n\nPlaying music in a gym is considered a public performance under U.S. copyright law. Even if you pay for a premium subscription, it does not include commercial public performance rights.\n\nIf you play music in your facility, you must have proper business licensing.',
  },
  {
    question: 'Why am I being contacted about music licensing now?',
    answer:
      'Performing Rights Organizations (PROs) such as ASCAP, BMI, SESAC, and GMR actively monitor and audit businesses for compliance.\n\nGyms are frequently contacted because music is played publicly, daily, and often at high volume. Many owners are unaware of the rules until they receive a letter or phone call.\n\nBeing contacted doesn\'t mean you did something intentionally wrong — it usually means you were unaware of how licensing works.',
  },
  {
    question: 'Has anyone actually been fined for playing unlicensed music?',
    answer:
      'Yes.\n\nUnder the Copyright Act, statutory damages can reach up to $150,000 per song played without proper licensing.\n\nWhile most situations are resolved before reaching that level, enforcement is real — and gyms are a known target because music is central to the customer experience.',
  },
  {
    question: 'What\'s the difference between background music and instructor-led class licensing?',
    answer:
      'Background music (lobby, gym floor, locker rooms) requires one category of licensing.\n\nInstructor-led classes — such as spin, HIIT, yoga, or group fitness — often require additional licensing, because music is a core part of the experience.\n\nMany gym owners are surprised to learn these are separate categories with different fee structures.',
  },
  {
    question: 'What is a PRO (Performing Rights Organization)?',
    answer:
      'A PRO collects royalties on behalf of songwriters and music publishers.\n\nThere are four major PROs in the United States: ASCAP, BMI, SESAC, and GMR.\n\nEach represents a different catalog of music. To be fully compliant, businesses typically need coverage across multiple organizations — which can mean multiple contracts and billing cycles when licensing directly.',
  },
  {
    question: 'How does a $29.99/month subscription cover all of my licensing?',
    answer:
      'Dynamic Media is a licensed reseller of Soundtrack — a commercial music platform backed by Spotify.\n\nInstead of signing four separate PRO contracts, licensing is consolidated into one subscription for background music. The public performance licensing is bundled into the plan — along with the music platform itself.\n\nYou\'re not avoiding licensing — you\'re simplifying it.',
  },
  {
    question: 'What music do I actually get?',
    answer:
      'Soundtrack provides access to over 100 million licensed tracks, powered by a commercial platform built specifically for businesses.\n\nYou can: use professionally curated fitness playlists, create your own custom playlists, import Spotify playlists, set up multiple sound zones, and schedule music by time of day.\n\nIt\'s mainstream music your members already recognize — properly licensed for business use.',
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
                <div className="px-6 pb-5 animate-fadeIn space-y-3">
                  {faq.answer.split('\n\n').map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-sm"
                      style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.8' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}