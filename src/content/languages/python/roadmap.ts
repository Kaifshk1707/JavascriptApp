import { LanguageRoadmap } from '../../types';
import { createSection, createTopic } from '../../utils';
import { pythonExpansionSections } from './expansion';

export const pythonRoadmap: LanguageRoadmap = {
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
      ...pythonExpansionSections,
    ],
  };
