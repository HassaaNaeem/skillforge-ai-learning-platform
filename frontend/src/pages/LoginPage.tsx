import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../features/auth/authSlice';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PageHeader } from '../components/ui/PageHeader';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useAppSelector((state) => state.auth);
  const isLoading = status === 'loading';

  if (user) {
    return <Navigate to="/topics" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate('/topics');
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <PageHeader
        title="Sign in"
        description="Use your SkillForge account to save practice history."
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]"
      >
        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        {error ? (
          <p role="alert" className="text-sm text-[var(--danger)]">
            {error}
          </p>
        ) : null}

        <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-5 text-sm text-[var(--muted)]">
        Just browsing?{' '}
        <Link to="/topics" className="font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]">
          View topics
        </Link>
      </p>
    </div>
  );
}
