import { LanguageKey, TopicItem, TopicSection, TopicLevel } from './types';

export type TopicDraft = {
  id: string;
  title: string;
  summary: string;
  level: TopicLevel;
  duration: string;
  points: string[];
  theory: string[];
  practicalTitle: string;
  practicalGoal: string;
  practicalSteps: string[];
  starterCode: string;
  expectedResult: string[];
  challenge: string[];
  references: string[];
  quizQuestion: string;
  quizAnswer: string;
  quizOptions?: string[];
  quizExplanation?: string;
  prerequisites?: string[];
};

export const createTopic = ({
  practicalTitle,
  practicalGoal,
  practicalSteps,
  starterCode,
  expectedResult,
  quizQuestion,
  quizAnswer,
  quizOptions,
  quizExplanation,
  ...topic
}: TopicDraft): TopicItem => ({
  ...topic,
  practical: {
    title: practicalTitle,
    goal: practicalGoal,
    steps: practicalSteps,
    starterCode,
    expectedResult,
  },
  quiz: [
    {
      question: quizQuestion,
      answer: quizAnswer,
      options: quizOptions,
      explanation: quizExplanation,
    },
  ],
});

export type CurriculumTopicDraft = {
  id: string;
  title: string;
  summary: string;
  level: TopicLevel;
  duration: string;
  focus: string[];
  exercise: string;
  starterCode: string;
  expectedResult: string;
  challenge: string;
  references: string[];
  quizQuestion: string;
  quizAnswer: string;
  quizOptions: string[];
  quizExplanation: string;
  prerequisites?: string[];
};

// Keeps expansion files concise while preserving a complete lesson contract.
export const createCurriculumTopic = ({
  id,
  title,
  summary,
  level,
  duration,
  focus,
  exercise,
  starterCode,
  expectedResult,
  challenge,
  references,
  quizQuestion,
  quizAnswer,
  quizOptions,
  quizExplanation,
  prerequisites,
}: CurriculumTopicDraft): TopicItem =>
  createTopic({
    id,
    title,
    summary,
    level,
    duration,
    points: focus,
    theory: [
      `${title} is useful because it gives you a repeatable way to solve a real programming problem.`,
      `${summary} Focus on the relationship between the inputs, the operation, and the result.`,
    ],
    practicalTitle: exercise,
    practicalGoal: `Apply ${title.toLowerCase()} in a small offline exercise.`,
    practicalSteps: [
      'Read the starter example and identify its input and output.',
      'Change the example to solve the exercise goal.',
      'Test one normal case and one edge case.',
    ],
    starterCode,
    expectedResult: [expectedResult],
    challenge: [challenge],
    references,
    quizQuestion,
    quizAnswer,
    quizOptions,
    quizExplanation,
    prerequisites,
  });

export const createSection = (section: TopicSection): TopicSection => section;

export const LANGUAGE_ORDER: LanguageKey[] = [
  'html',
  'css',
  'javascript',
  'typescript',
  'react',
  'bootstrap',
  'python',
  'nodejs',
  'php',
  'ruby',
  'go',
  'sql',
  'c',
  'cpp',
  'rust',
  'java',
  'csharp',
  'kotlin',
  'swift',
  'dartflutter',
  'ruby',
];

export const FEATURED_LANGUAGE_KEYS: LanguageKey[] = ['html', 'css', 'javascript'];

export const EXPANDED_LANGUAGE_KEYS: LanguageKey[] = [
  'python',
  'nodejs',
  'php',
  'ruby',
  'go',
  'sql',
  'c',
  'cpp',
  'rust',
  'java',
  'csharp',
  'kotlin',
  'swift',
  'dartflutter',
  'ruby',
];


type PracticeExpansionConfig = {
  key: LanguageKey;
  label: string;
  toolkit: string;
  productionFocus: string;
  debuggingFocus: string;
  capstoneFocus: string;
  starterCode: string;
};

export const createPracticeExpansionSection = ({
  key,
  label,
  toolkit,
  productionFocus,
  debuggingFocus,
  capstoneFocus,
  starterCode,
}: PracticeExpansionConfig): TopicSection =>
  createSection({
    id: `${key}-applied-practice`,
    title: `${label} Applied Practice`,
    subtitle: `Production checks, debugging habits, and a final ${label} workflow`,
    topics: [
      createTopic({
        id: `${key}-production-checklist`,
        title: `${label} Production Checklist`,
        summary: `Turn ${label} knowledge into a repeatable quality checklist.`,
        level: 'Intermediate',
        duration: '1h 20m',
        points: [
          `Identify the most important ${label} quality checks`,
          `Review structure, naming, and maintainability`,
          `Prepare work so another developer can understand it quickly`,
        ],
        theory: [
          `A production checklist converts scattered ${label} skills into a repeatable review process before shipping work.`,
          `${productionFocus} should be checked deliberately instead of only after something breaks.`,
        ],
        practicalTitle: `Audit a ${label} feature`,
        practicalGoal: `Review a small ${label} implementation and improve the parts that create future maintenance risk.`,
        practicalSteps: [
          `Read the feature once without editing it.`,
          `List structure, naming, and behavior issues.`,
          `Apply the smallest clear fixes and retest the result.`,
        ],
        starterCode,
        expectedResult: [
          `The feature is easier to scan and explain.`,
          `The final version keeps behavior stable while improving quality.`,
        ],
        challenge: [
          `Create your own 6-point ${label} review checklist.`,
          `Use the checklist on one previous topic from this roadmap.`,
        ],
        references: [`${label} quality review`, toolkit, productionFocus],
        quizQuestion: `Why should ${label} work have a checklist before shipping?`,
        quizAnswer:
          'A checklist makes quality repeatable and catches structure, behavior, and maintenance issues before release.',
      }),
      createTopic({
        id: `${key}-debugging-workflow`,
        title: `${label} Debugging Workflow`,
        summary: `Use a calm, step-by-step debugging process for ${label} problems.`,
        level: 'Intermediate',
        duration: '1h 30m',
        points: [
          `Reproduce the issue before changing code`,
          `Separate symptoms from root causes`,
          `Verify each fix with a focused retest`,
        ],
        theory: [
          `Good debugging starts by making the problem reproducible. Guessing too early usually creates unrelated changes.`,
          `${debuggingFocus} gives you a practical place to inspect first when ${label} behavior looks wrong.`,
        ],
        practicalTitle: `Debug a broken ${label} example`,
        practicalGoal: `Find one visible bug, explain why it happens, and fix it without changing unrelated behavior.`,
        practicalSteps: [
          `Write the exact failure in one sentence.`,
          `Inspect inputs, outputs, and the smallest affected block.`,
          `Apply one fix and confirm the result.`,
        ],
        starterCode,
        expectedResult: [
          `The issue has a clear cause instead of a guessed fix.`,
          `The retest proves the changed behavior works.`,
        ],
        challenge: [
          `Document the bug, root cause, and final fix in three bullets.`,
          `Create one extra edge case and test it.`,
        ],
        references: [`${label} debugging`, debuggingFocus, 'Focused retesting'],
        quizQuestion: 'What should you do before editing code during debugging?',
        quizAnswer:
          'Reproduce the issue and identify the smallest affected area so the fix stays focused.',
      }),
      createTopic({
        id: `${key}-capstone-review`,
        title: `${label} Capstone Review`,
        summary: `Finish a complete ${label} task and review it like a real project handoff.`,
        level: 'Advanced',
        duration: '2h 10m',
        points: [
          `Plan the final output before implementation`,
          `Connect earlier roadmap concepts into one workflow`,
          `Review usability, correctness, and maintainability`,
        ],
        theory: [
          `A capstone proves that individual topics can work together in one coherent feature.`,
          `${capstoneFocus} helps the final output feel complete instead of looking like separate practice snippets.`,
        ],
        practicalTitle: `Build a ${label} mini capstone`,
        practicalGoal: `Create a small final project that combines structure, behavior, and review discipline.`,
        practicalSteps: [
          `Define the target user and expected result.`,
          `Build the smallest complete version first.`,
          `Run a final review pass and note the improvements.`,
        ],
        starterCode,
        expectedResult: [
          `The capstone works as one complete deliverable.`,
          `The final review notes what was improved and why.`,
        ],
        challenge: [
          `Add one accessibility, performance, or reliability improvement.`,
          `Explain the final project to another learner in five sentences.`,
        ],
        references: [`${label} capstone`, capstoneFocus, 'Project handoff'],
        quizQuestion: 'What makes a capstone different from a normal exercise?',
        quizAnswer:
          'A capstone combines multiple concepts into a complete project and includes a final quality review.',
      }),
    ],
  });

export const PRACTICE_EXPANSION_SECTIONS: Record<LanguageKey, TopicSection> = {
  html: createPracticeExpansionSection({
    key: 'html',
    label: 'HTML',
    toolkit: 'Semantic tags, forms, metadata, and accessibility landmarks',
    productionFocus: 'Semantics, alt text, form labels, heading order, and valid document structure',
    debuggingFocus: 'Broken nesting, missing attributes, invalid paths, and inaccessible form controls',
    capstoneFocus: 'A multi-section page with navigation, forms, media, metadata, and accessibility checks',
    starterCode:
      '<main>\n  <article>\n    <h1>Course Overview</h1>\n    <p>Build semantic pages with accessible structure.</p>\n  </article>\n</main>',
  }),
  css: createPracticeExpansionSection({
    key: 'css',
    label: 'CSS',
    toolkit: 'Selectors, layout, responsive rules, custom properties, and component styling',
    productionFocus: 'Spacing consistency, responsive layout, readable contrast, and reusable class naming',
    debuggingFocus: 'Cascade order, specificity, flex/grid sizing, overflow, and media query conflicts',
    capstoneFocus: 'A responsive interface with stable spacing, component states, and design tokens',
    starterCode:
      ':root {\n  --space-4: 1rem;\n  --brand: #2563eb;\n}\n\n.card {\n  padding: var(--space-4);\n}',
  }),
  javascript: createPracticeExpansionSection({
    key: 'javascript',
    label: 'JavaScript',
    toolkit: 'Functions, arrays, objects, async flows, modules, and DOM behavior',
    productionFocus: 'Clear function boundaries, safe data handling, loading states, and predictable errors',
    debuggingFocus: 'Console traces, input validation, promise failures, event listeners, and stale state',
    capstoneFocus: 'A small interactive feature with data flow, async handling, and user feedback',
    starterCode:
      'async function loadLessons() {\n  const response = await fetch("/lessons.json");\n  return response.json();\n}',
  }),
  python: createPracticeExpansionSection({
    key: 'python',
    label: 'Python',
    toolkit: 'Functions, collections, files, modules, virtual environments, and scripts',
    productionFocus: 'Readable functions, input validation, file handling, and predictable script output',
    debuggingFocus: 'Tracebacks, variable inspection, type mismatches, file paths, and boundary cases',
    capstoneFocus: 'A command-line utility that reads input, transforms data, and reports results',
    starterCode:
      'def summarize_scores(scores):\n    total = sum(scores)\n    return total / len(scores)\n\nprint(summarize_scores([8, 9, 10]))',
  }),
  react: createPracticeExpansionSection({
    key: 'react',
    label: 'React',
    toolkit: 'Components, props, hooks, derived state, effects, and rendering patterns',
    productionFocus: 'Component boundaries, stable props, controlled state, loading UI, and reusable views',
    debuggingFocus: 'Render loops, stale closures, dependency arrays, prop shape, and conditional rendering',
    capstoneFocus: 'A feature screen with reusable components, state updates, and clear empty/loading states',
    starterCode:
      'function LessonCard({ title, progress }) {\n  return <article>{title} - {progress}%</article>;\n}',
  }),
  sql: createPracticeExpansionSection({
    key: 'sql',
    label: 'SQL',
    toolkit: 'Tables, joins, filters, grouping, indexes, constraints, and query planning',
    productionFocus: 'Correct joins, explicit filters, safe aggregation, indexes, and readable query formatting',
    debuggingFocus: 'Unexpected row counts, null handling, join type mistakes, and grouping errors',
    capstoneFocus: 'A reporting query set that answers clear product questions from related tables',
    starterCode:
      'SELECT users.name, COUNT(lessons.id) AS lesson_count\nFROM users\nLEFT JOIN lessons ON lessons.user_id = users.id\nGROUP BY users.id;',
  }),
  nodejs: createPracticeExpansionSection({
    key: 'nodejs',
    label: 'Node.js',
    toolkit: 'Modules, Express routes, middleware, async handlers, validation, and API responses',
    productionFocus: 'Route structure, request validation, error handling, environment values, and response shape',
    debuggingFocus: 'Request logs, rejected promises, middleware order, status codes, and missing env config',
    capstoneFocus: 'A small API with routes, validation, async data access, and consistent error responses',
    starterCode:
      'app.get("/api/lessons", async (req, res, next) => {\n  try {\n    res.json({ data: [] });\n  } catch (error) {\n    next(error);\n  }\n});',
  }),
  bootstrap: createPracticeExpansionSection({
    key: 'bootstrap',
    label: 'Bootstrap',
    toolkit: 'Grid, utilities, components, responsive breakpoints, forms, and theme overrides',
    productionFocus: 'Responsive grid choices, accessible components, utility consistency, and branded overrides',
    debuggingFocus: 'Breakpoint conflicts, nested rows, spacing utilities, component states, and override order',
    capstoneFocus: 'A polished responsive page that combines grid, components, forms, and custom theme rules',
    starterCode:
      '<section class="container py-5">\n  <div class="row g-4">\n    <div class="col-md-6">Content</div>\n  </div>\n</section>',
  }),
  typescript: createPracticeExpansionSection({ key: 'typescript', label: 'TypeScript', toolkit: 'Types, compiler configuration, runtime boundaries, and tests', productionFocus: 'Strict contracts, safe external data, readable types, and build feedback', debuggingFocus: 'Compiler errors, narrowing failures, stale declarations, and runtime input', capstoneFocus: 'A typed data feature with validated boundaries and tested state', starterCode: 'type Status = \'ready\' | \'done\';\nconst status: Status = \'ready\';' }),
  java: createPracticeExpansionSection({ key: 'java', label: 'Java', toolkit: 'Classes, collections, JVM behavior, concurrency, and tests', productionFocus: 'Object boundaries, resource handling, logs, tests, and predictable builds', debuggingFocus: 'Stack traces, nulls, concurrency hazards, and data access failures', capstoneFocus: 'A tested Java service with clear models, persistence, and lifecycle handling', starterCode: 'final class Lesson {\n  private final String title;\n  Lesson(String title) { this.title = title; }\n}' }),
  c: createPracticeExpansionSection({ key: 'c', label: 'C', toolkit: 'Pointers, ownership, files, warnings, and modular builds', productionFocus: 'Bounds checks, ownership, compiler warnings, and explicit error handling', debuggingFocus: 'Invalid access, leaks, format mismatches, and lifetime errors', capstoneFocus: 'A modular terminal program with files, structures, and memory checks', starterCode: '#include <stdio.h>\nint main(void) { puts("ready"); return 0; }' }),
  cpp: createPracticeExpansionSection({ key: 'cpp', label: 'C++', toolkit: 'STL, RAII, ownership, concurrency, CMake, and tests', productionFocus: 'RAII, value semantics, warnings, tests, and explicit ownership', debuggingFocus: 'Lifetime bugs, exceptions, data races, and unexpected copies', capstoneFocus: 'A modern console application with STL, persistence, and tested boundaries', starterCode: '#include <string>\nconst std::string status = "ready";' }),
  csharp: createPracticeExpansionSection({ key: 'csharp', label: 'C#', toolkit: '.NET projects, collections, LINQ, async tasks, and tests', productionFocus: 'Nullable handling, validation, logging, and predictable .NET builds', debuggingFocus: 'Exceptions, async failures, nullability warnings, and data access', capstoneFocus: 'A small management service with validation, persistence, and tests', starterCode: 'var lessons = new List<string> { "C#" };\nConsole.WriteLine(lessons.Count);' }),
  php: createPracticeExpansionSection({ key: 'php', label: 'PHP', toolkit: 'HTTP forms, sessions, PDO, secure validation, and APIs', productionFocus: 'Input validation, output escaping, secrets, and predictable deployment', debuggingFocus: 'Request data, session state, SQL errors, and configuration', capstoneFocus: 'A secure CRUD-style project with persistence and clear structure', starterCode: '<?php\n$lessons = ["PHP"];\necho count($lessons);' }),
  go: createPracticeExpansionSection({ key: 'go', label: 'Go', toolkit: 'Packages, errors, HTTP, goroutines, channels, and tests', productionFocus: 'Context cancellation, bounded concurrency, logs, and graceful shutdown', debuggingFocus: 'Returned errors, races, goroutine leaks, and request state', capstoneFocus: 'A concurrent service with packages, tests, and shutdown handling', starterCode: 'package main\n\nimport "fmt"\n\nfunc main() { fmt.Println("ready") }' }),
  rust: createPracticeExpansionSection({ key: 'rust', label: 'Rust', toolkit: 'Ownership, Result, traits, iterators, Cargo, and safe concurrency', productionFocus: 'Explicit errors, ownership, tests, dependency review, and safe boundaries', debuggingFocus: 'Borrow checker messages, Result paths, lifetimes, and task behavior', capstoneFocus: 'A CLI or service using ownership, traits, modules, and safe concurrency', starterCode: 'fn main() {\n    let lessons = vec!["Rust"];\n    println!("{}", lessons.len());\n}' }),
  kotlin: createPracticeExpansionSection({ key: 'kotlin', label: 'Kotlin', toolkit: 'Null safety, data classes, collections, coroutines, and tests', productionFocus: 'Validated models, structured concurrency, clear modules, and tests', debuggingFocus: 'Nullability, coroutine cancellation, exceptions, and JVM behavior', capstoneFocus: 'A tested Kotlin task manager with validation, local persistence, and coroutines', starterCode: 'data class Task(val title: String, val done: Boolean = false)\nprintln(Task("Learn Kotlin"))' }),
  swift: createPracticeExpansionSection({ key: 'swift', label: 'Swift', toolkit: 'Optionals, value semantics, protocols, Codable, concurrency, and tests', productionFocus: 'Explicit errors, safe references, protocol boundaries, and deterministic tests', debuggingFocus: 'Optional failures, retain cycles, task cancellation, and decoding errors', capstoneFocus: 'A tested Swift data app with Codable models and async boundaries', starterCode: 'struct Task { let title: String; var done = false }\nprint(Task(title: "Learn Swift"))' }),
  dartflutter: createPracticeExpansionSection({ key: 'dartflutter', label: 'Dart / Flutter', toolkit: 'Dart collections, widgets, state, navigation, persistence, and tests', productionFocus: 'Stable rebuild boundaries, explicit state, local repositories, and release checks', debuggingFocus: 'Async state, widget lifecycle, rebuilds, layout constraints, and platform behavior', capstoneFocus: 'An offline-friendly Flutter learning app with forms, navigation, state, and tests', starterCode: 'class Task { final String title; Task(this.title); }\nprint(Task("Learn Flutter").title);' }),
  ruby: createPracticeExpansionSection({ key: 'ruby', label: 'Ruby', toolkit: 'Objects, Enumerable, modules, persistence, APIs, and tests', productionFocus: 'Clear service boundaries, input validation, logs, tests, and reproducible dependencies', debuggingFocus: 'Exceptions, file state, dynamic behavior, and slow collection work', capstoneFocus: 'A tested Ruby CLI or service with OOP, modules, persistence, and API data', starterCode: 'task = { title: "Learn Ruby", done: false }\nputs task[:title]' }),
};

export const addExpansionHours = (totalHours: string) => {
  const currentHours = Number.parseInt(totalHours, 10);
  return Number.isNaN(currentHours) ? totalHours : `${currentHours + 5}h`;
};

export const LEVELS: TopicLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
