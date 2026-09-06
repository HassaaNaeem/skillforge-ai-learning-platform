import { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAnonymousSession, getPracticeSession, submitAnonymousAnswer, submitPracticeAnswer } from '../features/practice/api';
import { getTopic } from '../features/topics/api';
import { getApiErrorMessage } from '../lib/apiError';
import { TopicIcon } from '../components/TopicIcon';
import { getTopicBlurb } from '../lib/topicCopy';



const DIFFICULTY_CLASS: Record<string, string> = {
  easy: 'bg-[#ecfdf3] text-[#027a48]',
  medium: 'bg-[#fffaeb] text-[#b54708]',
  hard: 'bg-[#fef3f2] text-[#b42318]',
};


export function PracticeSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const location = useLocation();
  const isAnonymous = location.pathname.startsWith('/anonymous');
  const topicIdFromState = (location.state as { topicId?: string } | null)?.topicId;

  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState('');
    
  const anonQuery = useQuery({
    queryKey: ['anonymous-session', sessionId],
    queryFn: () => getAnonymousSession(sessionId!),
    enabled: isAnonymous && !!sessionId,
  })

  const practiceQuery = useQuery({
    queryKey: ['practice-session', sessionId],
    queryFn: () => getPracticeSession(sessionId!),
    enabled: !isAnonymous && !!sessionId,
  })

  const topicId =
    anonQuery.data?.topicId ?? practiceQuery.data?.topicId ?? topicIdFromState

  const topicQuery = useQuery({
    queryKey: ['topics', topicId],
    queryFn: () => getTopic(topicId!),
    enabled: !!topicId,
  })

  const submitMutation = useMutation({
    mutationFn: ({questionId, response}: { questionId: string, response: string }) => isAnonymous ? submitAnonymousAnswer(sessionId!, questionId, response) : submitPracticeAnswer(sessionId!, questionId, response),
    onSuccess: () => {
      setResponse("")
      setIndex((i) => Math.min(i+1, questions.length - 1))
    },
  })

  const topicName = topicQuery.data?.name
  const sessionDifficulty = anonQuery.data?.difficulty ?? practiceQuery.data?.difficulty
  const questions = (topicQuery.data?.questions ?? []).filter(
    (q) => !sessionDifficulty || q.difficulty === sessionDifficulty,
  );
  const answeredIds = new Set(
    [
      ...(anonQuery.data?.answers ?? []),
      ...(practiceQuery.data?.answers ?? []),
    ].map((answer: { questionId: string }) => answer.questionId),
  )
  const submitPending = submitMutation.isPending


  const isPending =
    (isAnonymous && anonQuery.isPending) ||
    (!isAnonymous && practiceQuery.isPending) ||
    topicQuery.isPending
  const isError = anonQuery.isError || practiceQuery.isError || topicQuery.isError

  

  const question = questions[index];
  const progressLabel = useMemo(() => {
    if (!questions.length) return 'No questions';
    return `Question ${index + 1} of ${questions.length}`;
  }, [index, questions.length]);

  const answered = question ? answeredIds.has(question.id) : false;

  function handleSubmit() {
    if (!sessionId || !question || !response.trim()) return;
    submitMutation.mutate({ questionId: question.id, response })
  }

  if (!sessionId) {
    return (
      <div>
        <p className="text-sm text-[var(--muted)]">Session not found.</p>
        <Link to="/topics" className="mt-3 inline-block text-sm font-medium text-[var(--accent)]">
          Back to topics
        </Link>
      </div>
    );
  }

  if (isPending) {
    return <p className="text-sm text-[var(--muted)]">Loading session…</p>;
  }

  if (isError || !question) {
    return (
      <div>
        <p role="alert" className="text-sm text-[var(--danger)]">
          Could not load this session.
        </p>
        <Link to="/topics" className="mt-3 inline-block text-sm font-medium text-[var(--accent)]">
          Back to topics
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to={topicIdFromState ? `/topics/${topicIdFromState}` : '/topics'}
        className="text-sm font-medium text-[var(--muted)] hover:text-[var(--fg)]"
      >
        ← Topic
      </Link>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-start gap-3">
          <TopicIcon slug={topicQuery.data?.slug} name={topicName} />
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">
              {isAnonymous ? 'Guest session' : 'Practice session'}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--fg)]">
              {topicName}
            </h1>
            <p className="mt-1 max-w-md text-sm text-[var(--muted)]">
              {getTopicBlurb(topicQuery.data?.slug, topicName).summary}
            </p>
          </div>
        </div>
        <p className="text-sm text-[var(--muted)]">{progressLabel}</p>
      </header>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--line)]">
        <div
          className="h-full rounded-full bg-[var(--accent)]"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <section className="mt-6 rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${DIFFICULTY_CLASS[question.difficulty] ?? 'bg-[var(--accent-soft)] text-[var(--accent)]'}`}
          >
            {question.difficulty}
          </span>
          <span className="text-xs text-[var(--muted)]">{question.type}</span>
        </div>
        <p
          className="mt-4 select-none text-base font-semibold leading-relaxed text-[var(--fg)]"
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
        >
          {question.prompt}
        </p>

        <label className="mt-6 block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--fg)]">Your answer</span>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            disabled={answered || submitPending}
            rows={8}
            className="w-full resize-y rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] px-3.5 py-3 text-sm text-[var(--fg)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--accent-soft)] disabled:opacity-60"
            placeholder="Explain your reasoning like you would in an interview…"
          />
        </label>

        {answered ? (
          <p className="mt-3 text-sm text-[var(--muted)]">Already submitted for this question.</p>
        ) : null}

        {submitMutation.isError ? (
          <p role="alert" className="mt-3 text-sm text-[var(--danger)]">
            {getApiErrorMessage(submitMutation.error, 'Could not submit answer')}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button
            type="button"
            variant="secondary"
            disabled={index === 0}
            onClick={() => {
              setIndex((i) => Math.max(0, i - 1));
              setResponse('');
            }}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              disabled={index >= questions.length - 1}
              onClick={() => {
                setIndex((i) => Math.min(questions.length - 1, i + 1));
                setResponse('');
              }}
            >
              Skip
            </Button>
            <Button
              type="button"
              disabled={answered || submitPending || !response.trim()}
              onClick={handleSubmit}
            >
              {submitPending ? 'Submitting…' : 'Submit answer'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
