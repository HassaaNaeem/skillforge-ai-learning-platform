import { Link, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PageHeader } from '../components/ui/PageHeader';
import { FocusQueue } from '../features/dashboard/FocusQueue';
import { getDashboard } from '../features/dashboard/api';
import { useAppSelector } from '../store/hooks';

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-[var(--fg)]">{value}</p>
    </div>
  );
}

export function DashboardPage() {
  const { user, initialized } = useAppSelector((state) => state.auth);
  const dashboardQuery = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
    enabled: !!user,
  });

  if (!initialized) {
    return <p className="text-sm text-[var(--muted)]">Loading dashboard…</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (dashboardQuery.isPending) {
    return <p className="text-sm text-[var(--muted)]">Loading dashboard…</p>;
  }

  if (dashboardQuery.isError || !dashboardQuery.data) {
    return (
      <p role="alert" className="text-sm text-[var(--danger)]">
        Could not load your dashboard.
      </p>
    );
  }

  const { summary, sessions, chart, focusTopics } = dashboardQuery.data;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your scored practice over time, plus a queue you can reorder for what to study next."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Sessions" value={String(summary.sessionCount)} />
        <Stat label="Answers" value={String(summary.answerCount)} />
        <Stat
          label="Average score"
          value={summary.averageScore === null ? '—' : String(summary.averageScore)}
        />
        <Stat label="Pass rate" value={summary.passRate === null ? '—' : `${summary.passRate}%`} />
      </div>

      <section className="mt-6 rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
        <h2 className="text-lg font-semibold text-[var(--fg)]">Score over time</h2>
        {chart.length ? (
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chart}>
                <CartesianGrid stroke="#e4e7ec" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: '#5b6578', fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#5b6578', fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="averageScore"
                  stroke="#155eef"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-3 text-sm text-[var(--muted)]">
            Submit a few scored answers to see a trend. Guests do not appear here — only signed-in
            sessions.
          </p>
        )}
      </section>

      <div className="mt-6">
        <FocusQueue topics={focusTopics} />
      </div>

      <section className="mt-6 rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
        <h2 className="text-lg font-semibold text-[var(--fg)]">Recent sessions</h2>
        {sessions.length ? (
          <ul className="mt-4 divide-y divide-[var(--line)]">
            {sessions.slice(0, 8).map((session) => (
              <li
                key={session.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--fg)]">{session.topicName}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {new Date(session.startedAt).toLocaleDateString()} · {session.difficulty} ·{' '}
                    {session.answerCount} answers
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[var(--muted)]">
                    {session.averageScore === null ? 'Pending' : `Avg ${session.averageScore}`}
                  </span>
                  <Link
                    to={`/practice/sessions/${session.id}`}
                    state={{ topicId: session.topicId }}
                    className="text-sm font-medium text-[var(--accent)]"
                  >
                    Open
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-[var(--muted)]">
            No signed-in sessions yet.{' '}
            <Link to="/topics" className="font-medium text-[var(--accent)]">
              Start a track
            </Link>
            .
          </p>
        )}
      </section>
    </div>
  );
}
