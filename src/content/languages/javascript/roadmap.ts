import { LanguageRoadmap } from '../../types';
import { createSection, createTopic } from '../../utils';

export const javascriptRoadmap: LanguageRoadmap = {
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
            prerequisites: ['js-functions'],
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
            prerequisites: ['js-functions', 'js-arrays-objects'],
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
  };
