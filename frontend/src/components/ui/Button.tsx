import type { ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';

export const buttonVariantClass: Record<Variant, string> = {
  primary:
    'sf-btn-primary border border-transparent bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-50',
  secondary:
    'border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:bg-[var(--bg)] disabled:opacity-50',
  ghost:
    'border border-transparent bg-transparent text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--fg)] disabled:opacity-50',
};

const baseClass =
  'inline-flex items-center justify-center rounded-[var(--radius)] px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseClass} ${buttonVariantClass[variant]} ${className}`}
      {...props}
    />
  );
}

type ButtonLinkProps = LinkProps & {
  variant?: Variant;
  className?: string;
};

export function ButtonLink({
  variant = 'primary',
  className = '',
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${baseClass} ${buttonVariantClass[variant]} ${className}`}
      {...props}
    />
  );
}
