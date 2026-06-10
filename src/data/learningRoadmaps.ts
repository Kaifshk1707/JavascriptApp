export type TopicLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type QuizItem = {
  question: string;
  answer: string;
};

export type PracticeLab = {
  title: string;
  goal: string;
  steps: string[];
  starterCode: string;
  expectedResult: string[];
};

export type TopicItem = {
  id: string;
  title: string;
  summary: string;
  level: TopicLevel;
  duration: string;
  points: string[];
  theory: string[];
  practical: PracticeLab;
  challenge: string[];
  references: string[];
  quiz: QuizItem[];
};

export type TopicSection = {
  id: string;
  title: string;
  subtitle: string;
  topics: TopicItem[];
};

export type LanguageKey =
  | 'html'
  | 'css'
  | 'javascript'
  | 'python'
  | 'react'
  | 'sql'
  | 'nodejs'
  | 'bootstrap';

export type LanguageRoadmap = {
  key: LanguageKey;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  totalHours: string;
  focusAreas: string[];
  recommendedProject: string;
  sections: TopicSection[];
};

type TopicDraft = {
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
};

const createTopic = ({
  practicalTitle,
  practicalGoal,
  practicalSteps,
  starterCode,
  expectedResult,
  quizQuestion,
  quizAnswer,
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
    },
  ],
});

const createSection = (section: TopicSection): TopicSection => section;

export const LANGUAGE_ORDER: LanguageKey[] = [
  'html',
  'css',
  'javascript',
  'python',
  'react',
  'sql',
  'nodejs',
  'bootstrap',
];

export const FEATURED_LANGUAGE_KEYS: LanguageKey[] = ['html', 'css', 'javascript'];

export const EXPANDED_LANGUAGE_KEYS: LanguageKey[] = [
  'python',
  'react',
  'sql',
  'nodejs',
  'bootstrap',
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

const createPracticeExpansionSection = ({
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

const PRACTICE_EXPANSION_SECTIONS: Record<LanguageKey, TopicSection> = {
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
};

const BASE_LEARNING_ROADMAPS: Record<LanguageKey, LanguageRoadmap> = {
  html: {
    key: 'html',
    title: 'HTML Learning Module',
    shortTitle: 'HTML',
    subtitle: 'Markup, semantics, forms, media, and production-ready page structure',
    description:
      'This HTML roadmap starts with document structure and steadily moves into semantic layout, forms, media, APIs, accessibility, and real page-building practice.',
    icon: 'logo-html5',
    color: '#F97316',
    totalHours: '34h',
    focusAreas: ['Page Structure', 'Forms', 'Semantic Layout', 'Accessibility'],
    recommendedProject:
      'Build a multi-page portfolio website with navigation, media, tables, forms, and accessibility checks.',
    sections: [
      createSection({
        id: 'html-foundation',
        title: 'HTML Foundation',
        subtitle: 'Document basics, editors, elements, and text structure',
        topics: [
          createTopic({
            id: 'html-home',
            title: 'HTML Home and Document Skeleton',
            summary: 'Learn how a browser reads and renders an HTML page.',
            level: 'Beginner',
            duration: '1h 15m',
            points: [
              'DOCTYPE, html, head, and body',
              'Page title, charset, and viewport',
              'Visible content versus metadata',
            ],
            theory: [
              'HTML gives a page its structure. A browser reads the markup from top to bottom and turns it into the DOM.',
              'The head contains metadata and page settings, while the body contains the content users actually see.',
            ],
            practicalTitle: 'Create your first HTML page',
            practicalGoal: 'Build a clean document skeleton that works on desktop and mobile.',
            practicalSteps: [
              'Start with a valid DOCTYPE.',
              'Add charset and viewport meta tags.',
              'Create a heading and supporting paragraph in the body.',
            ],
            starterCode:
              '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello Web</h1>\n    <p>My first HTML document.</p>\n  </body>\n</html>',
            expectedResult: [
              'The page opens with a visible heading and paragraph.',
              'The browser tab shows the correct title.',
            ],
            challenge: [
              'Change the page title to your name.',
              'Add two more paragraphs under the heading.',
            ],
            references: ['Document structure', 'Meta tags', 'Viewport basics'],
            quizQuestion: 'What is the main purpose of the head element?',
            quizAnswer: 'It stores metadata, document settings, and information that is not directly rendered as page content.',
          }),
          createTopic({
            id: 'html-introduction',
            title: 'Elements, Tags, Attributes, and Nesting',
            summary: 'Understand the core building blocks of HTML.',
            level: 'Beginner',
            duration: '1h 40m',
            points: [
              'Opening and closing tags',
              'Attributes and values',
              'Valid nesting and indentation',
            ],
            theory: [
              'An element usually includes an opening tag, content, and a closing tag. Some elements like img or br are void elements and do not wrap content.',
              'Proper nesting and indentation make your HTML easier to debug, maintain, and style later.',
            ],
            practicalTitle: 'Practice nested content blocks',
            practicalGoal: 'Build a small section using headings, paragraphs, and links with proper nesting.',
            practicalSteps: [
              'Create a section element.',
              'Add a heading and a paragraph with inline formatting.',
              'Add a link that points to an external site.',
            ],
            starterCode:
              '<section>\n  <h2>About This Page</h2>\n  <p>I enjoy building <strong>clean</strong> and <em>accessible</em> markup.</p>\n  <a href="https://example.com">Visit Example</a>\n</section>',
            expectedResult: [
              'The section renders with clear hierarchy.',
              'Inline emphasis appears correctly inside the paragraph.',
            ],
            challenge: [
              'Add an unordered list below the paragraph.',
              'Open the external link in a new tab.',
            ],
            references: ['Void elements', 'Attributes', 'Nesting rules'],
            quizQuestion: 'Why is the img element considered a void element?',
            quizAnswer: 'Because it does not contain inner content and does not need a closing tag.',
          }),
          createTopic({
            id: 'html-editors',
            title: 'Editors, File Paths, and Live Preview',
            summary: 'Set up a practical workflow for writing and previewing HTML.',
            level: 'Beginner',
            duration: '1h 10m',
            points: [
              'Project folders and naming',
              'Relative versus absolute paths',
              'Previewing pages in the browser',
            ],
            theory: [
              'A clear folder structure keeps images, stylesheets, and pages easy to maintain.',
              'Relative paths are used inside a project, while absolute URLs are used for full web addresses.',
            ],
            practicalTitle: 'Link local files correctly',
            practicalGoal: 'Connect a stylesheet and an image using relative paths.',
            practicalSteps: [
              'Create separate folders for styles and images.',
              'Link the stylesheet in the head.',
              'Add an image with a correct relative path.',
            ],
            starterCode:
              '<head>\n  <link rel="stylesheet" href="./styles/main.css" />\n</head>\n<body>\n  <img src="./images/profile.png" alt="Profile picture" />\n</body>',
            expectedResult: [
              'The stylesheet loads without a path error.',
              'The image renders instead of showing a broken icon.',
            ],
            challenge: [
              'Create two pages that link to each other.',
              'Add a basic navigation menu at the top of each page.',
            ],
            references: ['Relative paths', 'Project folders', 'Preview workflow'],
            quizQuestion: 'What is the first thing to check when an image does not load?',
            quizAnswer: 'Verify that the file path and file name exactly match the actual project files.',
          }),
          createTopic({
            id: 'html-text-basics',
            title: 'Headings, Paragraphs, Lists, and Links',
            summary: 'Create readable page content with the right structural elements.',
            level: 'Beginner',
            duration: '1h 45m',
            points: [
              'Heading hierarchy from h1 to h6',
              'Ordered and unordered lists',
              'Anchor links and navigation',
            ],
            theory: [
              'A clear heading hierarchy helps both users and search engines understand the page outline.',
              'Lists are more semantic and maintainable than manually typing repeated items with line breaks.',
            ],
            practicalTitle: 'Build an article outline',
            practicalGoal: 'Create a mini article with sections, lists, and internal links.',
            practicalSteps: [
              'Add a top-level h1 heading.',
              'Create at least two h2 sections.',
              'Build a table of contents that jumps to each section.',
            ],
            starterCode:
              '<h1>HTML Tutorial</h1>\n<ul>\n  <li><a href="#intro">Introduction</a></li>\n  <li><a href="#lists">Lists</a></li>\n</ul>\n<h2 id="intro">Introduction</h2>\n<p>HTML gives structure to a webpage.</p>',
            expectedResult: [
              'Clicking a table of contents link jumps to the matching section.',
              'The page has a visible content hierarchy.',
            ],
            challenge: [
              'Write a short article about your favorite hobby.',
              'Add one ordered list and one unordered list.',
            ],
            references: ['Headings', 'Anchors', 'List semantics'],
            quizQuestion: 'Why is heading order important?',
            quizAnswer: 'It creates a meaningful document outline and helps readability, accessibility, and SEO.',
          }),
        ],
      }),
      createSection({
        id: 'html-content',
        title: 'HTML Content and Inline Semantics',
        subtitle: 'Formatting, quotations, entities, colors, and reusable content patterns',
        topics: [
          createTopic({
            id: 'html-attributes',
            title: 'Global Attributes, IDs, Classes, and Inline Styles',
            summary: 'Control behavior, identify elements, and attach styles safely.',
            level: 'Beginner',
            duration: '1h 25m',
            points: [
              'id and class usage',
              'title and style attributes',
              'Reusable hooks for CSS and JavaScript',
            ],
            theory: [
              'Classes are reusable labels, while IDs are best used for unique elements or internal page anchors.',
              'Inline styles are useful for quick tests but should not replace maintainable CSS in real projects.',
            ],
            practicalTitle: 'Annotate and style a profile card',
            practicalGoal: 'Use global attributes to make a card easier to target and understand.',
            practicalSteps: [
              'Add an id and class to a card container.',
              'Use the title attribute on a text element.',
              'Apply one temporary inline style for a quick visual test.',
            ],
            starterCode:
              '<div id="profile-card" class="card" style="background:#fff3e8;padding:16px;">\n  <h2>Alex Johnson</h2>\n  <p title="Current role">Frontend learner</p>\n</div>',
            expectedResult: [
              'The card displays custom styling and a tooltip on hover.',
              'The markup is ready for later CSS targeting.',
            ],
            challenge: [
              'Add a warning message block with a separate class name.',
              'Explain when you would prefer a class over an id.',
            ],
            references: ['Global attributes', 'id versus class', 'Inline style caution'],
            quizQuestion: 'Why are classes preferred over IDs for repeated styling?',
            quizAnswer: 'Classes can be reused across many elements, which makes styling scalable and consistent.',
          }),
          createTopic({
            id: 'html-formatting',
            title: 'Formatting Tags, Quotations, and Code Content',
            summary: 'Add meaning to text instead of styling with generic tags only.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'strong, em, mark, small, del, and ins',
              'blockquote, q, and cite',
              'code, pre, and kbd',
            ],
            theory: [
              'Formatting elements should communicate meaning, not only visual appearance.',
              'The pre and code combination is ideal when you need to preserve spacing and show technical snippets.',
            ],
            practicalTitle: 'Create a documentation note block',
            practicalGoal: 'Combine text formatting, a quotation, and a short code example.',
            practicalSteps: [
              'Add a quote from a web learning source.',
              'Use kbd to show a keyboard shortcut.',
              'Add a short HTML snippet inside pre and code.',
            ],
            starterCode:
              '<blockquote cite="https://developer.mozilla.org">Semantic HTML improves accessibility.</blockquote>\n<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>\n<pre><code>&lt;h1&gt;Hello&lt;/h1&gt;</code></pre>',
            expectedResult: [
              'The quote, keyboard keys, and code sample are clearly separated.',
              'Code characters remain escaped and readable.',
            ],
            challenge: [
              'Add a short inline quote using the q element.',
              'Create a note that includes deleted and inserted text.',
            ],
            references: ['Text formatting tags', 'Quotation tags', 'Code examples'],
            quizQuestion: 'Why is pre useful when showing source code?',
            quizAnswer: 'It preserves whitespace and line breaks so the code stays readable.',
          }),
          createTopic({
            id: 'html-comments-entities',
            title: 'Comments, Character Entities, and Symbols',
            summary: 'Document your markup and display special characters correctly.',
            level: 'Beginner',
            duration: '1h 5m',
            points: [
              'HTML comments',
              'Reserved characters',
              'Common entities such as ampersand and less-than',
            ],
            theory: [
              'Comments make large markup files easier to scan, especially when a page has many sections.',
              'Entities let you display reserved characters or special symbols without breaking the HTML.',
            ],
            practicalTitle: 'Document a section and escape symbols',
            practicalGoal: 'Add comments and entities to a sample tutorial block.',
            practicalSteps: [
              'Insert a comment above a major section.',
              'Display reserved characters like less-than and greater-than.',
              'Add a copyright or trademark symbol using entities.',
            ],
            starterCode:
              '<!-- Pricing section -->\n<p>Use &lt;section&gt; to group related content.</p>\n<p>&copy; 2026 LearnHub</p>',
            expectedResult: [
              'The comment is visible in source but not rendered on the page.',
              'Reserved symbols display as text instead of HTML.',
            ],
            challenge: [
              'Add an emoji and one currency symbol using entities or Unicode.',
            ],
            references: ['Comments', 'HTML entities', 'Reserved characters'],
            quizQuestion: 'Why can you not directly type <section> inside a paragraph if you want to display it literally?',
            quizAnswer: 'Because the browser would treat it as markup instead of plain text unless it is escaped.',
          }),
          createTopic({
            id: 'html-seo-meta',
            title: 'Meta Tags, SEO Basics, and Social Sharing',
            summary: 'Improve discoverability and preview quality for your pages.',
            level: 'Intermediate',
            duration: '1h 30m',
            points: [
              'Meta description',
              'Open Graph basics',
              'Meaningful titles and headings',
            ],
            theory: [
              'Metadata helps browsers, search engines, and social platforms understand the page.',
              'Good titles and descriptions do not guarantee ranking, but they do improve clarity and click quality.',
            ],
            practicalTitle: 'Optimize the head section',
            practicalGoal: 'Add essential metadata for search and social sharing.',
            practicalSteps: [
              'Write a specific title tag.',
              'Add a meta description.',
              'Add a basic Open Graph title and description.',
            ],
            starterCode:
              '<head>\n  <title>HTML Portfolio Project</title>\n  <meta name="description" content="A semantic HTML portfolio with forms, media, and accessible sections." />\n  <meta property="og:title" content="HTML Portfolio Project" />\n</head>',
            expectedResult: [
              'The page head contains reusable SEO and social metadata.',
              'The title describes the page clearly.',
            ],
            challenge: [
              'Write a different description for a contact page.',
            ],
            references: ['Title tag', 'Meta description', 'Open Graph basics'],
            quizQuestion: 'What is the role of a meta description?',
            quizAnswer: 'It provides a concise summary of the page for search and sharing contexts.',
          }),
        ],
      }),
      createSection({
        id: 'html-structure',
        title: 'HTML Structure, Media, and Data',
        subtitle: 'Semantic layout, images, tables, lists, forms, and embedded content',
        topics: [
          createTopic({
            id: 'html-semantic-layout',
            title: 'Semantic Layout and Landmark Elements',
            summary: 'Build meaningful page structure using semantic sections.',
            level: 'Intermediate',
            duration: '1h 50m',
            points: [
              'header, nav, main, section, article, footer',
              'When to use div versus semantic tags',
              'Landmarks for accessibility',
            ],
            theory: [
              'Semantic elements communicate the purpose of content, not just its placement.',
              'Landmark regions help assistive technology users navigate the page more efficiently.',
            ],
            practicalTitle: 'Refactor a generic layout',
            practicalGoal: 'Replace generic wrappers with semantic elements where appropriate.',
            practicalSteps: [
              'Create a header with navigation.',
              'Wrap the core article content in main.',
              'Add a footer with contact links.',
            ],
            starterCode:
              '<header>\n  <nav>\n    <a href="#home">Home</a>\n    <a href="#contact">Contact</a>\n  </nav>\n</header>\n<main>\n  <article>\n    <h1>Semantic Layout</h1>\n    <p>Meaningful structure improves accessibility.</p>\n  </article>\n</main>',
            expectedResult: [
              'The page has recognizable landmark regions.',
              'The layout is easier to understand than a div-only version.',
            ],
            challenge: [
              'Create a page with two article cards inside a section.',
            ],
            references: ['Landmark elements', 'Semantic structure', 'div versus section'],
            quizQuestion: 'Why might semantic elements be better than generic div containers?',
            quizAnswer: 'They describe the purpose of content, which improves clarity, accessibility, and maintainability.',
          }),
          createTopic({
            id: 'html-media',
            title: 'Images, Audio, Video, and Iframes',
            summary: 'Add rich content while keeping it accessible and organized.',
            level: 'Intermediate',
            duration: '1h 45m',
            points: [
              'Accessible images and alt text',
              'Video and audio controls',
              'Safe embedding with iframes',
            ],
            theory: [
              'Images should include alt text when they communicate meaning. Decorative images should be treated differently.',
              'Embedded content needs labels and thoughtful usage so that users understand what is being loaded.',
            ],
            practicalTitle: 'Create a media showcase',
            practicalGoal: 'Build a section that includes an image, a video, and an embedded frame.',
            practicalSteps: [
              'Add an image with a meaningful alt value.',
              'Include a video with native controls.',
              'Embed a map or media player in an iframe with a clear title.',
            ],
            starterCode:
              '<figure>\n  <img src="./images/team.jpg" alt="A product team planning a website launch" width="320" />\n  <figcaption>Planning session before launch day.</figcaption>\n</figure>\n<video controls width="320">\n  <source src="./media/demo.mp4" type="video/mp4" />\n</video>',
            expectedResult: [
              'The section displays multiple media types with basic accessibility support.',
              'The content remains understandable even if media fails to load.',
            ],
            challenge: [
              'Add a favicon to the project and verify it appears in the browser tab.',
            ],
            references: ['alt text', 'figure and figcaption', 'iframe title'],
            quizQuestion: 'When should an image have alt text?',
            quizAnswer: 'When the image adds meaning or information that a user should still receive without seeing the image.',
          }),
          createTopic({
            id: 'html-tables',
            title: 'Tables, Lists, and Structured Data',
            summary: 'Represent organized information with the correct elements.',
            level: 'Intermediate',
            duration: '1h 35m',
            points: [
              'table, thead, tbody, tfoot',
              'th, td, caption, scope',
              'Choosing tables only for tabular data',
            ],
            theory: [
              'Tables are for data relationships, not for layout. They work best when row and column meaning matters.',
              'Captions and header cells improve readability and accessibility for complex data.',
            ],
            practicalTitle: 'Create a pricing table',
            practicalGoal: 'Build a semantic table for a pricing or feature comparison.',
            practicalSteps: [
              'Add a caption to explain the table.',
              'Use table headers for each column.',
              'Add at least three rows of data.',
            ],
            starterCode:
              '<table>\n  <caption>Pricing Plans</caption>\n  <thead>\n    <tr><th>Plan</th><th>Price</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Starter</td><td>Free</td></tr>\n    <tr><td>Pro</td><td>$12</td></tr>\n  </tbody>\n</table>',
            expectedResult: [
              'The table shows clear headers and data rows.',
              'The caption explains what the table represents.',
            ],
            challenge: [
              'Add one column for support level.',
              'Use colspan or rowspan in one row if it makes sense.',
            ],
            references: ['Table captions', 'Header cells', 'Tabular data'],
            quizQuestion: 'Why should tables not be used for page layout?',
            quizAnswer: 'Because tables are meant for relational data, while layout is better handled by CSS.',
          }),
          createTopic({
            id: 'html-forms',
            title: 'Forms, Inputs, and Validation',
            summary: 'Collect user information with clear labels and useful browser validation.',
            level: 'Intermediate',
            duration: '2h 20m',
            points: [
              'Common input types',
              'Labels, placeholders, and field grouping',
              'required, minlength, pattern, and autocomplete',
            ],
            theory: [
              'Good forms are about clarity, accessibility, and reducing user mistakes.',
              'Built-in browser validation covers many simple cases before you even add JavaScript.',
            ],
            practicalTitle: 'Build a registration form',
            practicalGoal: 'Create a structured form with several field types and validation rules.',
            practicalSteps: [
              'Add name, email, password, and date fields.',
              'Use label elements correctly.',
              'Add required and length-based validation.',
            ],
            starterCode:
              '<form>\n  <label for="email">Email</label>\n  <input id="email" type="email" required />\n\n  <label for="password">Password</label>\n  <input id="password" type="password" minlength="8" required />\n\n  <button type="submit">Create account</button>\n</form>',
            expectedResult: [
              'Submitting an incomplete form triggers the browser validation UI.',
              'Each field has a matching label.',
            ],
            challenge: [
              'Add a select element and a textarea.',
              'Use fieldset and legend to group related inputs.',
            ],
            references: ['Input types', 'Form validation', 'Labels'],
            quizQuestion: 'What is the safest way to link a label to an input?',
            quizAnswer: 'Match the label for attribute with the input id.',
          }),
        ],
      }),
      createSection({
        id: 'html-advanced',
        title: 'HTML Advanced Topics',
        subtitle: 'Responsive markup, APIs, accessibility, performance, and capstone work',
        topics: [
          createTopic({
            id: 'html-responsive',
            title: 'Responsive HTML, Picture, and Source Selection',
            summary: 'Prepare markup for different screen sizes and devices.',
            level: 'Advanced',
            duration: '1h 30m',
            points: [
              'Responsive images',
              'picture and source elements',
              'Reducing layout shifts with width and height',
            ],
            theory: [
              'Responsive design is not only about CSS. The HTML should also provide appropriate image choices and stable layout information.',
              'Specifying dimensions for images helps reduce layout shifts while the page loads.',
            ],
            practicalTitle: 'Add responsive image sources',
            practicalGoal: 'Serve different image versions for different screen widths.',
            practicalSteps: [
              'Wrap an image inside picture.',
              'Add multiple source elements.',
              'Keep a fallback img element at the end.',
            ],
            starterCode:
              '<picture>\n  <source media="(min-width: 900px)" srcset="./images/hero-large.jpg" />\n  <source media="(min-width: 600px)" srcset="./images/hero-medium.jpg" />\n  <img src="./images/hero-small.jpg" alt="Team planning layout decisions" width="320" height="200" />\n</picture>',
            expectedResult: [
              'The markup can serve different images for different screen conditions.',
              'The fallback image still works when no source matches.',
            ],
            challenge: [
              'Add a lazy-loaded image gallery item using loading="lazy".',
            ],
            references: ['picture', 'srcset', 'Layout shift prevention'],
            quizQuestion: 'Why is width and height on images useful even before CSS loads?',
            quizAnswer: 'It helps the browser reserve space and reduces layout shifts during loading.',
          }),
          createTopic({
            id: 'html-web-apis',
            title: 'Useful HTML Patterns for Web APIs',
            summary: 'Prepare markup that works well with browser features and JavaScript APIs.',
            level: 'Advanced',
            duration: '1h 40m',
            points: [
              'details and summary',
              'dialog-ready markup',
              'File input and drag-drop zones',
            ],
            theory: [
              'Some HTML elements provide useful interactive behavior before any custom JavaScript is added.',
              'Good markup gives JavaScript a solid foundation for richer API integrations later.',
            ],
            practicalTitle: 'Build interactive markup shells',
            practicalGoal: 'Create a FAQ block, a drop zone, and a dialog launch area.',
            practicalSteps: [
              'Add a details and summary FAQ block.',
              'Create a file drop area container.',
              'Add a button intended to open a dialog.',
            ],
            starterCode:
              '<details>\n  <summary>What is semantic HTML?</summary>\n  <p>It describes the meaning of content.</p>\n</details>\n<div class="drop-zone">Drop files here</div>\n<button type="button">Open dialog</button>',
            expectedResult: [
              'The FAQ expands without custom JavaScript.',
              'The drop zone and button are ready for later scripting.',
            ],
            challenge: [
              'Add a file input inside the drop zone with a helpful label.',
            ],
            references: ['details and summary', 'dialog patterns', 'File upload markup'],
            quizQuestion: 'What is one advantage of the details element?',
            quizAnswer: 'It provides native expandable content behavior without needing custom JavaScript.',
          }),
          createTopic({
            id: 'html-accessibility',
            title: 'Accessibility, ARIA Basics, and Keyboard Flow',
            summary: 'Review the markup decisions that make pages more inclusive.',
            level: 'Advanced',
            duration: '1h 50m',
            points: [
              'Accessible names and labels',
              'Landmarks and heading consistency',
              'When ARIA helps and when native HTML is better',
            ],
            theory: [
              'Native HTML should be your first accessibility tool. ARIA is useful when native semantics do not cover the interaction.',
              'Keyboard users rely on clear focus order, meaningful labels, and logical structure.',
            ],
            practicalTitle: 'Audit a page for accessibility',
            practicalGoal: 'Create a checklist and improve a sample page structure.',
            practicalSteps: [
              'Check heading order.',
              'Confirm that form fields have labels.',
              'Review interactive elements for keyboard access.',
            ],
            starterCode:
              '<main>\n  <h1>Accessible Product Page</h1>\n  <button type="button">Add to cart</button>\n  <label for="email">Email</label>\n  <input id="email" type="email" />\n</main>',
            expectedResult: [
              'The page follows a cleaner accessibility checklist.',
              'Users can identify controls and page landmarks more easily.',
            ],
            challenge: [
              'Add a skip link and test a keyboard-only path through the page.',
            ],
            references: ['Keyboard access', 'Labels', 'Native HTML first'],
            quizQuestion: 'Why is native HTML usually preferred before ARIA?',
            quizAnswer: 'Because native elements already provide built-in semantics and behaviors that are more reliable when used correctly.',
          }),
          createTopic({
            id: 'html-capstone',
            title: 'HTML Capstone Project and Review',
            summary: 'Bring everything together in a complete multi-section website.',
            level: 'Advanced',
            duration: '3h 30m',
            points: [
              'Page planning and content hierarchy',
              'Combining forms, media, and semantic layout',
              'Final accessibility and SEO review',
            ],
            theory: [
              'A capstone project shows whether you can combine isolated lessons into a coherent product.',
              'The final review should cover structure, labels, metadata, and content clarity, not only whether the page renders.',
            ],
            practicalTitle: 'Build a complete semantic site',
            practicalGoal: 'Create a home page, about page, and contact page using the concepts from the roadmap.',
            practicalSteps: [
              'Plan the page sections and navigation.',
              'Add media, tables, and one working form.',
              'Run an accessibility and metadata review before finishing.',
            ],
            starterCode:
              '<main>\n  <section>\n    <h1>My Portfolio</h1>\n    <p>Welcome to my semantic HTML project.</p>\n  </section>\n</main>',
            expectedResult: [
              'You finish a small multi-page site with clear semantic structure.',
              'The project feels like a realistic HTML foundation project.',
            ],
            challenge: [
              'Write a short self-review listing what you would improve next.',
            ],
            references: ['Project planning', 'Accessibility checklist', 'Metadata review'],
            quizQuestion: 'What should a final HTML review include besides visual inspection?',
            quizAnswer: 'Structure, semantics, labels, metadata, accessibility, and content clarity.',
          }),
        ],
      }),
    ],
  },
  css: {
    key: 'css',
    title: 'CSS Learning Module',
    shortTitle: 'CSS',
    subtitle: 'Selectors, layouts, responsive design, motion, theming, and maintainable styling',
    description:
      'This CSS roadmap covers styling from the fundamentals to advanced layout systems, animation, architecture, and real interface design patterns.',
    icon: 'logo-css3',
    color: '#3B82F6',
    totalHours: '36h',
    focusAreas: ['Selectors', 'Flexbox', 'Grid', 'Responsive UI'],
    recommendedProject:
      'Build a responsive product landing page and dashboard interface with reusable design tokens and polished interactions.',
    sections: [
      createSection({
        id: 'css-foundation',
        title: 'CSS Foundations',
        subtitle: 'Syntax, selectors, comments, colors, spacing, and the box model',
        topics: [
          createTopic({
            id: 'css-intro',
            title: 'CSS Introduction and External Stylesheets',
            summary: 'Learn how CSS rules are written and connected to HTML.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'Selector, property, and value',
              'Inline, internal, and external CSS',
              'Why external files scale better',
            ],
            theory: [
              'CSS rules pair a selector with declarations that define how matched elements should look.',
              'External stylesheets improve reuse, separation of concerns, and maintainability as a project grows.',
            ],
            practicalTitle: 'Attach your first stylesheet',
            practicalGoal: 'Style a basic HTML page from a separate CSS file.',
            practicalSteps: [
              'Create a stylesheet file.',
              'Style the body, heading, and paragraph elements.',
              'Link the stylesheet from the HTML head.',
            ],
            starterCode:
              'body {\n  font-family: Arial, sans-serif;\n  background: #f8fafc;\n}\n\nh1 {\n  color: #1d4ed8;\n}\n\np {\n  color: #334155;\n}',
            expectedResult: [
              'The page typography and colors change after the stylesheet is loaded.',
            ],
            challenge: [
              'Style a card with padding and a rounded border.',
            ],
            references: ['CSS syntax', 'External CSS', 'Cascade basics'],
            quizQuestion: 'Why do larger projects prefer external CSS over inline CSS?',
            quizAnswer: 'Because external CSS is easier to reuse, maintain, and organize across many pages.',
          }),
          createTopic({
            id: 'css-selectors',
            title: 'Selectors, Combinators, and Specificity',
            summary: 'Target elements accurately and avoid style conflicts.',
            level: 'Beginner',
            duration: '1h 45m',
            points: [
              'Type, class, id, and attribute selectors',
              'Descendant and direct child combinators',
              'Specificity and source order',
            ],
            theory: [
              'Specificity decides which selector wins when multiple rules target the same property on the same element.',
              'Reusable class selectors usually provide a better balance of power and maintainability than overly specific selectors.',
            ],
            practicalTitle: 'Style a navigation menu',
            practicalGoal: 'Use a range of selectors to style links and active states cleanly.',
            practicalSteps: [
              'Create base styles for all links.',
              'Add a hover state.',
              'Add a class-based active state.',
            ],
            starterCode:
              '.nav-link {\n  color: #1e293b;\n  text-decoration: none;\n}\n\n.nav-link:hover {\n  color: #2563eb;\n}\n\n.nav-link.active {\n  font-weight: 700;\n}',
            expectedResult: [
              'The navigation shows distinct default, hover, and active states.',
            ],
            challenge: [
              'Style only external links using an attribute selector.',
            ],
            references: ['Selectors', 'Specificity', 'Combinators'],
            quizQuestion: 'What is specificity used for in CSS?',
            quizAnswer: 'It determines which rule wins when competing selectors target the same element.',
          }),
          createTopic({
            id: 'css-box-model',
            title: 'Colors, Backgrounds, Borders, and the Box Model',
            summary: 'Control visual presentation and spacing with confidence.',
            level: 'Beginner',
            duration: '1h 40m',
            points: [
              'Content, padding, border, and margin',
              'Box sizing',
              'Background layers and border styling',
            ],
            theory: [
              'The box model explains how much space an element occupies and why spacing bugs happen.',
              'Using box-sizing: border-box makes layout sizing more predictable in real interfaces.',
            ],
            practicalTitle: 'Build a feature card',
            practicalGoal: 'Use padding, border, radius, and background to create a clean component.',
            practicalSteps: [
              'Set a width and padding.',
              'Add a border and rounded corners.',
              'Use a subtle background or gradient.',
            ],
            starterCode:
              '.feature-card {\n  width: 320px;\n  padding: 20px;\n  margin: 16px auto;\n  border: 1px solid #bfdbfe;\n  border-radius: 18px;\n  background: linear-gradient(180deg, #eff6ff, #ffffff);\n  box-sizing: border-box;\n}',
            expectedResult: [
              'The card appears well spaced and visually separated from the page.',
            ],
            challenge: [
              'Create a second dark-mode version of the same card.',
            ],
            references: ['Box model', 'Border box sizing', 'Backgrounds'],
            quizQuestion: 'What does box-sizing: border-box change?',
            quizAnswer: 'It makes the declared width include content, padding, and border instead of only the content box.',
          }),
          createTopic({
            id: 'css-typography',
            title: 'Text, Fonts, Line Height, and Readability',
            summary: 'Shape the reading experience with better typography choices.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'Font families and fallback stacks',
              'Font size and line height',
              'Text alignment, spacing, and emphasis',
            ],
            theory: [
              'Typography is not just decoration; it controls how easily content can be scanned and understood.',
              'Line height and spacing matter as much as color and font size for readability.',
            ],
            practicalTitle: 'Improve an article layout',
            practicalGoal: 'Make a paragraph-heavy page more comfortable to read.',
            practicalSteps: [
              'Set a body font stack.',
              'Adjust paragraph line height.',
              'Create a stronger visual hierarchy for headings.',
            ],
            starterCode:
              'body {\n  font-family: Georgia, serif;\n  color: #1e293b;\n}\n\np {\n  line-height: 1.7;\n  max-width: 65ch;\n}\n\nh1 {\n  font-size: 2.5rem;\n}',
            expectedResult: [
              'Longer text content feels easier to read and more deliberate.',
            ],
            challenge: [
              'Create a smaller mobile heading scale using media queries.',
            ],
            references: ['Font stacks', 'Line height', 'Readable measure'],
            quizQuestion: 'Why is line height important in body text?',
            quizAnswer: 'It improves readability by giving each line enough visual breathing room.',
          }),
        ],
      }),
      createSection({
        id: 'css-layout',
        title: 'CSS Layout Systems',
        subtitle: 'Display, positioning, flexbox, grid, overflow, and responsive structure',
        topics: [
          createTopic({
            id: 'css-display-position',
            title: 'Display, Position, and Normal Document Flow',
            summary: 'Understand how elements participate in layout before adding advanced systems.',
            level: 'Intermediate',
            duration: '1h 35m',
            points: [
              'block, inline, inline-block, and none',
              'relative, absolute, fixed, and sticky',
              'How positioning changes layout behavior',
            ],
            theory: [
              'Layout bugs become easier to fix when you understand normal document flow before using custom positioning.',
              'Absolute elements are removed from normal flow and positioned relative to the nearest positioned ancestor.',
            ],
            practicalTitle: 'Create a sticky header',
            practicalGoal: 'Use positioning to keep a header visible while the page scrolls.',
            practicalSteps: [
              'Style the header with position: sticky.',
              'Set top to zero.',
              'Add enough page content to test scrolling behavior.',
            ],
            starterCode:
              'header {\n  position: sticky;\n  top: 0;\n  background: #0f172a;\n  color: white;\n  padding: 16px;\n}\n\nmain {\n  min-height: 120vh;\n}',
            expectedResult: [
              'The header remains at the top while scrolling down the page.',
            ],
            challenge: [
              'Add a fixed help button in the lower corner of the screen.',
            ],
            references: ['Display values', 'Positioning', 'Normal flow'],
            quizQuestion: 'What is the reference point for an absolutely positioned element?',
            quizAnswer: 'The nearest ancestor that has a non-static position value.',
          }),
          createTopic({
            id: 'css-flexbox',
            title: 'Flexbox Containers and Item Alignment',
            summary: 'Use one-dimensional layout tools for rows, columns, and alignment.',
            level: 'Intermediate',
            duration: '2h 5m',
            points: [
              'Main axis and cross axis',
              'justify-content and align-items',
              'gap, wrap, and flexible sizing',
            ],
            theory: [
              'Flexbox is ideal when you want content aligned in one dimension, either in a row or a column.',
              'Understanding the main axis is the key to using flex properties correctly.',
            ],
            practicalTitle: 'Build a responsive feature row',
            practicalGoal: 'Create cards that align nicely and wrap when the screen gets smaller.',
            practicalSteps: [
              'Make a flex container.',
              'Add gap and flex-wrap.',
              'Use flexible item sizing with the flex shorthand.',
            ],
            starterCode:
              '.feature-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.feature-item {\n  flex: 1 1 220px;\n  padding: 18px;\n  border-radius: 16px;\n  background: #eff6ff;\n}',
            expectedResult: [
              'Cards line up in a row and wrap onto new lines on smaller screens.',
            ],
            challenge: [
              'Center a call-to-action row both horizontally and vertically.',
            ],
            references: ['Flex axis', 'Alignment', 'Wrapping'],
            quizQuestion: 'Which property controls distribution along the main axis?',
            quizAnswer: 'justify-content.',
          }),
          createTopic({
            id: 'css-grid',
            title: 'CSS Grid for Two-Dimensional Layouts',
            summary: 'Build structured page layouts with rows and columns together.',
            level: 'Intermediate',
            duration: '2h 10m',
            points: [
              'Grid columns and rows',
              'repeat, minmax, and gap',
              'Grid areas and dashboard patterns',
            ],
            theory: [
              'CSS Grid is designed for two-dimensional layouts where rows and columns matter together.',
              'Grid can handle complex page shells more cleanly than flexbox when both axes need deliberate control.',
            ],
            practicalTitle: 'Create a dashboard layout',
            practicalGoal: 'Build a multi-column dashboard with cards that adapt to screen width.',
            practicalSteps: [
              'Set up a grid container.',
              'Define repeating columns.',
              'Collapse to one column on smaller screens.',
            ],
            starterCode:
              '.dashboard {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}\n\n@media (max-width: 768px) {\n  .dashboard {\n    grid-template-columns: 1fr;\n  }\n}',
            expectedResult: [
              'The layout shows multiple columns on large screens and a single column on narrow screens.',
            ],
            challenge: [
              'Create a hero plus sidebar layout using grid areas.',
            ],
            references: ['Grid tracks', 'repeat and minmax', 'Grid areas'],
            quizQuestion: 'When is Grid often a better fit than Flexbox?',
            quizAnswer: 'When you need controlled layout across both rows and columns at the same time.',
          }),
          createTopic({
            id: 'css-responsive',
            title: 'Responsive Design and Media Queries',
            summary: 'Adapt layouts, spacing, and type for many screen sizes.',
            level: 'Intermediate',
            duration: '1h 45m',
            points: [
              'Mobile-first styling',
              'Breakpoints and responsive spacing',
              'Fluid media and scalable layouts',
            ],
            theory: [
              'Responsive design starts by prioritizing content and then adapting presentation to different screen conditions.',
              'A mobile-first approach usually leads to cleaner, more intentional style decisions.',
            ],
            practicalTitle: 'Scale a card layout across devices',
            practicalGoal: 'Adjust typography, spacing, and layout at multiple screen sizes.',
            practicalSteps: [
              'Start with a mobile-friendly single-column layout.',
              'Add a breakpoint for tablets or laptops.',
              'Increase spacing and layout complexity gradually.',
            ],
            starterCode:
              '.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 12px;\n}\n\n@media (min-width: 768px) {\n  .cards {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n  }\n}',
            expectedResult: [
              'The layout becomes more spacious and multi-column on wider screens.',
            ],
            challenge: [
              'Add a third breakpoint for larger desktop screens.',
            ],
            references: ['Mobile first', 'Media queries', 'Responsive spacing'],
            quizQuestion: 'What does mobile-first mean in CSS?',
            quizAnswer: 'You start with styles for smaller screens and add enhancements for larger ones.',
          }),
        ],
      }),
      createSection({
        id: 'css-components',
        title: 'CSS Components and Visual Systems',
        subtitle: 'Forms, navigation, buttons, shadows, gradients, transforms, and UI polish',
        topics: [
          createTopic({
            id: 'css-forms',
            title: 'Form Styling, Focus States, and Input UX',
            summary: 'Create form controls that feel consistent and accessible.',
            level: 'Intermediate',
            duration: '1h 50m',
            points: [
              'Text fields, selects, and textareas',
              'Focus states and contrast',
              'Error and success styling',
            ],
            theory: [
              'Forms should communicate state clearly through spacing, labels, and visible focus styles.',
              'Accessible focus design is required for keyboard users and improves usability for everyone.',
            ],
            practicalTitle: 'Design a polished form set',
            practicalGoal: 'Style inputs, labels, and buttons to feel like one coherent system.',
            practicalSteps: [
              'Give each input a consistent border, padding, and radius.',
              'Add a clear focus state.',
              'Create visual styles for error and success states.',
            ],
            starterCode:
              'input, select, textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border: 1px solid #cbd5e1;\n  border-radius: 12px;\n}\n\ninput:focus {\n  outline: 2px solid #60a5fa;\n  border-color: #60a5fa;\n}',
            expectedResult: [
              'The form controls look consistent and provide obvious focus feedback.',
            ],
            challenge: [
              'Add a disabled state and a helper text style.',
            ],
            references: ['Focus states', 'Form controls', 'Error styling'],
            quizQuestion: 'Why should focus states always remain visible?',
            quizAnswer: 'Keyboard and assistive technology users need them to know which field is currently active.',
          }),
          createTopic({
            id: 'css-navigation-buttons',
            title: 'Navigation Bars, Buttons, and Menus',
            summary: 'Style common interactive UI elements for clarity and reuse.',
            level: 'Intermediate',
            duration: '1h 30m',
            points: [
              'Horizontal navigation patterns',
              'Primary and secondary buttons',
              'Hover, active, and disabled states',
            ],
            theory: [
              'Interactive components need clear default, hover, active, and disabled states so users can predict behavior.',
              'Consistency between navigation and buttons improves the overall feel of a design system.',
            ],
            practicalTitle: 'Build a component action bar',
            practicalGoal: 'Style a navigation row and a matching button group.',
            practicalSteps: [
              'Create a horizontal nav with spacing and hover styles.',
              'Add a primary and secondary button style.',
              'Create a disabled button state.',
            ],
            starterCode:
              '.button-primary {\n  padding: 12px 18px;\n  border-radius: 12px;\n  background: #2563eb;\n  color: white;\n}\n\n.button-secondary {\n  padding: 12px 18px;\n  border-radius: 12px;\n  border: 1px solid #cbd5e1;\n}',
            expectedResult: [
              'The buttons look like part of the same product system as the navigation.',
            ],
            challenge: [
              'Add a small icon alignment style for action buttons.',
            ],
            references: ['Button states', 'Navigation styling', 'Interactive consistency'],
            quizQuestion: 'Why do buttons need more than just a default style?',
            quizAnswer: 'Because users need visual feedback for hover, active, focus, and disabled states.',
          }),
          createTopic({
            id: 'css-effects',
            title: 'Shadows, Gradients, Filters, and Visual Depth',
            summary: 'Use effects carefully to make a UI feel more intentional.',
            level: 'Intermediate',
            duration: '1h 35m',
            points: [
              'Box shadow layering',
              'Linear and radial gradients',
              'Blur, opacity, and filter effects',
            ],
            theory: [
              'Effects should support hierarchy and mood, not overwhelm the interface.',
              'Subtle layering often feels more professional than strong visual noise.',
            ],
            practicalTitle: 'Create a premium card style',
            practicalGoal: 'Combine shadows and gradients to produce a more refined component.',
            practicalSteps: [
              'Add a background gradient.',
              'Layer a soft shadow under the component.',
              'Use a subtle hover effect to lift the card slightly.',
            ],
            starterCode:
              '.premium-card {\n  background: linear-gradient(180deg, #ffffff, #eff6ff);\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);\n  border-radius: 24px;\n}',
            expectedResult: [
              'The component has a sense of depth without looking overly heavy.',
            ],
            challenge: [
              'Create a dark version that keeps text readable.',
            ],
            references: ['Shadows', 'Gradients', 'Visual hierarchy'],
            quizQuestion: 'What is a common mistake when adding visual effects?',
            quizAnswer: 'Using effects so strongly that they distract from readability and structure.',
          }),
          createTopic({
            id: 'css-transforms',
            title: 'Transforms, Transitions, and Simple Motion',
            summary: 'Add motion that supports interaction instead of distracting from it.',
            level: 'Advanced',
            duration: '1h 45m',
            points: [
              'translate, scale, rotate',
              'Transition timing and easing',
              'Hover and focus animations',
            ],
            theory: [
              'Motion is most useful when it clarifies state changes or gives feedback after an action.',
              'Transform and opacity are usually safer for animation performance than changing layout-heavy properties.',
            ],
            practicalTitle: 'Animate a card interaction',
            practicalGoal: 'Build a hover or focus effect that feels polished and fast.',
            practicalSteps: [
              'Add a transition for transform and shadow.',
              'Translate the card slightly on hover.',
              'Test the effect on a button or card component.',
            ],
            starterCode:
              '.card {\n  transition: transform 180ms ease, box-shadow 180ms ease;\n}\n\n.card:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);\n}',
            expectedResult: [
              'The card feels more interactive without becoming distracting.',
            ],
            challenge: [
              'Animate a button press using scale.',
            ],
            references: ['Transforms', 'Transitions', 'Motion performance'],
            quizQuestion: 'Why are transform-based animations usually preferred?',
            quizAnswer: 'They are generally smoother and cause fewer expensive layout recalculations.',
          }),
        ],
      }),
      createSection({
        id: 'css-advanced',
        title: 'CSS Architecture and Production Practice',
        subtitle: 'Variables, accessibility, browser support, naming systems, and final projects',
        topics: [
          createTopic({
            id: 'css-variables',
            title: 'CSS Variables and Design Tokens',
            summary: 'Centralize decisions for color, spacing, and theming.',
            level: 'Advanced',
            duration: '1h 30m',
            points: [
              'root-scoped variables',
              'Fallback values',
              'Token-based systems',
            ],
            theory: [
              'Variables let you define a single source of truth for repeated design decisions.',
              'Design tokens help teams stay consistent across many pages and components.',
            ],
            practicalTitle: 'Set up color and spacing tokens',
            practicalGoal: 'Move repeated hard-coded values into reusable variables.',
            practicalSteps: [
              'Define tokens in :root.',
              'Replace direct color values in components.',
              'Create a second theme context using overrides.',
            ],
            starterCode:
              ':root {\n  --color-bg: #ffffff;\n  --color-text: #0f172a;\n  --space-md: 16px;\n  --radius-lg: 18px;\n}\n\n.card {\n  padding: var(--space-md);\n  border-radius: var(--radius-lg);\n}',
            expectedResult: [
              'The component styles become easier to update from a central location.',
            ],
            challenge: [
              'Add tokens for shadow and border colors.',
            ],
            references: ['CSS variables', 'Design tokens', 'Fallback values'],
            quizQuestion: 'What is one major benefit of design tokens?',
            quizAnswer: 'They make repeated design decisions consistent and much easier to update later.',
          }),
          createTopic({
            id: 'css-accessibility',
            title: 'Accessibility, Reduced Motion, and Contrast',
            summary: 'Use CSS to support a more inclusive interface.',
            level: 'Advanced',
            duration: '1h 20m',
            points: [
              'Color contrast awareness',
              'Visible focus states',
              'Reduced motion preferences',
            ],
            theory: [
              'CSS has a direct impact on accessibility because color, focus, spacing, and motion all influence usability.',
              'Reduced motion support helps users who are sensitive to excessive movement.',
            ],
            practicalTitle: 'Create an accessibility review pass',
            practicalGoal: 'Improve one component set for focus visibility and reduced motion support.',
            practicalSteps: [
              'Check text contrast.',
              'Add a better keyboard focus style.',
              'Wrap transitions in a prefers-reduced-motion media query when needed.',
            ],
            starterCode:
              '@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}',
            expectedResult: [
              'The UI becomes friendlier to keyboard users and motion-sensitive users.',
            ],
            challenge: [
              'Review a button and input pair for contrast and focus clarity.',
            ],
            references: ['Reduced motion', 'Focus states', 'Contrast'],
            quizQuestion: 'What does prefers-reduced-motion help with?',
            quizAnswer: 'It lets you reduce or remove animations for users who prefer less motion.',
          }),
          createTopic({
            id: 'css-architecture',
            title: 'Naming Systems, Organization, and Scalability',
            summary: 'Keep large stylesheets understandable as the project grows.',
            level: 'Advanced',
            duration: '1h 35m',
            points: [
              'BEM and utility-friendly naming',
              'Component-based organization',
              'Avoiding selector depth and overrides',
            ],
            theory: [
              'Scalable CSS relies on predictable structure and shallow selector patterns.',
              'Organization decisions matter more as soon as multiple people or multiple pages are involved.',
            ],
            practicalTitle: 'Refactor a messy style block',
            practicalGoal: 'Rename a component set into a clearer, more scalable structure.',
            practicalSteps: [
              'Identify the main component and child parts.',
              'Rename selectors with a consistent system.',
              'Remove unnecessary deep nesting.',
            ],
            starterCode:
              '.card {}\n.card__title {}\n.card__meta {}\n.card--featured {}',
            expectedResult: [
              'The style structure becomes easier to read and extend later.',
            ],
            challenge: [
              'Refactor one of your own older CSS snippets using a naming system.',
            ],
            references: ['BEM', 'Component organization', 'Maintainable CSS'],
            quizQuestion: 'Why is selector depth often a long-term problem?',
            quizAnswer: 'Deep selectors are harder to reason about and make overrides more fragile.',
          }),
          createTopic({
            id: 'css-capstone',
            title: 'CSS Capstone Project and Final Review',
            summary: 'Combine layout, typography, forms, and motion into a polished product page.',
            level: 'Advanced',
            duration: '3h 20m',
            points: [
              'Responsive page structure',
              'Component consistency',
              'Performance and accessibility review',
            ],
            theory: [
              'A capstone project reveals whether isolated lessons can become a complete, coherent interface.',
              'Final review should check not only visuals, but also spacing consistency, state clarity, and responsive behavior.',
            ],
            practicalTitle: 'Build a responsive landing page',
            practicalGoal: 'Design a landing page with a hero, features, pricing, and a call-to-action section.',
            practicalSteps: [
              'Create the page shell and type scale.',
              'Build responsive feature and pricing sections.',
              'Add polished buttons, cards, and a review pass.',
            ],
            starterCode:
              '.page-shell {\n  min-height: 100vh;\n  background: linear-gradient(180deg, #eff6ff, #ffffff);\n}\n\n.hero {\n  display: grid;\n  gap: 24px;\n}',
            expectedResult: [
              'The final page feels complete, responsive, and visually intentional.',
            ],
            challenge: [
              'Write a self-review of what still feels weak and what feels production-ready.',
            ],
            references: ['Responsive QA', 'Design tokens', 'Accessibility review'],
            quizQuestion: 'What makes a CSS capstone more valuable than isolated exercises?',
            quizAnswer: 'It shows whether you can combine layout, visuals, interaction, and consistency into one real interface.',
          }),
        ],
      }),
    ],
  },
  javascript: {
    key: 'javascript',
    title: 'JavaScript Learning Module',
    shortTitle: 'JavaScript',
    subtitle: 'Core syntax, DOM logic, async APIs, data handling, and project building',
    description:
      'This JavaScript roadmap covers the language from fundamentals to browser APIs, asynchronous data flows, modular organization, and capstone projects.',
    icon: 'logo-javascript',
    color: '#EAB308',
    totalHours: '38h',
    focusAreas: ['Functions', 'DOM', 'Async', 'Projects'],
    recommendedProject:
      'Build a learning tracker app with DOM updates, filtering, API fetches, local storage, and reusable modules.',
    sections: [
      createSection({
        id: 'js-foundation',
        title: 'JavaScript Foundations',
        subtitle: 'Introduction, output, variables, operators, and control flow',
        topics: [
          createTopic({
            id: 'js-intro',
            title: 'Introduction, Script Placement, and Output',
            summary: 'Learn where JavaScript runs and how to verify it is connected correctly.',
            level: 'Beginner',
            duration: '1h 15m',
            points: [
              'Inline, internal, and external scripts',
              'console.log and browser alerts',
              'Updating text on the page',
            ],
            theory: [
              'JavaScript can be placed directly in HTML or loaded from external files, but external files scale better in real projects.',
              'The browser console is one of the first tools you should use whenever you are testing or debugging JavaScript.',
            ],
            practicalTitle: 'Connect a script file',
            practicalGoal: 'Confirm that JavaScript is loaded and can update the page.',
            practicalSteps: [
              'Attach an external script file.',
              'Print a message to the console.',
              'Change the text content of one element in the DOM.',
            ],
            starterCode:
              'console.log("JavaScript connected");\n\ndocument.getElementById("status").textContent = "Script loaded successfully";',
            expectedResult: [
              'A console message appears and the page text updates dynamically.',
            ],
            challenge: [
              'Print the current year to the page.',
            ],
            references: ['Script tags', 'Console basics', 'textContent'],
            quizQuestion: 'What is the fastest way to verify that your JavaScript file is running?',
            quizAnswer: 'Log a message to the browser console or update a visible DOM element.',
          }),
          createTopic({
            id: 'js-variables',
            title: 'Variables, Data Types, and Operators',
            summary: 'Work with values safely and understand how JavaScript compares them.',
            level: 'Beginner',
            duration: '1h 50m',
            points: [
              'let and const',
              'Primitive types and references',
              'Arithmetic, comparison, and logical operators',
            ],
            theory: [
              'JavaScript variables can hold many types of values, but the way those values behave depends on whether they are primitives or reference types.',
              'Strict equality is usually safer than loose equality because it avoids unexpected type coercion.',
            ],
            practicalTitle: 'Build a bill calculator',
            practicalGoal: 'Use variables and operators to calculate a final total.',
            practicalSteps: [
              'Create price and quantity variables.',
              'Calculate tax and discount values.',
              'Print the final amount clearly.',
            ],
            starterCode:
              'const itemPrice = 499;\nconst quantity = 2;\nconst subtotal = itemPrice * quantity;\nconst tax = subtotal * 0.18;\nconst total = subtotal + tax;\nconsole.log(total);',
            expectedResult: [
              'The script calculates and logs a numeric total.',
            ],
            challenge: [
              'Add a discount variable and subtract it before printing the final amount.',
            ],
            references: ['let and const', 'Primitive types', 'Strict equality'],
            quizQuestion: 'What is the difference between == and ===?',
            quizAnswer: '=== compares both value and type, while == can coerce values before comparing them.',
          }),
          createTopic({
            id: 'js-control-flow',
            title: 'Conditions, Switch Statements, and Loops',
            summary: 'Make programs react differently based on data and repeat work efficiently.',
            level: 'Beginner',
            duration: '1h 45m',
            points: [
              'if, else if, and else',
              'switch statements',
              'for, while, break, and continue',
            ],
            theory: [
              'Control flow lets a program take different paths based on different input values or states.',
              'Loops reduce repetition by applying the same logic to multiple values or iterations.',
            ],
            practicalTitle: 'Create a grade checker',
            practicalGoal: 'Classify scores and loop through several values.',
            practicalSteps: [
              'Create an array of scores.',
              'Use an if statement or switch to classify them.',
              'Loop through each score and print the result.',
            ],
            starterCode:
              'const scores = [88, 72, 49];\n\nfor (const score of scores) {\n  if (score >= 80) {\n    console.log("A");\n  } else if (score >= 60) {\n    console.log("B");\n  } else {\n    console.log("Retry");\n  }\n}',
            expectedResult: [
              'Each score is evaluated and printed with a matching grade or message.',
            ],
            challenge: [
              'Create a day-of-week planner using switch.',
            ],
            references: ['Conditionals', 'Switch syntax', 'Loop basics'],
            quizQuestion: 'What is the main reason to use a loop?',
            quizAnswer: 'To repeat a block of logic without writing the same code many times.',
          }),
          createTopic({
            id: 'js-functions',
            title: 'Functions, Parameters, Returns, and Scope',
            summary: 'Group repeated logic into reusable building blocks.',
            level: 'Beginner',
            duration: '1h 40m',
            points: [
              'Function declarations and arrow functions',
              'Parameters and return values',
              'Global, function, and block scope',
            ],
            theory: [
              'Functions let you write logic once and reuse it with different inputs.',
              'Scope determines where a variable is available and helps prevent accidental naming collisions.',
            ],
            practicalTitle: 'Create a reusable formatter',
            practicalGoal: 'Write a function that formats lesson information consistently.',
            practicalSteps: [
              'Create a function that accepts a title and level.',
              'Return a formatted string.',
              'Call the function with multiple values.',
            ],
            starterCode:
              'function formatLesson(title, level) {\n  return `${title} - ${level}`;\n}\n\nconsole.log(formatLesson("HTML Basics", "Beginner"));',
            expectedResult: [
              'The function returns formatted strings for multiple inputs.',
            ],
            challenge: [
              'Add a default parameter for level.',
            ],
            references: ['Functions', 'Parameters', 'Scope'],
            quizQuestion: 'Why is a return value important in a function?',
            quizAnswer: 'It lets the function send a computed result back so the rest of the program can use it.',
          }),
        ],
      }),
      createSection({
        id: 'js-data',
        title: 'JavaScript Data and Structure',
        subtitle: 'Arrays, objects, dates, scope, context, and data transformation',
        topics: [
          createTopic({
            id: 'js-arrays-objects',
            title: 'Arrays, Objects, and Common Methods',
            summary: 'Handle collections and structured data more effectively.',
            level: 'Intermediate',
            duration: '2h 5m',
            points: [
              'map, filter, reduce, and find',
              'Object access and updates',
              'Spread and destructuring',
            ],
            theory: [
              'Arrays are best for ordered lists of items, while objects are useful for named properties and structured records.',
              'Modern array methods make data transformation more readable than manual loops in many cases.',
            ],
            practicalTitle: 'Transform a lesson list',
            practicalGoal: 'Filter, map, and count lessons based on completion status.',
            practicalSteps: [
              'Create an array of lesson objects.',
              'Filter completed and pending lessons.',
              'Use reduce or length to summarize the data.',
            ],
            starterCode:
              'const lessons = [\n  { title: "HTML Intro", done: true },\n  { title: "CSS Grid", done: false },\n  { title: "JS Arrays", done: false },\n];\n\nconst pending = lessons.filter((lesson) => !lesson.done);\nconsole.log(pending);',
            expectedResult: [
              'The transformed lesson lists are easier to inspect and reuse.',
            ],
            challenge: [
              'Create a new array that contains only the lesson titles.',
            ],
            references: ['Array methods', 'Objects', 'Destructuring'],
            quizQuestion: 'What does map do differently from filter?',
            quizAnswer: 'map transforms every item into a new value, while filter keeps only items that match a condition.',
          }),
          createTopic({
            id: 'js-scope-closures',
            title: 'Scope, Hoisting, and Closures',
            summary: 'Understand what variables are available and when.',
            level: 'Intermediate',
            duration: '1h 45m',
            points: [
              'Global, function, and block scope',
              'Hoisting behavior',
              'Closure basics',
            ],
            theory: [
              'Scope defines the visibility of variables and functions, which has a direct effect on bugs and architecture.',
              'Closures let functions retain access to surrounding variables even after the outer function has completed.',
            ],
            practicalTitle: 'Build a counter factory',
            practicalGoal: 'Use a closure to keep internal state private.',
            practicalSteps: [
              'Create a function that returns another function.',
              'Store a private count value in the outer scope.',
              'Increment the value from the returned function.',
            ],
            starterCode:
              'function createCounter() {\n  let count = 0;\n  return function () {\n    count += 1;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter());',
            expectedResult: [
              'Each call to the returned function updates a private counter.',
            ],
            challenge: [
              'Add a reset function to the counter factory.',
            ],
            references: ['Scope', 'Closures', 'Hoisting'],
            quizQuestion: 'What is a closure in simple terms?',
            quizAnswer: 'A function that keeps access to variables from its outer scope even after that outer scope has finished running.',
          }),
          createTopic({
            id: 'js-this-context',
            title: 'this, Methods, and Execution Context',
            summary: 'Learn how function context changes based on how code is called.',
            level: 'Intermediate',
            duration: '1h 30m',
            points: [
              'Object methods',
              'Arrow function context',
              'bind, call, and apply',
            ],
            theory: [
              'The value of this depends on how a function is invoked, not just where it is written.',
              'Arrow functions do not create their own this value; they inherit it from the surrounding scope.',
            ],
            practicalTitle: 'Compare method contexts',
            practicalGoal: 'Observe how context changes between regular functions and arrow functions.',
            practicalSteps: [
              'Create an object with a method.',
              'Log this.title inside the method.',
              'Compare it with a similar arrow function case.',
            ],
            starterCode:
              'const lesson = {\n  title: "Execution Context",\n  printTitle() {\n    console.log(this.title);\n  },\n};\n\nlesson.printTitle();',
            expectedResult: [
              'The method reads the object title correctly when called as a method.',
            ],
            challenge: [
              'Use bind to create a new function with a fixed context.',
            ],
            references: ['this', 'Arrow functions', 'bind call apply'],
            quizQuestion: 'Why do arrow functions behave differently with this?',
            quizAnswer: 'Because they capture this from the surrounding scope instead of defining their own context.',
          }),
          createTopic({
            id: 'js-dates-math',
            title: 'Dates, Math, and Common Built-In Utilities',
            summary: 'Work with time values, calculations, and simple data formatting.',
            level: 'Intermediate',
            duration: '1h 20m',
            points: [
              'Date construction and formatting',
              'Basic Math methods',
              'Random values and rounding',
            ],
            theory: [
              'Built-in utilities like Date and Math solve many everyday problems without extra libraries.',
              'Date handling becomes more reliable when you understand the difference between raw date values and formatted strings.',
            ],
            practicalTitle: 'Create a deadline helper',
            practicalGoal: 'Display a due date and perform a small numeric calculation.',
            practicalSteps: [
              'Create a Date instance.',
              'Format it using built-in methods.',
              'Use Math methods for rounding or generating a value.',
            ],
            starterCode:
              'const today = new Date();\nconst score = 83.7;\nconsole.log(today.toDateString());\nconsole.log(Math.round(score));',
            expectedResult: [
              'The script prints a readable date and a rounded number.',
            ],
            challenge: [
              'Calculate a date seven days in the future.',
            ],
            references: ['Date', 'Math', 'Formatting basics'],
            quizQuestion: 'Which built-in object is commonly used for date and time in JavaScript?',
            quizAnswer: 'The Date object.',
          }),
        ],
      }),
      createSection({
        id: 'js-dom',
        title: 'DOM and Browser Interaction',
        subtitle: 'Selecting elements, events, forms, storage, and browser APIs',
        topics: [
          createTopic({
            id: 'js-dom-selection',
            title: 'DOM Selection and Content Updates',
            summary: 'Read and modify live page content from JavaScript.',
            level: 'Intermediate',
            duration: '1h 40m',
            points: [
              'querySelector and getElementById',
              'textContent and class changes',
              'Creating and removing elements',
            ],
            theory: [
              'The DOM is the browser representation of the page, and JavaScript can inspect or update it at runtime.',
              'Clear selection logic is one of the first steps toward more interactive interfaces.',
            ],
            practicalTitle: 'Update a lesson status panel',
            practicalGoal: 'Select DOM nodes and modify what they show.',
            practicalSteps: [
              'Select a status element.',
              'Change its text content.',
              'Toggle a class to change visual state.',
            ],
            starterCode:
              'const status = document.querySelector("#status");\nstatus.textContent = "Lesson completed";\nstatus.classList.add("is-complete");',
            expectedResult: [
              'The selected element updates both its text and visual class state.',
            ],
            challenge: [
              'Create and append a new list item using createElement.',
            ],
            references: ['DOM selection', 'textContent', 'classList'],
            quizQuestion: 'What does querySelector return?',
            quizAnswer: 'The first element that matches the selector, or null if nothing matches.',
          }),
          createTopic({
            id: 'js-events',
            title: 'Events, Event Objects, and Form Handling',
            summary: 'React to user interactions in a clear and predictable way.',
            level: 'Intermediate',
            duration: '1h 50m',
            points: [
              'Click, input, and submit events',
              'Event objects and preventDefault',
              'Delegation and UI feedback',
            ],
            theory: [
              'Events connect user actions to application behavior, making the page interactive instead of static.',
              'The event object contains useful information about what happened and where it happened.',
            ],
            practicalTitle: 'Handle a signup form',
            practicalGoal: 'Prevent the default form submit and show a custom message.',
            practicalSteps: [
              'Select the form and output area.',
              'Attach a submit event listener.',
              'Use preventDefault and update the UI.',
            ],
            starterCode:
              'const form = document.querySelector("#signup-form");\nconst status = document.querySelector("#status");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  status.textContent = "Form submitted successfully";\n});',
            expectedResult: [
              'The page does not reload, and the custom message appears after submission.',
            ],
            challenge: [
              'Add inline validation for an empty required field.',
            ],
            references: ['Events', 'preventDefault', 'Form handling'],
            quizQuestion: 'Why is preventDefault useful in a form submit handler?',
            quizAnswer: 'It stops the browser from performing its normal submit action so you can run custom logic first.',
          }),
          createTopic({
            id: 'js-storage',
            title: 'Local Storage, JSON, and Persistence',
            summary: 'Save small pieces of data between page visits.',
            level: 'Advanced',
            duration: '1h 35m',
            points: [
              'localStorage basics',
              'JSON stringify and parse',
              'Saving settings and progress',
            ],
            theory: [
              'localStorage stores strings, so arrays and objects need to be converted to and from JSON.',
              'Persisted data can improve user experience for preferences, drafts, and progress tracking.',
            ],
            practicalTitle: 'Save completed lessons locally',
            practicalGoal: 'Store and restore a list of completed lesson IDs.',
            practicalSteps: [
              'Create an array of completed IDs.',
              'Stringify and save it in localStorage.',
              'Read it back and parse it on load.',
            ],
            starterCode:
              'const completedLessons = ["html-home", "css-intro"];\nlocalStorage.setItem("completed-lessons", JSON.stringify(completedLessons));\n\nconst saved = JSON.parse(localStorage.getItem("completed-lessons") || "[]");\nconsole.log(saved);',
            expectedResult: [
              'The same list can be saved and loaded again on refresh.',
            ],
            challenge: [
              'Save a timestamp along with the completed lessons.',
            ],
            references: ['localStorage', 'JSON', 'Persistence'],
            quizQuestion: 'Why must arrays usually be stringified before storing them in localStorage?',
            quizAnswer: 'Because localStorage stores string values, not arrays or objects directly.',
          }),
          createTopic({
            id: 'js-browser-apis',
            title: 'Timers, Fetch, and Common Browser APIs',
            summary: 'Use browser features to build more realistic behavior.',
            level: 'Advanced',
            duration: '1h 45m',
            points: [
              'setTimeout and setInterval',
              'Fetch basics',
              'Working with asynchronous browser features',
            ],
            theory: [
              'Browser APIs extend JavaScript with capabilities such as timing, networking, storage, and document interaction.',
              'Once asynchronous APIs are involved, state and timing become central parts of your program design.',
            ],
            practicalTitle: 'Load lessons from a remote source',
            practicalGoal: 'Fetch remote data and display a loading state.',
            practicalSteps: [
              'Set a loading message before the request starts.',
              'Fetch JSON data from a test endpoint.',
              'Update the UI when the data arrives or when an error occurs.',
            ],
            starterCode:
              'async function loadLessons() {\n  try {\n    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");\n    const lessons = await response.json();\n    console.log(lessons);\n  } catch (error) {\n    console.error("Failed to load lessons", error);\n  }\n}\n\nloadLessons();',
            expectedResult: [
              'The script fetches remote data and handles possible failures.',
            ],
            challenge: [
              'Render the fetched lesson titles into an unordered list.',
            ],
            references: ['setTimeout', 'Fetch', 'Async browser APIs'],
            quizQuestion: 'Why is fetch considered asynchronous?',
            quizAnswer: 'Because the browser must wait for a network response while the rest of the page can continue running.',
          }),
        ],
      }),
      createSection({
        id: 'js-advanced',
        title: 'JavaScript Advanced Practice',
        subtitle: 'Error handling, modules, debugging, testing mindset, and capstone work',
        topics: [
          createTopic({
            id: 'js-async',
            title: 'Promises, Async Await, and Error Handling',
            summary: 'Structure asynchronous logic in a readable and safe way.',
            level: 'Advanced',
            duration: '1h 50m',
            points: [
              'Promises and chaining',
              'async and await',
              'try catch and fallback states',
            ],
            theory: [
              'Promises represent future results, and async await is a cleaner syntax built on top of them.',
              'Error handling is not optional in async flows because network and timing failures are normal cases, not rare exceptions.',
            ],
            practicalTitle: 'Wrap an API call in async logic',
            practicalGoal: 'Load remote data and handle success and failure clearly.',
            practicalSteps: [
              'Create an async function.',
              'Await the response and parse JSON.',
              'Use try and catch to manage errors.',
            ],
            starterCode:
              'async function getData() {\n  try {\n    const response = await fetch("/api/data");\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n    return [];\n  }\n}',
            expectedResult: [
              'The function returns data on success and a safe fallback on failure.',
            ],
            challenge: [
              'Add a loading flag around the request lifecycle.',
            ],
            references: ['Promises', 'Async await', 'try catch'],
            quizQuestion: 'What problem does try catch solve in async code?',
            quizAnswer: 'It gives you a clear place to handle failures and recover gracefully instead of letting the app crash silently.',
          }),
          createTopic({
            id: 'js-debugging',
            title: 'Debugging, DevTools, and Problem Isolation',
            summary: 'Learn how to inspect variables and narrow down bugs quickly.',
            level: 'Advanced',
            duration: '1h 20m',
            points: [
              'Console inspection',
              'Breakpoints and stepping',
              'Reducing a bug to the smallest case',
            ],
            theory: [
              'Strong debugging comes from isolating the smallest failing condition instead of changing many things at once.',
              'Browser DevTools can show runtime values, stack traces, network requests, and source execution step by step.',
            ],
            practicalTitle: 'Debug a broken lesson filter',
            practicalGoal: 'Walk through the state of a filter function until the bug is found.',
            practicalSteps: [
              'Add logging around the input and output.',
              'Set a breakpoint inside the filter callback.',
              'Check whether the expected property names exist.',
            ],
            starterCode:
              'const lessons = [{ title: "HTML", done: true }];\nconst completed = lessons.filter((lesson) => lesson.completed === true);\nconsole.log(completed);',
            expectedResult: [
              'You identify that the wrong property name is being used and fix the result.',
            ],
            challenge: [
              'Write down the smallest reproduction of the bug before fixing it.',
            ],
            references: ['DevTools', 'Breakpoints', 'Debugging workflow'],
            quizQuestion: 'What is one benefit of reducing a bug to a tiny reproduction?',
            quizAnswer: 'It removes noise and makes the real cause easier to identify and verify.',
          }),
          createTopic({
            id: 'js-modules',
            title: 'Modules, Code Organization, and Reuse',
            summary: 'Split growing programs into manageable files and responsibilities.',
            level: 'Advanced',
            duration: '1h 35m',
            points: [
              'import and export',
              'Utilities versus feature files',
              'Keeping code responsibilities narrow',
            ],
            theory: [
              'Modules reduce global scope pollution and make code easier to test, read, and extend.',
              'Organization should follow responsibilities, not just file size.',
            ],
            practicalTitle: 'Split helper logic into modules',
            practicalGoal: 'Move formatting and storage logic into separate reusable files.',
            practicalSteps: [
              'Create one utility file for text formatting.',
              'Create another for persistence logic.',
              'Import both helpers into the main file.',
            ],
            starterCode:
              'export function formatLessonTitle(title) {\n  return title.trim().toUpperCase();\n}',
            expectedResult: [
              'The app imports smaller helper units instead of keeping every function in one large file.',
            ],
            challenge: [
              'Create one validator module for form-related logic.',
            ],
            references: ['ES modules', 'Code organization', 'Reuse'],
            quizQuestion: 'Why are modules helpful in larger projects?',
            quizAnswer: 'They separate responsibilities, improve reuse, and make code easier to maintain.',
          }),
          createTopic({
            id: 'js-capstone',
            title: 'JavaScript Capstone Project and Review',
            summary: 'Build a complete interactive application with data, events, and persistence.',
            level: 'Advanced',
            duration: '3h 40m',
            points: [
              'State and render planning',
              'Event handling and persistence',
              'Refactoring and final review',
            ],
            theory: [
              'A capstone project is valuable because it forces you to combine many language features into one real build.',
              'The best final review checks user flows, error paths, naming clarity, and duplication, not only whether the app technically works.',
            ],
            practicalTitle: 'Build a learning tracker app',
            practicalGoal: 'Create a project that stores lessons, toggles completion, and persists user progress.',
            practicalSteps: [
              'Design the state shape.',
              'Render the lesson list and completion controls.',
              'Save progress locally and review the final code structure.',
            ],
            starterCode:
              'const state = {\n  lessons: [],\n  completedIds: [],\n};\n\nfunction renderApp() {\n  console.log("Render with state", state);\n}',
            expectedResult: [
              'You finish an interactive project that uses many of the roadmap concepts together.',
            ],
            challenge: [
              'Add one stretch goal such as search, sorting, or remote API sync.',
            ],
            references: ['Project planning', 'State shape', 'Refactor review'],
            quizQuestion: 'What should a JavaScript capstone prove?',
            quizAnswer: 'It should prove that you can combine language basics, DOM work, async logic, and persistence into one working app.',
          }),
        ],
      }),
    ],
  },
  python: {
    key: 'python',
    title: 'Python Starter Module',
    shortTitle: 'Python',
    subtitle: 'Readable syntax, data structures, files, functions, and automation basics',
    description:
      'This Python roadmap focuses on beginner-friendly syntax, practical scripting, functions, file handling, and simple project workflows.',
    icon: 'code-slash-outline',
    color: '#22C55E',
    totalHours: '18h',
    focusAreas: ['Syntax', 'Functions', 'Data Structures', 'Automation'],
    recommendedProject:
      'Build a command-line study planner with saved tasks, summaries, and progress reports.',
    sections: [
      createSection({
        id: 'python-core',
        title: 'Python Core',
        subtitle: 'Syntax, variables, conditions, loops, and functions',
        topics: [
          createTopic({
            id: 'python-syntax',
            title: 'Syntax, Variables, and Basic Input Output',
            summary: 'Start with Python fundamentals and its readable style.',
            level: 'Beginner',
            duration: '1h 30m',
            points: [
              'Indentation-based blocks',
              'Variables and simple values',
              'print and input',
            ],
            theory: [
              'Python relies on indentation to show code structure, which encourages a consistent style.',
              'Simple input and output are enough to build many first scripts and quick tools.',
            ],
            practicalTitle: 'Build a greeting script',
            practicalGoal: 'Read a user name and print a personalized message.',
            practicalSteps: [
              'Store the input value in a variable.',
              'Use an f-string for formatted output.',
              'Print a result message.',
            ],
            starterCode:
              'name = input("Enter your name: ")\nprint(f"Hello, {name}")',
            expectedResult: [
              'The script asks for a name and prints a greeting with that value.',
            ],
            challenge: [
              'Ask for age and print the next year age.',
            ],
            references: ['Indentation', 'Variables', 'f-strings'],
            quizQuestion: 'What does Python use to define code blocks?',
            quizAnswer: 'Indentation.',
          }),
          createTopic({
            id: 'python-flow',
            title: 'Conditions, Loops, and Simple Decisions',
            summary: 'Control program flow with branching and repetition.',
            level: 'Beginner',
            duration: '1h 35m',
            points: [
              'if, elif, and else',
              'for and while loops',
              'Looping through lists',
            ],
            theory: [
              'Python makes common control-flow patterns easy to read because the syntax is compact and explicit.',
              'Loops save time and reduce repeated code when you need to process multiple items.',
            ],
            practicalTitle: 'Create a marks analyzer',
            practicalGoal: 'Loop through scores and print grade decisions.',
            practicalSteps: [
              'Store scores in a list.',
              'Create a simple grade rule with if statements.',
              'Loop through the scores and print the results.',
            ],
            starterCode:
              'scores = [82, 74, 63]\n\nfor score in scores:\n    if score >= 80:\n        print("A")\n    elif score >= 60:\n        print("B")\n    else:\n        print("Retry")',
            expectedResult: [
              'Each score is evaluated and printed with a matching result.',
            ],
            challenge: [
              'Create a script that prints only even numbers from a list.',
            ],
            references: ['if statements', 'for loops', 'Loop conditions'],
            quizQuestion: 'What is the purpose of an elif block?',
            quizAnswer: 'It checks another condition when the earlier if condition was false.',
          }),
          createTopic({
            id: 'python-functions',
            title: 'Functions, Parameters, and Return Values',
            summary: 'Package repeatable logic into reusable functions.',
            level: 'Beginner',
            duration: '1h 30m',
            points: [
              'def keyword',
              'Parameters and defaults',
              'Returning values',
            ],
            theory: [
              'Functions let you define behavior once and use it many times with different inputs.',
              'Clear function boundaries make scripts easier to extend later.',
            ],
            practicalTitle: 'Create a lesson summary function',
            practicalGoal: 'Return a formatted description string from reusable inputs.',
            practicalSteps: [
              'Define a function using def.',
              'Accept a title and level parameter.',
              'Return a formatted string.',
            ],
            starterCode:
              'def format_lesson(title, level="Beginner"):\n    return f"{title} - {level}"\n\nprint(format_lesson("HTML Basics"))',
            expectedResult: [
              'The function returns a formatted lesson label.',
            ],
            challenge: [
              'Create another function that calculates total study time.',
            ],
            references: ['Functions', 'Parameters', 'Return values'],
            quizQuestion: 'What keyword defines a function in Python?',
            quizAnswer: 'def.',
          }),
        ],
      }),
      createSection({
        id: 'python-data',
        title: 'Python Data Handling',
        subtitle: 'Lists, dictionaries, strings, and file workflows',
        topics: [
          createTopic({
            id: 'python-lists-dicts',
            title: 'Lists, Dictionaries, and Iteration',
            summary: 'Store and process structured data in a practical way.',
            level: 'Intermediate',
            duration: '1h 45m',
            points: [
              'Ordered lists',
              'Key-value dictionaries',
              'Looping over structured data',
            ],
            theory: [
              'Lists are useful when order matters, while dictionaries are helpful when each value needs a named key.',
              'Combining loops with structured data is one of the most common scripting patterns in Python.',
            ],
            practicalTitle: 'Print student records',
            practicalGoal: 'Loop through a list of dictionaries and display each item clearly.',
            practicalSteps: [
              'Create a list of student dictionaries.',
              'Loop through the list.',
              'Print selected values from each dictionary.',
            ],
            starterCode:
              'students = [{"name": "Aman", "score": 91}, {"name": "Sara", "score": 76}]\nfor student in students:\n    print(student["name"], student["score"])',
            expectedResult: [
              'Each student record prints in a readable format.',
            ],
            challenge: [
              'Calculate the average score of the list.',
            ],
            references: ['Lists', 'Dictionaries', 'Iteration'],
            quizQuestion: 'Which structure is best for named fields such as name and score?',
            quizAnswer: 'A dictionary.',
          }),
          createTopic({
            id: 'python-strings',
            title: 'Strings, Formatting, and Basic Data Cleanup',
            summary: 'Work with user input and text values more safely.',
            level: 'Intermediate',
            duration: '1h 20m',
            points: [
              'strip, lower, upper, and split',
              'Joining text',
              'Formatted output with f-strings',
            ],
            theory: [
              'Many beginner scripts process text, so string cleanup methods are some of the most practical built-ins to master early.',
              'Consistent formatting helps make script output more useful for real users.',
            ],
            practicalTitle: 'Normalize and format names',
            practicalGoal: 'Clean raw input and format it for display.',
            practicalSteps: [
              'Strip extra spaces from a name.',
              'Convert casing for consistency.',
              'Print the cleaned value with an f-string.',
            ],
            starterCode:
              'raw_name = "  alex johnson  "\nclean_name = raw_name.strip().title()\nprint(f"Welcome, {clean_name}")',
            expectedResult: [
              'The output no longer contains extra spaces and uses title casing.',
            ],
            challenge: [
              'Split a comma-separated list of topics into a Python list.',
            ],
            references: ['String methods', 'f-strings', 'Data cleanup'],
            quizQuestion: 'What does strip do on a string?',
            quizAnswer: 'It removes leading and trailing whitespace.',
          }),
          createTopic({
            id: 'python-files',
            title: 'Files, Reading, Writing, and Simple Persistence',
            summary: 'Save data between script runs using text files.',
            level: 'Intermediate',
            duration: '1h 50m',
            points: [
              'with open',
              'Read and write modes',
              'Saving simple structured content',
            ],
            theory: [
              'File handling makes scripts more useful because results can be stored instead of disappearing after the script ends.',
              'The with statement safely manages file cleanup even when code becomes more complex later.',
            ],
            practicalTitle: 'Save a task list to a file',
            practicalGoal: 'Write multiple tasks to disk and read them back later.',
            practicalSteps: [
              'Create a list of tasks.',
              'Write each task to a text file.',
              'Open the file again and print its contents.',
            ],
            starterCode:
              'tasks = ["Learn HTML", "Practice CSS"]\nwith open("tasks.txt", "w") as file:\n    for task in tasks:\n        file.write(task + "\\n")',
            expectedResult: [
              'The file is created and contains the listed tasks.',
            ],
            challenge: [
              'Print the tasks with numbers when reading them back.',
            ],
            references: ['with open', 'Read and write modes', 'Persistence'],
            quizQuestion: 'Why is with open considered the safer file pattern?',
            quizAnswer: 'Because it automatically closes the file when the block finishes.',
          }),
        ],
      }),
      createSection({
        id: 'python-practical',
        title: 'Python Practical Work',
        subtitle: 'Automation, error handling, modules, and capstone planning',
        topics: [
          createTopic({
            id: 'python-errors',
            title: 'Exceptions and Basic Error Handling',
            summary: 'Prevent simple scripts from crashing on common failures.',
            level: 'Intermediate',
            duration: '1h 20m',
            points: [
              'try and except',
              'Handling invalid input',
              'Failing gracefully',
            ],
            theory: [
              'Error handling makes scripts more resilient and more useful outside perfect demo conditions.',
              'Even simple user input can fail, so defensive logic matters in practical scripts.',
            ],
            practicalTitle: 'Handle numeric input safely',
            practicalGoal: 'Catch bad input instead of letting the script crash.',
            practicalSteps: [
              'Read input from the user.',
              'Attempt to convert it to an integer.',
              'Handle ValueError and print a fallback message.',
            ],
            starterCode:
              'try:\n    age = int(input("Enter your age: "))\n    print(age + 1)\nexcept ValueError:\n    print("Please enter a valid number.")',
            expectedResult: [
              'The script handles invalid input without crashing.',
            ],
            challenge: [
              'Handle a missing file with a friendly error message.',
            ],
            references: ['try except', 'ValueError', 'Defensive scripting'],
            quizQuestion: 'What does an except block do?',
            quizAnswer: 'It handles an error case that happens inside the related try block.',
          }),
          createTopic({
            id: 'python-modules',
            title: 'Imports, Standard Library, and Script Organization',
            summary: 'Keep Python projects readable as they grow.',
            level: 'Intermediate',
            duration: '1h 25m',
            points: [
              'Importing built-in modules',
              'Splitting code across files',
              'Main entry point ideas',
            ],
            theory: [
              'Modules help you separate related functions instead of placing every utility in one file.',
              'The standard library provides a large set of useful tools without extra dependencies.',
            ],
            practicalTitle: 'Use a helper module',
            practicalGoal: 'Move a formatting helper into a second file and import it.',
            practicalSteps: [
              'Create a helper file.',
              'Define one reusable function there.',
              'Import and call that function from the main script.',
            ],
            starterCode:
              'from helpers import format_topic\n\nprint(format_topic("python", "Beginner"))',
            expectedResult: [
              'The main file stays cleaner while the helper logic remains reusable.',
            ],
            challenge: [
              'Create one module for file helpers and one for validation.',
            ],
            references: ['Imports', 'Modules', 'Standard library'],
            quizQuestion: 'Why split code into modules?',
            quizAnswer: 'It improves reuse, readability, and separation of responsibilities.',
          }),
          createTopic({
            id: 'python-capstone',
            title: 'Python Mini Project and Review',
            summary: 'Combine input, data structures, files, and functions into a useful script.',
            level: 'Advanced',
            duration: '2h 30m',
            points: [
              'Project planning',
              'Reusable functions and persistence',
              'Input validation and clean output',
            ],
            theory: [
              'A capstone script is valuable because it shows how the smaller language features work together in a practical workflow.',
              'Real usefulness often comes from clarity and persistence, not from complexity.',
            ],
            practicalTitle: 'Build a study planner CLI',
            practicalGoal: 'Create a command-line planner that adds, lists, and saves study tasks.',
            practicalSteps: [
              'Plan the task data structure.',
              'Create add and list functions.',
              'Store tasks in a local file and review the final flow.',
            ],
            starterCode:
              'tasks = []\n\ndef add_task(title):\n    tasks.append(title)\n\nadd_task("Finish Python roadmap")\nprint(tasks)',
            expectedResult: [
              'The project feels like a realistic beginner automation tool.',
            ],
            challenge: [
              'Add a completed status field to each task.',
            ],
            references: ['CLI planning', 'Persistence', 'Reusable functions'],
            quizQuestion: 'What should a good beginner Python project usually prove?',
            quizAnswer: 'That you can combine input, logic, data storage, and output into one useful script.',
          }),
        ],
      }),
    ],
  },
  react: {
    key: 'react',
    title: 'React Starter Module',
    shortTitle: 'React',
    subtitle: 'Components, props, state, effects, lists, forms, and reusable UI patterns',
    description:
      'This React roadmap introduces component thinking, state-driven UI, hooks, data rendering, and small project architecture in a practical sequence.',
    icon: 'logo-react',
    color: '#22D3EE',
    totalHours: '20h',
    focusAreas: ['Components', 'State', 'Hooks', 'UI Patterns'],
    recommendedProject:
      'Build a course dashboard with filters, saved progress, reusable cards, and a clean component structure.',
    sections: [
      createSection({
        id: 'react-core',
        title: 'React Core',
        subtitle: 'JSX, components, props, state, and events',
        topics: [
          createTopic({
            id: 'react-jsx-components',
            title: 'JSX, Components, and Component Thinking',
            summary: 'Break interfaces into reusable building blocks.',
            level: 'Beginner',
            duration: '1h 40m',
            points: [
              'JSX syntax',
              'Function components',
              'Component composition',
            ],
            theory: [
              'React encourages you to think in reusable interface units instead of one long page template.',
              'JSX is a syntax layer that lets you describe UI close to the data and logic that power it.',
            ],
            practicalTitle: 'Create a lesson card component',
            practicalGoal: 'Build one small reusable component that can be rendered multiple times.',
            practicalSteps: [
              'Create a function component.',
              'Return JSX with a title and description.',
              'Render the component more than once.',
            ],
            starterCode:
              'function LessonCard() {\n  return <div><h3>HTML Basics</h3><p>Start with structure and tags.</p></div>;\n}',
            expectedResult: [
              'The same component can be reused to display multiple lessons.',
            ],
            challenge: [
              'Split the card into smaller pieces if it starts growing.',
            ],
            references: ['JSX', 'Function components', 'Composition'],
            quizQuestion: 'Why is component thinking useful in React?',
            quizAnswer: 'It helps you build interfaces from reusable, isolated pieces instead of repeating markup everywhere.',
          }),
          createTopic({
            id: 'react-props',
            title: 'Props and Reusable Data-Driven Components',
            summary: 'Pass values into components so one structure can show many variations.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'Props as component inputs',
              'Destructuring props',
              'Reusable render patterns',
            ],
            theory: [
              'Props let a parent configure how a child component looks and behaves without duplicating the component itself.',
              'A well-designed component becomes more flexible when it takes clear props instead of hard-coded values.',
            ],
            practicalTitle: 'Pass lesson data into a card',
            practicalGoal: 'Convert a static component into a reusable one with props.',
            practicalSteps: [
              'Add title and level props.',
              'Render those props in JSX.',
              'Use the component with at least two different prop values.',
            ],
            starterCode:
              'function LessonCard({ title, level }) {\n  return <div><h3>{title}</h3><p>{level}</p></div>;\n}',
            expectedResult: [
              'The same card component can show different lessons through props.',
            ],
            challenge: [
              'Add a badge prop or icon label prop.',
            ],
            references: ['Props', 'Destructuring', 'Reusable components'],
            quizQuestion: 'What direction does data usually move with props?',
            quizAnswer: 'From parent components down to child components.',
          }),
          createTopic({
            id: 'react-state-events',
            title: 'State, Events, and Interactive UI',
            summary: 'Make React components respond to user actions.',
            level: 'Beginner',
            duration: '1h 45m',
            points: [
              'useState',
              'Click handlers',
              'Conditional rendering',
            ],
            theory: [
              'State gives React components memory so the UI can change when users interact with it.',
              'Conditional rendering is one of the most common ways state affects what users see.',
            ],
            practicalTitle: 'Build a completion toggle',
            practicalGoal: 'Toggle a lesson between pending and completed.',
            practicalSteps: [
              'Create a boolean state value.',
              'Attach an onClick handler to a button.',
              'Render different text based on the current state.',
            ],
            starterCode:
              'const [done, setDone] = useState(false);\n<button onClick={() => setDone(!done)}>{done ? "Completed" : "Mark Done"}</button>',
            expectedResult: [
              'The button label changes when the user clicks it.',
            ],
            challenge: [
              'Track the number of completed lessons in a parent component.',
            ],
            references: ['useState', 'Event handlers', 'Conditional rendering'],
            quizQuestion: 'What usually triggers a React component to re-render?',
            quizAnswer: 'A change in state or props.',
          }),
        ],
      }),
      createSection({
        id: 'react-patterns',
        title: 'React Patterns',
        subtitle: 'Lists, hooks, effects, forms, and shared state',
        topics: [
          createTopic({
            id: 'react-lists',
            title: 'Lists, Keys, and Data Rendering',
            summary: 'Render collections of data in a predictable and scalable way.',
            level: 'Intermediate',
            duration: '1h 35m',
            points: [
              'Array map in JSX',
              'Why keys matter',
              'Empty states and conditional lists',
            ],
            theory: [
              'React list rendering is based on regular JavaScript arrays, but keys help React track identity between renders.',
              'Clean list rendering often includes empty-state handling and simple formatting logic.',
            ],
            practicalTitle: 'Render a roadmap list',
            practicalGoal: 'Display several lesson items from an array.',
            practicalSteps: [
              'Create an array of lessons.',
              'Use map to return JSX for each item.',
              'Assign a stable key for each rendered item.',
            ],
            starterCode:
              'const lessons = [{ id: "1", title: "HTML" }];\nreturn (\n  <div>\n    {lessons.map((lesson) => (\n      <p key={lesson.id}>{lesson.title}</p>\n    ))}\n  </div>\n);',
            expectedResult: [
              'Each array item renders into its own visible element with a key.',
            ],
            challenge: [
              'Add a message for when the array is empty.',
            ],
            references: ['Lists', 'Keys', 'Conditional rendering'],
            quizQuestion: 'Why are keys important in React lists?',
            quizAnswer: 'They help React track which rendered items correspond to which data entries between updates.',
          }),
          createTopic({
            id: 'react-effects',
            title: 'useEffect, Side Effects, and Data Loading',
            summary: 'Handle work that happens after React renders.',
            level: 'Intermediate',
            duration: '1h 40m',
            points: [
              'Effect timing',
              'Dependency arrays',
              'Fetching data inside effects',
            ],
            theory: [
              'Effects are for work that should happen after rendering, such as logging, subscriptions, or remote data fetching.',
              'Dependencies help React know when an effect should run again.',
            ],
            practicalTitle: 'Log and load data in an effect',
            practicalGoal: 'Use an effect to run code after the component appears.',
            practicalSteps: [
              'Create a component with useEffect.',
              'Log a message on mount.',
              'Outline how you would fetch data in the same effect.',
            ],
            starterCode:
              'useEffect(() => {\n  console.log("Component mounted");\n}, []);',
            expectedResult: [
              'The effect runs after the component renders and logs the expected message.',
            ],
            challenge: [
              'Replace the log with a real fetch call in a demo component.',
            ],
            references: ['useEffect', 'Dependencies', 'Side effects'],
            quizQuestion: 'What does an empty dependency array mean in useEffect?',
            quizAnswer: 'The effect should run after the first render and not rerun because of changing dependencies.',
          }),
          createTopic({
            id: 'react-forms-state',
            title: 'Controlled Inputs, Forms, and Lifting State',
            summary: 'Coordinate user input and shared data between components.',
            level: 'Intermediate',
            duration: '1h 45m',
            points: [
              'Controlled form inputs',
              'Input value and onChange',
              'Moving shared state upward',
            ],
            theory: [
              'Controlled inputs keep the displayed value and the React state synchronized.',
              'Lifting state helps multiple child components stay consistent when they depend on the same data.',
            ],
            practicalTitle: 'Build a lesson search field',
            practicalGoal: 'Create a controlled input that filters a list of lessons.',
            practicalSteps: [
              'Store the search query in state.',
              'Update it with onChange.',
              'Filter visible items using the query.',
            ],
            starterCode:
              'const [query, setQuery] = useState("");\n<input value={query} onChange={(e) => setQuery(e.target.value)} />',
            expectedResult: [
              'The input stays synchronized with state and can drive filtering logic.',
            ],
            challenge: [
              'Move the filter state into a parent component and pass it down.',
            ],
            references: ['Controlled inputs', 'onChange', 'Lift state up'],
            quizQuestion: 'When is lifting state up useful?',
            quizAnswer: 'When multiple components need access to the same changing data.',
          }),
        ],
      }),
      createSection({
        id: 'react-architecture',
        title: 'React Architecture and Projects',
        subtitle: 'Component structure, custom hooks, optimization mindset, and final build',
        topics: [
          createTopic({
            id: 'react-custom-hooks',
            title: 'Custom Hooks and Shared Logic',
            summary: 'Extract repeated React behavior into reusable hooks.',
            level: 'Advanced',
            duration: '1h 30m',
            points: [
              'Hook composition',
              'Encapsulating stateful logic',
              'Reusing behavior across screens',
            ],
            theory: [
              'Custom hooks let you reuse logic without copying the same effect and state code into many components.',
              'A hook does not render UI; it packages behavior and state management.',
            ],
            practicalTitle: 'Extract a completion hook',
            practicalGoal: 'Move lesson completion logic out of a component and into a custom hook.',
            practicalSteps: [
              'Identify repeated state logic.',
              'Move it into a useSomething hook function.',
              'Return the values and actions needed by the component.',
            ],
            starterCode:
              'function useCompletion(initialValue = false) {\n  const [done, setDone] = useState(initialValue);\n  return { done, toggle: () => setDone((value) => !value) };\n}',
            expectedResult: [
              'The component becomes slimmer while shared logic remains reusable.',
            ],
            challenge: [
              'Create a custom hook for search filtering or local storage.',
            ],
            references: ['Custom hooks', 'Hook reuse', 'State extraction'],
            quizQuestion: 'What is the main purpose of a custom hook?',
            quizAnswer: 'To reuse stateful React logic across components in a clean, composable way.',
          }),
          createTopic({
            id: 'react-organization',
            title: 'Component Organization and Project Structure',
            summary: 'Keep a React app understandable as it grows.',
            level: 'Advanced',
            duration: '1h 25m',
            points: [
              'Presentational versus container logic',
              'Feature folders',
              'Shared component boundaries',
            ],
            theory: [
              'A growing React project becomes easier to maintain when files are organized around features and responsibilities.',
              'Some components should mostly present data, while others coordinate state and data flow.',
            ],
            practicalTitle: 'Plan a clean feature folder',
            practicalGoal: 'Split a dashboard screen into smaller components and folders.',
            practicalSteps: [
              'List the major UI pieces.',
              'Separate generic shared components from feature-specific ones.',
              'Define where state should live.',
            ],
            starterCode:
              'components/\n  LessonCard.jsx\nfeatures/\n  dashboard/\n    DashboardPage.jsx\n    DashboardFilters.jsx',
            expectedResult: [
              'The project structure reflects what each part is responsible for.',
            ],
            challenge: [
              'Refactor one large screen into at least three smaller components.',
            ],
            references: ['Project structure', 'Feature folders', 'Component boundaries'],
            quizQuestion: 'Why separate shared components from feature-specific components?',
            quizAnswer: 'It makes reuse clearer and keeps feature logic from leaking into unrelated parts of the app.',
          }),
          createTopic({
            id: 'react-capstone',
            title: 'React Dashboard Capstone',
            summary: 'Combine components, hooks, lists, filters, and persisted state in one project.',
            level: 'Advanced',
            duration: '3h',
            points: [
              'Project planning and state shape',
              'Reusable cards and filter controls',
              'Persistence and final cleanup',
            ],
            theory: [
              'A React capstone should show more than JSX knowledge. It should prove that you can think in state, flows, and reusable parts.',
              'The strongest final review checks for duplicated logic, confusing state ownership, and overly large components.',
            ],
            practicalTitle: 'Build a course dashboard',
            practicalGoal: 'Create a React app with filters, completion states, and reusable lessons cards.',
            practicalSteps: [
              'Plan the data model and state ownership.',
              'Build reusable list and filter components.',
              'Add saved progress and perform a final structure review.',
            ],
            starterCode:
              'function App() {\n  const [query, setQuery] = useState("");\n  const [completedIds, setCompletedIds] = useState([]);\n  return <div>Course dashboard</div>;\n}',
            expectedResult: [
              'You finish a React project that feels like a realistic entry-level application.',
            ],
            challenge: [
              'Add a stretch feature such as sort order, tabs, or remote data loading.',
            ],
            references: ['State planning', 'Component structure', 'Capstone review'],
            quizQuestion: 'What should a React capstone demonstrate beyond JSX syntax?',
            quizAnswer: 'It should demonstrate reusable components, thoughtful state management, and a clean project structure.',
          }),
        ],
      }),
    ],
  },
  sql: {
    key: 'sql',
    title: 'SQL Starter Module',
    shortTitle: 'SQL',
    subtitle: 'Queries, filtering, joins, reporting, and data updates',
    description:
      'This SQL roadmap covers the fundamentals of reading, changing, grouping, and relating data across tables in practical reporting scenarios.',
    icon: 'server-outline',
    color: '#A855F7',
    totalHours: '16h',
    focusAreas: ['SELECT', 'Filtering', 'JOINs', 'Reporting'],
    recommendedProject:
      'Build report queries for a learning app database with users, lessons, and progress tracking.',
    sections: [
      createSection({
        id: 'sql-basics',
        title: 'SQL Basics',
        subtitle: 'Tables, select, filters, sorting, and updates',
        topics: [
          createTopic({
            id: 'sql-select',
            title: 'SELECT, WHERE, ORDER BY, and LIMIT',
            summary: 'Read the right rows in the right order.',
            level: 'Beginner',
            duration: '1h 30m',
            points: [
              'Selecting columns',
              'Filtering rows',
              'Sorting and limiting output',
            ],
            theory: [
              'SELECT is the foundation of SQL because it retrieves the data you want to inspect or report on.',
              'ORDER BY and LIMIT make results easier to read and more useful when a table becomes large.',
            ],
            practicalTitle: 'Query completed lessons',
            practicalGoal: 'Return only the lessons that match a completion rule.',
            practicalSteps: [
              'Select only the columns you need.',
              'Filter rows with a WHERE clause.',
              'Order the results and limit the list size.',
            ],
            starterCode:
              'SELECT title, level\nFROM lessons\nWHERE completed = 1\nORDER BY title ASC\nLIMIT 5;',
            expectedResult: [
              'The query returns only completed lessons in alphabetical order.',
            ],
            challenge: [
              'Show only advanced lessons longer than 30 minutes.',
            ],
            references: ['SELECT', 'WHERE', 'ORDER BY'],
            quizQuestion: 'What is the role of the WHERE clause?',
            quizAnswer: 'It filters rows so only matching records are returned.',
          }),
          createTopic({
            id: 'sql-insert-update-delete',
            title: 'INSERT, UPDATE, DELETE, and Safe Data Changes',
            summary: 'Modify table data without changing more rows than intended.',
            level: 'Beginner',
            duration: '1h 35m',
            points: [
              'Adding rows',
              'Updating rows safely',
              'Deleting with care',
            ],
            theory: [
              'Data modification queries are powerful, so careful conditions and previews are important.',
              'A missing WHERE clause can affect many more rows than expected.',
            ],
            practicalTitle: 'Maintain a lessons table',
            practicalGoal: 'Create a row, update a row, and remove a row safely.',
            practicalSteps: [
              'Insert a new lesson.',
              'Update one lesson by id.',
              'Delete one record with an explicit condition.',
            ],
            starterCode:
              'INSERT INTO lessons (title, level) VALUES ("HTML Intro", "Beginner");\nUPDATE lessons SET completed = 1 WHERE id = 3;',
            expectedResult: [
              'The table reflects only the intended row changes.',
            ],
            challenge: [
              'Write a delete query that removes only archived lessons.',
            ],
            references: ['INSERT', 'UPDATE', 'DELETE'],
            quizQuestion: 'Why is UPDATE without WHERE risky?',
            quizAnswer: 'Because it can update every row in the table instead of just the intended record.',
          }),
          createTopic({
            id: 'sql-text-numbers',
            title: 'Text Matching, Numeric Filters, and Basic Conditions',
            summary: 'Create more precise queries by combining search conditions.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'LIKE and wildcard matching',
              'AND and OR conditions',
              'Ranges with comparison operators',
            ],
            theory: [
              'Most real queries combine multiple conditions instead of filtering by only one field.',
              'Text matching and numeric comparisons are the backbone of search and reporting tasks.',
            ],
            practicalTitle: 'Search and segment lessons',
            practicalGoal: 'Return a filtered subset of rows using text and numeric conditions together.',
            practicalSteps: [
              'Use LIKE to search titles.',
              'Add a numeric filter for duration.',
              'Combine multiple conditions with AND or OR.',
            ],
            starterCode:
              'SELECT title, duration_minutes\nFROM lessons\nWHERE title LIKE "%HTML%" AND duration_minutes >= 20;',
            expectedResult: [
              'The result set contains only rows that match both the title and duration conditions.',
            ],
            challenge: [
              'Return lessons that are either advanced or longer than 45 minutes.',
            ],
            references: ['LIKE', 'AND', 'OR'],
            quizQuestion: 'What does LIKE do in SQL?',
            quizAnswer: 'It matches text patterns, often with wildcard characters such as percent signs.',
          }),
        ],
      }),
      createSection({
        id: 'sql-relationships',
        title: 'Relationships and Reporting',
        subtitle: 'JOINs, grouping, aggregation, and report queries',
        topics: [
          createTopic({
            id: 'sql-joins',
            title: 'INNER JOIN and Related Data',
            summary: 'Combine data from multiple tables into useful views.',
            level: 'Intermediate',
            duration: '1h 45m',
            points: [
              'Join conditions',
              'Foreign key relationships',
              'Selecting fields from multiple tables',
            ],
            theory: [
              'Relational databases become powerful when you can connect related tables instead of storing everything in one place.',
              'A correct join condition is essential because the result depends on how records are matched.',
            ],
            practicalTitle: 'Show student progress',
            practicalGoal: 'Combine students, lessons, and progress into one readable query.',
            practicalSteps: [
              'Start from the progress table.',
              'Join students by student_id.',
              'Join lessons by lesson_id and select useful columns.',
            ],
            starterCode:
              'SELECT students.name, lessons.title\nFROM progress\nJOIN students ON progress.student_id = students.id\nJOIN lessons ON progress.lesson_id = lessons.id;',
            expectedResult: [
              'The query returns student names and lesson titles together.',
            ],
            challenge: [
              'Add a WHERE clause to show only completed progress rows.',
            ],
            references: ['INNER JOIN', 'Relationships', 'Joined queries'],
            quizQuestion: 'What is the purpose of a JOIN?',
            quizAnswer: 'It combines related data from two or more tables into one result set.',
          }),
          createTopic({
            id: 'sql-grouping',
            title: 'GROUP BY, COUNT, and Aggregation',
            summary: 'Summarize data instead of listing every row individually.',
            level: 'Intermediate',
            duration: '1h 35m',
            points: [
              'COUNT, SUM, and AVG',
              'Grouping by one field',
              'Using aliases in report output',
            ],
            theory: [
              'Aggregation turns detailed row data into dashboard-style insights.',
              'GROUP BY works best when you want one result per category rather than one result per record.',
            ],
            practicalTitle: 'Count lessons by level',
            practicalGoal: 'Create a distribution report for beginner, intermediate, and advanced lessons.',
            practicalSteps: [
              'Select the category field.',
              'Add COUNT with an alias.',
              'Group by the category and sort the output.',
            ],
            starterCode:
              'SELECT level, COUNT(*) AS total\nFROM lessons\nGROUP BY level\nORDER BY total DESC;',
            expectedResult: [
              'The report shows one row per lesson level with the total count.',
            ],
            challenge: [
              'Calculate the average duration for each lesson level.',
            ],
            references: ['GROUP BY', 'COUNT', 'Aggregation'],
            quizQuestion: 'What does GROUP BY change about a query result?',
            quizAnswer: 'It groups rows into categories so aggregate functions can summarize each category.',
          }),
          createTopic({
            id: 'sql-having-reports',
            title: 'HAVING, Complex Filters, and Report Refinement',
            summary: 'Filter grouped results and build more realistic reports.',
            level: 'Intermediate',
            duration: '1h 25m',
            points: [
              'HAVING after GROUP BY',
              'Filtering aggregated results',
              'Combining WHERE and HAVING',
            ],
            theory: [
              'WHERE filters raw rows before grouping, while HAVING filters grouped results after aggregates are calculated.',
              'Using both together lets you build more focused and realistic reports.',
            ],
            practicalTitle: 'Find busy categories',
            practicalGoal: 'Show only grouped categories that pass a minimum threshold.',
            practicalSteps: [
              'Write a grouped query with COUNT.',
              'Add a HAVING clause for a threshold.',
              'Compare how the result changes with and without HAVING.',
            ],
            starterCode:
              'SELECT level, COUNT(*) AS total\nFROM lessons\nGROUP BY level\nHAVING COUNT(*) >= 3;',
            expectedResult: [
              'Only grouped categories that meet the threshold remain in the result.',
            ],
            challenge: [
              'Filter grouped progress by users who finished more than two lessons.',
            ],
            references: ['HAVING', 'Grouped reports', 'Query refinement'],
            quizQuestion: 'When do you use HAVING instead of WHERE?',
            quizAnswer: 'When you need to filter the results of grouped or aggregated data.',
          }),
        ],
      }),
      createSection({
        id: 'sql-advanced',
        title: 'SQL Practice and Capstone',
        subtitle: 'Subqueries, design mindset, and final reporting projects',
        topics: [
          createTopic({
            id: 'sql-subqueries',
            title: 'Subqueries and Derived Logic',
            summary: 'Use one query inside another to express richer conditions.',
            level: 'Advanced',
            duration: '1h 25m',
            points: [
              'Subqueries in WHERE',
              'Comparing values to summaries',
              'Breaking problems into query steps',
            ],
            theory: [
              'Subqueries can simplify some problems by letting one query feed another with filtered or aggregated data.',
              'They are especially useful when the answer depends on a calculated value such as an average or maximum.',
            ],
            practicalTitle: 'Find above-average lessons',
            practicalGoal: 'Return rows that exceed an aggregate threshold.',
            practicalSteps: [
              'Write a subquery that calculates the average duration.',
              'Compare each lesson against that average.',
              'Return only the rows above the average.',
            ],
            starterCode:
              'SELECT title, duration_minutes\nFROM lessons\nWHERE duration_minutes > (\n  SELECT AVG(duration_minutes)\n  FROM lessons\n);',
            expectedResult: [
              'The result contains only lessons that are longer than the average duration.',
            ],
            challenge: [
              'Find students whose completed lesson count is above the average student count.',
            ],
            references: ['Subqueries', 'Averages', 'Nested queries'],
            quizQuestion: 'Why might a subquery be useful?',
            quizAnswer: 'It lets one query depend on the result of another query, such as a summary or filtered set.',
          }),
          createTopic({
            id: 'sql-schema-thinking',
            title: 'Table Design, Keys, and Data Modeling Basics',
            summary: 'Understand how query quality depends on good data structure.',
            level: 'Advanced',
            duration: '1h 20m',
            points: [
              'Primary keys',
              'Foreign keys',
              'Separating related data into tables',
            ],
            theory: [
              'Well-designed tables make queries easier to write and less prone to duplication errors.',
              'Keys define identity and relationships, which is why they sit at the center of relational modeling.',
            ],
            practicalTitle: 'Sketch a learning app schema',
            practicalGoal: 'Design tables for users, lessons, and progress.',
            practicalSteps: [
              'List the entities you need.',
              'Define the primary key for each table.',
              'Add the foreign key relationships between them.',
            ],
            starterCode:
              'users(id, name)\nlessons(id, title, level)\nprogress(id, user_id, lesson_id, completed)',
            expectedResult: [
              'The data model reflects clear relationships without repeating everything in one table.',
            ],
            challenge: [
              'Add a table for study sessions or quiz attempts.',
            ],
            references: ['Primary keys', 'Foreign keys', 'Data modeling'],
            quizQuestion: 'What is the role of a primary key?',
            quizAnswer: 'It uniquely identifies each row in a table.',
          }),
          createTopic({
            id: 'sql-capstone',
            title: 'SQL Reporting Capstone',
            summary: 'Build a realistic set of report queries for a small product scenario.',
            level: 'Advanced',
            duration: '2h 30m',
            points: [
              'Progress dashboards',
              'Completion reports',
              'Query organization and validation',
            ],
            theory: [
              'A strong SQL capstone shows that you can move from isolated syntax drills to useful business-style reports.',
              'Validation matters because a syntactically correct query can still answer the wrong business question.',
            ],
            practicalTitle: 'Create a learning analytics report set',
            practicalGoal: 'Write a group of queries that answer progress, engagement, and completion questions.',
            practicalSteps: [
              'Write a report for completed lessons by user.',
              'Write a report for lessons by difficulty.',
              'Review each query for accuracy and clarity.',
            ],
            starterCode:
              'SELECT users.name, COUNT(*) AS completed_lessons\nFROM progress\nJOIN users ON progress.user_id = users.id\nWHERE progress.completed = 1\nGROUP BY users.name;',
            expectedResult: [
              'You end up with a small portfolio of practical SQL reports.',
            ],
            challenge: [
              'Add one report for unfinished lessons or inactive users.',
            ],
            references: ['Reporting', 'Validation', 'Capstone planning'],
            quizQuestion: 'What should a SQL capstone prove?',
            quizAnswer: 'It should prove that you can answer real data questions accurately, not just write isolated SQL syntax.',
          }),
        ],
      }),
    ],
  },
  nodejs: {
    key: 'nodejs',
    title: 'Node.js Starter Module',
    shortTitle: 'Node.js',
    subtitle: 'Runtime basics, modules, file work, APIs, validation, and backend structure',
    description:
      'This Node.js roadmap introduces server-side JavaScript, file system work, API thinking, package scripts, and basic project structure.',
    icon: 'terminal-outline',
    color: '#84CC16',
    totalHours: '18h',
    focusAreas: ['Runtime', 'Modules', 'Files', 'APIs'],
    recommendedProject:
      'Build a small API for lessons and progress tracking with validation, routes, and a file-backed data layer.',
    sections: [
      createSection({
        id: 'node-foundation',
        title: 'Node.js Foundation',
        subtitle: 'Runtime basics, scripts, modules, packages, and file access',
        topics: [
          createTopic({
            id: 'node-runtime',
            title: 'Node Runtime and Simple Scripts',
            summary: 'Understand what changes when JavaScript runs outside the browser.',
            level: 'Beginner',
            duration: '1h 25m',
            points: [
              'Node as a JavaScript runtime',
              'Running scripts from the terminal',
              'Environment differences versus the browser',
            ],
            theory: [
              'Node lets JavaScript run on the server or in command-line tools instead of only inside the browser.',
              'Once you understand the runtime shift, backend and automation tasks become far easier to reason about.',
            ],
            practicalTitle: 'Create a CLI summary script',
            practicalGoal: 'Run a Node file that prints lesson information to the terminal.',
            practicalSteps: [
              'Create a JavaScript file for Node.',
              'Add an array of lessons.',
              'Print a summary message using console.log.',
            ],
            starterCode:
              'const lessons = ["HTML", "CSS", "JavaScript"];\nconsole.log(`Total lessons: ${lessons.length}`);',
            expectedResult: [
              'Running the script in Node prints the expected lesson count.',
            ],
            challenge: [
              'Read a name from process arguments and print it back.',
            ],
            references: ['Node runtime', 'CLI scripts', 'process arguments'],
            quizQuestion: 'What is one key difference between Node and browser JavaScript?',
            quizAnswer: 'Node runs outside the browser and can access server-side features such as the file system.',
          }),
          createTopic({
            id: 'node-modules-packages',
            title: 'Modules, package.json, and npm Scripts',
            summary: 'Organize code and use package scripts to standardize project tasks.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'Importing or requiring code',
              'package.json basics',
              'Reusable npm scripts',
            ],
            theory: [
              'Modules help split code by responsibility, while package scripts make routine project commands easier to remember and share.',
              'A package file documents how a project runs and which dependencies it needs.',
            ],
            practicalTitle: 'Define a project script',
            practicalGoal: 'Create a package script that runs a server or utility file.',
            practicalSteps: [
              'Add a script entry in package.json.',
              'Point it to a Node file.',
              'Run the script through npm or yarn.',
            ],
            starterCode:
              '{\n  "scripts": {\n    "dev": "node server.js"\n  }\n}',
            expectedResult: [
              'The project can start through a named script instead of a long command.',
            ],
            challenge: [
              'Add a second script for a seed or report file.',
            ],
            references: ['Modules', 'package.json', 'Scripts'],
            quizQuestion: 'Why are project scripts useful?',
            quizAnswer: 'They give the team a standard way to run common tasks without memorizing raw commands.',
          }),
          createTopic({
            id: 'node-files',
            title: 'File System and Local Data Storage',
            summary: 'Read and write local files for simple backend tools or demos.',
            level: 'Beginner',
            duration: '1h 35m',
            points: [
              'Reading files',
              'Writing files',
              'Parsing JSON data',
            ],
            theory: [
              'File access is one of the clearest examples of why Node is useful outside the browser.',
              'Simple file-backed tools are a good bridge between command-line scripts and full database-backed backends.',
            ],
            practicalTitle: 'Read a JSON data file',
            practicalGoal: 'Load a local file and parse it as structured data.',
            practicalSteps: [
              'Import the file system module.',
              'Read the target file.',
              'Parse the contents with JSON.parse.',
            ],
            starterCode:
              'const fs = require("fs");\nconst raw = fs.readFileSync("./data.json", "utf-8");\nconst data = JSON.parse(raw);\nconsole.log(data);',
            expectedResult: [
              'The script prints the parsed JSON content to the terminal.',
            ],
            challenge: [
              'Write an updated version of the data back to a new file.',
            ],
            references: ['fs module', 'JSON parsing', 'Local data'],
            quizQuestion: 'Why is JSON.parse needed after reading a JSON file as text?',
            quizAnswer: 'Because file reads return text, and JSON.parse turns that text into a JavaScript object or array.',
          }),
        ],
      }),
      createSection({
        id: 'node-api',
        title: 'Node API Basics',
        subtitle: 'HTTP, routing, requests, responses, and validation',
        topics: [
          createTopic({
            id: 'node-http',
            title: 'HTTP Fundamentals and Route Thinking',
            summary: 'Understand the request-response model that powers web APIs.',
            level: 'Intermediate',
            duration: '1h 35m',
            points: [
              'Requests and responses',
              'HTTP methods',
              'Route responsibilities',
            ],
            theory: [
              'Backend development is largely about receiving requests, applying logic, and sending a response with the right data and status.',
              'Different routes should have clear purposes so APIs stay understandable as they grow.',
            ],
            practicalTitle: 'Plan a lessons API',
            practicalGoal: 'Sketch the endpoints needed for a small learning product.',
            practicalSteps: [
              'List read and write actions.',
              'Assign GET and POST routes.',
              'Describe what each route should return.',
            ],
            starterCode:
              'GET /lessons\nGET /lessons/:id\nPOST /lessons\nPATCH /lessons/:id',
            expectedResult: [
              'You have a simple route map that matches common product actions.',
            ],
            challenge: [
              'Add a route for lesson progress by user.',
            ],
            references: ['HTTP methods', 'Requests and responses', 'Route planning'],
            quizQuestion: 'What is the main job of a backend route?',
            quizAnswer: 'To receive a request, apply the correct logic, and return an appropriate response.',
          }),
          createTopic({
            id: 'node-json-api',
            title: 'JSON Responses and Basic API Handlers',
            summary: 'Return useful data structures from a Node backend.',
            level: 'Intermediate',
            duration: '1h 30m',
            points: [
              'JSON payloads',
              'Status codes',
              'Shaping response objects',
            ],
            theory: [
              'JSON is the most common format used between frontend and backend applications.',
              'A good API response includes not only data, but also a clear status and predictable structure.',
            ],
            practicalTitle: 'Return a lesson list',
            practicalGoal: 'Create a handler that returns static lesson data as JSON.',
            practicalSteps: [
              'Define a route handler.',
              'Return an array of lessons.',
              'Test the response shape.',
            ],
            starterCode:
              'app.get("/courses", (req, res) => {\n  res.json([{ id: 1, title: "HTML" }]);\n});',
            expectedResult: [
              'A request to the route returns a JSON array of lesson objects.',
            ],
            challenge: [
              'Add a route that returns one lesson by id.',
            ],
            references: ['JSON APIs', 'Status codes', 'Response shape'],
            quizQuestion: 'Why is JSON common in web APIs?',
            quizAnswer: 'Because it is lightweight, readable, and easy for JavaScript applications to parse and generate.',
          }),
          createTopic({
            id: 'node-validation',
            title: 'Validation, Error Responses, and Clean Input Handling',
            summary: 'Protect your API from incomplete or invalid requests.',
            level: 'Intermediate',
            duration: '1h 35m',
            points: [
              'Required field checks',
              '400 responses for bad input',
              'Simple validation flow',
            ],
            theory: [
              'Backend validation is essential because clients can send incomplete, unexpected, or malicious input.',
              'Clear error responses help the frontend and the developer understand what went wrong.',
            ],
            practicalTitle: 'Validate a create route',
            practicalGoal: 'Reject invalid request data before saving it.',
            practicalSteps: [
              'Check for a required title field.',
              'Return a 400 response when it is missing.',
              'Return the created item when validation passes.',
            ],
            starterCode:
              'app.post("/courses", (req, res) => {\n  const { title } = req.body;\n  if (!title) {\n    return res.status(400).json({ message: "Title is required" });\n  }\n  res.status(201).json({ title });\n});',
            expectedResult: [
              'Bad requests receive a clear error instead of silently creating broken data.',
            ],
            challenge: [
              'Validate duration and difficulty fields as well.',
            ],
            references: ['Validation', '400 errors', 'Request bodies'],
            quizQuestion: 'Why should invalid input usually return a 400-level response?',
            quizAnswer: 'Because the problem is with the client request data rather than the server itself.',
          }),
        ],
      }),
      createSection({
        id: 'node-architecture',
        title: 'Node Architecture and Capstone',
        subtitle: 'Middleware thinking, file-backed APIs, and final project structure',
        topics: [
          createTopic({
            id: 'node-middleware',
            title: 'Middleware and Shared Request Logic',
            summary: 'Move repeated backend logic into reusable layers.',
            level: 'Advanced',
            duration: '1h 25m',
            points: [
              'Request pipelines',
              'Shared validation or logging',
              'Keeping route handlers smaller',
            ],
            theory: [
              'Middleware is useful because many backend tasks repeat across routes, such as logging, parsing, or authentication-related checks.',
              'Shared logic becomes easier to maintain when it is centralized instead of copied into every handler.',
            ],
            practicalTitle: 'Create a simple logger middleware',
            practicalGoal: 'Add one reusable function that runs before route handlers.',
            practicalSteps: [
              'Write a middleware function.',
              'Log the request method and URL.',
              'Call next so the request continues.',
            ],
            starterCode:
              'function logger(req, res, next) {\n  console.log(req.method, req.url);\n  next();\n}',
            expectedResult: [
              'Every request triggers a shared log before the route handler responds.',
            ],
            challenge: [
              'Add middleware that checks for a required header in development.',
            ],
            references: ['Middleware', 'Request pipeline', 'Shared logic'],
            quizQuestion: 'What problem does middleware solve?',
            quizAnswer: 'It centralizes repeated request logic so route handlers stay smaller and more focused.',
          }),
          createTopic({
            id: 'node-project-structure',
            title: 'Project Structure, Controllers, and Services',
            summary: 'Split backend logic into clearer layers as features grow.',
            level: 'Advanced',
            duration: '1h 30m',
            points: [
              'Routes versus controllers',
              'Service-like logic separation',
              'Shared utilities',
            ],
            theory: [
              'As projects expand, route files become easier to manage when business logic is extracted into dedicated functions or modules.',
              'Clear layers make testing and refactoring simpler later.',
            ],
            practicalTitle: 'Plan a small backend folder layout',
            practicalGoal: 'Separate route definitions from course logic and file helpers.',
            practicalSteps: [
              'Identify the main backend responsibilities.',
              'Create folders for routes, controllers, and utilities.',
              'Move one piece of logic into its own file.',
            ],
            starterCode:
              'routes/\n  lessons.js\ncontrollers/\n  lessonsController.js\nservices/\n  lessonService.js',
            expectedResult: [
              'The backend structure becomes easier to read and scale.',
            ],
            challenge: [
              'Move validation helpers into a separate shared file.',
            ],
            references: ['Project structure', 'Controllers', 'Services'],
            quizQuestion: 'Why separate route definitions from business logic?',
            quizAnswer: 'It keeps each file focused and makes the backend easier to maintain as features grow.',
          }),
          createTopic({
            id: 'node-capstone',
            title: 'Node API Capstone',
            summary: 'Build a small API with routes, validation, persistence, and structure.',
            level: 'Advanced',
            duration: '2h 45m',
            points: [
              'Route design',
              'Validation and storage',
              'Final cleanup and review',
            ],
            theory: [
              'A Node capstone is most useful when it demonstrates both runtime basics and thoughtful backend structure.',
              'The final review should inspect route purpose, validation coverage, response shape, and code duplication.',
            ],
            practicalTitle: 'Build a lesson progress API',
            practicalGoal: 'Create a small backend that reads and updates lessons and progress entries.',
            practicalSteps: [
              'Plan the route list.',
              'Create file-backed data helpers or mock data.',
              'Add validation and review the project organization.',
            ],
            starterCode:
              'app.get("/progress", (req, res) => {\n  res.json([]);\n});',
            expectedResult: [
              'You finish a small but realistic backend learning project.',
            ],
            challenge: [
              'Add one optional filter query parameter such as difficulty or completion.',
            ],
            references: ['API planning', 'Validation', 'Project cleanup'],
            quizQuestion: 'What should a Node capstone show besides basic route syntax?',
            quizAnswer: 'It should show clean structure, request validation, and a useful backend flow.',
          }),
        ],
      }),
    ],
  },
  bootstrap: {
    key: 'bootstrap',
    title: 'Bootstrap Starter Module',
    shortTitle: 'Bootstrap',
    subtitle: 'Grid systems, utilities, components, forms, and fast responsive page building',
    description:
      'This Bootstrap roadmap focuses on quickly assembling responsive layouts with the grid system, utilities, components, and thoughtful customization.',
    icon: 'layers-outline',
    color: '#F43F5E',
    totalHours: '14h',
    focusAreas: ['Grid', 'Utilities', 'Components', 'Customization'],
    recommendedProject:
      'Build a responsive course website using Bootstrap containers, cards, forms, navbars, and brand-level customization.',
    sections: [
      createSection({
        id: 'bootstrap-foundation',
        title: 'Bootstrap Foundation',
        subtitle: 'Setup, containers, grid, spacing, and utility classes',
        topics: [
          createTopic({
            id: 'bootstrap-grid',
            title: 'Bootstrap Setup, Containers, and Grid',
            summary: 'Use Bootstrap to create fast responsive layout structure.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'Container and container-fluid',
              'Rows and columns',
              'Breakpoint-based layout behavior',
            ],
            theory: [
              'Bootstrap is designed to speed up responsive UI work with prebuilt layout and component patterns.',
              'The grid is one of the framework core strengths because it gives predictable responsive structure very quickly.',
            ],
            practicalTitle: 'Build a three-card layout',
            practicalGoal: 'Use rows and columns to create a responsive section.',
            practicalSteps: [
              'Create a container.',
              'Add a row with a gap.',
              'Create three responsive columns.',
            ],
            starterCode:
              '<div class="container">\n  <div class="row g-3">\n    <div class="col-md-4">Card 1</div>\n    <div class="col-md-4">Card 2</div>\n    <div class="col-md-4">Card 3</div>\n  </div>\n</div>',
            expectedResult: [
              'The cards stack on smaller screens and sit in columns on larger screens.',
            ],
            challenge: [
              'Add a fourth card and observe how wrapping behaves.',
            ],
            references: ['Containers', 'Grid', 'Breakpoints'],
            quizQuestion: 'What is the purpose of the Bootstrap grid system?',
            quizAnswer: 'It helps you create responsive rows and columns quickly across different screen sizes.',
          }),
          createTopic({
            id: 'bootstrap-utilities',
            title: 'Spacing, Typography, and Utility Classes',
            summary: 'Style common UI patterns quickly without writing much custom CSS.',
            level: 'Beginner',
            duration: '1h 15m',
            points: [
              'Padding and margin utilities',
              'Text helpers and colors',
              'Background, display, and border utilities',
            ],
            theory: [
              'Bootstrap utilities are useful because they let you build and adjust interfaces quickly without leaving the markup constantly.',
              'Utility classes work best when they remain intentional rather than becoming random class noise.',
            ],
            practicalTitle: 'Style a promo card with utilities',
            practicalGoal: 'Build a visually improved block using only Bootstrap utility classes.',
            practicalSteps: [
              'Add spacing and background classes.',
              'Style text with color and typography utilities.',
              'Use border radius and shadow helpers.',
            ],
            starterCode:
              '<div class="p-4 rounded-4 shadow-sm bg-light">\n  <h2 class="text-primary">Learn Faster</h2>\n  <p class="text-secondary mb-0">Use Bootstrap utilities for rapid UI.</p>\n</div>',
            expectedResult: [
              'The block feels polished even without custom CSS rules.',
            ],
            challenge: [
              'Create a dark version using utility classes only.',
            ],
            references: ['Spacing utilities', 'Text helpers', 'Background utilities'],
            quizQuestion: 'Why are Bootstrap utility classes useful?',
            quizAnswer: 'They let you apply common layout and visual styles quickly without writing custom CSS for every small adjustment.',
          }),
          createTopic({
            id: 'bootstrap-responsive',
            title: 'Responsive Utilities and Layout Variations',
            summary: 'Adjust visibility and layout details across breakpoints.',
            level: 'Beginner',
            duration: '1h 10m',
            points: [
              'Responsive column widths',
              'Display utilities per breakpoint',
              'Spacing changes across screen sizes',
            ],
            theory: [
              'Bootstrap responsiveness is based on named breakpoints, which makes common layout adjustments easy to read and maintain.',
              'Different components often need different visibility or spacing at different widths.',
            ],
            practicalTitle: 'Adapt a hero section for mobile and desktop',
            practicalGoal: 'Use Bootstrap classes to change spacing and structure across breakpoints.',
            practicalSteps: [
              'Set one-column layout for small screens.',
              'Switch to multi-column layout at medium or large widths.',
              'Adjust padding values across breakpoints.',
            ],
            starterCode:
              '<section class="container py-4 py-md-5">\n  <div class="row align-items-center">\n    <div class="col-12 col-md-6">Hero copy</div>\n    <div class="col-12 col-md-6">Visual</div>\n  </div>\n</section>',
            expectedResult: [
              'The hero changes shape naturally between small and larger screens.',
            ],
            challenge: [
              'Hide one decorative element on smaller screens.',
            ],
            references: ['Responsive classes', 'Display utilities', 'Breakpoint spacing'],
            quizQuestion: 'What do responsive utility classes help you control?',
            quizAnswer: 'They help you change layout, spacing, or visibility depending on the screen size.',
          }),
        ],
      }),
      createSection({
        id: 'bootstrap-components',
        title: 'Bootstrap Components',
        subtitle: 'Navbars, cards, forms, buttons, and interactive building blocks',
        topics: [
          createTopic({
            id: 'bootstrap-navbars',
            title: 'Navbars, Menus, and Layout Shells',
            summary: 'Build a recognizable top navigation pattern quickly.',
            level: 'Intermediate',
            duration: '1h 20m',
            points: [
              'Navbar structure',
              'Branding and links',
              'Responsive collapse concept',
            ],
            theory: [
              'The navbar is one of the most common Bootstrap components because it gives a fast way to create a product shell.',
              'Responsive navigation matters because the same set of links often needs a different presentation on small screens.',
            ],
            practicalTitle: 'Create a site navigation shell',
            practicalGoal: 'Build a simple navbar with branding and route links.',
            practicalSteps: [
              'Add the navbar wrapper.',
              'Insert a brand label and links.',
              'Prepare the structure for responsive collapse.',
            ],
            starterCode:
              '<nav class="navbar navbar-expand-lg bg-white">\n  <div class="container">\n    <a class="navbar-brand" href="#">LearnHub</a>\n  </div>\n</nav>',
            expectedResult: [
              'The page gains a clean top navigation shell with a clear brand anchor.',
            ],
            challenge: [
              'Add a call-to-action button inside the navbar.',
            ],
            references: ['Navbar', 'Responsive navigation', 'Layout shell'],
            quizQuestion: 'Why is navbar structure important in a web page?',
            quizAnswer: 'It gives users a consistent entry point for branding, navigation, and key actions.',
          }),
          createTopic({
            id: 'bootstrap-cards-buttons',
            title: 'Cards, Buttons, and Content Blocks',
            summary: 'Assemble reusable content containers quickly with Bootstrap classes.',
            level: 'Intermediate',
            duration: '1h 15m',
            points: [
              'Card structure',
              'Button variants',
              'Spacing and grouping patterns',
            ],
            theory: [
              'Cards are useful because they package content into clear visual units that repeat well in dashboards and marketing pages.',
              'Buttons should feel related to the rest of the design system even when they come from a framework.',
            ],
            practicalTitle: 'Create a course card grid',
            practicalGoal: 'Display multiple course cards with a primary action button.',
            practicalSteps: [
              'Add a Bootstrap card structure.',
              'Create a title, copy, and button inside each card.',
              'Place multiple cards in a responsive grid.',
            ],
            starterCode:
              '<div class="card shadow-sm">\n  <div class="card-body">\n    <h3 class="card-title">HTML Basics</h3>\n    <p class="card-text">Learn structure, tags, and semantics.</p>\n    <a class="btn btn-primary" href="#">Start</a>\n  </div>\n</div>',
            expectedResult: [
              'The cards look consistent and are ready to repeat as a list.',
            ],
            challenge: [
              'Add a badge or footer section to the card.',
            ],
            references: ['Cards', 'Buttons', 'Content blocks'],
            quizQuestion: 'Why are cards useful in UI design?',
            quizAnswer: 'They organize repeated content into clear, reusable visual units.',
          }),
          createTopic({
            id: 'bootstrap-forms',
            title: 'Forms, Inputs, and Validation Styles',
            summary: 'Build practical forms with Bootstrap form controls and feedback states.',
            level: 'Intermediate',
            duration: '1h 25m',
            points: [
              'Form groups and labels',
              'Control styling',
              'Validation feedback patterns',
            ],
            theory: [
              'Bootstrap form controls provide a consistent baseline that speeds up UI work and reduces setup friction.',
              'Validation styling still needs thoughtful content and clear labels to feel complete.',
            ],
            practicalTitle: 'Build a signup form block',
            practicalGoal: 'Create a styled form section with inputs and an action button.',
            practicalSteps: [
              'Add labeled form controls.',
              'Use spacing utilities to group fields.',
              'Add a submit button and validation-ready markup.',
            ],
            starterCode:
              '<div class="mb-3">\n  <label class="form-label" for="email">Email</label>\n  <input class="form-control" id="email" type="email" />\n</div>',
            expectedResult: [
              'The form looks clean and follows Bootstrap field styling.',
            ],
            challenge: [
              'Add a helper text or invalid feedback message.',
            ],
            references: ['Forms', 'Form controls', 'Validation'],
            quizQuestion: 'What makes a form feel more complete than just having inputs on a page?',
            quizAnswer: 'Clear labels, spacing, feedback states, and a coherent action flow.',
          }),
        ],
      }),
      createSection({
        id: 'bootstrap-customization',
        title: 'Bootstrap Customization and Capstone',
        subtitle: 'Theme direction, overrides, hybrid styling, and final project work',
        topics: [
          createTopic({
            id: 'bootstrap-customization',
            title: 'Customization, Overrides, and Brand Direction',
            summary: 'Use Bootstrap without letting the interface feel generic.',
            level: 'Advanced',
            duration: '1h 20m',
            points: [
              'Adding brand-specific classes',
              'Overriding component defaults',
              'Combining utilities with custom CSS',
            ],
            theory: [
              'Bootstrap speeds up development, but thoughtful customization is what makes a product feel intentional rather than templated.',
              'Overrides work best when they are targeted and consistent instead of scattered across many files.',
            ],
            practicalTitle: 'Theme a Bootstrap page',
            practicalGoal: 'Apply custom brand colors and spacing decisions on top of Bootstrap components.',
            practicalSteps: [
              'Create one brand button class.',
              'Adjust card corners or shadows with custom CSS.',
              'Blend Bootstrap utilities with your own component rules.',
            ],
            starterCode:
              '.btn-brand {\n  background: #0f172a;\n  color: #ffffff;\n}\n\n.course-card {\n  border-radius: 24px;\n}',
            expectedResult: [
              'The interface still benefits from Bootstrap but feels more product-specific.',
            ],
            challenge: [
              'Create a hero section that does not look like a default Bootstrap demo.',
            ],
            references: ['Overrides', 'Brand direction', 'Hybrid styling'],
            quizQuestion: 'Why is customization important when using Bootstrap?',
            quizAnswer: 'It helps the interface feel branded and intentional instead of generic.',
          }),
          createTopic({
            id: 'bootstrap-layout-patterns',
            title: 'Page Sections, Marketing Layouts, and Reusable Patterns',
            summary: 'Combine Bootstrap pieces into complete page sections.',
            level: 'Advanced',
            duration: '1h 15m',
            points: [
              'Hero sections',
              'Feature grids',
              'Call-to-action blocks',
            ],
            theory: [
              'A framework becomes much more valuable when you can assemble many small utilities and components into complete sections.',
              'Reusable layout patterns help you build new pages faster while keeping a consistent structure.',
            ],
            practicalTitle: 'Create a small marketing page',
            practicalGoal: 'Build a hero, features, and final call-to-action section using Bootstrap patterns.',
            practicalSteps: [
              'Create a hero row with copy and visual space.',
              'Add a feature card section.',
              'Finish with a clear action block.',
            ],
            starterCode:
              '<section class="container py-5">\n  <div class="row g-4 align-items-center">\n    <div class="col-md-6">\n      <h1>Learn Web Skills Faster</h1>\n    </div>\n    <div class="col-md-6">Visual area</div>\n  </div>\n</section>',
            expectedResult: [
              'You end up with a page that feels like more than disconnected Bootstrap parts.',
            ],
            challenge: [
              'Add a testimonials or pricing section beneath the features.',
            ],
            references: ['Hero sections', 'Feature layouts', 'CTA blocks'],
            quizQuestion: 'What is a reusable layout pattern?',
            quizAnswer: 'A repeatable section structure that can be adapted across different pages or products.',
          }),
          createTopic({
            id: 'bootstrap-capstone',
            title: 'Bootstrap Course Site Capstone',
            summary: 'Build a complete responsive page with utilities, components, and custom polish.',
            level: 'Advanced',
            duration: '2h 30m',
            points: [
              'Page planning',
              'Component assembly',
              'Customization and final review',
            ],
            theory: [
              'A Bootstrap capstone should show that you can move beyond copying framework snippets and instead assemble them into a cohesive experience.',
              'The final review should check consistency, spacing, responsiveness, and how much generic styling remains.',
            ],
            practicalTitle: 'Build a course website landing page',
            practicalGoal: 'Create a branded landing page using Bootstrap components and custom CSS where needed.',
            practicalSteps: [
              'Plan the page sections and navigation.',
              'Build the layout with the grid and components.',
              'Customize the result so it feels intentional and complete.',
            ],
            starterCode:
              '<main>\n  <section class="container py-5">\n    <h1 class="display-5">Frontend Learning Paths</h1>\n    <p class="lead">Structured modules for HTML, CSS, and JavaScript.</p>\n  </section>\n</main>',
            expectedResult: [
              'The final project feels like a complete responsive website rather than a style exercise.',
            ],
            challenge: [
              'Write down three places where custom CSS improved the Bootstrap baseline.',
            ],
            references: ['Capstone planning', 'Responsive review', 'Customization pass'],
            quizQuestion: 'What should a Bootstrap capstone prove?',
            quizAnswer: 'It should prove that you can use the framework quickly while still creating a polished, branded, responsive interface.',
          }),
        ],
      }),
    ],
  },
};

const addExpansionHours = (totalHours: string) => {
  const currentHours = Number.parseInt(totalHours, 10);
  return Number.isNaN(currentHours) ? totalHours : `${currentHours + 5}h`;
};

export const LEARNING_ROADMAPS: Record<LanguageKey, LanguageRoadmap> =
  LANGUAGE_ORDER.reduce((roadmaps, key) => {
    const roadmap = BASE_LEARNING_ROADMAPS[key];

    roadmaps[key] = {
      ...roadmap,
      totalHours: addExpansionHours(roadmap.totalHours),
      sections: [...roadmap.sections, PRACTICE_EXPANSION_SECTIONS[key]],
    };

    return roadmaps;
  }, {} as Record<LanguageKey, LanguageRoadmap>);

export const getTopicsForLanguage = (languageKey: LanguageKey): TopicItem[] =>
  LEARNING_ROADMAPS[languageKey].sections.flatMap((section) => section.topics);

export const getTopicCountForLanguage = (languageKey: LanguageKey): number =>
  getTopicsForLanguage(languageKey).length;

export const getTotalTopicCount = (): number =>
  LANGUAGE_ORDER.reduce((total, key) => total + getTopicCountForLanguage(key), 0);
