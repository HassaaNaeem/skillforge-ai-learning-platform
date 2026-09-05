import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { fetchMe } from '../../features/auth/authSlice';
import { AuthActions } from './AuthActions';
import { BrandMark } from './BrandMark';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm ${isActive ? 'font-medium text-[var(--fg)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'}`;

export function AppShell() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)] text-[var(--fg)]">
      <header className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <BrandMark />
            <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
              <NavLink to="/topics" className={navLinkClass}>
                Topics
              </NavLink>
            </nav>
          </div>
          <AuthActions primaryTo="/login" primaryLabel="Sign in" showSignInLink={false} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 text-sm text-[var(--muted)] sm:px-6">
          <span className="font-medium text-[var(--fg)]" style={{ fontFamily: 'var(--display)' }}>
            SkillForge
          </span>
          <span>Practice interviews. Build durable skills.</span>
        </div>
      </footer>
    </div>
  );
}
