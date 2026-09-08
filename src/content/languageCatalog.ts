import { LanguageCategory, LanguageKey, LanguageMetadata, TopicLevel } from './types';
import { EXPANDED_TOPIC_METADATA } from './languages/expandedMetadata';
import { PHASE5_TOPIC_METADATA } from './languages/phase5Metadata';
import { PHASE7_TOPIC_METADATA } from './languages/phase7Metadata';

export type { LanguageKey, LanguageMetadata } from './types';
export type { LanguageCategory } from './types';

export const LANGUAGE_CATEGORIES: LanguageCategory[] = ['Web', 'Backend', 'Database', 'Systems', 'Enterprise', 'Mobile'];
const CATEGORY_BY_LANGUAGE: Record<LanguageKey, LanguageCategory> = {
  html: 'Web', css: 'Web', javascript: 'Web', typescript: 'Web', react: 'Web', bootstrap: 'Web',
  python: 'Backend', nodejs: 'Backend', php: 'Backend', ruby: 'Backend', go: 'Backend', sql: 'Database',
  c: 'Systems', cpp: 'Systems', rust: 'Systems', java: 'Enterprise', csharp: 'Enterprise',
  kotlin: 'Mobile', swift: 'Mobile', dartflutter: 'Mobile',
};

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
];

export const LEVEL_FILTERS: Array<TopicLevel | 'All'> = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const BASE_LANGUAGE_CATALOG: LanguageMetadata[] = [
  {
    key: 'html',
    title: 'HTML Learning Module',
    shortTitle: 'HTML',
    subtitle: 'Markup, semantics, forms, media, and production-ready page structure',
    description: 'This HTML roadmap starts with document structure and steadily moves into semantic layout, forms, media, APIs, accessibility, and real page-building practice.',
    icon: 'logo-html5',
    color: '#F97316',
    totalHours: '39h',
    focusAreas: ["Page Structure","Forms","Semantic Layout","Accessibility"],
    recommendedProject: 'Build a multi-page portfolio website with navigation, media, tables, forms, and accessibility checks.',
    topicCount: 19,
    topicIds: ["html-home","html-introduction","html-editors","html-text-basics","html-attributes","html-formatting","html-comments-entities","html-seo-meta","html-semantic-layout","html-media","html-tables","html-forms","html-responsive","html-web-apis","html-accessibility","html-capstone","html-production-checklist","html-debugging-workflow","html-capstone-review"],
    topics: [{"id":"html-home","title":"HTML Home and Document Skeleton","summary":"Learn how a browser reads and renders an HTML page.","level":"Beginner","duration":"1h 15m"},{"id":"html-introduction","title":"Elements, Tags, Attributes, and Nesting","summary":"Understand the core building blocks of HTML.","level":"Beginner","duration":"1h 40m"},{"id":"html-editors","title":"Editors, File Paths, and Live Preview","summary":"Set up a practical workflow for writing and previewing HTML.","level":"Beginner","duration":"1h 10m"},{"id":"html-text-basics","title":"Headings, Paragraphs, Lists, and Links","summary":"Create readable page content with the right structural elements.","level":"Beginner","duration":"1h 45m"},{"id":"html-attributes","title":"Global Attributes, IDs, Classes, and Inline Styles","summary":"Control behavior, identify elements, and attach styles safely.","level":"Beginner","duration":"1h 25m"},{"id":"html-formatting","title":"Formatting Tags, Quotations, and Code Content","summary":"Add meaning to text instead of styling with generic tags only.","level":"Beginner","duration":"1h 20m"},{"id":"html-comments-entities","title":"Comments, Character Entities, and Symbols","summary":"Document your markup and display special characters correctly.","level":"Beginner","duration":"1h 5m"},{"id":"html-seo-meta","title":"Meta Tags, SEO Basics, and Social Sharing","summary":"Improve discoverability and preview quality for your pages.","level":"Intermediate","duration":"1h 30m"},{"id":"html-semantic-layout","title":"Semantic Layout and Landmark Elements","summary":"Build meaningful page structure using semantic sections.","level":"Intermediate","duration":"1h 50m"},{"id":"html-media","title":"Images, Audio, Video, and Iframes","summary":"Add rich content while keeping it accessible and organized.","level":"Intermediate","duration":"1h 45m"},{"id":"html-tables","title":"Tables, Lists, and Structured Data","summary":"Represent organized information with the correct elements.","level":"Intermediate","duration":"1h 35m"},{"id":"html-forms","title":"Forms, Inputs, and Validation","summary":"Collect user information with clear labels and useful browser validation.","level":"Intermediate","duration":"2h 20m"},{"id":"html-responsive","title":"Responsive HTML, Picture, and Source Selection","summary":"Prepare markup for different screen sizes and devices.","level":"Advanced","duration":"1h 30m"},{"id":"html-web-apis","title":"Useful HTML Patterns for Web APIs","summary":"Prepare markup that works well with browser features and JavaScript APIs.","level":"Advanced","duration":"1h 40m"},{"id":"html-accessibility","title":"Accessibility, ARIA Basics, and Keyboard Flow","summary":"Review the markup decisions that make pages more inclusive.","level":"Advanced","duration":"1h 50m"},{"id":"html-capstone","title":"HTML Capstone Project and Review","summary":"Bring everything together in a complete multi-section website.","level":"Advanced","duration":"3h 30m"},{"id":"html-production-checklist","title":"HTML Production Checklist","summary":"Turn HTML knowledge into a repeatable quality checklist.","level":"Intermediate","duration":"1h 20m"},{"id":"html-debugging-workflow","title":"HTML Debugging Workflow","summary":"Use a calm, step-by-step debugging process for HTML problems.","level":"Intermediate","duration":"1h 30m"},{"id":"html-capstone-review","title":"HTML Capstone Review","summary":"Finish a complete HTML task and review it like a real project handoff.","level":"Advanced","duration":"2h 10m"}],
    levelCounts: {"Beginner":7,"Intermediate":7,"Advanced":5},
  },
  {
    key: 'css',
    title: 'CSS Learning Module',
    shortTitle: 'CSS',
    subtitle: 'Selectors, layouts, responsive design, motion, theming, and maintainable styling',
    description: 'This CSS roadmap covers styling from the fundamentals to advanced layout systems, animation, architecture, and real interface design patterns.',
    icon: 'logo-css3',
    color: '#3B82F6',
    totalHours: '41h',
    focusAreas: ["Selectors","Flexbox","Grid","Responsive UI"],
    recommendedProject: 'Build a responsive product landing page and dashboard interface with reusable design tokens and polished interactions.',
    topicCount: 19,
    topicIds: ["css-intro","css-selectors","css-box-model","css-typography","css-display-position","css-flexbox","css-grid","css-responsive","css-forms","css-navigation-buttons","css-effects","css-transforms","css-variables","css-accessibility","css-architecture","css-capstone","css-production-checklist","css-debugging-workflow","css-capstone-review"],
    topics: [{"id":"css-intro","title":"CSS Introduction and External Stylesheets","summary":"Learn how CSS rules are written and connected to HTML.","level":"Beginner","duration":"1h 20m"},{"id":"css-selectors","title":"Selectors, Combinators, and Specificity","summary":"Target elements accurately and avoid style conflicts.","level":"Beginner","duration":"1h 45m"},{"id":"css-box-model","title":"Colors, Backgrounds, Borders, and the Box Model","summary":"Control visual presentation and spacing with confidence.","level":"Beginner","duration":"1h 40m"},{"id":"css-typography","title":"Text, Fonts, Line Height, and Readability","summary":"Shape the reading experience with better typography choices.","level":"Beginner","duration":"1h 20m"},{"id":"css-display-position","title":"Display, Position, and Normal Document Flow","summary":"Understand how elements participate in layout before adding advanced systems.","level":"Intermediate","duration":"1h 35m"},{"id":"css-flexbox","title":"Flexbox Containers and Item Alignment","summary":"Use one-dimensional layout tools for rows, columns, and alignment.","level":"Intermediate","duration":"2h 5m"},{"id":"css-grid","title":"CSS Grid for Two-Dimensional Layouts","summary":"Build structured page layouts with rows and columns together.","level":"Intermediate","duration":"2h 10m"},{"id":"css-responsive","title":"Responsive Design and Media Queries","summary":"Adapt layouts, spacing, and type for many screen sizes.","level":"Intermediate","duration":"1h 45m"},{"id":"css-forms","title":"Form Styling, Focus States, and Input UX","summary":"Create form controls that feel consistent and accessible.","level":"Intermediate","duration":"1h 50m"},{"id":"css-navigation-buttons","title":"Navigation Bars, Buttons, and Menus","summary":"Style common interactive UI elements for clarity and reuse.","level":"Intermediate","duration":"1h 30m"},{"id":"css-effects","title":"Shadows, Gradients, Filters, and Visual Depth","summary":"Use effects carefully to make a UI feel more intentional.","level":"Intermediate","duration":"1h 35m"},{"id":"css-transforms","title":"Transforms, Transitions, and Simple Motion","summary":"Add motion that supports interaction instead of distracting from it.","level":"Advanced","duration":"1h 45m"},{"id":"css-variables","title":"CSS Variables and Design Tokens","summary":"Centralize decisions for color, spacing, and theming.","level":"Advanced","duration":"1h 30m"},{"id":"css-accessibility","title":"Accessibility, Reduced Motion, and Contrast","summary":"Use CSS to support a more inclusive interface.","level":"Advanced","duration":"1h 20m"},{"id":"css-architecture","title":"Naming Systems, Organization, and Scalability","summary":"Keep large stylesheets understandable as the project grows.","level":"Advanced","duration":"1h 35m"},{"id":"css-capstone","title":"CSS Capstone Project and Final Review","summary":"Combine layout, typography, forms, and motion into a polished product page.","level":"Advanced","duration":"3h 20m"},{"id":"css-production-checklist","title":"CSS Production Checklist","summary":"Turn CSS knowledge into a repeatable quality checklist.","level":"Intermediate","duration":"1h 20m"},{"id":"css-debugging-workflow","title":"CSS Debugging Workflow","summary":"Use a calm, step-by-step debugging process for CSS problems.","level":"Intermediate","duration":"1h 30m"},{"id":"css-capstone-review","title":"CSS Capstone Review","summary":"Finish a complete CSS task and review it like a real project handoff.","level":"Advanced","duration":"2h 10m"}],
    levelCounts: {"Beginner":4,"Intermediate":9,"Advanced":6},
  },
  {
    key: 'javascript',
    title: 'JavaScript Learning Module',
    shortTitle: 'JavaScript',
    subtitle: 'Core syntax, DOM logic, async APIs, data handling, and project building',
    description: 'This JavaScript roadmap covers the language from fundamentals to browser APIs, asynchronous data flows, modular organization, and capstone projects.',
    icon: 'logo-javascript',
    color: '#EAB308',
    totalHours: '43h',
    focusAreas: ["Functions","DOM","Async","Projects"],
    recommendedProject: 'Build a learning tracker app with DOM updates, filtering, API fetches, local storage, and reusable modules.',
    topicCount: 19,
    topicIds: ["js-intro","js-variables","js-control-flow","js-functions","js-arrays-objects","js-scope-closures","js-this-context","js-dates-math","js-dom-selection","js-events","js-storage","js-browser-apis","js-async","js-debugging","js-modules","js-capstone","javascript-production-checklist","javascript-debugging-workflow","javascript-capstone-review"],
    topics: [{"id":"js-intro","title":"Introduction, Script Placement, and Output","summary":"Learn where JavaScript runs and how to verify it is connected correctly.","level":"Beginner","duration":"1h 15m"},{"id":"js-variables","title":"Variables, Data Types, and Operators","summary":"Work with values safely and understand how JavaScript compares them.","level":"Beginner","duration":"1h 50m"},{"id":"js-control-flow","title":"Conditions, Switch Statements, and Loops","summary":"Make programs react differently based on data and repeat work efficiently.","level":"Beginner","duration":"1h 45m"},{"id":"js-functions","title":"Functions, Parameters, Returns, and Scope","summary":"Group repeated logic into reusable building blocks.","level":"Beginner","duration":"1h 40m"},{"id":"js-arrays-objects","title":"Arrays, Objects, and Common Methods","summary":"Handle collections and structured data more effectively.","level":"Intermediate","duration":"2h 5m"},{"id":"js-scope-closures","title":"Scope, Hoisting, and Closures","summary":"Understand what variables are available and when.","level":"Intermediate","duration":"1h 45m"},{"id":"js-this-context","title":"this, Methods, and Execution Context","summary":"Learn how function context changes based on how code is called.","level":"Intermediate","duration":"1h 30m"},{"id":"js-dates-math","title":"Dates, Math, and Common Built-In Utilities","summary":"Work with time values, calculations, and simple data formatting.","level":"Intermediate","duration":"1h 20m"},{"id":"js-dom-selection","title":"DOM Selection and Content Updates","summary":"Read and modify live page content from JavaScript.","level":"Intermediate","duration":"1h 40m"},{"id":"js-events","title":"Events, Event Objects, and Form Handling","summary":"React to user interactions in a clear and predictable way.","level":"Intermediate","duration":"1h 50m"},{"id":"js-storage","title":"Local Storage, JSON, and Persistence","summary":"Save small pieces of data between page visits.","level":"Advanced","duration":"1h 35m"},{"id":"js-browser-apis","title":"Timers, Fetch, and Common Browser APIs","summary":"Use browser features to build more realistic behavior.","level":"Advanced","duration":"1h 45m"},{"id":"js-async","title":"Promises, Async Await, and Error Handling","summary":"Structure asynchronous logic in a readable and safe way.","level":"Advanced","duration":"1h 50m"},{"id":"js-debugging","title":"Debugging, DevTools, and Problem Isolation","summary":"Learn how to inspect variables and narrow down bugs quickly.","level":"Advanced","duration":"1h 20m"},{"id":"js-modules","title":"Modules, Code Organization, and Reuse","summary":"Split growing programs into manageable files and responsibilities.","level":"Advanced","duration":"1h 35m"},{"id":"js-capstone","title":"JavaScript Capstone Project and Review","summary":"Build a complete interactive application with data, events, and persistence.","level":"Advanced","duration":"3h 40m"},{"id":"javascript-production-checklist","title":"JavaScript Production Checklist","summary":"Turn JavaScript knowledge into a repeatable quality checklist.","level":"Intermediate","duration":"1h 20m"},{"id":"javascript-debugging-workflow","title":"JavaScript Debugging Workflow","summary":"Use a calm, step-by-step debugging process for JavaScript problems.","level":"Intermediate","duration":"1h 30m"},{"id":"javascript-capstone-review","title":"JavaScript Capstone Review","summary":"Finish a complete JavaScript task and review it like a real project handoff.","level":"Advanced","duration":"2h 10m"}],
    levelCounts: {"Beginner":4,"Intermediate":8,"Advanced":7},
  },
  {
    key: 'python',
    title: 'Python Starter Module',
    shortTitle: 'Python',
    subtitle: 'Syntax, control flow, data structures, files, and practical scripting',
    description: 'Start Python with clear fundamentals, then practice data handling, file work, debugging, modules, and a small command-line project.',
    icon: 'logo-python',
    color: '#22C55E',
    totalHours: '29h',
    focusAreas: ["Syntax","Functions","Files","Scripts"],
    recommendedProject: 'Build a command-line study planner that reads tasks, groups them by priority, and writes a summary file.',
    topicCount: 12,
    topicIds: ["python-syntax","python-flow","python-functions","python-lists-dicts","python-strings","python-files","python-errors","python-modules","python-capstone","python-production-checklist","python-debugging-workflow","python-capstone-review"],
    topics: [{"id":"python-syntax","title":"Syntax, Variables, and Basic Input Output","summary":"Start with Python fundamentals and its readable style.","level":"Beginner","duration":"1h 30m"},{"id":"python-flow","title":"Conditions, Loops, and Simple Decisions","summary":"Control program flow with branching and repetition.","level":"Beginner","duration":"1h 35m"},{"id":"python-functions","title":"Functions, Parameters, and Return Values","summary":"Package repeatable logic into reusable functions.","level":"Beginner","duration":"1h 30m"},{"id":"python-lists-dicts","title":"Lists, Dictionaries, and Iteration","summary":"Store and process structured data in a practical way.","level":"Intermediate","duration":"1h 45m"},{"id":"python-strings","title":"Strings, Formatting, and Basic Data Cleanup","summary":"Work with user input and text values more safely.","level":"Intermediate","duration":"1h 20m"},{"id":"python-files","title":"Files, Reading, Writing, and Simple Persistence","summary":"Save data between script runs using text files.","level":"Intermediate","duration":"1h 50m"},{"id":"python-errors","title":"Exceptions and Basic Error Handling","summary":"Prevent simple scripts from crashing on common failures.","level":"Intermediate","duration":"1h 20m"},{"id":"python-modules","title":"Imports, Standard Library, and Script Organization","summary":"Keep Python projects readable as they grow.","level":"Intermediate","duration":"1h 25m"},{"id":"python-capstone","title":"Python Mini Project and Review","summary":"Combine input, data structures, files, and functions into a useful script.","level":"Advanced","duration":"2h 30m"},{"id":"python-production-checklist","title":"Python Production Checklist","summary":"Turn Python knowledge into a repeatable quality checklist.","level":"Intermediate","duration":"1h 20m"},{"id":"python-debugging-workflow","title":"Python Debugging Workflow","summary":"Use a calm, step-by-step debugging process for Python problems.","level":"Intermediate","duration":"1h 30m"},{"id":"python-capstone-review","title":"Python Capstone Review","summary":"Finish a complete Python task and review it like a real project handoff.","level":"Advanced","duration":"2h 10m"}],
    levelCounts: {"Beginner":3,"Intermediate":7,"Advanced":2},
  },
  {
    key: 'react',
    title: 'React Starter Module',
    shortTitle: 'React',
    subtitle: 'Components, props, state, effects, forms, hooks, and project structure',
    description: 'Learn React by building reusable components, managing state, rendering lists, handling effects, and organizing a small app.',
    icon: 'logo-react',
    color: '#38BDF8',
    totalHours: '30h',
    focusAreas: ["Components","Props","State","Hooks"],
    recommendedProject: 'Build a lesson dashboard with reusable cards, filters, progress state, and a clean component structure.',
    topicCount: 12,
    topicIds: ["react-jsx-components","react-props","react-state-events","react-lists","react-effects","react-forms-state","react-custom-hooks","react-organization","react-capstone","react-production-checklist","react-debugging-workflow","react-capstone-review"],
    topics: [{"id":"react-jsx-components","title":"JSX, Components, and Component Thinking","summary":"Break interfaces into reusable building blocks.","level":"Beginner","duration":"1h 40m"},{"id":"react-props","title":"Props and Reusable Data-Driven Components","summary":"Pass values into components so one structure can show many variations.","level":"Beginner","duration":"1h 20m"},{"id":"react-state-events","title":"State, Events, and Interactive UI","summary":"Make React components respond to user actions.","level":"Beginner","duration":"1h 45m"},{"id":"react-lists","title":"Lists, Keys, and Data Rendering","summary":"Render collections of data in a predictable and scalable way.","level":"Intermediate","duration":"1h 35m"},{"id":"react-effects","title":"useEffect, Side Effects, and Data Loading","summary":"Handle work that happens after React renders.","level":"Intermediate","duration":"1h 40m"},{"id":"react-forms-state","title":"Controlled Inputs, Forms, and Lifting State","summary":"Coordinate user input and shared data between components.","level":"Intermediate","duration":"1h 45m"},{"id":"react-custom-hooks","title":"Custom Hooks and Shared Logic","summary":"Extract repeated React behavior into reusable hooks.","level":"Advanced","duration":"1h 30m"},{"id":"react-organization","title":"Component Organization and Project Structure","summary":"Keep a React app understandable as it grows.","level":"Advanced","duration":"1h 25m"},{"id":"react-capstone","title":"React Dashboard Capstone","summary":"Combine components, hooks, lists, filters, and persisted state in one project.","level":"Advanced","duration":"3h"},{"id":"react-production-checklist","title":"React Production Checklist","summary":"Turn React knowledge into a repeatable quality checklist.","level":"Intermediate","duration":"1h 20m"},{"id":"react-debugging-workflow","title":"React Debugging Workflow","summary":"Use a calm, step-by-step debugging process for React problems.","level":"Intermediate","duration":"1h 30m"},{"id":"react-capstone-review","title":"React Capstone Review","summary":"Finish a complete React task and review it like a real project handoff.","level":"Advanced","duration":"2h 10m"}],
    levelCounts: {"Beginner":3,"Intermediate":5,"Advanced":4},
  },
  {
    key: 'sql',
    title: 'SQL Starter Module',
    shortTitle: 'SQL',
    subtitle: 'Queries, filtering, joins, grouping, schema thinking, and reporting',
    description: 'Learn how to query and organize relational data through practical examples that lead to a reporting capstone.',
    icon: 'server-outline',
    color: '#A855F7',
    totalHours: '30h',
    focusAreas: ["Queries","Joins","Reports","Schema"],
    recommendedProject: 'Build a course analytics report that combines users, lessons, enrollments, and completion data.',
    topicCount: 12,
    topicIds: ["sql-select","sql-insert-update-delete","sql-text-numbers","sql-joins","sql-grouping","sql-having-reports","sql-subqueries","sql-schema-thinking","sql-capstone","sql-production-checklist","sql-debugging-workflow","sql-capstone-review"],
    topics: [{"id":"sql-select","title":"SELECT, WHERE, ORDER BY, and LIMIT","summary":"Read the right rows in the right order.","level":"Beginner","duration":"1h 30m"},{"id":"sql-insert-update-delete","title":"INSERT, UPDATE, DELETE, and Safe Data Changes","summary":"Modify table data without changing more rows than intended.","level":"Beginner","duration":"1h 35m"},{"id":"sql-text-numbers","title":"Text Matching, Numeric Filters, and Basic Conditions","summary":"Create more precise queries by combining search conditions.","level":"Beginner","duration":"1h 20m"},{"id":"sql-joins","title":"INNER JOIN and Related Data","summary":"Combine data from multiple tables into useful views.","level":"Intermediate","duration":"1h 45m"},{"id":"sql-grouping","title":"GROUP BY, COUNT, and Aggregation","summary":"Summarize data instead of listing every row individually.","level":"Intermediate","duration":"1h 35m"},{"id":"sql-having-reports","title":"HAVING, Complex Filters, and Report Refinement","summary":"Filter grouped results and build more realistic reports.","level":"Intermediate","duration":"1h 25m"},{"id":"sql-subqueries","title":"Subqueries and Derived Logic","summary":"Use one query inside another to express richer conditions.","level":"Advanced","duration":"1h 25m"},{"id":"sql-schema-thinking","title":"Table Design, Keys, and Data Modeling Basics","summary":"Understand how query quality depends on good data structure.","level":"Advanced","duration":"1h 20m"},{"id":"sql-capstone","title":"SQL Reporting Capstone","summary":"Build a realistic set of report queries for a small product scenario.","level":"Advanced","duration":"2h 30m"},{"id":"sql-production-checklist","title":"SQL Production Checklist","summary":"Turn SQL knowledge into a repeatable quality checklist.","level":"Intermediate","duration":"1h 20m"},{"id":"sql-debugging-workflow","title":"SQL Debugging Workflow","summary":"Use a calm, step-by-step debugging process for SQL problems.","level":"Intermediate","duration":"1h 30m"},{"id":"sql-capstone-review","title":"SQL Capstone Review","summary":"Finish a complete SQL task and review it like a real project handoff.","level":"Advanced","duration":"2h 10m"}],
    levelCounts: {"Beginner":3,"Intermediate":5,"Advanced":4},
  },
  {
    key: 'nodejs',
    title: 'Node.js Starter Module',
    shortTitle: 'Node.js',
    subtitle: 'Runtime basics, modules, files, Express APIs, middleware, and backend structure',
    description: 'Learn how Node.js runs JavaScript outside the browser, then build small API routes with validation and error handling.',
    icon: 'logo-nodejs',
    color: '#84CC16',
    totalHours: '31h',
    focusAreas: ["Runtime","Modules","APIs","Express"],
    recommendedProject: 'Build a lessons API with routes for listing lessons, creating progress entries, and returning consistent errors.',
    topicCount: 12,
    topicIds: ["node-runtime","node-modules-packages","node-files","node-http","node-json-api","node-validation","node-middleware","node-project-structure","node-capstone","nodejs-production-checklist","nodejs-debugging-workflow","nodejs-capstone-review"],
    topics: [{"id":"node-runtime","title":"Node Runtime and Simple Scripts","summary":"Understand what changes when JavaScript runs outside the browser.","level":"Beginner","duration":"1h 25m"},{"id":"node-modules-packages","title":"Modules, package.json, and npm Scripts","summary":"Organize code and use package scripts to standardize project tasks.","level":"Beginner","duration":"1h 20m"},{"id":"node-files","title":"File System and Local Data Storage","summary":"Read and write local files for simple backend tools or demos.","level":"Beginner","duration":"1h 35m"},{"id":"node-http","title":"HTTP Fundamentals and Route Thinking","summary":"Understand the request-response model that powers web APIs.","level":"Intermediate","duration":"1h 35m"},{"id":"node-json-api","title":"JSON Responses and Basic API Handlers","summary":"Return useful data structures from a Node backend.","level":"Intermediate","duration":"1h 30m"},{"id":"node-validation","title":"Validation, Error Responses, and Clean Input Handling","summary":"Protect your API from incomplete or invalid requests.","level":"Intermediate","duration":"1h 35m"},{"id":"node-middleware","title":"Middleware and Shared Request Logic","summary":"Move repeated backend logic into reusable layers.","level":"Advanced","duration":"1h 25m"},{"id":"node-project-structure","title":"Project Structure, Controllers, and Services","summary":"Split backend logic into clearer layers as features grow.","level":"Advanced","duration":"1h 30m"},{"id":"node-capstone","title":"Node API Capstone","summary":"Build a small API with routes, validation, persistence, and structure.","level":"Advanced","duration":"2h 45m"},{"id":"nodejs-production-checklist","title":"Node.js Production Checklist","summary":"Turn Node.js knowledge into a repeatable quality checklist.","level":"Intermediate","duration":"1h 20m"},{"id":"nodejs-debugging-workflow","title":"Node.js Debugging Workflow","summary":"Use a calm, step-by-step debugging process for Node.js problems.","level":"Intermediate","duration":"1h 30m"},{"id":"nodejs-capstone-review","title":"Node.js Capstone Review","summary":"Finish a complete Node.js task and review it like a real project handoff.","level":"Advanced","duration":"2h 10m"}],
    levelCounts: {"Beginner":3,"Intermediate":5,"Advanced":4},
  },
  {
    key: 'bootstrap',
    title: 'Bootstrap Starter Module',
    shortTitle: 'Bootstrap',
    subtitle: 'Grid, utilities, components, forms, customization, and responsive page assembly',
    description: 'Use Bootstrap to build responsive layouts quickly while learning where utilities, components, and custom styles fit together.',
    icon: 'albums-outline',
    color: '#7952B3',
    totalHours: '28h',
    focusAreas: ["Grid","Utilities","Components","Themes"],
    recommendedProject: 'Build a responsive course landing page with navigation, cards, forms, pricing, and theme customization.',
    topicCount: 12,
    topicIds: ["bootstrap-grid","bootstrap-utilities","bootstrap-responsive","bootstrap-navbars","bootstrap-cards-buttons","bootstrap-forms","bootstrap-theme-customization","bootstrap-layout-patterns","bootstrap-capstone","bootstrap-production-checklist","bootstrap-debugging-workflow","bootstrap-capstone-review"],
    topics: [{"id":"bootstrap-grid","title":"Bootstrap Setup, Containers, and Grid","summary":"Use Bootstrap to create fast responsive layout structure.","level":"Beginner","duration":"1h 20m"},{"id":"bootstrap-utilities","title":"Spacing, Typography, and Utility Classes","summary":"Style common UI patterns quickly without writing much custom CSS.","level":"Beginner","duration":"1h 15m"},{"id":"bootstrap-responsive","title":"Responsive Utilities and Layout Variations","summary":"Adjust visibility and layout details across breakpoints.","level":"Beginner","duration":"1h 10m"},{"id":"bootstrap-navbars","title":"Navbars, Menus, and Layout Shells","summary":"Build a recognizable top navigation pattern quickly.","level":"Intermediate","duration":"1h 20m"},{"id":"bootstrap-cards-buttons","title":"Cards, Buttons, and Content Blocks","summary":"Assemble reusable content containers quickly with Bootstrap classes.","level":"Intermediate","duration":"1h 15m"},{"id":"bootstrap-forms","title":"Forms, Inputs, and Validation Styles","summary":"Build practical forms with Bootstrap form controls and feedback states.","level":"Intermediate","duration":"1h 25m"},{"id":"bootstrap-theme-customization","title":"Customization, Overrides, and Brand Direction","summary":"Use Bootstrap without letting the interface feel generic.","level":"Advanced","duration":"1h 20m"},{"id":"bootstrap-layout-patterns","title":"Page Sections, Marketing Layouts, and Reusable Patterns","summary":"Combine Bootstrap pieces into complete page sections.","level":"Advanced","duration":"1h 15m"},{"id":"bootstrap-capstone","title":"Bootstrap Course Site Capstone","summary":"Build a complete responsive page with utilities, components, and custom polish.","level":"Advanced","duration":"2h 30m"},{"id":"bootstrap-production-checklist","title":"Bootstrap Production Checklist","summary":"Turn Bootstrap knowledge into a repeatable quality checklist.","level":"Intermediate","duration":"1h 20m"},{"id":"bootstrap-debugging-workflow","title":"Bootstrap Debugging Workflow","summary":"Use a calm, step-by-step debugging process for Bootstrap problems.","level":"Intermediate","duration":"1h 30m"},{"id":"bootstrap-capstone-review","title":"Bootstrap Capstone Review","summary":"Finish a complete Bootstrap task and review it like a real project handoff.","level":"Advanced","duration":"2h 10m"}],
    levelCounts: {"Beginner":3,"Intermediate":5,"Advanced":4},
  },
  {
    key: 'typescript', title: 'TypeScript Learning Module', shortTitle: 'TypeScript',
    subtitle: 'Typed JavaScript, expressive models, and safer application architecture', description: 'Learn TypeScript from annotations through advanced type modeling and type-safe application design.', icon: 'code-slash-outline', color: '#3178C6', totalHours: '42h', focusAreas: ['Types', 'Generics', 'Tooling', 'Safe Apps'], recommendedProject: 'Build a type-safe data management app.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 },
  },
  {
    key: 'java', title: 'Java Learning Module', shortTitle: 'Java', subtitle: 'Object-oriented Java, collections, concurrency, and backend foundations', description: 'Learn Java from JDK fundamentals through object-oriented design, concurrency, persistence, and testing.', icon: 'code-outline', color: '#E76F00', totalHours: '44h', focusAreas: ['Syntax', 'OOP', 'Collections', 'JVM'], recommendedProject: 'Build a tested CLI task service.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 },
  },
  {
    key: 'c', title: 'C Learning Module', shortTitle: 'C', subtitle: 'C syntax, pointers, memory, files, and systems fundamentals', description: 'Learn C from compilation through pointers, memory ownership, data structures, and safe modular programs.', icon: 'code-outline', color: '#4B8BBE', totalHours: '40h', focusAreas: ['Pointers', 'Memory', 'Files', 'Systems'], recommendedProject: 'Build a terminal address-book application.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 },
  },
  {
    key: 'cpp', title: 'C++ Learning Module', shortTitle: 'C++', subtitle: 'Modern C++, STL, RAII, concurrency, and systems design', description: 'Learn modern C++ from syntax through STL, ownership, concurrency, testing, and safe application design.', icon: 'code-outline', color: '#00599C', totalHours: '46h', focusAreas: ['Modern C++', 'STL', 'RAII', 'Performance'], recommendedProject: 'Build a modern console application.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 },
  },
  { key: 'kotlin', title: 'Kotlin Learning Module', shortTitle: 'Kotlin', subtitle: 'Modern JVM programming, null safety, collections, and coroutines', description: 'Learn Kotlin from JVM fundamentals through safe modeling, collections, coroutines, APIs, testing, and architecture.', icon: 'code-outline', color: '#7F52FF', totalHours: '52h', focusAreas: ['Null Safety', 'Collections', 'Coroutines', 'JVM'], recommendedProject: 'Build an offline Kotlin task manager.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 } },
  { key: 'swift', title: 'Swift Learning Module', shortTitle: 'Swift', subtitle: 'Safe values, protocols, optionals, and concurrency', description: 'Learn Swift from toolchain basics through value semantics, protocols, Codable, concurrency, testing, and architecture.', icon: 'code-outline', color: '#F05138', totalHours: '51h', focusAreas: ['Optionals', 'Protocols', 'Concurrency', 'Value Semantics'], recommendedProject: 'Build an offline Swift data-management app.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 } },
  { key: 'dartflutter', title: 'Dart / Flutter Learning Module', shortTitle: 'Dart / Flutter', subtitle: 'Dart fundamentals, widgets, state, and offline-friendly Flutter apps', description: 'Learn Dart first, then build Flutter interfaces with widgets, forms, navigation, state, persistence concepts, testing, and performance awareness.', icon: 'code-outline', color: '#54C5F8', totalHours: '53h', focusAreas: ['Dart', 'Widgets', 'State', 'Offline Apps'], recommendedProject: 'Build an offline-friendly Flutter learning app.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 } },
  { key: 'ruby', title: 'Ruby Learning Module', shortTitle: 'Ruby', subtitle: 'Expressive scripting, objects, Enumerable, and service foundations', description: 'Learn Ruby from scripts and collections through OOP, modules, persistence, APIs, testing, and project structure.', icon: 'code-outline', color: '#CC342D', totalHours: '50h', focusAreas: ['Enumerable', 'OOP', 'CLI Apps', 'APIs'], recommendedProject: 'Build a Ruby CLI or service-style task application.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 } },
  { key: 'csharp', title: 'C# Learning Module', shortTitle: 'C#', subtitle: '.NET fundamentals, object-oriented design, LINQ, async code, and APIs', description: 'Learn C# from .NET setup through collections, asynchronous programming, data access, testing, and architecture.', icon: 'code-outline', color: '#68217A', totalHours: '43h', focusAreas: ['.NET', 'OOP', 'LINQ', 'Async'], recommendedProject: 'Build a validated management application.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 } },
  { key: 'php', title: 'PHP Learning Module', shortTitle: 'PHP', subtitle: 'Web fundamentals, secure forms, PDO, APIs, and maintainable PHP', description: 'Learn PHP from syntax and HTTP forms through OOP, sessions, database access, APIs, and security.', icon: 'code-outline', color: '#777BB4', totalHours: '42h', focusAreas: ['Web Forms', 'OOP', 'PDO', 'Security'], recommendedProject: 'Build a secure CRUD/API project.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 } },
  { key: 'go', title: 'Go Learning Module', shortTitle: 'Go', subtitle: 'Go syntax, packages, HTTP services, concurrency, and operations', description: 'Learn Go from packages and data types through HTTP services, concurrency, testing, and shutdown handling.', icon: 'code-outline', color: '#00ADD8', totalHours: '42h', focusAreas: ['Packages', 'HTTP', 'Concurrency', 'Testing'], recommendedProject: 'Build a concurrent REST-style service.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 } },
  { key: 'rust', title: 'Rust Learning Module', shortTitle: 'Rust', subtitle: 'Ownership, safe systems code, traits, async concepts, and Cargo', description: 'Learn Rust from ownership and borrowing through errors, traits, concurrency, testing, and Cargo organization.', icon: 'code-outline', color: '#DEA584', totalHours: '46h', focusAreas: ['Ownership', 'Traits', 'Concurrency', 'Cargo'], recommendedProject: 'Build a tested CLI or service.', topicCount: 0, topicIds: [], topics: [], levelCounts: { Beginner: 0, Intermediate: 0, Advanced: 0 } },
];

export const LANGUAGE_CATALOG: LanguageMetadata[] = BASE_LANGUAGE_CATALOG.map((language) => {
  const additions = [
    ...(EXPANDED_TOPIC_METADATA[language.key] ?? []),
    ...(PHASE5_TOPIC_METADATA[language.key] ?? []),
    ...(PHASE7_TOPIC_METADATA[language.key] ?? []),
    ...(PHASE7_TOPIC_METADATA[language.key] ?? []),
  ];
  if (additions.length === 0) return language;

  const sharedStart = language.topics.findIndex((topic) =>
    topic.id === `${language.key}-production-checklist`,
  );
  const insertAt = sharedStart >= 0 ? sharedStart : language.topics.length;
  const topics = [
    ...language.topics.slice(0, insertAt),
    ...additions,
    ...language.topics.slice(insertAt),
  ];
  const topicIds = topics.map((topic) => topic.id);
  const levelCounts = topics.reduce((counts, topic) => {
    counts[topic.level] += 1;
    return counts;
  }, { Beginner: 0, Intermediate: 0, Advanced: 0 } as Record<TopicLevel, number>);

  return { ...language, category: CATEGORY_BY_LANGUAGE[language.key], topicCount: topics.length, topicIds, topics, levelCounts };
});

export const LANGUAGE_CATALOG_BY_KEY: Record<LanguageKey, LanguageMetadata> =
  LANGUAGE_CATALOG.reduce((catalog, language) => {
    catalog[language.key] = language;
    return catalog;
  }, {} as Record<LanguageKey, LanguageMetadata>);

export const getLanguageByKey = (languageKey: LanguageKey): LanguageMetadata | undefined =>
  LANGUAGE_CATALOG_BY_KEY[languageKey];

export const getLanguageCategory = (languageKey: LanguageKey) => CATEGORY_BY_LANGUAGE[languageKey];

export const getTopicMetadataById = (languageKey: LanguageKey, topicId: string) =>
  getLanguageByKey(languageKey)?.topics.find((topic) => topic.id === topicId);

export const getFirstTopicForLanguage = (languageKey: LanguageKey) =>
  getLanguageByKey(languageKey)?.topics[0];

export const getNextTopicMetadata = (languageKey: LanguageKey, topicId: string) => {
  const topics = getLanguageByKey(languageKey)?.topics ?? [];
  const currentIndex = topics.findIndex((topic) => topic.id === topicId);
  return currentIndex >= 0 ? topics[currentIndex + 1] : undefined;
};

export const getRecommendedTopicMetadata = (languageKey: LanguageKey, completedTopicIds: ReadonlySet<string>) =>
  getLanguageByKey(languageKey)?.topics.find((topic) => !completedTopicIds.has(topic.id));

export const getLanguageStats = (
  languageKey: LanguageKey,
  startedTopicIds: ReadonlySet<string>,
  completedTopicIds: ReadonlySet<string>,
) => {
  const language = getLanguageByKey(languageKey);
  const topics = language?.topics ?? [];
  const totalTopics = language?.topicCount ?? topics.length;
  let startedTopics = 0;
  let completedTopics = 0;
  const levelStats = { Beginner: { completed: 0, total: 0 }, Intermediate: { completed: 0, total: 0 }, Advanced: { completed: 0, total: 0 } };

  for (const topic of topics) {
    if (startedTopicIds.has(topic.id)) {
      startedTopics += 1;
    }
    if (completedTopicIds.has(topic.id)) {
      completedTopics += 1;
    }
    levelStats[topic.level].total += 1;
    if (completedTopicIds.has(topic.id)) {
      levelStats[topic.level].completed += 1;
    }
  }

  const startedScore = totalTopics > 0 ? Math.round((startedTopics / totalTopics) * 100) : 0;
  const completedScore = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return {
    startedTopics,
    completedTopics,
    totalTopics,
    startedScore,
    completedScore,
    remainingScore: Math.max(0, 100 - startedScore),
    levelStats,
  };
};
