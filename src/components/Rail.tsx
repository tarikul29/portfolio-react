import { sections } from '../data';

export function Rail({ active }: { active: string }) {
  const position = Math.max(sections.findIndex((s) => s.id === active), 0) + 1;
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="rail" aria-hidden="true">
      <span className="rail-count">
        {pad(position)} / {pad(sections.length)}
      </span>
      <span className="rail-line">
        <i />
      </span>
    </div>
  );
}
