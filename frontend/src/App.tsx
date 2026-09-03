import { useEffect, useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchMe, login, logout } from './features/auth/authSlice';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch()
  const {user, status, error} = useAppSelector((state) => state.auth)

  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchMe())
  }, [dispatch]);

  function handleLogin(e: FormEvent) {
    e.preventDefault();

    dispatch(login({ email, password }))
  }

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(232,165,75,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(36,48,65,0.9), transparent 50%), linear-gradient(180deg, #0c1117 0%, #0a0e13 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
        <header className="mb-10 text-center">
          <p
            className="text-4xl font-extrabold tracking-tight text-[var(--sf-text)] sm:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            SkillForge
          </p>
          <p className="mt-3 text-sm text-[var(--sf-muted)]">
            Practice interviews. Sharpen skills. Ship confidence.
          </p>
        </header>

        {user ? (
          <section
            className="rounded-2xl border border-[var(--sf-border)] bg-[var(--sf-surface)]/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm"
            aria-live="polite"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--sf-accent)]">
              Signed in
            </p>
            <h1
              className="mt-3 text-2xl font-bold text-[var(--sf-text)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Welcome back, {user.name}
            </h1>
            <p className="mt-2 text-sm text-[var(--sf-muted)]">{user.email}</p>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoading}
              className="mt-8 w-full rounded-xl border border-[var(--sf-border)] bg-transparent px-4 py-3 text-sm font-semibold text-[var(--sf-text)] transition hover:border-[var(--sf-accent)] hover:text-[var(--sf-accent)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Signing out…' : 'Log out'}
            </button>
          </section>
        ) : (
          <section className="rounded-2xl border border-[var(--sf-border)] bg-[var(--sf-surface)]/90 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <h1
              className="text-2xl font-bold text-[var(--sf-text)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Sign in
            </h1>
            <p className="mt-2 text-sm text-[var(--sf-muted)]">
              Use your SkillForge account to continue.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[var(--sf-muted)]">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-[var(--sf-border)] bg-[var(--sf-bg)] px-3.5 py-3 text-sm text-[var(--sf-text)] outline-none transition placeholder:text-[var(--sf-muted)]/60 focus:border-[var(--sf-accent)] disabled:opacity-60"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[var(--sf-muted)]">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-[var(--sf-border)] bg-[var(--sf-bg)] px-3.5 py-3 text-sm text-[var(--sf-text)] outline-none transition placeholder:text-[var(--sf-muted)]/60 focus:border-[var(--sf-accent)] disabled:opacity-60"
                  placeholder="••••••••"
                />
              </label>

              {error ? (
                <p
                  role="alert"
                  className="rounded-lg border border-[var(--sf-danger)]/30 bg-[var(--sf-danger)]/10 px-3 py-2 text-sm text-[var(--sf-danger)]"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[var(--sf-accent)] px-4 py-3 text-sm font-semibold text-[#1a1208] transition hover:bg-[var(--sf-accent-dim)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </section>
        )}

        <p className="mt-8 text-center text-xs text-[var(--sf-muted)]">
          M4 auth shell — wire Redux TODOs to make this live.
        </p>
      </main>
    </div>
  );
}

export default App;
