import { LanguageRoadmap } from '../../types';
import { createSection, createTopic } from '../../utils';
import { nodejsExpansionSections } from './expansion';

export const nodejsRoadmap: LanguageRoadmap = {
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
            prerequisites: ['node-runtime', 'node-modules-packages'],
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
      ...nodejsExpansionSections,
    ],
  };
