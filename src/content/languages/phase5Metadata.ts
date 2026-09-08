import { LanguageKey, TopicMetadata } from '../types';

const make = (id: string, level: TopicMetadata['level']): TopicMetadata => ({
  id,
  title: id.split('-').slice(1).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' '),
  summary: `Practice ${id.split('-').slice(1).join(' ')} in a focused offline lesson.`,
  level,
  duration: id.includes('capstone') || id.includes('management') || id.includes('service') || id.includes('crud') ? '3h' : '1h 35m',
});

const practice = (key: string): TopicMetadata[] => [
  make(`${key}-production-checklist`, 'Intermediate'),
  make(`${key}-debugging-workflow`, 'Intermediate'),
  make(`${key}-capstone-review`, 'Advanced'),
];

const list = (key: string, beginner: string[], intermediate: string[], advanced: string[]) => [
  ...beginner.map((id) => make(`${key}-${id}`, 'Beginner')),
  ...intermediate.map((id) => make(`${key}-${id}`, 'Intermediate')),
  ...advanced.map((id) => make(`${key}-${id}`, 'Advanced')),
  ...practice(key),
];

export const PHASE5_TOPIC_METADATA: Partial<Record<LanguageKey, TopicMetadata[]>> = {
  csharp: list('csharp', ['dotnet-setup', 'syntax-types', 'control-io', 'classes-properties'], ['encapsulation', 'inheritance-polymorphism', 'interfaces-abstract', 'enums-structs', 'collections', 'generics', 'exceptions-files', 'linq', 'delegates-events', 'lambdas', 'nullable', 'cli-validation'], ['async-tasks', 'di', 'records-patterns', 'reflection-attributes', 'serialization-http', 'testing-logging', 'ef-database', 'performance-gc-security', 'architecture', 'management-capstone']),
  php: list('php', ['setup', 'syntax-types', 'control-strings', 'functions-arrays', 'forms-get-post', 'includes'], ['associative-arrays', 'files-json', 'sessions-cookies', 'oop', 'inheritance-interfaces-traits', 'exceptions-namespaces', 'composer', 'http-json', 'pdo', 'prepared-statements', 'validation', 'api-errors'], ['auth-hashing', 'csrf-xss-sql', 'mvc-routing', 'rest-structure', 'testing-logging', 'caching-performance', 'deployment-env', 'crud-capstone']),
  go: list('go', ['overview-setup', 'values-types', 'control-functions', 'slices-maps-structs'], ['methods-interfaces', 'pointers-errors', 'defer-panic', 'modules-files', 'json', 'http-client-server', 'context', 'testing-table', 'health-checks'], ['goroutines', 'channels', 'select', 'mutex-waitgroup', 'worker-pools', 'cancellation', 'races', 'rest-structure', 'database', 'logging-config', 'profiling', 'build-deploy', 'service-capstone']),
  rust: list('rust', ['overview-cargo', 'values-mutability', 'functions-control', 'ownership-borrowing', 'slices-strings', 'structs-enums-match'], ['option-result', 'modules-crates', 'collections', 'generics-traits', 'lifetimes', 'closures-iterators', 'smart-pointers', 'testing-docs', 'error-design'], ['box', 'rc-arc', 'refcell-interior', 'traits-depth', 'unsafe-ffi', 'threads-message', 'shared-concurrency', 'async', 'performance-memory', 'cargo-workspaces', 'cli-capstone']),
};
