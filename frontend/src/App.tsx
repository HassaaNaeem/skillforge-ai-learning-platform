import { useEffect, useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchMe, login, logout } from './features/auth/authSlice';
import { TopicsList } from './features/topics/TopicsList';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector((state) => state.auth);
  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <header className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <p
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: 'var(--display)' }}
          >
            SkillForge
          </p>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-[var(--muted)] sm:inline">
                {user.name}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoading}
                className="border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--fg)] hover:bg-[var(--bg)] disabled:opacity-50"
              >
                {isLoading ? '…' : 'Log out'}
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto grid max-w-3xl gap-10 px-4 py-10 sm:px-6">
        {!user ? (
          <section>
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--display)' }}
            >
              Sign in
            </h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Continue with your account.
            </p>

            <form
              onSubmit={handleLogin}
              className="mt-6 max-w-sm space-y-4 border border-[var(--line)] bg-[var(--surface)] p-5"
            >
              <label className="block">
                <span className="mb-1 block text-xs text-[var(--muted)]">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm outline-none focus:border-[var(--fg)] disabled:opacity-60"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs text-[var(--muted)]">Password</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm outline-none focus:border-[var(--fg)] disabled:opacity-60"
                />
              </label>

              {error ? (
                <p role="alert" className="text-sm text-[var(--danger)]">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[var(--fg)] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </section>
        ) : (
          <section>
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--display)' }}
            >
              Welcome, {user.name}
            </h1>
            <p className="mt-1 text-sm text-[var(--muted)]">{user.email}</p>
          </section>
        )}

        <section>
          <div className="mb-4">
            <h2
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--display)' }}
            >
              Topics
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Choose a topic to practice.
            </p>
          </div>
          <TopicsList />
        </section>
      </main>
    </div>
  );
}

export default App;
