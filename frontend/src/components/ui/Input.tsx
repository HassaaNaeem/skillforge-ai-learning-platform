import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, className = '', ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-1.5 block text-sm font-medium text-[var(--fg)]">{label}</span>
      <input
        id={inputId}
        className={`w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--fg)] shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-soft)] disabled:opacity-60 ${className}`}
        {...props}
      />
    </label>
  );
}
