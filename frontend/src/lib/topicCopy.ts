type TopicBlurb = {
  summary: string;
  focus: string[];
  interview: string;
};

const COPY: Record<string, TopicBlurb> = {
  javascript: {
    summary:
      'The language behind almost every frontend interview. Practice how you explain the runtime, not just syntax you can look up.',
    focus: ['Scope and closures', 'The event loop', 'this, prototypes, and classes', 'Async vs sync code'],
    interview:
      'Interviewers want you to narrate tradeoffs: when let vs const matters, how closures capture values, and why a promise resolves before a timeout.',
  },
  typescript: {
    summary:
      'TypeScript shows up as “how do you keep a growing codebase honest?” Expect questions about types as documentation and as a compiler.',
    focus: ['interface vs type', 'Narrowing and guards', 'Generics in APIs', 'Useful utility types'],
    interview:
      'Talk through a real bug a type would have caught. Good answers include a small example, not a list of keywords.',
  },
  react: {
    summary:
      'React interviews test whether you understand rendering, state ownership, and effects—not whether you memorized hook names.',
    focus: ['State vs props', 'Effects and cleanup', 'Lifting state', 'Re-renders and keys'],
    interview:
      'Walk through a component as if you were pairing: what is local, what belongs higher, and what would break if you fetched in the wrong place.',
  },
  nodejs: {
    summary:
      'Node questions are about the server model: one thread, lots of I/O, and how you structure modules and errors.',
    focus: ['Event loop and I/O', 'package.json and modules', 'Streams and buffers', 'Express request flow'],
    interview:
      'Explain what happens when a request hits your API: parse, validate, hit I/O, respond. Mention what blocks the thread and what does not.',
  },
  postgresql: {
    summary:
      'SQL interviews reward clear thinking about data shape, joins, and when an index actually helps.',
    focus: ['Keys and constraints', 'JOIN types', 'Indexes and scans', 'Transactions at a high level'],
    interview:
      'Draw the tables in words. Say why INNER vs LEFT changes the result set, and when an index is wasted.',
  },
  git: {
    summary:
      'Git is less about commands and more about a safe workflow: commits, branches, and recovering from mistakes.',
    focus: ['Working tree vs staging', 'Branching and merging', 'Conflicts', 'Push vs commit'],
    interview:
      'Describe a conflict you resolved: what both sides changed, how you chose a resolution, and how you verified the build.',
  },
};

export function getTopicBlurb(slug?: string, name?: string): TopicBlurb {
  const key = (slug ?? name ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
  return (
    COPY[key] ?? {
      summary:
        'A focused practice track. You will write interview-style answers and save them to this session.',
      focus: ['Core concepts', 'Common pitfalls', 'How you explain tradeoffs'],
      interview:
        'Answer as if a teammate asked you to teach the idea in five minutes: definition, example, and when you would not use it.',
    }
  );
}
