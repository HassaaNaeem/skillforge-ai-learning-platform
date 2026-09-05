import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../features/auth/authSlice';
import { Button, ButtonLink } from '../ui/Button';

type AuthActionsProps = {
  primaryTo?: string;
  primaryLabel?: string;
  showSignInLink?: boolean;
};

export function AuthActions({
  primaryTo = '/topics',
  primaryLabel = 'Get started',
  showSignInLink = true,
}: AuthActionsProps) {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);
  const isLoading = status === 'loading';

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-[var(--muted)] sm:inline">{user.name}</span>
        <Button variant="secondary" onClick={() => dispatch(logout())} disabled={isLoading}>
          {isLoading ? '…' : 'Log out'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {showSignInLink ? (
        <ButtonLink to="/login" variant="ghost" className="hidden sm:inline-flex">
          Sign in
        </ButtonLink>
      ) : null}
      <ButtonLink to={primaryTo} variant="primary">
        {primaryLabel}
      </ButtonLink>
    </div>
  );
}
