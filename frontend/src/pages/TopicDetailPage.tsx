import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTopic } from '../features/topics/api';
import { useAppSelector } from '../store/hooks';
import { createAnonymousSession, createPracticeSession } from '../features/practice/api';
import { getApiErrorMessage } from '../lib/apiError';
import { TopicIcon } from '../components/TopicIcon';
import { getTopicBlurb } from '../lib/topicCopy';

type Difficulty = 'easy' | 'medium' | 'hard';

export function TopicDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const { user } = useAppSelector((state) => state.auth);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['topics', id],
    queryFn: () => getTopic(id!),
    enabled: !!id,
  });

  const startSessionMutation = useMutation({
    mutationFn: (topicId: string) =>
      user
        ? createPracticeSession(topicId, 'practice', difficulty)
        : createAnonymousSession(topicId, 'practice', difficulty),
    onSuccess: (session) =>
      navigate(`/${user ? 'practice' : 'anonymous'}/sessions/${session.id}`, {
        state: { topicId: id },
      }),
  });

  if (!id) {
    return (
      <div>
        <p className="text-sm text-[var(--muted)]">Topic not found.</p>
        <Link to="/topics" className="mt-3 inline-block text-sm font-medium text-[var(--accent)]">
          Back to topics
        </Link>
      </div>
    );
  }

  if (isPending) {
    return <p className="text-sm text-[var(--muted)]">Loading topic…</p>;
  }

  if (isError) {
    return (
      <div>
        <p role="alert" className="text-sm text-[var(--danger)]">
          {error?.message ?? 'Topic not found'}
        </p>
        <Link to="/topics" className="mt-3 inline-block text-sm font-medium text-[var(--accent)]">
          Back to topics
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <p className="text-sm text-[var(--muted)]">Topic not found.</p>
        <Link to="/topics" className="mt-3 inline-block text-sm font-medium text-[var(--accent)]">
          Back to topics
        </Link>
      </div>
    );
  }

  const blurb = getTopicBlurb(data.slug, data.name);
  const matchingCount = (data.questions ?? []).filter((q) => q.difficulty === difficulty).length;
  const totalCount = data.questions?.length ?? data._count?.questions ?? 0;

  return (
    <div>
      <Link
        to="/topics"
        className="text-sm font-medium text-[var(--muted)] hover:text-[var(--fg)]"
      >
        ← All tracks
      </Link>

      <header className="mt-4 rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8">
        <div className="flex items-start gap-4">
          <TopicIcon slug={data.slug} name={data.name} size="lg" />
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">Practice track</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--fg)] sm:text-3xl">
              {data.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
              {data.description}
            </p>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--fg)]/85">{blurb.summary}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{blurb.interview}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] p-0.5">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`rounded-[8px] px-3 py-1.5 text-xs font-medium capitalize ${
                  difficulty === level
                    ? 'bg-[var(--surface)] text-[var(--fg)] shadow-[var(--shadow)]'
                    : 'text-[var(--muted)] hover:text-[var(--fg)]'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
            {matchingCount} {difficulty} · {totalCount} total
          </span>
          <Button
            type="button"
            onClick={() => startSessionMutation.mutate(id)}
            disabled={startSessionMutation.isPending}
          >
            {startSessionMutation.isPending ? 'Starting…' : 'Start practice'}
          </Button>
        </div>
        {startSessionMutation.isError ? (
          <p role="alert" className="mt-3 text-sm text-[var(--danger)]">
            {getApiErrorMessage(startSessionMutation.error, 'Could not start practice')}
          </p>
        ) : null}
        <p className="mt-4 text-sm text-[var(--muted)]">
          {user
            ? 'This session is saved to your account. You can refresh the page and come back.'
            : 'You are practicing as a guest. Sign in first if you want this session kept in history.'}
        </p>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
          <h2 className="text-base font-semibold text-[var(--fg)]">What you will practice</h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            {blurb.focus.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
          <h2 className="text-base font-semibold text-[var(--fg)]">How a session works</h2>
          <ol className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <li>1. Questions stay hidden until you start—no preview list.</li>
            <li>2. Write an interview-style answer, then submit.</li>
            <li>3. Answers are stored now; AI scoring lands in a later milestone.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
