import { useQuery } from '@tanstack/react-query';
import { fetchTopics } from './api';
import { Link } from 'react-router-dom';

export function TopicsList() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['topics'],
    queryFn: fetchTopics,
  });

  if (isPending) {
    return <p className="text-sm text-[var(--muted)]">Loading topics…</p>;
  }

  if (isError) {
    return (
      <p role="alert" className="text-sm text-[var(--danger)]">
        {error?.message ?? 'Failed to load topics'}
      </p>
    );
  }

  const topics = data ?? [];

  if (topics.length === 0) {
    return <p className="text-sm text-[var(--muted)]">No topics yet.</p>;
  }

  return (
    <ul className="grid gap-3">
      {topics.map((topic) => (
        <li
          key={topic.id}
          className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 shadow-[var(--shadow)] transition-colors hover:border-[#c9d4ea]"
        >
          <Link to={`/topics/${topic.id}`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold tracking-tight text-[var(--fg)]">
                {topic.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                {topic.description}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]">
              {topic._count?.questions ?? 0} questions
            </span>
          </div></Link>
        </li>
      ))}
    </ul>
  );
}
