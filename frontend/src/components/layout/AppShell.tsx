import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMe } from '../../features/auth/authSlice';
import { AuthActions } from './AuthActions';
import { BrandMark } from './BrandMark';
import { SkipLink } from './SkipLink';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm ${isActive ? 'font-medium text-[var(--fg)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'}`;

export function AppShell() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--fg)]">
      <SkipLink />
      <header className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-4 sm:gap-8">
            <BrandMark />
            <nav className="flex items-center gap-3 sm:gap-6" aria-label="Primary">
              <NavLink to="/topics" className={navLinkClass}>
                Topics
              </NavLink>
              {user ? (
                <>
                  <NavLink to="/dashboard" className={navLinkClass}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/profile" className={navLinkClass}>
                    Profile
                  </NavLink>
                </>
              ) : null}
            </nav>
          </div>
          <AuthActions primaryTo="/login" primaryLabel="Sign in" showSignInLink={false} />
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm text-[var(--muted)] sm:px-6">
          <span className="font-medium text-[var(--fg)]" style={{ fontFamily: 'var(--display)' }}>
            SkillForge
          </span>
          <nav className="flex items-center gap-4" aria-label="Footer">
            <NavLink to="/topics" className="hover:text-[var(--fg)]">
              Topics
            </NavLink>
            {user ? (
              <NavLink to="/dashboard" className="hover:text-[var(--fg)]">
                Dashboard
              </NavLink>
            ) : (
              <NavLink to="/login" className="hover:text-[var(--fg)]">
                Sign in
              </NavLink>
            )}
          </nav>
        </div>
      </footer>
    </div>
  );
}
