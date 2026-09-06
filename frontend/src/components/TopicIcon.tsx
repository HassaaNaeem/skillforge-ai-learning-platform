type TopicIconProps = {
  slug?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
};

const SIZE = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

const ICON_FILE: Record<string, string> = {
  javascript: '/icons/javascript.svg',
  typescript: '/icons/typescript.svg',
  react: '/icons/react.svg',
  nodejs: '/icons/nodejs.svg',
  node: '/icons/nodejs.svg',
  postgresql: '/icons/postgresql.svg',
  postgres: '/icons/postgresql.svg',
  git: '/icons/git.svg',
};

function keyOf(slug?: string, name?: string) {
  return (slug ?? name ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function TopicIcon({ slug, name, size = 'md' }: TopicIconProps) {
  const key = keyOf(slug, name);
  const src = ICON_FILE[key];
  const label = name ?? slug ?? 'Topic';

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--bg)] ${SIZE[size]}`}
    >
      {src ? (
        <img src={src} alt="" className="h-[72%] w-[72%] object-contain" />
      ) : (
        <span className="text-xs font-bold text-[var(--accent)]">{label.slice(0, 2)}</span>
      )}
    </span>
  );
}
