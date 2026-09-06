import { PageHeader } from '../components/ui/PageHeader';
import { TopicsList } from '../features/topics/TopicsList';

export function TopicsPage() {
  return (
    <div>
      <PageHeader
        title="Practice tracks"
        description="Each track is a small interview set: core language questions, then how you explain them out loud. Pick one, choose a difficulty, and start a session. Guests can practice immediately; signed-in users keep history."
      />
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
        You will not see the question list up front—that is the point. Treat it like a real screen:
        read the prompt, write a complete answer, then move on. Scoring and AI feedback come later
        in the product; today your answers are saved to the session.
      </p>
      <TopicsList />
    </div>
  );
}
