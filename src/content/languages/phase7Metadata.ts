import { LanguageKey, TopicMetadata } from '../types';

const titleFromId = (id: string) => id.split('-').slice(1).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
const make = (id: string, level: TopicMetadata['level']): TopicMetadata => ({
  id, title: titleFromId(id), summary: `Learn ${titleFromId(id).toLowerCase()} through a focused offline lesson.`, level,
  duration: id.includes('capstone') ? '3h' : '1h 35m',
});
const list = (key: string, basic: string[], intermediate: string[], advanced: string[]) => [
  ...basic.map((id) => make(`${key}-${id}`, 'Beginner')),
  ...intermediate.map((id) => make(`${key}-${id}`, 'Intermediate')),
  ...advanced.map((id) => make(`${key}-${id}`, 'Advanced')),
];

export const PHASE7_TOPIC_METADATA: Partial<Record<LanguageKey, TopicMetadata[]>> = {
  kotlin: list('kotlin', ['overview', 'setup', 'val-var', 'types', 'null-safety', 'conditions-when', 'loops-ranges', 'functions', 'default-named-args', 'strings', 'collections', 'classes-objects'], ['constructors-properties', 'data-classes', 'enums-sealed', 'interfaces-inheritance', 'extensions', 'higher-order', 'collection-transformations', 'generics', 'scope-functions', 'exceptions', 'packages-modules', 'java-interoperability', 'validation', 'android-context'], ['coroutines', 'dispatchers', 'flow-stateflow', 'async-await', 'testing', 'serialization-http', 'architecture-performance', 'security-capstone']),
  swift: list('swift', ['overview', 'setup', 'let-var', 'types-operators', 'optionals', 'conditions-switch', 'loops', 'functions', 'tuples-collections', 'strings', 'structs-classes'], ['properties-methods', 'initializers', 'inheritance', 'protocols', 'extensions', 'enums-associated', 'errors', 'generics', 'closures-higher-order', 'optionals-deep', 'access-control', 'value-reference', 'protocol-oriented', 'json-codable'], ['arc', 'weak-unowned', 'async-await', 'actors', 'networking', 'testing', 'performance-memory', 'app-architecture-capstone']),
  dartflutter: list('dartflutter', ['overview', 'setup', 'variables', 'types-null-safety', 'operators-conditions', 'loops-functions', 'collections', 'classes-constructors'], ['named-parameters', 'generics-enums', 'mixins-extensions', 'exceptions', 'async-futures', 'streams', 'json-packages-testing', 'flutter-architecture-widgets', 'flutter-stateless-stateful', 'flutter-context-material', 'flutter-layout-lists-forms', 'flutter-navigation-assets-themes'], ['flutter-local-state', 'flutter-state-management', 'flutter-lifecycle', 'flutter-performance-rebuilds', 'flutter-responsive', 'flutter-persistence', 'flutter-testing', 'flutter-error-security', 'flutter-architecture', 'dartflutter-build-release', 'dartflutter-task-capstone', 'dartflutter-performance-review']),
  ruby: list('ruby', ['overview', 'setup', 'variables-types', 'operators', 'strings-arrays', 'hashes', 'conditions-loops', 'iterators', 'methods', 'blocks'], ['classes-objects', 'constructors-encapsulation', 'inheritance', 'modules', 'mixins', 'exceptions', 'files', 'enumerable', 'procs-lambdas', 'yield', 'gems-bundler', 'json-http'], ['metaprogramming', 'reflection', 'closures', 'threads', 'testing', 'logging-performance', 'security-project-structure', 'database-rails-capstone']),
};
