type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--fg)] sm:text-[1.75rem]">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
