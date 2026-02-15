import { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export default function ContactModal({ isOpen, onClose, onSubmitSuccess }: ContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gymName: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors.has(name)) {
      setErrors(prev => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = new Set<string>();
    if (!formData.firstName.trim()) newErrors.add('firstName');
    if (!formData.lastName.trim()) newErrors.add('lastName');
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.add('email');
    if (!formData.phone.trim()) newErrors.add('phone');
    if (!formData.gymName.trim()) newErrors.add('gymName');
    setErrors(newErrors);
    if (newErrors.size > 0) return;

    // TODO: Wire to HubSpot Forms API
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    onSubmitSuccess?.();
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', gymName: '', message: '' });
      setErrors(new Set());
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
        style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)' }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{
          backgroundColor: 'white',
          animation: 'slideUp 0.3s ease-out',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors z-10"
          style={{ backgroundColor: 'var(--dm-bg-alt)', color: 'var(--dm-text-muted)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div
          className="px-8 pt-8 pb-6"
          style={{
            background: 'linear-gradient(135deg, var(--dm-primary) 0%, var(--dm-primary-dark) 100%)',
          }}
        >
          <div className="mb-3">
            <img
              src="/DM-logo@4x.png"
              alt="Dynamic Media"
              className="h-7 w-auto"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.8 }}
            />
          </div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'white' }}>
            Talk to a Licensing Specialist
          </h2>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Get personalized guidance on your gym's music licensing — no obligation.
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {submitted ? (
            <div className="text-center py-8 animate-fadeIn">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--dm-primary-light)' }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--dm-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--dm-text-primary)' }}>
                We'll be in touch soon
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--dm-text-secondary)', lineHeight: '1.6' }}>
                A licensing specialist will reach out within one business day to discuss
                your gym's specific needs.
              </p>
              <button
                onClick={handleClose}
                className="btn-primary px-8 py-2.5"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                    First name <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`input-field w-full ${errors.has('firstName') ? 'border-red-500' : ''}`}
                  />
                  {errors.has('firstName') && (
                    <p className="text-red-600 text-xs mt-1">Required</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                    Last name <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Smith"
                    className={`input-field w-full ${errors.has('lastName') ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.has('lastName') && (
                    <p className="text-red-600 text-xs mt-1">Required</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                  Email <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@yourgym.com"
                  className={`input-field w-full ${errors.has('email') ? 'border-red-500' : ''}`}
                />
                {errors.has('email') && (
                  <p className="text-red-600 text-xs mt-1">Valid email required</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                  Phone <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className={`input-field w-full ${errors.has('phone') ? 'border-red-500' : ''}`}
                  required
                />
                {errors.has('phone') && (
                  <p className="text-red-600 text-xs mt-1">Required</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                  Gym / Business name <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  name="gymName"
                  value={formData.gymName}
                  onChange={handleChange}
                  placeholder="Peak Fitness"
                  className={`input-field w-full ${errors.has('gymName') ? 'border-red-500' : ''}`}
                />
                {errors.has('gymName') && (
                  <p className="text-red-600 text-xs mt-1">Required</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--dm-text-primary)' }}>
                  Anything we should know? <span className="font-normal" style={{ color: 'var(--dm-text-muted)' }}>(optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="e.g., We have 3 locations and run 50+ classes a week..."
                  rows={3}
                  className="input-field w-full"
                  style={{ resize: 'vertical', minHeight: '72px' }}
                />
              </div>

              <button type="submit" className="btn-primary btn-primary-lg w-full">
                Talk to a Specialist
              </button>

              <p className="text-xs text-center" style={{ color: 'var(--dm-text-muted)' }}>
                Free consultation · No pressure · Response within 1 business day
              </p>
            </form>
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