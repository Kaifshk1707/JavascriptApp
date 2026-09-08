import { LanguageRoadmap } from '../../types';
import { createSection, createTopic } from '../../utils';
import { sqlExpansionSections } from './expansion';

export const sqlRoadmap: LanguageRoadmap = {
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
      ...sqlExpansionSections,
    ],
  };
