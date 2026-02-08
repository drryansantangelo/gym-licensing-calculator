// ReassuranceFooter component

interface ReassuranceFooterProps {
  onContactSpecialist?: () => void;
}

export default function ReassuranceFooter({ onContactSpecialist }: ReassuranceFooterProps) {
  return (
    <div className="rounded-lg p-8" style={{ backgroundColor: 'var(--dm-bg)', border: '1px solid var(--dm-border)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Urgency / consequence framing */}
        <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <p className="text-sm font-medium" style={{ color: '#92400E', lineHeight: '1.6' }}>
            <strong>Worth knowing:</strong> PROs actively audit businesses for music licensing compliance. 
            Fines can reach up to $150,000 per song played without a license. Most gym owners don't realize 
            they're at risk until they receive a letter.
          </p>
        </div>

        <p className="text-base leading-relaxed mb-2 text-center" style={{ color: 'var(--dm-text-primary)' }}>
          <strong>Not sure what your gym needs?</strong>
        </p>
        <p className="text-base leading-relaxed mb-6 text-center" style={{ color: 'var(--dm-text-secondary)', maxWidth: '560px', margin: '0 auto 1.5rem' }}>
          Every gym's setup is a little different. Our licensing specialists have helped thousands of 
          fitness facilities get properly covered — and they'll tell you honestly if you don't need something.
        </p>
        
        <div className="text-center">
          <button
            onClick={onContactSpecialist}
            className="btn-primary text-base"
          >
            Talk to a Licensing Specialist
          </button>
          <p className="text-xs mt-3" style={{ color: 'var(--dm-text-muted)' }}>
            Free consultation · No pressure · We'll review your specific situation
          </p>
        </div>
      </div>
    </div>
  );
}
