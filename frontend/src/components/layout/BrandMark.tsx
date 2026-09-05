import { Link } from 'react-router-dom';

export function BrandMark() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white"
      >
        S
      </span>
      <span
        className="text-[1.05rem] font-bold tracking-tight text-[var(--fg)]"
        style={{ fontFamily: 'var(--display)' }}
      >
        SkillForge
      </span>
    </Link>
  );
}
