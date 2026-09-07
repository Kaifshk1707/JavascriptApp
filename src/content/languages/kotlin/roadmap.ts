import { LanguageRoadmap, TopicLevel } from '../../types';
import { createCurriculumTopic, createSection } from '../../utils';

type Spec = [string, string, string, TopicLevel, string[], string, string?];
const make = ([id, title, summary, level, focus, exercise, prerequisite]: Spec) =>
  createCurriculumTopic({
    id, title, summary, level, duration: title.includes('Capstone') ? '3h' : '1h 35m', focus,
    exercise, starterCode: 'fun main() {\n    println("offline lesson")\n}',
    expectedResult: `A small offline example demonstrates ${title.toLowerCase()} with a checked result.`,
    challenge: `Extend the exercise with one edge case related to ${title.toLowerCase()}.`,
    references: ['Kotlin standard library', ...focus], quizQuestion: `What is the main purpose of ${title}?`,
    quizAnswer: `It applies ${title.toLowerCase()} while keeping data flow explicit and testable.`,
    quizOptions: [`It applies ${title.toLowerCase()} while keeping data flow explicit and testable.`, 'It only changes the user interface.', 'It removes the need for validation.'],
    quizExplanation: 'The concept is useful when its inputs, outputs, and failure cases are explicit.',
    prerequisites: prerequisite ? [prerequisite] : undefined,
  });

const basic: Spec[] = [
  ['kotlin-overview', 'Kotlin Overview and JVM Context', 'Understand Kotlin syntax, its JVM relationship, and where it fits beside Java.', 'Beginner', ['Syntax', 'JVM', 'Tooling'], 'Compare a Kotlin file with an equivalent Java entry point.'],
  ['kotlin-setup', 'Setup, Gradle, and JVM Basics', 'Create a repeatable Kotlin project and understand compilation and runtime basics.', 'Beginner', ['Kotlin compiler', 'Gradle', 'JVM'], 'Build and run a small command-line project.'],
  ['kotlin-val-var', 'val, var, and Type Inference', 'Choose immutable bindings by default and use mutation deliberately.', 'Beginner', ['val', 'var', 'Inference'], 'Model an editable task and an immutable task ID.'],
  ['kotlin-types', 'Kotlin Types and Operators', 'Work with numeric, Boolean, character, and string values safely.', 'Beginner', ['Types', 'Operators', 'Conversions'], 'Calculate a task completion percentage.'],
  ['kotlin-null-safety', 'Null Safety and Safe Calls', 'Represent absent values and avoid accidental null failures.', 'Beginner', ['Nullable types', 'Elvis', 'Safe calls'], 'Read an optional profile label safely.'],
  ['kotlin-conditions-when', 'Conditions and when Expressions', 'Select behavior with if expressions and exhaustive when branches.', 'Beginner', ['if', 'when', 'Exhaustiveness'], 'Map task states to user-facing labels.'],
  ['kotlin-loops-ranges', 'Loops, Ranges, and Progressions', 'Repeat bounded work and express inclusive or exclusive ranges.', 'Beginner', ['Loops', 'Ranges', 'Iterations'], 'Print unfinished task positions from a range.'],
  ['kotlin-functions', 'Functions and Return Values', 'Write focused functions with explicit inputs and useful results.', 'Beginner', ['Functions', 'Returns', 'Contracts'], 'Create a function that filters completed tasks.'],
  ['kotlin-default-named-args', 'Default and Named Arguments', 'Make function calls readable while keeping optional behavior predictable.', 'Beginner', ['Defaults', 'Named arguments', 'API design'], 'Build a configurable task formatter.', 'kotlin-functions'],
  ['kotlin-strings', 'Strings and Templates', 'Format text with templates and make string handling readable.', 'Beginner', ['Templates', 'Formatting', 'Text'], 'Create a concise task summary.'],
  ['kotlin-collections', 'Collections and Mutability', 'Choose List, Set, and Map types and understand read-only views.', 'Beginner', ['List', 'Set', 'Map'], 'Remove duplicate tags from a task list.'],
  ['kotlin-classes-objects', 'Classes, Objects, and Instances', 'Model related data and behavior with Kotlin classes and singleton objects.', 'Beginner', ['Classes', 'Objects', 'Instances'], 'Model a task and a task repository object.'],
];
const intermediate: Spec[] = [
  ['kotlin-constructors-properties', 'Constructors and Properties', 'Initialize valid objects and expose state through deliberate properties.', 'Intermediate', ['Constructors', 'Properties', 'Invariants'], 'Reject a task with a blank title.', 'kotlin-classes-objects'],
  ['kotlin-data-classes', 'Data Classes', 'Use generated value semantics for records that represent application data.', 'Intermediate', ['copy', 'equals', 'Destructuring'], 'Update a task with copy while preserving its ID.', 'kotlin-classes-objects'],
  ['kotlin-enums-sealed', 'Enums and Sealed Classes', 'Represent finite states and closed result hierarchies explicitly.', 'Intermediate', ['Enums', 'Sealed classes', 'State'], 'Model task status and success/failure results.'],
  ['kotlin-interfaces-inheritance', 'Interfaces and Inheritance', 'Share contracts carefully and prefer composition when it keeps designs clear.', 'Intermediate', ['Interfaces', 'Inheritance', 'Composition'], 'Add a pluggable task sorter.', 'kotlin-classes-objects'],
  ['kotlin-extensions', 'Extension Functions and Properties', 'Add focused reusable operations without changing a source type.', 'Intermediate', ['Extensions', 'Reuse', 'Readability'], 'Add a readable completion extension to a task list.', 'kotlin-functions'],
  ['kotlin-higher-order', 'Higher-Order Functions and Lambdas', 'Pass behavior as values and keep collection processing expressive.', 'Intermediate', ['Lambdas', 'Function types', 'Callbacks'], 'Pass a task predicate into a filter.', 'kotlin-functions'],
  ['kotlin-collection-transformations', 'Collection Transformations', 'Use map, filter, groupBy, and associate for practical data processing.', 'Intermediate', ['map', 'filter', 'groupBy'], 'Group tasks by priority and transform them for display.', 'kotlin-collections'],
  ['kotlin-generics', 'Generics and Type Constraints', 'Preserve type information in reusable containers and functions.', 'Intermediate', ['Type parameters', 'Constraints', 'Reuse'], 'Create a typed in-memory repository.', 'kotlin-collections'],
  ['kotlin-scope-functions', 'Scope Functions', 'Use let, run, apply, also, and with without hiding control flow.', 'Intermediate', ['let', 'apply', 'run'], 'Configure a task object with a readable scope function.'],
  ['kotlin-exceptions', 'Exceptions and Result-Oriented Errors', 'Handle expected failures without swallowing useful diagnostics.', 'Intermediate', ['Exceptions', 'Result', 'Validation'], 'Return validation errors for malformed task input.', 'kotlin-enums-sealed'],
  ['kotlin-packages-modules', 'Packages and Modules', 'Organize Kotlin source into boundaries that remain easy to test.', 'Intermediate', ['Packages', 'Visibility', 'Modules'], 'Split a task feature into model and service packages.'],
  ['kotlin-java-interoperability', 'Java Interoperability', 'Call Java APIs and account for platform types and checked-exception differences.', 'Intermediate', ['Java APIs', 'Platform types', 'JVM'], 'Use a Java time or collection API from Kotlin.', 'kotlin-types'],
  ['kotlin-validation', 'Input Validation and Contracts', 'Keep invalid data outside the core model with explicit checks.', 'Intermediate', ['Validation', 'Contracts', 'Errors'], 'Validate task commands before storing them.', 'kotlin-exceptions'],
  ['kotlin-android-context', 'Kotlin in Android Context', 'Understand how Kotlin supports Android code without making Android APIs the focus.', 'Intermediate', ['Android context', 'Lifecycle awareness', 'Boundaries'], 'Sketch a ViewModel-facing task interface.', 'kotlin-packages-modules'],
];
const advanced: Spec[] = [
  ['kotlin-coroutines', 'Coroutines and suspend Functions', 'Use cooperative asynchronous code and suspend boundaries for I/O-shaped work.', 'Advanced', ['Coroutines', 'suspend', 'Structured work'], 'Wrap a local task load in a suspend function.', 'kotlin-functions'],
  ['kotlin-dispatchers', 'Dispatchers and Structured Concurrency', 'Choose execution contexts and keep child work tied to a parent scope.', 'Advanced', ['Dispatchers', 'Scopes', 'Cancellation'], 'Run bounded task transformations on an appropriate dispatcher.', 'kotlin-coroutines'],
  ['kotlin-flow-stateflow', 'Flow and StateFlow Concepts', 'Model streams of values and observable state without leaking lifecycle ownership.', 'Advanced', ['Flow', 'StateFlow', 'State'], 'Expose task progress as a cold flow and state snapshot.', 'kotlin-coroutines'],
  ['kotlin-async-await', 'async, await, and Concurrent Work', 'Coordinate independent suspend operations and handle partial failure.', 'Advanced', ['async', 'await', 'Failure'], 'Load two local data sources concurrently and combine results.', 'kotlin-dispatchers'],
  ['kotlin-testing', 'Testing Kotlin Code', 'Test pure functions, suspend code, validation, and state transitions.', 'Advanced', ['Unit tests', 'Coroutine tests', 'Fixtures'], 'Test a task service with valid and invalid commands.', 'kotlin-coroutines'],
  ['kotlin-serialization-http', 'Serialization and HTTP/API Usage', 'Translate validated JSON at API boundaries while keeping the domain model stable.', 'Advanced', ['Serialization', 'HTTP', 'DTOs'], 'Parse an offline fixture and map it into a domain task.', 'kotlin-validation'],
  ['kotlin-architecture-performance', 'Architecture, Performance, and Memory', 'Separate domain, application, and I/O concerns and measure allocations before optimizing.', 'Advanced', ['Architecture', 'Performance', 'Memory'], 'Review a task service for unnecessary copies and blocking work.', 'kotlin-collections'],
  ['kotlin-security-capstone', 'Kotlin Task Management Capstone', 'Build a validated task application using OOP, collections, coroutines, persistence concepts, and tests.', 'Advanced', ['Capstone', 'Coroutines', 'Testing'], 'Plan and implement an offline Kotlin task manager.', 'kotlin-testing'],
];

export const kotlinRoadmap: LanguageRoadmap = {
  key: 'kotlin', title: 'Kotlin Learning Module', shortTitle: 'Kotlin',
  subtitle: 'Modern JVM programming, null safety, expressive collections, and coroutines',
  description: 'Learn Kotlin from JVM fundamentals through safe modeling, functional collection work, coroutines, APIs, testing, and architecture.',
  icon: 'code-outline', color: '#7F52FF', totalHours: '52h', focusAreas: ['Null Safety', 'Collections', 'Coroutines', 'JVM'],
  recommendedProject: 'Build an offline Kotlin task manager with validation, collections, coroutines, and tests.',
  sections: [
    createSection({ id: 'kotlin-foundations', title: 'Kotlin Foundations', subtitle: 'Build confidence with safe everyday Kotlin', topics: basic.map(make) }),
    createSection({ id: 'kotlin-intermediate', title: 'Kotlin Intermediate', subtitle: 'Model data and organize reusable code', topics: intermediate.map(make) }),
    createSection({ id: 'kotlin-advanced', title: 'Kotlin Advanced', subtitle: 'Coordinate asynchronous and production code', topics: advanced.map(make) }),
  ],
};
