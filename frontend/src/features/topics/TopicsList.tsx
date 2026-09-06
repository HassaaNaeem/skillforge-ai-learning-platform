import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchTopics } from './api';
import { TopicIcon } from '../../components/TopicIcon';
import { getTopicBlurb } from '../../lib/topicCopy';

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
    <ul className="grid gap-4 sm:grid-cols-2">
      {topics.map((topic) => {
        const blurb = getTopicBlurb(topic.slug, topic.name);
        return (
          <li key={topic.id}>
            <Link
              to={`/topics/${topic.id}`}
              className="flex h-full flex-col rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-colors hover:border-[#c9d4ea]"
            >
              <div className="flex items-start gap-3">
                <TopicIcon slug={topic.slug} name={topic.name} />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-[var(--fg)]">
                    {topic.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                    {topic.description}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--fg)]/80">{blurb.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {blurb.focus.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[var(--bg)] px-2.5 py-1 text-xs text-[var(--muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-medium text-[var(--accent)]">
                {topic._count?.questions ?? 0} questions · Open track →
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
