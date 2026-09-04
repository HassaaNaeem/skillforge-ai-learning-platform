import { useQuery } from '@tanstack/react-query';
import { fetchTopics } from './api';



export function TopicsList() {
  const {data, isPending, isError, error} = useQuery({
    queryKey:['topcis'],
    queryFn: fetchTopics
  })

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
    <ul className="divide-y divide-[var(--line)] border border-[var(--line)] bg-[var(--surface)]">
      {topics.map((topic) => (
        <li key={topic.id} className="px-4 py-4 sm:px-5">
          <div className="flex items-baseline justify-between gap-4">
            <h3
              className="text-base font-semibold tracking-tight text-[var(--fg)]"
              style={{ fontFamily: 'var(--display)' }}
            >
              {topic.name}
            </h3>
            <span className="shrink-0 text-xs text-[var(--muted)]">
              {topic._count?.questions ?? 0} questions
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
            {topic.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
