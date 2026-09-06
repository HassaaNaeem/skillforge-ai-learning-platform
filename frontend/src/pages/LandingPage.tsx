import { ButtonLink } from '../components/ui/Button';
import { TopicIcon } from '../components/TopicIcon';

const TRACKS = [
  { slug: 'javascript', name: 'JavaScript' },
  { slug: 'typescript', name: 'TypeScript' },
  { slug: 'react', name: 'React' },
  { slug: 'nodejs', name: 'Node.js' },
  { slug: 'postgresql', name: 'PostgreSQL' },
  { slug: 'git', name: 'Git' },
] as const;

function ProductMock() {
  return (
    <div
      className="overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)]"
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
        </div>
        <p className="text-xs font-medium text-[var(--muted)]">Practice session · React</p>
      </div>
      <div className="grid gap-0 md:grid-cols-[200px_1fr]">
        <aside className="hidden border-r border-[var(--line)] bg-[var(--bg)] p-4 md:block">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Topic</p>
          <div className="mt-2 flex items-center gap-2">
            <TopicIcon slug="react" name="React" size="sm" />
            <p className="text-sm font-semibold text-[var(--fg)]">React</p>
          </div>
          <p className="mt-4 text-xs text-[var(--muted)]">Question 2 of 8</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--line)]">
            <div className="h-full w-1/4 rounded-full bg-[var(--accent)]" />
          </div>
        </aside>
        <div className="p-5 sm:p-6">
          <p className="text-xs font-medium text-[var(--accent)]">Medium · Hooks</p>
          <p className="mt-2 text-base font-semibold leading-snug text-[var(--fg)]">
            When should you extract state into a custom hook?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Explain the signal you look for in a component, and what you would move vs leave
            local.
          </p>
          <div className="mt-5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] px-3 py-3 text-sm text-[var(--muted)]">
            When two components share the same setup logic…
          </div>
          <div className="mt-4 flex justify-end">
            <span className="sf-btn-primary rounded-[var(--radius)] bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white">
              Submit answer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div>
      <section className="border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="text-sm font-medium text-[var(--accent)]">Developer interview practice</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--fg)] sm:text-5xl sm:leading-[1.1]">
              Practice interviews that build real skill.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)]">
              SkillForge is a workspace for written interview answers. You pick a track—JavaScript,
              TypeScript, React, Node, SQL, Git—then write the same kind of explanation you would
              give a hiring manager. Not flashcards. Not a leaderboard of trivia.
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
              Guests can run a full session in the browser. Create an account when you want history
              across days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/topics">Browse topics</ButtonLink>
              <ButtonLink to="/register" variant="secondary">
                Create account
              </ButtonLink>
            </div>
          </div>
          <ProductMock />
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-sm font-medium text-[var(--muted)]">Tracks you can start today</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {TRACKS.map((track) => (
              <li
                key={track.slug}
                className="flex items-center gap-2.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-3 shadow-[var(--shadow)]"
              >
                <TopicIcon slug={track.slug} name={track.name} size="sm" />
                <span className="text-sm font-medium text-[var(--fg)]">{track.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
          Built for how developers actually prepare
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Most “interview apps” show you the answer key. SkillForge hides the list, asks you to
          write, and stores the attempt. That is closer to a real loop: think, explain, review later.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold text-[var(--fg)]">Focused tracks</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Six starter topics with easy, medium, and hard prompts. Each one is scoped so a
              session fits in a commute or a lunch break.
            </p>
          </article>
          <article className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold text-[var(--fg)]">Written answers</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              You type like you are pairing. We save the text now. Structured AI scoring is a later
              milestone—your practice still counts today.
            </p>
          </article>
          <article className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold text-[var(--fg)]">Guest or account</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Anonymous sessions live in Redis for a limited time. Signed-in sessions live in
              Postgres so you can refresh and continue.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">How it works</h2>
          <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
            Three steps. No question dump before you commit to a session.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            <li className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] p-5">
              <p className="text-xs font-semibold text-[var(--accent)]">01</p>
              <p className="mt-2 font-semibold text-[var(--fg)]">Pick a track and difficulty</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                Open JavaScript, React, or another track. Choose easy, medium, or hard. You see
                what the track is about—not the prompts.
              </p>
            </li>
            <li className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] p-5">
              <p className="text-xs font-semibold text-[var(--accent)]">02</p>
              <p className="mt-2 font-semibold text-[var(--fg)]">Write your answer</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                One question at a time. Explain tradeoffs the way you would on a call, then submit
                and move on.
              </p>
            </li>
            <li className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] p-5">
              <p className="text-xs font-semibold text-[var(--accent)]">03</p>
              <p className="mt-2 font-semibold text-[var(--fg)]">Keep the session</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                Guests keep the tab. Accounts can refresh the URL. Feedback and dashboards come
                next on the roadmap.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] px-6 py-10 shadow-[var(--shadow)] sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
            Ready to practice?
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
            Open the track list, pick something you have used at work, and write one honest answer.
            That is more useful than rereading notes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink to="/topics">View topics</ButtonLink>
            <ButtonLink to="/login" variant="secondary">
              Sign in
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
