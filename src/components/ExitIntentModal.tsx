import { useState, useEffect, useRef } from 'react';
import { markExitIntentDismissed } from '../hooks/useExitIntent';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Grab UTM params and gclid from the current URL */
function getCampaignParams(): Record<string, string> {
  const params: Record<string, string> = {};
  const search = new URLSearchParams(window.location.search);
  const keys = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_term', 'utm_content', 'gclid'];
  keys.forEach((key) => {
    const val = search.get(key);
    if (val) params[key] = val;
  });
  return params;
}

/** Fire a simple analytics event (GA4 if available, otherwise console) */
function trackEvent(eventName: string, payload?: Record<string, string>) {
  const data = { ...payload, ...getCampaignParams() };
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, data);
  }
  console.log(`[analytics] ${eventName}`, data);
}

export default function ExitIntentModal({ isOpen, onClose }: ExitIntentModalProps) {
  const [formData, setFormData] = useState({ firstName: '', email: '' });
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Track modal shown
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      trackEvent('exit_modal_shown');

      // Focus trap: focus the modal
      setTimeout(() => {
        const firstInput = modalRef.current?.querySelector('input') as HTMLElement;
        firstInput?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'input, button, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(false);
    if (errors.has(name)) {
      setErrors((prev) => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
    }
  };

  const handleFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent('exit_modal_form_started');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = new Set<string>();
    if (!formData.firstName.trim()) newErrors.add('firstName');
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.add('email');
    setErrors(newErrors);
    if (newErrors.size > 0) return;

    try {
      // TODO: Wire to HubSpot Forms API
      console.log('Exit intent form submitted:', {
        ...formData,
        lead_source: 'Exit Intent Modal',
        page: window.location.href,
        ...getCampaignParams(),
      });

      trackEvent('exit_modal_submitted', {
        lead_source: 'Exit Intent Modal',
      });

      markExitIntentDismissed();
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    }
  };

  const handleClose = () => {
    if (!submitted) {
      trackEvent('exit_modal_dismissed');
    }
    markExitIntentDismissed();
    onClose();

    // Return focus & reset after animation
    setTimeout(() => {
      previousFocusRef.current?.focus();
      setFormData({ firstName: '', email: '' });
      setErrors(new Set());
      setSubmitted(false);
      setSubmitError(false);
      setFormStarted(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)' }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{
          backgroundColor: 'white',
          animation: 'slideUp 0.3s ease-out',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-heading"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors z-10"
          style={{ backgroundColor: 'rgba(0,0,0,0.06)', color: 'var(--dm-text-muted)' }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Content */}
        <div className="px-7 pt-8 pb-7">
          {submitted ? (
            <div className="text-center py-4 animate-fadeIn">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--dm-primary-light)' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--dm-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                className="text-base font-semibold"
                style={{ color: 'var(--dm-text-primary)' }}
              >
                Sent — check your inbox in a few minutes.
              </p>
            </div>
          ) : (
            <>
              {/* Warning icon */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: '#FEF3C7' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>

              <h2
                id="exit-intent-heading"
                className="text-xl font-bold mb-2"
                style={{ color: 'var(--dm-text-primary)' }}
              >
                Don't Ignore a Licensing Notice
              </h2>

              <p
                className="text-sm mb-1"
                style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.7' }}
              >
                If your gym was contacted about music licensing, make sure you understand
                your exposure before responding.
              </p>
              <p
                className="text-sm mb-5"
                style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.7' }}
              >
                We'll send a step-by-step response guide — what to say (and not say) when
                a PRO contacts your gym.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="First name"
                    className={`input-field w-full ${errors.has('firstName') ? 'border-red-500' : ''}`}
                  />
                  {errors.has('firstName') && (
                    <p className="text-red-600 text-xs mt-1">Required</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder="Email address"
                    className={`input-field w-full ${errors.has('email') ? 'border-red-500' : ''}`}
                  />
                  {errors.has('email') && (
                    <p className="text-red-600 text-xs mt-1">Valid email required</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full font-bold"
                  style={{
                    padding: '14px 24px',
                    borderRadius: 'var(--dm-radius-lg)',
                  }}
                >
                  Get the Response Guide
                </button>

                {submitError && (
                  <p className="text-red-600 text-xs text-center">
                    Something went wrong — please try again.
                  </p>
                )}

                <p className="text-xs text-center" style={{ color: 'var(--dm-text-muted)' }}>
                  No spam. Just a quick, useful guide for gym owners.
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
