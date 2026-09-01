import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear in dependency order so re-running seed is safe.
  await prisma.question.deleteMany();
  await prisma.topic.deleteMany();

  const topics = [
    {
      name: 'JavaScript',
      slug: 'javascript',
      description: 'Core JavaScript concepts for modern web development.',
      questions: {
        create: [
          {
            type: 'mcq',
            difficulty: 'easy',
            prompt: 'What is the difference between let and const?',
          },
          {
            type: 'written',
            difficulty: 'medium',
            prompt: 'Explain closures in JavaScript with an example.',
          },
          {
            type: 'mcq',
            difficulty: 'hard',
            prompt: 'What is the event loop, and how do microtasks differ from macrotasks?',
          },
        ],
      },
    },
    {
      name: 'TypeScript',
      slug: 'typescript',
      description: 'Static typing, narrowing, and TypeScript patterns for safer code.',
      questions: {
        create: [
          {
            type: 'mcq',
            difficulty: 'easy',
            prompt: 'What is the difference between interface and type in TypeScript?',
          },
          {
            type: 'written',
            difficulty: 'medium',
            prompt: 'Explain type narrowing with a typeof or in check.',
          },
        ],
      },
    },
    {
      name: 'React',
      slug: 'react',
      description: 'Component model, hooks, rendering, and common React interview topics.',
      questions: {
        create: [
          {
            type: 'mcq',
            difficulty: 'easy',
            prompt: 'What problem does useEffect solve in React?',
          },
          {
            type: 'written',
            difficulty: 'medium',
            prompt: 'Explain the difference between state and props.',
          },
          {
            type: 'interview',
            difficulty: 'hard',
            prompt: 'When would you lift state up, and why?',
          },
        ],
      },
    },
    {
      name: 'Node.js',
      slug: 'nodejs',
      description: 'Server-side JavaScript, modules, async I/O, and Express fundamentals.',
      questions: {
        create: [
          {
            type: 'mcq',
            difficulty: 'easy',
            prompt: 'What is the purpose of package.json in a Node.js project?',
          },
          {
            type: 'written',
            difficulty: 'medium',
            prompt: 'Explain how Node.js handles non-blocking I/O.',
          },
        ],
      },
    },
    {
      name: 'PostgreSQL',
      slug: 'postgresql',
      description: 'Relational database concepts, SQL, indexes, and query basics.',
      questions: {
        create: [
          {
            type: 'mcq',
            difficulty: 'easy',
            prompt: 'What is a primary key?',
          },
          {
            type: 'written',
            difficulty: 'medium',
            prompt: 'Explain the difference between INNER JOIN and LEFT JOIN.',
          },
          {
            type: 'written',
            difficulty: 'hard',
            prompt: 'When would you add an index to a column?',
          },
        ],
      },
    },
    {
      name: 'Git',
      slug: 'git',
      description: 'Version control workflows, branching, and collaboration basics.',
      questions: {
        create: [
          {
            type: 'mcq',
            difficulty: 'easy',
            prompt: 'What is the difference between git commit and git push?',
          },
          {
            type: 'written',
            difficulty: 'medium',
            prompt: 'Explain what a merge conflict is and how you resolve one.',
          },
        ],
      },
    },
  ];

  for (const topic of topics) {
    await prisma.topic.create({ data: topic });
  }

  const topicCount = await prisma.topic.count();
  const questionCount = await prisma.question.count();
  console.log(`Seeded ${topicCount} topics and ${questionCount} questions`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
