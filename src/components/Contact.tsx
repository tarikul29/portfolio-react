import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { contact } from '../data';
import { SplitText } from './SplitText';
import { SocialIcons } from './SocialIcons';
import { Reveal } from './Reveal';
import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';
import { ContactForm } from './ContactForm';

interface ContactCardProps {
  label: string;
  value: string;
  href: string;
  action: string;
  icon: ReactNode;
  motion: boolean;
  onCopy?: () => void;
  copied?: boolean;
}

function ContactCard({ label, value, href, action, icon, motion, onCopy, copied }: ContactCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  useTilt(ref, motion, 3);

  return (
    <div className="ccard" ref={ref}>
      <span className="card-glare" aria-hidden="true" />
      <span className="ccard-icon" aria-hidden="true">{icon}</span>
      <p className="ccard-label">{label}</p>
      <a className="ccard-value" href={href}>{value}</a>
      <div className="ccard-actions">
        <a className="btn" href={href}>{action}</a>
        {onCopy && (
          <button className="copy" type="button" onClick={onCopy} aria-live="polite">
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  );
}

const mailIcon = (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="m4 7.5 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const phoneIcon = (
  <svg viewBox="0 0 24 24">
    <path
      d="M6.6 3.500h2.800l1.4 4-1.8 1.300a11 11 0 0 0 5.2 5.200l1.3-1.8 4 1.400v2.800a2 2 0 0 1-2.1 2A14.5 14.5 0 0 1 4.6 5.600a2 2 0 0 1 2-2.100z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export function Contact({ motion }: { motion: boolean }) {
  const [ref, seen] = useInView<HTMLHeadingElement>(0.3);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section className="block wrap" id="contact" aria-labelledby="contact-title">
      <h2 className="contact-title" id="contact-title" ref={ref}>
        <span className="line">
          <SplitText text="Let's build" play={seen} step={36} />
        </span>
        <span className="line">
          <SplitText text="something" play={seen} delay={380} step={36} />
        </span>
        <span className="line accent">
          <SplitText text="useful." play={seen} delay={760} step={50} />
        </span>
      </h2>

      <Reveal delay={150}>
        <p className="contact-sub">Have a project or an idea? Send me a message or call, I reply fast.</p>
      </Reveal>

      <Reveal delay={250} className="ccards-wrap">
        <div className="ccards">
          <ContactCard
            label="Email"
            value={contact.email}
            href={`mailto:${contact.email}`}
            action="Send an email"
            icon={mailIcon}
            motion={motion}
            onCopy={copy}
            copied={copied}
          />
          <ContactCard
            label="Phone"
            value={contact.phone}
            href={`tel:${contact.phoneHref}`}
            action="Call me"
            icon={phoneIcon}
            motion={motion}
          />
        </div>
      </Reveal>

      <Reveal delay={300}>
        <ContactForm />
      </Reveal>

      <Reveal delay={350}>
        <p className="contact-also">Find me online</p>
        <SocialIcons labelled />
      </Reveal>
    </section>
  );
}