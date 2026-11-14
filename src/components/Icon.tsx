import type { ProjectIcon } from '../data';

const paths: Record<ProjectIcon, string> = {
  drop: 'M12 3c3.6 4.4 6 7.5 6 10.6A6 6 0 0 1 6 13.6C6 10.5 8.4 7.4 12 3z',
  book: 'M12 6.5C10 5 7.5 4.6 4 4.8v12.6c3.5-.2 6 .2 8 1.6 2-1.4 4.5-1.8 8-1.6V4.8c-3.5-.2-6 .2-8 1.7zM12 6.5V19',
  bag: 'M5 8h14l-1.3 11H6.3z M9 8V6.5a3 3 0 0 1 6 0V8',
  cloud: 'M7 18h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.2 4.4 4.4 0 0 0 7 18z',
};

export function Icon({ name, className = '' }: { name: ProjectIcon; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
