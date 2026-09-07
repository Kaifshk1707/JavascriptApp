import { LanguageRoadmap } from '../../types';
import { createSection, createTopic } from '../../utils';

export const cssRoadmap: LanguageRoadmap = {
    key: 'css',
    title: 'CSS Learning Module',
    shortTitle: 'CSS',
    subtitle: 'Selectors, layouts, responsive design, motion, theming, and maintainable styling',
    description:
      'This CSS roadmap covers styling from the fundamentals to advanced layout systems, animation, architecture, and real interface design patterns.',
    icon: 'logo-css3',
    color: '#3B82F6',
    totalHours: '36h',
    focusAreas: ['Selectors', 'Flexbox', 'Grid', 'Responsive UI'],
    recommendedProject:
      'Build a responsive product landing page and dashboard interface with reusable design tokens and polished interactions.',
    sections: [
      createSection({
        id: 'css-foundation',
        title: 'CSS Foundations',
        subtitle: 'Syntax, selectors, comments, colors, spacing, and the box model',
        topics: [
          createTopic({
            id: 'css-intro',
            title: 'CSS Introduction and External Stylesheets',
            summary: 'Learn how CSS rules are written and connected to HTML.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'Selector, property, and value',
              'Inline, internal, and external CSS',
              'Why external files scale better',
            ],
            theory: [
              'CSS rules pair a selector with declarations that define how matched elements should look.',
              'External stylesheets improve reuse, separation of concerns, and maintainability as a project grows.',
            ],
            practicalTitle: 'Attach your first stylesheet',
            practicalGoal: 'Style a basic HTML page from a separate CSS file.',
            practicalSteps: [
              'Create a stylesheet file.',
              'Style the body, heading, and paragraph elements.',
              'Link the stylesheet from the HTML head.',
            ],
            starterCode:
              'body {\n  font-family: Arial, sans-serif;\n  background: #f8fafc;\n}\n\nh1 {\n  color: #1d4ed8;\n}\n\np {\n  color: #334155;\n}',
            expectedResult: [
              'The page typography and colors change after the stylesheet is loaded.',
            ],
            challenge: [
              'Style a card with padding and a rounded border.',
            ],
            references: ['CSS syntax', 'External CSS', 'Cascade basics'],
            quizQuestion: 'Why do larger projects prefer external CSS over inline CSS?',
            quizAnswer: 'Because external CSS is easier to reuse, maintain, and organize across many pages.',
          }),
          createTopic({
            id: 'css-selectors',
            title: 'Selectors, Combinators, and Specificity',
            summary: 'Target elements accurately and avoid style conflicts.',
            level: 'Beginner',
            duration: '1h 45m',
            points: [
              'Type, class, id, and attribute selectors',
              'Descendant and direct child combinators',
              'Specificity and source order',
            ],
            theory: [
              'Specificity decides which selector wins when multiple rules target the same property on the same element.',
              'Reusable class selectors usually provide a better balance of power and maintainability than overly specific selectors.',
            ],
            practicalTitle: 'Style a navigation menu',
            practicalGoal: 'Use a range of selectors to style links and active states cleanly.',
            practicalSteps: [
              'Create base styles for all links.',
              'Add a hover state.',
              'Add a class-based active state.',
            ],
            starterCode:
              '.nav-link {\n  color: #1e293b;\n  text-decoration: none;\n}\n\n.nav-link:hover {\n  color: #2563eb;\n}\n\n.nav-link.active {\n  font-weight: 700;\n}',
            expectedResult: [
              'The navigation shows distinct default, hover, and active states.',
            ],
            challenge: [
              'Style only external links using an attribute selector.',
            ],
            references: ['Selectors', 'Specificity', 'Combinators'],
            quizQuestion: 'What is specificity used for in CSS?',
            quizAnswer: 'It determines which rule wins when competing selectors target the same element.',
          }),
          createTopic({
            id: 'css-box-model',
            title: 'Colors, Backgrounds, Borders, and the Box Model',
            summary: 'Control visual presentation and spacing with confidence.',
            level: 'Beginner',
            duration: '1h 40m',
            points: [
              'Content, padding, border, and margin',
              'Box sizing',
              'Background layers and border styling',
            ],
            theory: [
              'The box model explains how much space an element occupies and why spacing bugs happen.',
              'Using box-sizing: border-box makes layout sizing more predictable in real interfaces.',
            ],
            practicalTitle: 'Build a feature card',
            practicalGoal: 'Use padding, border, radius, and background to create a clean component.',
            practicalSteps: [
              'Set a width and padding.',
              'Add a border and rounded corners.',
              'Use a subtle background or gradient.',
            ],
            starterCode:
              '.feature-card {\n  width: 320px;\n  padding: 20px;\n  margin: 16px auto;\n  border: 1px solid #bfdbfe;\n  border-radius: 18px;\n  background: linear-gradient(180deg, #eff6ff, #ffffff);\n  box-sizing: border-box;\n}',
            expectedResult: [
              'The card appears well spaced and visually separated from the page.',
            ],
            challenge: [
              'Create a second dark-mode version of the same card.',
            ],
            references: ['Box model', 'Border box sizing', 'Backgrounds'],
            quizQuestion: 'What does box-sizing: border-box change?',
            quizAnswer: 'It makes the declared width include content, padding, and border instead of only the content box.',
          }),
          createTopic({
            id: 'css-typography',
            title: 'Text, Fonts, Line Height, and Readability',
            summary: 'Shape the reading experience with better typography choices.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'Font families and fallback stacks',
              'Font size and line height',
              'Text alignment, spacing, and emphasis',
            ],
            theory: [
              'Typography is not just decoration; it controls how easily content can be scanned and understood.',
              'Line height and spacing matter as much as color and font size for readability.',
            ],
            practicalTitle: 'Improve an article layout',
            practicalGoal: 'Make a paragraph-heavy page more comfortable to read.',
            practicalSteps: [
              'Set a body font stack.',
              'Adjust paragraph line height.',
              'Create a stronger visual hierarchy for headings.',
            ],
            starterCode:
              'body {\n  font-family: Georgia, serif;\n  color: #1e293b;\n}\n\np {\n  line-height: 1.7;\n  max-width: 65ch;\n}\n\nh1 {\n  font-size: 2.5rem;\n}',
            expectedResult: [
              'Longer text content feels easier to read and more deliberate.',
            ],
            challenge: [
              'Create a smaller mobile heading scale using media queries.',
            ],
            references: ['Font stacks', 'Line height', 'Readable measure'],
            quizQuestion: 'Why is line height important in body text?',
            quizAnswer: 'It improves readability by giving each line enough visual breathing room.',
          }),
        ],
      }),
      createSection({
        id: 'css-layout',
        title: 'CSS Layout Systems',
        subtitle: 'Display, positioning, flexbox, grid, overflow, and responsive structure',
        topics: [
          createTopic({
            id: 'css-display-position',
            title: 'Display, Position, and Normal Document Flow',
            summary: 'Understand how elements participate in layout before adding advanced systems.',
            level: 'Intermediate',
            duration: '1h 35m',
            points: [
              'block, inline, inline-block, and none',
              'relative, absolute, fixed, and sticky',
              'How positioning changes layout behavior',
            ],
            theory: [
              'Layout bugs become easier to fix when you understand normal document flow before using custom positioning.',
              'Absolute elements are removed from normal flow and positioned relative to the nearest positioned ancestor.',
            ],
            practicalTitle: 'Create a sticky header',
            practicalGoal: 'Use positioning to keep a header visible while the page scrolls.',
            practicalSteps: [
              'Style the header with position: sticky.',
              'Set top to zero.',
              'Add enough page content to test scrolling behavior.',
            ],
            starterCode:
              'header {\n  position: sticky;\n  top: 0;\n  background: #0f172a;\n  color: white;\n  padding: 16px;\n}\n\nmain {\n  min-height: 120vh;\n}',
            expectedResult: [
              'The header remains at the top while scrolling down the page.',
            ],
            challenge: [
              'Add a fixed help button in the lower corner of the screen.',
            ],
            references: ['Display values', 'Positioning', 'Normal flow'],
            quizQuestion: 'What is the reference point for an absolutely positioned element?',
            quizAnswer: 'The nearest ancestor that has a non-static position value.',
          }),
          createTopic({
            id: 'css-flexbox',
            title: 'Flexbox Containers and Item Alignment',
            summary: 'Use one-dimensional layout tools for rows, columns, and alignment.',
            level: 'Intermediate',
            duration: '2h 5m',
            points: [
              'Main axis and cross axis',
              'justify-content and align-items',
              'gap, wrap, and flexible sizing',
            ],
            theory: [
              'Flexbox is ideal when you want content aligned in one dimension, either in a row or a column.',
              'Understanding the main axis is the key to using flex properties correctly.',
            ],
            practicalTitle: 'Build a responsive feature row',
            practicalGoal: 'Create cards that align nicely and wrap when the screen gets smaller.',
            practicalSteps: [
              'Make a flex container.',
              'Add gap and flex-wrap.',
              'Use flexible item sizing with the flex shorthand.',
            ],
            starterCode:
              '.feature-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.feature-item {\n  flex: 1 1 220px;\n  padding: 18px;\n  border-radius: 16px;\n  background: #eff6ff;\n}',
            expectedResult: [
              'Cards line up in a row and wrap onto new lines on smaller screens.',
            ],
            challenge: [
              'Center a call-to-action row both horizontally and vertically.',
            ],
            references: ['Flex axis', 'Alignment', 'Wrapping'],
            quizQuestion: 'Which property controls distribution along the main axis?',
            quizAnswer: 'justify-content.',
          }),
          createTopic({
            id: 'css-grid',
            title: 'CSS Grid for Two-Dimensional Layouts',
            summary: 'Build structured page layouts with rows and columns together.',
            level: 'Intermediate',
            duration: '2h 10m',
            points: [
              'Grid columns and rows',
              'repeat, minmax, and gap',
              'Grid areas and dashboard patterns',
            ],
            theory: [
              'CSS Grid is designed for two-dimensional layouts where rows and columns matter together.',
              'Grid can handle complex page shells more cleanly than flexbox when both axes need deliberate control.',
            ],
            practicalTitle: 'Create a dashboard layout',
            practicalGoal: 'Build a multi-column dashboard with cards that adapt to screen width.',
            practicalSteps: [
              'Set up a grid container.',
              'Define repeating columns.',
              'Collapse to one column on smaller screens.',
            ],
            starterCode:
              '.dashboard {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 16px;\n}\n\n@media (max-width: 768px) {\n  .dashboard {\n    grid-template-columns: 1fr;\n  }\n}',
            expectedResult: [
              'The layout shows multiple columns on large screens and a single column on narrow screens.',
            ],
            challenge: [
              'Create a hero plus sidebar layout using grid areas.',
            ],
            references: ['Grid tracks', 'repeat and minmax', 'Grid areas'],
            quizQuestion: 'When is Grid often a better fit than Flexbox?',
            quizAnswer: 'When you need controlled layout across both rows and columns at the same time.',
          }),
          createTopic({
            id: 'css-responsive',
            title: 'Responsive Design and Media Queries',
            summary: 'Adapt layouts, spacing, and type for many screen sizes.',
            level: 'Intermediate',
            duration: '1h 45m',
            points: [
              'Mobile-first styling',
              'Breakpoints and responsive spacing',
              'Fluid media and scalable layouts',
            ],
            theory: [
              'Responsive design starts by prioritizing content and then adapting presentation to different screen conditions.',
              'A mobile-first approach usually leads to cleaner, more intentional style decisions.',
            ],
            practicalTitle: 'Scale a card layout across devices',
            practicalGoal: 'Adjust typography, spacing, and layout at multiple screen sizes.',
            practicalSteps: [
              'Start with a mobile-friendly single-column layout.',
              'Add a breakpoint for tablets or laptops.',
              'Increase spacing and layout complexity gradually.',
            ],
            starterCode:
              '.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 12px;\n}\n\n@media (min-width: 768px) {\n  .cards {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n  }\n}',
            expectedResult: [
              'The layout becomes more spacious and multi-column on wider screens.',
            ],
            challenge: [
              'Add a third breakpoint for larger desktop screens.',
            ],
            references: ['Mobile first', 'Media queries', 'Responsive spacing'],
            quizQuestion: 'What does mobile-first mean in CSS?',
            quizAnswer: 'You start with styles for smaller screens and add enhancements for larger ones.',
          }),
        ],
      }),
      createSection({
        id: 'css-components',
        title: 'CSS Components and Visual Systems',
        subtitle: 'Forms, navigation, buttons, shadows, gradients, transforms, and UI polish',
        topics: [
          createTopic({
            id: 'css-forms',
            title: 'Form Styling, Focus States, and Input UX',
            summary: 'Create form controls that feel consistent and accessible.',
            level: 'Intermediate',
            duration: '1h 50m',
            points: [
              'Text fields, selects, and textareas',
              'Focus states and contrast',
              'Error and success styling',
            ],
            theory: [
              'Forms should communicate state clearly through spacing, labels, and visible focus styles.',
              'Accessible focus design is required for keyboard users and improves usability for everyone.',
            ],
            practicalTitle: 'Design a polished form set',
            practicalGoal: 'Style inputs, labels, and buttons to feel like one coherent system.',
            practicalSteps: [
              'Give each input a consistent border, padding, and radius.',
              'Add a clear focus state.',
              'Create visual styles for error and success states.',
            ],
            starterCode:
              'input, select, textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border: 1px solid #cbd5e1;\n  border-radius: 12px;\n}\n\ninput:focus {\n  outline: 2px solid #60a5fa;\n  border-color: #60a5fa;\n}',
            expectedResult: [
              'The form controls look consistent and provide obvious focus feedback.',
            ],
            challenge: [
              'Add a disabled state and a helper text style.',
            ],
            references: ['Focus states', 'Form controls', 'Error styling'],
            quizQuestion: 'Why should focus states always remain visible?',
            quizAnswer: 'Keyboard and assistive technology users need them to know which field is currently active.',
          }),
          createTopic({
            id: 'css-navigation-buttons',
            title: 'Navigation Bars, Buttons, and Menus',
            summary: 'Style common interactive UI elements for clarity and reuse.',
            level: 'Intermediate',
            duration: '1h 30m',
            points: [
              'Horizontal navigation patterns',
              'Primary and secondary buttons',
              'Hover, active, and disabled states',
            ],
            theory: [
              'Interactive components need clear default, hover, active, and disabled states so users can predict behavior.',
              'Consistency between navigation and buttons improves the overall feel of a design system.',
            ],
            practicalTitle: 'Build a component action bar',
            practicalGoal: 'Style a navigation row and a matching button group.',
            practicalSteps: [
              'Create a horizontal nav with spacing and hover styles.',
              'Add a primary and secondary button style.',
              'Create a disabled button state.',
            ],
            starterCode:
              '.button-primary {\n  padding: 12px 18px;\n  border-radius: 12px;\n  background: #2563eb;\n  color: white;\n}\n\n.button-secondary {\n  padding: 12px 18px;\n  border-radius: 12px;\n  border: 1px solid #cbd5e1;\n}',
            expectedResult: [
              'The buttons look like part of the same product system as the navigation.',
            ],
            challenge: [
              'Add a small icon alignment style for action buttons.',
            ],
            references: ['Button states', 'Navigation styling', 'Interactive consistency'],
            quizQuestion: 'Why do buttons need more than just a default style?',
            quizAnswer: 'Because users need visual feedback for hover, active, focus, and disabled states.',
          }),
          createTopic({
            id: 'css-effects',
            title: 'Shadows, Gradients, Filters, and Visual Depth',
            summary: 'Use effects carefully to make a UI feel more intentional.',
            level: 'Intermediate',
            duration: '1h 35m',
            points: [
              'Box shadow layering',
              'Linear and radial gradients',
              'Blur, opacity, and filter effects',
            ],
            theory: [
              'Effects should support hierarchy and mood, not overwhelm the interface.',
              'Subtle layering often feels more professional than strong visual noise.',
            ],
            practicalTitle: 'Create a premium card style',
            practicalGoal: 'Combine shadows and gradients to produce a more refined component.',
            practicalSteps: [
              'Add a background gradient.',
              'Layer a soft shadow under the component.',
              'Use a subtle hover effect to lift the card slightly.',
            ],
            starterCode:
              '.premium-card {\n  background: linear-gradient(180deg, #ffffff, #eff6ff);\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);\n  border-radius: 24px;\n}',
            expectedResult: [
              'The component has a sense of depth without looking overly heavy.',
            ],
            challenge: [
              'Create a dark version that keeps text readable.',
            ],
            references: ['Shadows', 'Gradients', 'Visual hierarchy'],
            quizQuestion: 'What is a common mistake when adding visual effects?',
            quizAnswer: 'Using effects so strongly that they distract from readability and structure.',
          }),
          createTopic({
            id: 'css-transforms',
            title: 'Transforms, Transitions, and Simple Motion',
            summary: 'Add motion that supports interaction instead of distracting from it.',
            level: 'Advanced',
            duration: '1h 45m',
            points: [
              'translate, scale, rotate',
              'Transition timing and easing',
              'Hover and focus animations',
            ],
            theory: [
              'Motion is most useful when it clarifies state changes or gives feedback after an action.',
              'Transform and opacity are usually safer for animation performance than changing layout-heavy properties.',
            ],
            practicalTitle: 'Animate a card interaction',
            practicalGoal: 'Build a hover or focus effect that feels polished and fast.',
            practicalSteps: [
              'Add a transition for transform and shadow.',
              'Translate the card slightly on hover.',
              'Test the effect on a button or card component.',
            ],
            starterCode:
              '.card {\n  transition: transform 180ms ease, box-shadow 180ms ease;\n}\n\n.card:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);\n}',
            expectedResult: [
              'The card feels more interactive without becoming distracting.',
            ],
            challenge: [
              'Animate a button press using scale.',
            ],
            references: ['Transforms', 'Transitions', 'Motion performance'],
            quizQuestion: 'Why are transform-based animations usually preferred?',
            quizAnswer: 'They are generally smoother and cause fewer expensive layout recalculations.',
          }),
        ],
      }),
      createSection({
        id: 'css-advanced',
        title: 'CSS Architecture and Production Practice',
        subtitle: 'Variables, accessibility, browser support, naming systems, and final projects',
        topics: [
          createTopic({
            id: 'css-variables',
            title: 'CSS Variables and Design Tokens',
            summary: 'Centralize decisions for color, spacing, and theming.',
            level: 'Advanced',
            duration: '1h 30m',
            points: [
              'root-scoped variables',
              'Fallback values',
              'Token-based systems',
            ],
            theory: [
              'Variables let you define a single source of truth for repeated design decisions.',
              'Design tokens help teams stay consistent across many pages and components.',
            ],
            practicalTitle: 'Set up color and spacing tokens',
            practicalGoal: 'Move repeated hard-coded values into reusable variables.',
            practicalSteps: [
              'Define tokens in :root.',
              'Replace direct color values in components.',
              'Create a second theme context using overrides.',
            ],
            starterCode:
              ':root {\n  --color-bg: #ffffff;\n  --color-text: #0f172a;\n  --space-md: 16px;\n  --radius-lg: 18px;\n}\n\n.card {\n  padding: var(--space-md);\n  border-radius: var(--radius-lg);\n}',
            expectedResult: [
              'The component styles become easier to update from a central location.',
            ],
            challenge: [
              'Add tokens for shadow and border colors.',
            ],
            references: ['CSS variables', 'Design tokens', 'Fallback values'],
            quizQuestion: 'What is one major benefit of design tokens?',
            quizAnswer: 'They make repeated design decisions consistent and much easier to update later.',
          }),
          createTopic({
            id: 'css-accessibility',
            title: 'Accessibility, Reduced Motion, and Contrast',
            summary: 'Use CSS to support a more inclusive interface.',
            level: 'Advanced',
            duration: '1h 20m',
            points: [
              'Color contrast awareness',
              'Visible focus states',
              'Reduced motion preferences',
            ],
            theory: [
              'CSS has a direct impact on accessibility because color, focus, spacing, and motion all influence usability.',
              'Reduced motion support helps users who are sensitive to excessive movement.',
            ],
            practicalTitle: 'Create an accessibility review pass',
            practicalGoal: 'Improve one component set for focus visibility and reduced motion support.',
            practicalSteps: [
              'Check text contrast.',
              'Add a better keyboard focus style.',
              'Wrap transitions in a prefers-reduced-motion media query when needed.',
            ],
            starterCode:
              '@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}',
            expectedResult: [
              'The UI becomes friendlier to keyboard users and motion-sensitive users.',
            ],
            challenge: [
              'Review a button and input pair for contrast and focus clarity.',
            ],
            references: ['Reduced motion', 'Focus states', 'Contrast'],
            quizQuestion: 'What does prefers-reduced-motion help with?',
            quizAnswer: 'It lets you reduce or remove animations for users who prefer less motion.',
          }),
          createTopic({
            id: 'css-architecture',
            title: 'Naming Systems, Organization, and Scalability',
            summary: 'Keep large stylesheets understandable as the project grows.',
            level: 'Advanced',
            duration: '1h 35m',
            points: [
              'BEM and utility-friendly naming',
              'Component-based organization',
              'Avoiding selector depth and overrides',
            ],
            theory: [
              'Scalable CSS relies on predictable structure and shallow selector patterns.',
              'Organization decisions matter more as soon as multiple people or multiple pages are involved.',
            ],
            practicalTitle: 'Refactor a messy style block',
            practicalGoal: 'Rename a component set into a clearer, more scalable structure.',
            practicalSteps: [
              'Identify the main component and child parts.',
              'Rename selectors with a consistent system.',
              'Remove unnecessary deep nesting.',
            ],
            starterCode:
              '.card {}\n.card__title {}\n.card__meta {}\n.card--featured {}',
            expectedResult: [
              'The style structure becomes easier to read and extend later.',
            ],
            challenge: [
              'Refactor one of your own older CSS snippets using a naming system.',
            ],
            references: ['BEM', 'Component organization', 'Maintainable CSS'],
            quizQuestion: 'Why is selector depth often a long-term problem?',
            quizAnswer: 'Deep selectors are harder to reason about and make overrides more fragile.',
          }),
          createTopic({
            id: 'css-capstone',
            title: 'CSS Capstone Project and Final Review',
            summary: 'Combine layout, typography, forms, and motion into a polished product page.',
            level: 'Advanced',
            duration: '3h 20m',
            points: [
              'Responsive page structure',
              'Component consistency',
              'Performance and accessibility review',
            ],
            theory: [
              'A capstone project reveals whether isolated lessons can become a complete, coherent interface.',
              'Final review should check not only visuals, but also spacing consistency, state clarity, and responsive behavior.',
            ],
            practicalTitle: 'Build a responsive landing page',
            practicalGoal: 'Design a landing page with a hero, features, pricing, and a call-to-action section.',
            practicalSteps: [
              'Create the page shell and type scale.',
              'Build responsive feature and pricing sections.',
              'Add polished buttons, cards, and a review pass.',
            ],
            starterCode:
              '.page-shell {\n  min-height: 100vh;\n  background: linear-gradient(180deg, #eff6ff, #ffffff);\n}\n\n.hero {\n  display: grid;\n  gap: 24px;\n}',
            expectedResult: [
              'The final page feels complete, responsive, and visually intentional.',
            ],
            challenge: [
              'Write a self-review of what still feels weak and what feels production-ready.',
            ],
            references: ['Responsive QA', 'Design tokens', 'Accessibility review'],
            quizQuestion: 'What makes a CSS capstone more valuable than isolated exercises?',
            quizAnswer: 'It shows whether you can combine layout, visuals, interaction, and consistency into one real interface.',
          }),
        ],
      }),
    ],
  };
