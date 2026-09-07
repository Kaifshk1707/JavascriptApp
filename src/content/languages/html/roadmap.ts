import { LanguageRoadmap } from '../../types';
import { createSection, createTopic } from '../../utils';

export const htmlRoadmap: LanguageRoadmap = {
    key: 'html',
    title: 'HTML Learning Module',
    shortTitle: 'HTML',
    subtitle: 'Markup, semantics, forms, media, and production-ready page structure',
    description:
      'This HTML roadmap starts with document structure and steadily moves into semantic layout, forms, media, APIs, accessibility, and real page-building practice.',
    icon: 'logo-html5',
    color: '#F97316',
    totalHours: '34h',
    focusAreas: ['Page Structure', 'Forms', 'Semantic Layout', 'Accessibility'],
    recommendedProject:
      'Build a multi-page portfolio website with navigation, media, tables, forms, and accessibility checks.',
    sections: [
      createSection({
        id: 'html-foundation',
        title: 'HTML Foundation',
        subtitle: 'Document basics, editors, elements, and text structure',
        topics: [
          createTopic({
            id: 'html-home',
            title: 'HTML Home and Document Skeleton',
            summary: 'Learn how a browser reads and renders an HTML page.',
            level: 'Beginner',
            duration: '1h 15m',
            points: [
              'DOCTYPE, html, head, and body',
              'Page title, charset, and viewport',
              'Visible content versus metadata',
            ],
            theory: [
              'HTML gives a page its structure. A browser reads the markup from top to bottom and turns it into the DOM.',
              'The head contains metadata and page settings, while the body contains the content users actually see.',
            ],
            practicalTitle: 'Create your first HTML page',
            practicalGoal: 'Build a clean document skeleton that works on desktop and mobile.',
            practicalSteps: [
              'Start with a valid DOCTYPE.',
              'Add charset and viewport meta tags.',
              'Create a heading and supporting paragraph in the body.',
            ],
            starterCode:
              '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello Web</h1>\n    <p>My first HTML document.</p>\n  </body>\n</html>',
            expectedResult: [
              'The page opens with a visible heading and paragraph.',
              'The browser tab shows the correct title.',
            ],
            challenge: [
              'Change the page title to your name.',
              'Add two more paragraphs under the heading.',
            ],
            references: ['Document structure', 'Meta tags', 'Viewport basics'],
            quizQuestion: 'What is the main purpose of the head element?',
            quizAnswer: 'It stores metadata, document settings, and information that is not directly rendered as page content.',
          }),
          createTopic({
            id: 'html-introduction',
            title: 'Elements, Tags, Attributes, and Nesting',
            summary: 'Understand the core building blocks of HTML.',
            level: 'Beginner',
            duration: '1h 40m',
            points: [
              'Opening and closing tags',
              'Attributes and values',
              'Valid nesting and indentation',
            ],
            theory: [
              'An element usually includes an opening tag, content, and a closing tag. Some elements like img or br are void elements and do not wrap content.',
              'Proper nesting and indentation make your HTML easier to debug, maintain, and style later.',
            ],
            practicalTitle: 'Practice nested content blocks',
            practicalGoal: 'Build a small section using headings, paragraphs, and links with proper nesting.',
            practicalSteps: [
              'Create a section element.',
              'Add a heading and a paragraph with inline formatting.',
              'Add a link that points to an external site.',
            ],
            starterCode:
              '<section>\n  <h2>About This Page</h2>\n  <p>I enjoy building <strong>clean</strong> and <em>accessible</em> markup.</p>\n  <a href="https://example.com">Visit Example</a>\n</section>',
            expectedResult: [
              'The section renders with clear hierarchy.',
              'Inline emphasis appears correctly inside the paragraph.',
            ],
            challenge: [
              'Add an unordered list below the paragraph.',
              'Open the external link in a new tab.',
            ],
            references: ['Void elements', 'Attributes', 'Nesting rules'],
            quizQuestion: 'Why is the img element considered a void element?',
            quizAnswer: 'Because it does not contain inner content and does not need a closing tag.',
          }),
          createTopic({
            id: 'html-editors',
            title: 'Editors, File Paths, and Live Preview',
            summary: 'Set up a practical workflow for writing and previewing HTML.',
            level: 'Beginner',
            duration: '1h 10m',
            points: [
              'Project folders and naming',
              'Relative versus absolute paths',
              'Previewing pages in the browser',
            ],
            theory: [
              'A clear folder structure keeps images, stylesheets, and pages easy to maintain.',
              'Relative paths are used inside a project, while absolute URLs are used for full web addresses.',
            ],
            practicalTitle: 'Link local files correctly',
            practicalGoal: 'Connect a stylesheet and an image using relative paths.',
            practicalSteps: [
              'Create separate folders for styles and images.',
              'Link the stylesheet in the head.',
              'Add an image with a correct relative path.',
            ],
            starterCode:
              '<head>\n  <link rel="stylesheet" href="./styles/main.css" />\n</head>\n<body>\n  <img src="./images/profile.png" alt="Profile picture" />\n</body>',
            expectedResult: [
              'The stylesheet loads without a path error.',
              'The image renders instead of showing a broken icon.',
            ],
            challenge: [
              'Create two pages that link to each other.',
              'Add a basic navigation menu at the top of each page.',
            ],
            references: ['Relative paths', 'Project folders', 'Preview workflow'],
            quizQuestion: 'What is the first thing to check when an image does not load?',
            quizAnswer: 'Verify that the file path and file name exactly match the actual project files.',
          }),
          createTopic({
            id: 'html-text-basics',
            title: 'Headings, Paragraphs, Lists, and Links',
            summary: 'Create readable page content with the right structural elements.',
            level: 'Beginner',
            duration: '1h 45m',
            points: [
              'Heading hierarchy from h1 to h6',
              'Ordered and unordered lists',
              'Anchor links and navigation',
            ],
            theory: [
              'A clear heading hierarchy helps both users and search engines understand the page outline.',
              'Lists are more semantic and maintainable than manually typing repeated items with line breaks.',
            ],
            practicalTitle: 'Build an article outline',
            practicalGoal: 'Create a mini article with sections, lists, and internal links.',
            practicalSteps: [
              'Add a top-level h1 heading.',
              'Create at least two h2 sections.',
              'Build a table of contents that jumps to each section.',
            ],
            starterCode:
              '<h1>HTML Tutorial</h1>\n<ul>\n  <li><a href="#intro">Introduction</a></li>\n  <li><a href="#lists">Lists</a></li>\n</ul>\n<h2 id="intro">Introduction</h2>\n<p>HTML gives structure to a webpage.</p>',
            expectedResult: [
              'Clicking a table of contents link jumps to the matching section.',
              'The page has a visible content hierarchy.',
            ],
            challenge: [
              'Write a short article about your favorite hobby.',
              'Add one ordered list and one unordered list.',
            ],
            references: ['Headings', 'Anchors', 'List semantics'],
            quizQuestion: 'Why is heading order important?',
            quizAnswer: 'It creates a meaningful document outline and helps readability, accessibility, and SEO.',
          }),
        ],
      }),
      createSection({
        id: 'html-content',
        title: 'HTML Content and Inline Semantics',
        subtitle: 'Formatting, quotations, entities, colors, and reusable content patterns',
        topics: [
          createTopic({
            id: 'html-attributes',
            title: 'Global Attributes, IDs, Classes, and Inline Styles',
            summary: 'Control behavior, identify elements, and attach styles safely.',
            level: 'Beginner',
            duration: '1h 25m',
            points: [
              'id and class usage',
              'title and style attributes',
              'Reusable hooks for CSS and JavaScript',
            ],
            theory: [
              'Classes are reusable labels, while IDs are best used for unique elements or internal page anchors.',
              'Inline styles are useful for quick tests but should not replace maintainable CSS in real projects.',
            ],
            practicalTitle: 'Annotate and style a profile card',
            practicalGoal: 'Use global attributes to make a card easier to target and understand.',
            practicalSteps: [
              'Add an id and class to a card container.',
              'Use the title attribute on a text element.',
              'Apply one temporary inline style for a quick visual test.',
            ],
            starterCode:
              '<div id="profile-card" class="card" style="background:#fff3e8;padding:16px;">\n  <h2>Alex Johnson</h2>\n  <p title="Current role">Frontend learner</p>\n</div>',
            expectedResult: [
              'The card displays custom styling and a tooltip on hover.',
              'The markup is ready for later CSS targeting.',
            ],
            challenge: [
              'Add a warning message block with a separate class name.',
              'Explain when you would prefer a class over an id.',
            ],
            references: ['Global attributes', 'id versus class', 'Inline style caution'],
            quizQuestion: 'Why are classes preferred over IDs for repeated styling?',
            quizAnswer: 'Classes can be reused across many elements, which makes styling scalable and consistent.',
          }),
          createTopic({
            id: 'html-formatting',
            title: 'Formatting Tags, Quotations, and Code Content',
            summary: 'Add meaning to text instead of styling with generic tags only.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'strong, em, mark, small, del, and ins',
              'blockquote, q, and cite',
              'code, pre, and kbd',
            ],
            theory: [
              'Formatting elements should communicate meaning, not only visual appearance.',
              'The pre and code combination is ideal when you need to preserve spacing and show technical snippets.',
            ],
            practicalTitle: 'Create a documentation note block',
            practicalGoal: 'Combine text formatting, a quotation, and a short code example.',
            practicalSteps: [
              'Add a quote from a web learning source.',
              'Use kbd to show a keyboard shortcut.',
              'Add a short HTML snippet inside pre and code.',
            ],
            starterCode:
              '<blockquote cite="https://developer.mozilla.org">Semantic HTML improves accessibility.</blockquote>\n<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>\n<pre><code>&lt;h1&gt;Hello&lt;/h1&gt;</code></pre>',
            expectedResult: [
              'The quote, keyboard keys, and code sample are clearly separated.',
              'Code characters remain escaped and readable.',
            ],
            challenge: [
              'Add a short inline quote using the q element.',
              'Create a note that includes deleted and inserted text.',
            ],
            references: ['Text formatting tags', 'Quotation tags', 'Code examples'],
            quizQuestion: 'Why is pre useful when showing source code?',
            quizAnswer: 'It preserves whitespace and line breaks so the code stays readable.',
          }),
          createTopic({
            id: 'html-comments-entities',
            title: 'Comments, Character Entities, and Symbols',
            summary: 'Document your markup and display special characters correctly.',
            level: 'Beginner',
            duration: '1h 5m',
            points: [
              'HTML comments',
              'Reserved characters',
              'Common entities such as ampersand and less-than',
            ],
            theory: [
              'Comments make large markup files easier to scan, especially when a page has many sections.',
              'Entities let you display reserved characters or special symbols without breaking the HTML.',
            ],
            practicalTitle: 'Document a section and escape symbols',
            practicalGoal: 'Add comments and entities to a sample tutorial block.',
            practicalSteps: [
              'Insert a comment above a major section.',
              'Display reserved characters like less-than and greater-than.',
              'Add a copyright or trademark symbol using entities.',
            ],
            starterCode:
              '<!-- Pricing section -->\n<p>Use &lt;section&gt; to group related content.</p>\n<p>&copy; 2026 LearnHub</p>',
            expectedResult: [
              'The comment is visible in source but not rendered on the page.',
              'Reserved symbols display as text instead of HTML.',
            ],
            challenge: [
              'Add an emoji and one currency symbol using entities or Unicode.',
            ],
            references: ['Comments', 'HTML entities', 'Reserved characters'],
            quizQuestion: 'Why can you not directly type <section> inside a paragraph if you want to display it literally?',
            quizAnswer: 'Because the browser would treat it as markup instead of plain text unless it is escaped.',
          }),
          createTopic({
            id: 'html-seo-meta',
            title: 'Meta Tags, SEO Basics, and Social Sharing',
            summary: 'Improve discoverability and preview quality for your pages.',
            level: 'Intermediate',
            duration: '1h 30m',
            points: [
              'Meta description',
              'Open Graph basics',
              'Meaningful titles and headings',
            ],
            theory: [
              'Metadata helps browsers, search engines, and social platforms understand the page.',
              'Good titles and descriptions do not guarantee ranking, but they do improve clarity and click quality.',
            ],
            practicalTitle: 'Optimize the head section',
            practicalGoal: 'Add essential metadata for search and social sharing.',
            practicalSteps: [
              'Write a specific title tag.',
              'Add a meta description.',
              'Add a basic Open Graph title and description.',
            ],
            starterCode:
              '<head>\n  <title>HTML Portfolio Project</title>\n  <meta name="description" content="A semantic HTML portfolio with forms, media, and accessible sections." />\n  <meta property="og:title" content="HTML Portfolio Project" />\n</head>',
            expectedResult: [
              'The page head contains reusable SEO and social metadata.',
              'The title describes the page clearly.',
            ],
            challenge: [
              'Write a different description for a contact page.',
            ],
            references: ['Title tag', 'Meta description', 'Open Graph basics'],
            quizQuestion: 'What is the role of a meta description?',
            quizAnswer: 'It provides a concise summary of the page for search and sharing contexts.',
          }),
        ],
      }),
      createSection({
        id: 'html-structure',
        title: 'HTML Structure, Media, and Data',
        subtitle: 'Semantic layout, images, tables, lists, forms, and embedded content',
        topics: [
          createTopic({
            id: 'html-semantic-layout',
            title: 'Semantic Layout and Landmark Elements',
            summary: 'Build meaningful page structure using semantic sections.',
            level: 'Intermediate',
            duration: '1h 50m',
            points: [
              'header, nav, main, section, article, footer',
              'When to use div versus semantic tags',
              'Landmarks for accessibility',
            ],
            theory: [
              'Semantic elements communicate the purpose of content, not just its placement.',
              'Landmark regions help assistive technology users navigate the page more efficiently.',
            ],
            practicalTitle: 'Refactor a generic layout',
            practicalGoal: 'Replace generic wrappers with semantic elements where appropriate.',
            practicalSteps: [
              'Create a header with navigation.',
              'Wrap the core article content in main.',
              'Add a footer with contact links.',
            ],
            starterCode:
              '<header>\n  <nav>\n    <a href="#home">Home</a>\n    <a href="#contact">Contact</a>\n  </nav>\n</header>\n<main>\n  <article>\n    <h1>Semantic Layout</h1>\n    <p>Meaningful structure improves accessibility.</p>\n  </article>\n</main>',
            expectedResult: [
              'The page has recognizable landmark regions.',
              'The layout is easier to understand than a div-only version.',
            ],
            challenge: [
              'Create a page with two article cards inside a section.',
            ],
            references: ['Landmark elements', 'Semantic structure', 'div versus section'],
            quizQuestion: 'Why might semantic elements be better than generic div containers?',
            quizAnswer: 'They describe the purpose of content, which improves clarity, accessibility, and maintainability.',
          }),
          createTopic({
            id: 'html-media',
            title: 'Images, Audio, Video, and Iframes',
            summary: 'Add rich content while keeping it accessible and organized.',
            level: 'Intermediate',
            duration: '1h 45m',
            points: [
              'Accessible images and alt text',
              'Video and audio controls',
              'Safe embedding with iframes',
            ],
            theory: [
              'Images should include alt text when they communicate meaning. Decorative images should be treated differently.',
              'Embedded content needs labels and thoughtful usage so that users understand what is being loaded.',
            ],
            practicalTitle: 'Create a media showcase',
            practicalGoal: 'Build a section that includes an image, a video, and an embedded frame.',
            practicalSteps: [
              'Add an image with a meaningful alt value.',
              'Include a video with native controls.',
              'Embed a map or media player in an iframe with a clear title.',
            ],
            starterCode:
              '<figure>\n  <img src="./images/team.jpg" alt="A product team planning a website launch" width="320" />\n  <figcaption>Planning session before launch day.</figcaption>\n</figure>\n<video controls width="320">\n  <source src="./media/demo.mp4" type="video/mp4" />\n</video>',
            expectedResult: [
              'The section displays multiple media types with basic accessibility support.',
              'The content remains understandable even if media fails to load.',
            ],
            challenge: [
              'Add a favicon to the project and verify it appears in the browser tab.',
            ],
            references: ['alt text', 'figure and figcaption', 'iframe title'],
            quizQuestion: 'When should an image have alt text?',
            quizAnswer: 'When the image adds meaning or information that a user should still receive without seeing the image.',
          }),
          createTopic({
            id: 'html-tables',
            title: 'Tables, Lists, and Structured Data',
            summary: 'Represent organized information with the correct elements.',
            level: 'Intermediate',
            duration: '1h 35m',
            points: [
              'table, thead, tbody, tfoot',
              'th, td, caption, scope',
              'Choosing tables only for tabular data',
            ],
            theory: [
              'Tables are for data relationships, not for layout. They work best when row and column meaning matters.',
              'Captions and header cells improve readability and accessibility for complex data.',
            ],
            practicalTitle: 'Create a pricing table',
            practicalGoal: 'Build a semantic table for a pricing or feature comparison.',
            practicalSteps: [
              'Add a caption to explain the table.',
              'Use table headers for each column.',
              'Add at least three rows of data.',
            ],
            starterCode:
              '<table>\n  <caption>Pricing Plans</caption>\n  <thead>\n    <tr><th>Plan</th><th>Price</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Starter</td><td>Free</td></tr>\n    <tr><td>Pro</td><td>$12</td></tr>\n  </tbody>\n</table>',
            expectedResult: [
              'The table shows clear headers and data rows.',
              'The caption explains what the table represents.',
            ],
            challenge: [
              'Add one column for support level.',
              'Use colspan or rowspan in one row if it makes sense.',
            ],
            references: ['Table captions', 'Header cells', 'Tabular data'],
            quizQuestion: 'Why should tables not be used for page layout?',
            quizAnswer: 'Because tables are meant for relational data, while layout is better handled by CSS.',
          }),
          createTopic({
            id: 'html-forms',
            title: 'Forms, Inputs, and Validation',
            summary: 'Collect user information with clear labels and useful browser validation.',
            level: 'Intermediate',
            duration: '2h 20m',
            points: [
              'Common input types',
              'Labels, placeholders, and field grouping',
              'required, minlength, pattern, and autocomplete',
            ],
            theory: [
              'Good forms are about clarity, accessibility, and reducing user mistakes.',
              'Built-in browser validation covers many simple cases before you even add JavaScript.',
            ],
            practicalTitle: 'Build a registration form',
            practicalGoal: 'Create a structured form with several field types and validation rules.',
            practicalSteps: [
              'Add name, email, password, and date fields.',
              'Use label elements correctly.',
              'Add required and length-based validation.',
            ],
            starterCode:
              '<form>\n  <label for="email">Email</label>\n  <input id="email" type="email" required />\n\n  <label for="password">Password</label>\n  <input id="password" type="password" minlength="8" required />\n\n  <button type="submit">Create account</button>\n</form>',
            expectedResult: [
              'Submitting an incomplete form triggers the browser validation UI.',
              'Each field has a matching label.',
            ],
            challenge: [
              'Add a select element and a textarea.',
              'Use fieldset and legend to group related inputs.',
            ],
            references: ['Input types', 'Form validation', 'Labels'],
            quizQuestion: 'What is the safest way to link a label to an input?',
            quizAnswer: 'Match the label for attribute with the input id.',
          }),
        ],
      }),
      createSection({
        id: 'html-advanced',
        title: 'HTML Advanced Topics',
        subtitle: 'Responsive markup, APIs, accessibility, performance, and capstone work',
        topics: [
          createTopic({
            id: 'html-responsive',
            title: 'Responsive HTML, Picture, and Source Selection',
            summary: 'Prepare markup for different screen sizes and devices.',
            level: 'Advanced',
            duration: '1h 30m',
            points: [
              'Responsive images',
              'picture and source elements',
              'Reducing layout shifts with width and height',
            ],
            theory: [
              'Responsive design is not only about CSS. The HTML should also provide appropriate image choices and stable layout information.',
              'Specifying dimensions for images helps reduce layout shifts while the page loads.',
            ],
            practicalTitle: 'Add responsive image sources',
            practicalGoal: 'Serve different image versions for different screen widths.',
            practicalSteps: [
              'Wrap an image inside picture.',
              'Add multiple source elements.',
              'Keep a fallback img element at the end.',
            ],
            starterCode:
              '<picture>\n  <source media="(min-width: 900px)" srcset="./images/hero-large.jpg" />\n  <source media="(min-width: 600px)" srcset="./images/hero-medium.jpg" />\n  <img src="./images/hero-small.jpg" alt="Team planning layout decisions" width="320" height="200" />\n</picture>',
            expectedResult: [
              'The markup can serve different images for different screen conditions.',
              'The fallback image still works when no source matches.',
            ],
            challenge: [
              'Add a lazy-loaded image gallery item using loading="lazy".',
            ],
            references: ['picture', 'srcset', 'Layout shift prevention'],
            quizQuestion: 'Why is width and height on images useful even before CSS loads?',
            quizAnswer: 'It helps the browser reserve space and reduces layout shifts during loading.',
          }),
          createTopic({
            id: 'html-web-apis',
            title: 'Useful HTML Patterns for Web APIs',
            summary: 'Prepare markup that works well with browser features and JavaScript APIs.',
            level: 'Advanced',
            duration: '1h 40m',
            points: [
              'details and summary',
              'dialog-ready markup',
              'File input and drag-drop zones',
            ],
            theory: [
              'Some HTML elements provide useful interactive behavior before any custom JavaScript is added.',
              'Good markup gives JavaScript a solid foundation for richer API integrations later.',
            ],
            practicalTitle: 'Build interactive markup shells',
            practicalGoal: 'Create a FAQ block, a drop zone, and a dialog launch area.',
            practicalSteps: [
              'Add a details and summary FAQ block.',
              'Create a file drop area container.',
              'Add a button intended to open a dialog.',
            ],
            starterCode:
              '<details>\n  <summary>What is semantic HTML?</summary>\n  <p>It describes the meaning of content.</p>\n</details>\n<div class="drop-zone">Drop files here</div>\n<button type="button">Open dialog</button>',
            expectedResult: [
              'The FAQ expands without custom JavaScript.',
              'The drop zone and button are ready for later scripting.',
            ],
            challenge: [
              'Add a file input inside the drop zone with a helpful label.',
            ],
            references: ['details and summary', 'dialog patterns', 'File upload markup'],
            quizQuestion: 'What is one advantage of the details element?',
            quizAnswer: 'It provides native expandable content behavior without needing custom JavaScript.',
          }),
          createTopic({
            id: 'html-accessibility',
            title: 'Accessibility, ARIA Basics, and Keyboard Flow',
            summary: 'Review the markup decisions that make pages more inclusive.',
            level: 'Advanced',
            duration: '1h 50m',
            points: [
              'Accessible names and labels',
              'Landmarks and heading consistency',
              'When ARIA helps and when native HTML is better',
            ],
            theory: [
              'Native HTML should be your first accessibility tool. ARIA is useful when native semantics do not cover the interaction.',
              'Keyboard users rely on clear focus order, meaningful labels, and logical structure.',
            ],
            practicalTitle: 'Audit a page for accessibility',
            practicalGoal: 'Create a checklist and improve a sample page structure.',
            practicalSteps: [
              'Check heading order.',
              'Confirm that form fields have labels.',
              'Review interactive elements for keyboard access.',
            ],
            starterCode:
              '<main>\n  <h1>Accessible Product Page</h1>\n  <button type="button">Add to cart</button>\n  <label for="email">Email</label>\n  <input id="email" type="email" />\n</main>',
            expectedResult: [
              'The page follows a cleaner accessibility checklist.',
              'Users can identify controls and page landmarks more easily.',
            ],
            challenge: [
              'Add a skip link and test a keyboard-only path through the page.',
            ],
            references: ['Keyboard access', 'Labels', 'Native HTML first'],
            quizQuestion: 'Why is native HTML usually preferred before ARIA?',
            quizAnswer: 'Because native elements already provide built-in semantics and behaviors that are more reliable when used correctly.',
          }),
          createTopic({
            id: 'html-capstone',
            title: 'HTML Capstone Project and Review',
            summary: 'Bring everything together in a complete multi-section website.',
            level: 'Advanced',
            duration: '3h 30m',
            points: [
              'Page planning and content hierarchy',
              'Combining forms, media, and semantic layout',
              'Final accessibility and SEO review',
            ],
            theory: [
              'A capstone project shows whether you can combine isolated lessons into a coherent product.',
              'The final review should cover structure, labels, metadata, and content clarity, not only whether the page renders.',
            ],
            practicalTitle: 'Build a complete semantic site',
            practicalGoal: 'Create a home page, about page, and contact page using the concepts from the roadmap.',
            practicalSteps: [
              'Plan the page sections and navigation.',
              'Add media, tables, and one working form.',
              'Run an accessibility and metadata review before finishing.',
            ],
            starterCode:
              '<main>\n  <section>\n    <h1>My Portfolio</h1>\n    <p>Welcome to my semantic HTML project.</p>\n  </section>\n</main>',
            expectedResult: [
              'You finish a small multi-page site with clear semantic structure.',
              'The project feels like a realistic HTML foundation project.',
            ],
            challenge: [
              'Write a short self-review listing what you would improve next.',
            ],
            references: ['Project planning', 'Accessibility checklist', 'Metadata review'],
            quizQuestion: 'What should a final HTML review include besides visual inspection?',
            quizAnswer: 'Structure, semantics, labels, metadata, accessibility, and content clarity.',
          }),
        ],
      }),
    ],
  };
