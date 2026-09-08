import { LanguageRoadmap } from '../../types';
import { createSection, createTopic } from '../../utils';
import { reactExpansionSections } from './expansion';

export const reactRoadmap: LanguageRoadmap = {
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
            prerequisites: ['react-props'],
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
            prerequisites: ['react-state-events'],
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
      ...reactExpansionSections,
    ],
  };
