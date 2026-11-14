import { Logo } from './Logo';
import { sections } from '../data';

interface HeaderProps {
  active: string;
  ready: boolean;
}

export function Header({ active, ready }: HeaderProps) {
  const links = sections.filter((s) => s.id !== 'top');
  return (
    <header className={`top ${ready ? 'is-ready' : ''}`}>
      <a className="brand" href="#top" aria-label="Tarikul Islam, back to top">
        <Logo size={38} />
      </a>
      <nav className="nav" aria-label="Main">
        {links.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-current' : ''}>
            {s.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
