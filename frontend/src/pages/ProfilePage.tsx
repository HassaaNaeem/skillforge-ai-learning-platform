import { useRef, type ChangeEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { uploadAvatar } from '../features/auth/authSlice';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user, status, error, initialized } = useAppSelector((state) => state.auth);
  const inputRef = useRef<HTMLInputElement>(null);
  const isUploading = status === 'loading';

  if (!initialized) {
    return <p className="text-sm text-[var(--muted)]">Loading profile…</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    await dispatch(uploadAvatar(file));
  }

  return (
    <div className="mx-auto max-w-md">
      <PageHeader
        title="Profile"
        description="Your photo is stored on Cloudinary. SkillForge only saves the image URL on your account."
      />

      <div className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
        <div className="flex items-center gap-4">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]">
              {initials(user.name)}
            </div>
          )}
          <div>
            <p className="text-base font-semibold text-[var(--fg)]">{user.name}</p>
            <p className="text-sm text-[var(--muted)]">{user.email}</p>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={handleFile}
        />

        <Button
          className="mt-6"
          variant="secondary"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? 'Uploading…' : 'Upload photo'}
        </Button>

        {error ? (
          <p role="alert" className="mt-3 text-sm text-[var(--danger)]">
            {error}
          </p>
        ) : null}

        <p className="mt-3 text-xs text-[var(--muted)]">JPEG, PNG, or WebP. Max 2MB.</p>
      </div>

      <Link to="/topics" className="mt-6 inline-block text-sm font-medium text-[var(--accent)]">
        ← Topics
      </Link>
    </div>
  );
}
