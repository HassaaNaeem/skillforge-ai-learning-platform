import { ButtonLink } from '../components/ui/Button';

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
          <p className="mt-2 text-sm font-semibold text-[var(--fg)]">React</p>
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
            <span className="rounded-[var(--radius)] bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white">
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
              Work through topic-based questions, run timed practice sessions, and keep a history
              of what you actually improve—not another generic quiz dump.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/topics">Browse topics</ButtonLink>
              <ButtonLink to="/login" variant="secondary">
                Sign in
              </ButtonLink>
            </div>
          </div>
          <ProductMock />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
          Built for how developers actually prepare
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          SkillForge is a practice workspace, not a content dump.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold text-[var(--fg)]">Topics</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Curated JavaScript, React, Node, and more—each with questions at a clear difficulty.
            </p>
          </article>
          <article className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold text-[var(--fg)]">Practice sessions</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Start as a guest or signed-in user. Answers persist for the path you chose.
            </p>
          </article>
          <article className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
            <p className="text-sm font-semibold text-[var(--fg)]">Feedback and history</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              See gaps across sessions so the next hour of practice is deliberate.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">How it works</h2>
          <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
            Three steps from topic to feedback.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            <li className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] p-5">
              <p className="text-xs font-semibold text-[var(--accent)]">01</p>
              <p className="mt-2 font-semibold text-[var(--fg)]">Pick a topic</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                Choose a track and difficulty. Questions stay scoped to that session.
              </p>
            </li>
            <li className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] p-5">
              <p className="text-xs font-semibold text-[var(--accent)]">02</p>
              <p className="mt-2 font-semibold text-[var(--fg)]">Write your answer</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                Practice like an interview: explain tradeoffs, not just the happy path.
              </p>
            </li>
            <li className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg)] p-5">
              <p className="text-xs font-semibold text-[var(--accent)]">03</p>
              <p className="mt-2 font-semibold text-[var(--fg)]">Review and repeat</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                Keep history when you sign in. Guests can still run a full session.
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
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            Browse topics now, or sign in to keep your session history.
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
