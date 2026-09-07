const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_ROOT = path.join(ROOT, 'src', 'content');
const LANGUAGE_ROOT = path.join(CONTENT_ROOT, 'languages');
const CATALOG_SOURCE = fs.readFileSync(path.join(CONTENT_ROOT, 'languageCatalog.ts'), 'utf8');
const SUPPORTED_LEVELS = new Set(['Beginner', 'Intermediate', 'Advanced']);

const languageKeys = [
  'html',
  'css',
  'javascript',
  'python',
  'react',
  'sql',
  'nodejs',
  'bootstrap',
  'typescript',
  'java',
  'c',
  'cpp',
  'csharp',
  'php',
  'go',
  'rust',
  'kotlin',
  'swift',
  'dartflutter',
  'ruby',
];

const errors = [];
const seenLanguageIds = new Set();
const seenSectionIds = new Map();
const seenTopicIds = new Map();
const topicsByLanguage = new Map();

const readLanguageSource = (languageKey) => {
  const languageDirectory = path.join(LANGUAGE_ROOT, languageKey);
  const fileNames = fs.readdirSync(languageDirectory)
    .filter((fileName) => fileName.endsWith('.ts'))
    .sort();
  const filePath = path.join(languageDirectory, 'roadmap.ts');
  return {
    filePath,
    source: fileNames
      .map((fileName) => fs.readFileSync(path.join(languageDirectory, fileName), 'utf8'))
      .join('\n'),
  };
};

const reportDuplicate = (type, id, filePath, seenMap) => {
  const previous = seenMap.get(id);

  if (previous) {
    errors.push(`${type} id "${id}" is duplicated in ${previous} and ${filePath}`);
    return;
  }

  seenMap.set(id, filePath);
};

const hasNonEmptyStringField = (source, fieldName) => {
  const match = source.match(new RegExp(`${fieldName}:\\s*'([\\s\\S]*?)'`));
  return Boolean(match && match[1].trim());
};

const hasNonEmptyArrayField = (source, fieldName) => {
  const match = source.match(new RegExp(`${fieldName}:\\s*\\[([\\s\\S]*?)\\]`));
  return Boolean(match && match[1].trim());
};

const getBlocks = (source, token) => {
  const blocks = [];
  let start = source.indexOf(token);

  while (start !== -1) {
    let depth = 0;
    let end = start;

    for (; end < source.length; end += 1) {
      const char = source[end];

      if (char === '{') {
        depth += 1;
      } else if (char === '}') {
        depth -= 1;

        if (depth === 0) {
          blocks.push(source.slice(start, end + 1));
          break;
        }
      }
    }

    start = source.indexOf(token, end + 1);
  }

  return blocks;
};

for (const languageKey of languageKeys) {
  const { filePath, source } = readLanguageSource(languageKey);
  const relativePath = path.relative(ROOT, filePath);
  const languageIdMatch = source.match(/key: '([^']+)'/);
  const languageId = languageIdMatch?.[1];

  if (!languageId) {
    errors.push(`Missing language key in ${relativePath}`);
  } else if (languageId !== languageKey) {
    errors.push(`Language key mismatch in ${relativePath}: expected ${languageKey}, found ${languageId}`);
  } else if (seenLanguageIds.has(languageId)) {
    errors.push(`Language id "${languageId}" is duplicated`);
  } else {
    seenLanguageIds.add(languageId);
  }

  const sectionBlocks = getBlocks(source, 'createSection({');
  const languageTopicIds = [];
  const languageLevels = new Set();
  const compactSpecs = [...source.matchAll(/\['([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'(Beginner|Intermediate|Advanced)'/g)];

  // Phase 7 roadmaps keep authored specs readable and construct full topics through the shared factory.
  for (const [, suffix, , , level] of compactSpecs) {
    const topicId = suffix.startsWith(`${languageKey}-`) ? suffix : `${languageKey}-${suffix}`;
    reportDuplicate('Topic', topicId, relativePath, seenTopicIds);
    languageTopicIds.push(topicId);
    languageLevels.add(level);
  }
  const compactPrerequisites = [...source.matchAll(/\['([^']+)',\s*'[^']*',\s*'[^']*',\s*'(?:Beginner|Intermediate|Advanced)',\s*\[[^\]]*\],\s*'[^']*',\s*'([^']+)'\]/g)];
  for (const [, suffix, prerequisiteId] of compactPrerequisites) {
    const topicId = suffix.startsWith(`${languageKey}-`) ? suffix : `${languageKey}-${suffix}`;
    if (!languageTopicIds.includes(prerequisiteId)) {
      errors.push(`Topic "${topicId}" references missing prerequisite "${prerequisiteId}" in ${relativePath}`);
    }
  }

  if (sectionBlocks.length === 0) {
    errors.push(`Language "${languageKey}" has no sections`);
  }

  for (const sectionBlock of sectionBlocks) {
    const sectionId = sectionBlock.match(/id: '([^']+)'/)?.[1];

    if (!sectionId) {
      errors.push(`Missing section id in ${relativePath}`);
    } else {
      reportDuplicate('Section', sectionId, relativePath, seenSectionIds);
    }

    if (!hasNonEmptyStringField(sectionBlock, 'title')) {
      errors.push(`Section "${sectionId || 'unknown'}" is missing a title in ${relativePath}`);
    }

    const topicBlocks = [
      ...getBlocks(sectionBlock, 'createTopic({'),
      ...getBlocks(sectionBlock, 'createCurriculumTopic({'),
    ];

    const generatedTopicCount = (sectionBlock.match(/\b(?:q|topic)\('/g) || []).length;

    if (topicBlocks.length === 0 && generatedTopicCount === 0 && compactSpecs.length === 0) {
      errors.push(`Section "${sectionId || 'unknown'}" has no topics in ${relativePath}`);
    }

    for (const topicMatch of sectionBlock.matchAll(/\bq\('([^']+)'/g)) {
      const topicId = topicMatch[1];
      reportDuplicate('Topic', topicId, relativePath, seenTopicIds);
      languageTopicIds.push(topicId);
    }

    for (const topicMatch of sectionBlock.matchAll(/\btopic\('([^']+)'/g)) {
      const topicId = topicMatch[1];
      reportDuplicate('Topic', topicId, relativePath, seenTopicIds);
      languageTopicIds.push(topicId);
    }

    for (const levelMatch of sectionBlock.matchAll(/\bq\('[^']+',\s*'[^']+',\s*'[^']+',\s*'(Beginner|Intermediate|Advanced)'/g)) {
      languageLevels.add(levelMatch[1]);
    }

    for (const levelMatch of sectionBlock.matchAll(/\btopic\('[^']+',\s*'[^']+',\s*'[^']+',\s*'(Beginner|Intermediate|Advanced)'/g)) {
      languageLevels.add(levelMatch[1]);
    }

    for (const topicBlock of topicBlocks) {
      const topicId = topicBlock.match(/id: '([^']+)'/)?.[1];
      const level = topicBlock.match(/level: '([^']+)'/)?.[1];

      if (!topicId) {
        errors.push(`Missing topic id in ${relativePath}`);
      } else {
        reportDuplicate('Topic', topicId, relativePath, seenTopicIds);
      }

      const compactTopic = topicBlock.includes('createCurriculumTopic({');
      const requiredFields = compactTopic
        ? ['title', 'summary', 'exercise', 'starterCode', 'expectedResult', 'challenge', 'quizQuestion', 'quizAnswer']
        : ['title', 'summary', 'duration', 'practicalTitle', 'practicalGoal', 'starterCode', 'quizQuestion', 'quizAnswer'];

      for (const fieldName of requiredFields) {
        if (!hasNonEmptyStringField(topicBlock, fieldName)) {
          errors.push(`Topic "${topicId || 'unknown'}" is missing ${fieldName} in ${relativePath}`);
        }
      }

      if (compactTopic) {
        for (const fieldName of ['focus', 'references']) {
          if (!hasNonEmptyArrayField(topicBlock, fieldName)) {
            errors.push(`Topic "${topicId || 'unknown'}" has an empty or missing ${fieldName} array in ${relativePath}`);
          }
        }
      }

      if (!level || !SUPPORTED_LEVELS.has(level)) {
        errors.push(`Topic "${topicId || 'unknown'}" has unsupported level "${level || 'missing'}" in ${relativePath}`);
      } else {
        languageLevels.add(level);
      }

      if (topicId) {
        languageTopicIds.push(topicId);
      }

      for (const fieldName of compactTopic ? [] : ['points', 'theory', 'practicalSteps', 'expectedResult', 'challenge', 'references']) {
        if (!hasNonEmptyArrayField(topicBlock, fieldName)) {
          errors.push(`Topic "${topicId || 'unknown'}" has an empty or missing ${fieldName} array in ${relativePath}`);
        }
      }

      const prerequisites = [
        ...topicBlock.matchAll(/prerequisites:\s*\[([\s\S]*?)\]/g),
      ].flatMap((match) => [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1]));

      for (const prerequisiteId of prerequisites) {
        if (prerequisiteId === topicId) {
          errors.push(`Topic "${topicId}" cannot list itself as a prerequisite in ${relativePath}`);
        }
      }

      const quizOptions = topicBlock.match(/quizOptions:\s*\[([\s\S]*?)\]/);
      if (quizOptions) {
        const options = [...quizOptions[1].matchAll(/'([^']+)'/g)].map((item) => item[1]);
        const answer = topicBlock.match(/quizAnswer:\s*'([\s\S]*?)'/)?.[1];

        if (options.length < 2) {
          errors.push(`Topic "${topicId || 'unknown'}" quizOptions must contain at least two options in ${relativePath}`);
        }

        if (answer && !options.includes(answer)) {
          errors.push(`Topic "${topicId || 'unknown'}" quizOptions must include quizAnswer in ${relativePath}`);
        }
      }
    }
  }

  for (const level of SUPPORTED_LEVELS) {
    if (!languageLevels.has(level)) {
      errors.push(`Language "${languageKey}" has no ${level} topics in ${relativePath}`);
    }
  }

  topicsByLanguage.set(languageKey, languageTopicIds);
}

const generatedTopicIds = new Set();
for (const languageKey of languageKeys) {
  for (const suffix of ['production-checklist', 'debugging-workflow', 'capstone-review']) {
    const topicId = `${languageKey}-${suffix}`;
    if (seenTopicIds.has(topicId) || generatedTopicIds.has(topicId)) {
      errors.push(`Generated topic id "${topicId}" is duplicated`);
    }
    generatedTopicIds.add(topicId);
  }
}

for (const languageKey of languageKeys) {
  if (!CATALOG_SOURCE.includes(`key: '${languageKey}'`)) {
    errors.push(`Language "${languageKey}" is missing from the lightweight catalog`);
  }
}

const goalSourcePath = path.join(ROOT, 'src', 'learning', 'learningGoals.ts');
if (fs.existsSync(goalSourcePath)) {
  const goalSource = fs.readFileSync(goalSourcePath, 'utf8');
  const validGoalIds = new Set(['web-development', 'backend-development', 'mobile-development', 'systems-programming', 'database-development', 'general-programming']);
  for (const [, goalId] of goalSource.matchAll(/\{ id: '([^']+)', title:/g)) {
    if (!validGoalIds.has(goalId) && !['foundation', 'core', 'modern', 'advanced', 'projects'].includes(goalId)) errors.push(`Unsupported learning goal id "${goalId}"`);
  }
  for (const [, languageKey, ids] of goalSource.matchAll(/refs\('([^']+)',\s*\[([^\]]*)\]\)/g)) {
    if (!languageKeys.includes(languageKey)) errors.push(`Learning goal references unknown language "${languageKey}"`);
    for (const [, topicId] of ids.matchAll(/'([^']+)'/g)) {
      if (!seenTopicIds.has(topicId) && !generatedTopicIds.has(topicId)) errors.push(`Learning goal references missing topic "${topicId}"`);
    }
  }
}

const exerciseSourcePath = path.join(CONTENT_ROOT, 'codeExercises.ts');
if (fs.existsSync(exerciseSourcePath)) {
  const exerciseSource = fs.readFileSync(exerciseSourcePath, 'utf8');
  const exerciseIds = new Set();
  const supportedExerciseLanguages = new Set(['html', 'css', 'javascript', 'python']);
  const supportedValidationTypes = new Set(['manual', 'output-match', 'dom-check', 'required-token']);
  for (const block of exerciseSource.matchAll(/\{ id: '([^']+)', title: '([^']*)', description: '([^']*)', language: '([^']+)', starterCode: '([\s\S]*?)',([\s\S]*?)validationType: '([^']+)'/g)) {
    const [, exerciseId, title, description, language, , remainder, validationType] = block;
    if (exerciseIds.has(exerciseId)) errors.push(`Coding exercise id "${exerciseId}" is duplicated`);
    exerciseIds.add(exerciseId);
    if (!title.trim() || !description.trim()) errors.push(`Coding exercise "${exerciseId}" is missing title or description`);
    if (!supportedExerciseLanguages.has(language)) errors.push(`Coding exercise "${exerciseId}" uses unsupported language "${language}"`);
    if (!supportedValidationTypes.has(validationType)) errors.push(`Coding exercise "${exerciseId}" uses unsupported validation type "${validationType}"`);
  }
}

const metadataSources = ['expandedMetadata.ts', 'phase5Metadata.ts', 'phase7Metadata.ts'].map((fileName) =>
  fs.readFileSync(path.join(LANGUAGE_ROOT, fileName), 'utf8'),
);
const metadataTopicIds = new Set(
  metadataSources.flatMap((source) =>
    [...source.matchAll(/make\('([^']+)'/g)].map((match) => match[1]),
  ),
);
for (const topicId of metadataTopicIds) {
  if (!seenTopicIds.has(topicId) && !generatedTopicIds.has(topicId)) {
    errors.push(`Metadata topic "${topicId}" has no matching content topic`);
  }
}

for (const languageKey of languageKeys) {
  const { filePath, source } = readLanguageSource(languageKey);
  const relativePath = path.relative(ROOT, filePath);
  const topicIds = new Set(topicsByLanguage.get(languageKey) ?? []);
  const prerequisites = [...source.matchAll(/id: '([^']+)'[\s\S]*?prerequisites:\s*\[([\s\S]*?)\]/g)];
  const prerequisiteMap = new Map();

  for (const [, topicId, rawPrerequisites] of prerequisites) {
    const prerequisiteIds = [...rawPrerequisites.matchAll(/'([^']+)'/g)].map((item) => item[1]);
    prerequisiteMap.set(topicId, prerequisiteIds);

    for (const prerequisiteId of prerequisiteIds) {
      if (!topicIds.has(prerequisiteId)) {
        errors.push(`Topic "${topicId}" references missing prerequisite "${prerequisiteId}" in ${relativePath}`);
      }
    }
  }

  for (const [topicId, prerequisiteIds] of prerequisiteMap.entries()) {
    for (const prerequisiteId of prerequisiteIds) {
      if (prerequisiteMap.get(prerequisiteId)?.includes(topicId)) {
        errors.push(`Topics "${topicId}" and "${prerequisiteId}" have circular prerequisites in ${relativePath}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`Learning content validation failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const authoredTopicCount = seenTopicIds.size;
const generatedPracticeCount = generatedTopicIds.size;
const runtimeTopicCount = authoredTopicCount + generatedPracticeCount;
console.log(`Learning content validation passed for ${languageKeys.length} languages.`);
console.log(`Authored topics: ${authoredTopicCount}`);
console.log(`Generated practice topics: ${generatedPracticeCount}`);
console.log(`Effective runtime topics: ${runtimeTopicCount}`);
