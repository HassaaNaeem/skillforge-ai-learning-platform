import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { fetchMe } from '../../features/auth/authSlice';
import { AuthActions } from './AuthActions';
import { BrandMark } from './BrandMark';
import { SkipLink } from './SkipLink';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm ${isActive ? 'font-medium text-[var(--fg)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'}`;

export function MarketingLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--fg)]">
      <SkipLink />
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <BrandMark />
            <nav className="flex items-center gap-4 sm:gap-6" aria-label="Primary">
              <NavLink to="/topics" className={navLinkClass}>
                Topics
              </NavLink>
              <a
                href="/#how-it-works"
                className="hidden text-sm text-[var(--muted)] hover:text-[var(--fg)] sm:inline"
              >
                How it works
              </a>
            </nav>
          </div>
          <AuthActions />
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
          <div>
            <BrandMark />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
              Interview practice for developers who want durable skill, not trivia.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--fg)]">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              <li>
                <NavLink to="/topics" className="hover:text-[var(--fg)]">
                  Topics
                </NavLink>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-[var(--fg)]">
                  How it works
                </a>
              </li>
              <li>
                <NavLink to="/dashboard" className="hover:text-[var(--fg)]">
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--fg)]">Account</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              <li>
                <NavLink to="/login" className="hover:text-[var(--fg)]">
                  Sign in
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="hover:text-[var(--fg)]">
                  Create account
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="hover:text-[var(--fg)]">
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--line)]">
          <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-[var(--muted)] sm:px-6">
            © {new Date().getFullYear()} SkillForge
          </p>
        </div>
      </footer>
    </div>
  );
}
