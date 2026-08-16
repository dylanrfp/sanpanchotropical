'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacyConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>(null);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Anti-Spam State
  const [honeypot, setHoneypot] = useState('');
  const [formLoadedAt, setFormLoadedAt] = useState<number>(Date.now());

  React.useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('vicky@mexicosta.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.',
      });
      return;
    }

    if (!formData.privacyConsent) {
      setStatus({
        type: 'error',
        message: 'Please agree to the Privacy Notice before submitting.',
      });
      return;
    }

    // Instead of failing if no token, pop up the Captcha modal!
    if (!captchaToken) {
      setShowCaptchaModal(true);
      return;
    }

    // If we already have a token, proceed with submission
    submitInquiry(captchaToken);
  };

  const submitInquiry = async (token: string) => {
    setShowCaptchaModal(false);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          captchaToken: token,
          website_hp: honeypot,
          formLoadedAt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send inquiry.');
      }

      setSubmittedData({ name: formData.name, email: formData.email });
      setStatus({
        type: 'success',
        message: data.message || 'Your inquiry has been sent successfully!',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        privacyConsent: false,
      });
      setCaptchaToken(null);
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'Unable to send your inquiry at this moment. Please reach out to us directly on WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-base-light text-base-dark min-h-screen pb-28 overflow-x-hidden">
      {/* ── Cinematic Banner Header ─────────────────────────────────────────── */}
      <div 
        className="relative w-full overflow-hidden mb-6 md:mb-12 flex items-center justify-center bg-base-dark" 
        style={{ 
          aspectRatio: '2750 / 592',
          minHeight: '150px'
        }}
      >

        {/* Background photo */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/contact_banner.png')",
            backgroundPosition: 'center top',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">
          
          {/* Details & Info */}
          <div className="flex flex-col reveal-on-scroll reveal-left lg:sticky lg:top-28">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-ocean-teal font-outfit block mb-2">Get in Touch</span>
              <h2 className="font-outfit font-black text-3xl md:text-5xl text-base-dark tracking-tight mb-6">
                We'd love to hear from you.
              </h2>
              <p className="font-outfit font-light text-sm md:text-[19px] text-base-dark/80 leading-relaxed mb-6 md:mb-10 max-w-lg text-justify">
                Whether you are inquiring about availability, need local recommendations, or have a special request for your upcoming stay, we are here to help.
              </p>

              {/* Contact Information Elements */}
              <div className="space-y-5 md:space-y-8 mt-6 md:mt-10">
                {/* Email Item - Click to copy */}
                <div 
                  onClick={handleCopyEmail}
                  className="group flex items-center justify-between border-b border-sand-accent/15 pb-6 cursor-pointer select-none transition-all hover:bg-base-dark/[0.02] -mx-3 px-3 rounded-2xl"
                  title="Click to copy email address"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 rounded-full bg-base-dark/[0.04] group-hover:bg-ocean-teal/10 flex items-center justify-center flex-shrink-0 transition-colors">
                      <svg className="w-5 h-5 text-base-dark/70 group-hover:text-ocean-teal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-outfit font-semibold text-[10px] md:text-xs tracking-widest text-base-dark/45 uppercase mb-1">Email</h4>
                      <span className="font-outfit font-medium text-lg text-base-dark group-hover:text-ocean-teal transition-colors block">
                        vicky@mexicosta.com
                      </span>
                    </div>
                  </div>

                  {/* Copy button / badge indicator */}
                  <div className="flex items-center">
                    <span 
                      className={`inline-flex items-center space-x-1.5 text-xs font-outfit font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                        copiedEmail 
                          ? 'bg-emerald-600 text-white shadow-sm scale-105' 
                          : 'bg-base-dark/[0.05] text-base-dark/60 group-hover:bg-ocean-teal group-hover:text-white'
                      }`}
                    >
                      {copiedEmail ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <span className="hidden sm:inline">Copy Email</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-center space-x-6 border-b border-sand-accent/15 pb-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <img 
                      src="/WhatsApp_icon.png" 
                      alt="WhatsApp" 
                      className="w-11 h-11 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-[10px] md:text-xs tracking-widest text-base-dark/45 uppercase mb-1">WhatsApp</h4>
                    <p className="font-outfit font-medium text-lg text-base-dark">
                      <a 
                        href="https://wa.me/523221177974" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-ocean-teal transition-colors"
                      >
                        +52 322 117 7974
                      </a>
                    </p>
                  </div>
                </div>

                {/* Address Item */}
                <div className="flex items-center space-x-6 border-b border-sand-accent/15 pb-6">
                  <div className="w-12 h-12 rounded-full bg-base-dark/[0.04] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-base-dark/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-[10px] md:text-xs tracking-widest text-base-dark/45 uppercase mb-1">Address</h4>
                    <p className="font-outfit font-medium text-lg text-base-dark">San Pancho, Nay Mex</p>
                  </div>
                </div>

                {/* Office Hours Item */}
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 rounded-full bg-base-dark/[0.04] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-base-dark/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-[10px] md:text-xs tracking-widest text-base-dark/45 uppercase mb-1">Office Hours</h4>
                    <p className="font-outfit font-medium text-lg text-base-dark">Mon - Sat: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form Card */}
          <div className="bg-white border border-sand-accent/15 rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-xl flex flex-col justify-center w-full reveal-on-scroll reveal-right relative overflow-hidden">
            <h3 className="font-outfit font-black text-3xl md:text-4xl text-base-dark tracking-tight mb-2">Message Us</h3>
            <p className="font-outfit text-sm text-base-dark/60 mb-8">Send us an inquiry and Vicky will get back to you promptly.</p>
            
            {/* Animated Status Feedback Notifications */}
            <AnimatePresence mode="wait">
              {status.type === 'success' && (
                <motion.div
                  key="success-banner"
                  initial={{ opacity: 0, y: -16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="mb-8 p-6 rounded-2xl bg-emerald-50/90 border border-emerald-300/80 shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-600/20">
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 15 }}
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-outfit font-bold text-emerald-900 text-base md:text-lg mb-1">
                        Inquiry Successfully Sent!
                      </h4>
                      <p className="font-outfit text-xs md:text-sm text-emerald-800 leading-relaxed mb-3">
                        {status.message}
                      </p>
                      {submittedData && (
                        <p className="font-outfit text-xs text-emerald-700/90 bg-white/70 py-1.5 px-3 rounded-lg inline-block border border-emerald-200">
                          Confirmation for: <strong>{submittedData.name}</strong> ({submittedData.email})
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {status.type === 'error' && (
                <motion.div
                  key="error-banner"
                  initial={{ opacity: 0, y: -16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="mb-8 p-6 rounded-2xl bg-red-50/95 border border-red-300/80 shadow-sm relative"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-600/20">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-outfit font-bold text-red-900 text-base mb-1">
                        Inquiry Could Not Be Delivered
                      </h4>
                      <p className="font-outfit text-xs md:text-sm text-red-800 leading-relaxed mb-3">
                        {status.message}
                      </p>
                      <a
                        href="https://wa.me/523221177974"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors shadow-sm font-outfit"
                      >
                        <img src="/WhatsApp_icon.png" alt="WhatsApp" className="w-4 h-4 object-contain brightness-0 invert" />
                        <span>Message Vicky directly on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-7" onSubmit={handleFormSubmit}>
              <div>
                <label className="block font-outfit text-xs tracking-wider text-base-dark/60 font-semibold mb-1">FULL NAME *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-sand-accent/30 py-3.5 text-base text-base-dark font-outfit font-normal placeholder-base-dark/30 focus:outline-none focus:border-ocean-teal transition-colors"
                  placeholder="Elena Rostova"
                />
              </div>

              <div>
                <label className="block font-outfit text-xs tracking-wider text-base-dark/60 font-semibold mb-1">EMAIL ADDRESS *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-sand-accent/30 py-3.5 text-base text-base-dark font-outfit font-normal placeholder-base-dark/30 focus:outline-none focus:border-ocean-teal transition-colors"
                  placeholder="elena@example.com"
                />
              </div>

              <div>
                <label className="block font-outfit text-xs tracking-wider text-base-dark/60 font-semibold mb-1">HOW CAN WE HELP YOU</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-sand-accent/30 py-3.5 text-base text-base-dark font-outfit font-normal placeholder-base-dark/30 focus:outline-none focus:border-ocean-teal transition-colors"
                  placeholder="Check dates, questions and coordination"
                />
              </div>

              <div>
                <label className="block font-outfit text-xs tracking-wider text-base-dark/60 font-semibold mb-1">ADDITIONAL SPECIFICATIONS *</label>
                <textarea 
                  rows={5}
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-sand-accent/25 rounded-xl p-5 text-base text-base-dark font-outfit font-normal placeholder-base-dark/30 focus:outline-none focus:border-ocean-teal transition-colors resize-none mt-1"
                  placeholder="Notes on guest party, dietary requests, surf excursions..."
                />
              </div>

              {/* Hidden honeypot field for bot trapping */}
              <div className="hidden" aria-hidden="true">
                <input 
                  type="text" 
                  name="website_hp" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  tabIndex={-1} 
                  autoComplete="off" 
                />
              </div>

              {/* Privacy Notice Consent */}
              <div className="flex items-start space-x-3 pt-2">
                <input 
                  type="checkbox" 
                  id="privacy-consent"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 rounded border-sand-accent/30 text-ocean-teal focus:ring-ocean-teal accent-ocean-teal cursor-pointer"
                />
                <label htmlFor="privacy-consent" className="font-outfit text-xs text-base-dark/70 leading-relaxed cursor-pointer select-none">
                  Acepto el <Link href="/privacy" target="_blank" className="text-ocean-teal hover:underline font-semibold">Aviso de Privacidad</Link> / I agree to the <Link href="/privacy" target="_blank" className="text-ocean-teal hover:underline font-semibold">Privacy Notice</Link>.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-ocean-teal hover:bg-base-dark disabled:opacity-50 disabled:cursor-not-allowed text-base-light font-outfit tracking-widest text-sm font-semibold py-5 rounded-full transition-all shadow-md cursor-pointer mt-2 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>SENDING INQUIRY...</span>
                  </>
                ) : (
                  <span>SUBMIT INQUIRY</span>
                )}
              </button>
            </form>

            {/* reCAPTCHA Modal Overlay */}
            <AnimatePresence>
              {showCaptchaModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-base-dark/60 backdrop-blur-sm p-4"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-3xl p-6 shadow-2xl relative max-w-sm w-full mx-auto flex flex-col items-center border border-sand-accent/20"
                  >
                    <button
                      onClick={() => setShowCaptchaModal(false)}
                      className="absolute top-4 right-4 text-base-dark/50 hover:text-base-dark transition-colors"
                      aria-label="Close Captcha"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <h3 className="font-outfit font-semibold text-base-dark text-lg mb-2 mt-2">Security Verification</h3>
                    <p className="text-sm text-base-dark/60 text-center mb-6">
                      Please verify you are human to send your inquiry.
                    </p>

                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      onChange={(token) => {
                        setCaptchaToken(token);
                        if (token) {
                          setStatus({ type: null, message: '' });
                          submitInquiry(token);
                        }
                      }}
                      onExpired={() => setCaptchaToken(null)}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </div>
  );
}


