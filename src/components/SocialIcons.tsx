import type { ReactNode } from 'react';
import { contact } from '../data';

export type SocialName = 'GitHub' | 'Facebook' | 'Instagram';

const icons: Record<SocialName, ReactNode> = {
  GitHub: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"
      />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.1 23.7v-8H6.6v-3.7h2.5v-1.6c0-4.1 1.8-6 5.9-6 .4 0 .9 0 1.5.1a8.7 8.7 0 0 1 1.1.2v3.3a8.6 8.6 0 0 0-.7 0h-.7c-.7 0-1.3.1-1.7.3-.4.2-.5.4-.7.6-.3.4-.4 1-.4 1.8V12h3.9l-.4 2.1-.3 1.6h-3.2v8.2A12 12 0 1 0 0 12c0 5.6 3.9 10.4 9.1 11.7Z"
      />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  ),
};

const links: { name: SocialName; href: string }[] = [
  { name: 'GitHub', href: contact.github },
  { name: 'Facebook', href: contact.facebook },
  { name: 'Instagram', href: contact.instagram },
];

/** Round icon buttons (hero) or labelled pills (contact). */
export function SocialIcons({ labelled = false }: { labelled?: boolean }) {
  return (
    <ul className={labelled ? 'socials socials-labelled' : 'socials'}>
      {links.map((link) => (
        <li key={link.name}>
          <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={labelled ? undefined : link.name}>
            {icons[link.name]}
            {labelled && <span>{link.name}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
