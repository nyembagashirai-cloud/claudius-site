'use client';

import { useState } from 'react';
import { contactNeeds } from '@/content/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong. Please try again.');
      }
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-t border-white/25 pt-10">
        <p className="t-display-l max-w-[16ch]">Thank you. We’ll be in touch.</p>
        <p className="t-body mt-6 text-teal-100">
          We read every enquiry ourselves and normally reply within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contact-form" noValidate>
      <div className="field">
        <label htmlFor="name">Name *</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="field field-wide">
        <label htmlFor="need">What do you need?</label>
        <select id="need" name="need" defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {contactNeeds.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="field field-wide">
        <label htmlFor="message">Tell us about the project *</label>
        <textarea id="message" name="message" rows={5} required />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field-wide flex flex-wrap items-center gap-6">
        <button type="submit" className="btn btn-lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Start a conversation'} <span className="arrow">→</span>
        </button>
        {error ? (
          <p role="alert" className="t-label text-teal-100">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
