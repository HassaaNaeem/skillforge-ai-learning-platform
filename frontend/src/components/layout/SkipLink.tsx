export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-[var(--radius)] focus:bg-[var(--surface)] focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--fg)] focus:shadow-[var(--shadow)]"
    >
      Skip to content
    </a>
  );
}
