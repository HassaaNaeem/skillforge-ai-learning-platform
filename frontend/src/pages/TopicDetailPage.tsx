import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import type { Question } from '../types/topic';
import { useQuery } from '@tanstack/react-query';
import { getTopic } from '../features/topics/api';

const DIFFICULTY_CLASS: Record<string, string> = {
  easy: 'bg-[#ecfdf3] text-[#027a48]',
  medium: 'bg-[#fffaeb] text-[#b54708]',
  hard: 'bg-[#fef3f2] text-[#b42318]',
};


function DifficultyChip({ value }: { value: string }) {
  const tone = DIFFICULTY_CLASS[value] ?? 'bg-[var(--accent-soft)] text-[var(--accent)]';
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${tone}`}>
      {value}
    </span>
  );
}

function QuestionRow({ question }: { question: Question }) {
  return (
    <li className="px-5 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <DifficultyChip value={question.difficulty} />
        <span className="text-xs text-[var(--muted)]">{question.type}</span>
      </div>
      <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--fg)]">
        {question.prompt}
      </p>
    </li>
  );
}

export function TopicDetailPage() {
  const {id} = useParams<{id:string}>()

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['topics', id],
    queryFn: () => getTopic(id!),
    enabled: !!id
  })

  if (!id){
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

  const questions = data.questions ?? [];

  return (
    <div>
      <Link
        to="/topics"
        className="text-sm font-medium text-[var(--muted)] hover:text-[var(--fg)]"
      >
        ← Topics
      </Link>

      <header className="mt-4 rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8">
        <p className="text-sm font-medium text-[var(--accent)]">Topic</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[var(--fg)] sm:text-3xl">
          {data.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          {data.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
            {questions.length} questions
          </span>
          {/* TODO later (not Challenge 4): start a practice session */}
          <Button type="button" disabled>
            Start practice
          </Button>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight text-[var(--fg)]">Questions</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Preview what you’ll practice. Submitting answers comes next.
        </p>

        {questions.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--muted)]">No questions in this topic yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-[var(--line)] rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]">
            {questions.map((question) => (
              <QuestionRow key={question.id} question={question} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
