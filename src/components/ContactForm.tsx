import { useState } from 'react';
import type { FormEvent } from 'react';
import { contact } from '../data';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Sends the message straight to Tarikul's inbox through FormSubmit (no server needed). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('_honey')) return;

    setStatus('sending');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          _subject: 'New message from your portfolio',
          _template: 'table',
        }),
      });
      if (!response.ok) throw new Error('failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="cform" onSubmit={onSubmit}>
      <h3 className="cform-title">Send a message</h3>
      <div className="cform-row">
        <label className="cform-field">
          <span>Your name</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className="cform-field">
          <span>Your email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="cform-field">
        <span>Message</span>
        <textarea name="message" rows={5} required />
      </label>
      <input className="cform-honey" name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="cform-foot">
        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        <p className={`cform-note cform-${status}`} role="status" aria-live="polite">
          {status === 'sent' && 'Thanks, your message is on its way.'}
          {status === 'error' && 'Could not send. Please email me directly.'}
        </p>
      </div>
    </form>
  );
}