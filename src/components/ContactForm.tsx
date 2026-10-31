'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Lang, getContent } from '@/lib/i18n';

interface ContactFormProps {
  lang: Lang;
}

export function ContactForm({ lang }: ContactFormProps) {
  const c = getContent(lang).contact.form;

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [division, setDivision] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const mountTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Spam check 1: Honeypot field filled
    if (honeypot.trim() !== '') {
      return;
    }

    // Spam check 2: Minimum time to submit (3 seconds)
    const timeElapsed = Date.now() - mountTimeRef.current;
    if (timeElapsed < 3000) {
      setFormError(
        lang === 'bn'
          ? 'অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করে পুনরায় চেষ্টা করুন।'
          : 'Please wait a few seconds before submitting.'
      );
      return;
    }

    // Basic validation
    if (!name.trim() || !contact.trim() || !message.trim()) {
      setFormError(
        lang === 'bn'
          ? 'অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।'
          : 'Please fill in all required fields.'
      );
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

    if (!endpoint) {
      // Fallback: Mailto client redirect without fake success
      const subject = encodeURIComponent(
        `Inquiry from ${name} [${division || 'General'}]`
      );
      const body = encodeURIComponent(
        `Name: ${name}\nContact: ${contact}\nDivision: ${division || 'Not specified'}\n\nMessage:\n${message}`
      );
      window.location.href = `mailto:info@ruhanir.com?subject=${subject}&body=${body}`;
      return;
    }

    // Submit to configured endpoint
    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contact,
          division: division || 'Not specified',
          message,
        }),
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success');
      setName('');
      setContact('');
      setDivision('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  const endpointConfigured = Boolean(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT);

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot field - invisible to real users, catches bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website-url">Website</label>
        <input
          type="text"
          id="website-url"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-slate-800"
        >
          {c.nameLabel} <span className="text-[#0E52C3]">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={c.namePlaceholder}
          className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0E52C3] focus:ring-1 focus:ring-[#0E52C3]"
        />
      </div>

      <div>
        <label
          htmlFor="contact-channel"
          className="block text-sm font-medium text-slate-800"
        >
          {c.contactLabel} <span className="text-[#0E52C3]">*</span>
        </label>
        <input
          type="text"
          id="contact-channel"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder={c.contactPlaceholder}
          className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0E52C3] focus:ring-1 focus:ring-[#0E52C3]"
        />
      </div>

      <div>
        <label
          htmlFor="contact-division"
          className="block text-sm font-medium text-slate-800"
        >
          {c.divisionLabel}
        </label>
        <select
          id="contact-division"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-[#0E52C3] focus:ring-1 focus:ring-[#0E52C3]"
        >
          <option value="">{c.divisionPlaceholder}</option>
          {c.divisionOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-slate-800"
        >
          {c.messageLabel} <span className="text-[#0E52C3]">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={c.messagePlaceholder}
          className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0E52C3] focus:ring-1 focus:ring-[#0E52C3]"
        />
      </div>

      <p className="text-xs text-slate-500">{c.privacy}</p>

      {!endpointConfigured && (
        <p className="text-xs text-slate-500 italic">{c.fallbackNote}</p>
      )}

      {formError && (
        <div className="rounded-md bg-amber-50 p-3 text-xs text-amber-800 border border-amber-200">
          {formError}
        </div>
      )}

      {status === 'success' && (
        <div className="rounded-md bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
          {c.successMessage}
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-md bg-rose-50 p-3 text-xs text-rose-800 border border-rose-200">
          {c.errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-md bg-[#05308A] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#0E52C3] focus:outline-none focus:ring-2 focus:ring-[#0E52C3] focus:ring-offset-2 disabled:opacity-50"
      >
        {status === 'submitting'
          ? lang === 'bn'
            ? 'পাঠানো হচ্ছে...'
            : 'Sending...'
          : c.submitLabel}
      </button>
    </form>
  );
}
