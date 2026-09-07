import { LanguageRoadmap } from '../../types';
import { createSection, createTopic } from '../../utils';

export const bootstrapRoadmap: LanguageRoadmap = {
    key: 'bootstrap',
    title: 'Bootstrap Starter Module',
    shortTitle: 'Bootstrap',
    subtitle: 'Grid systems, utilities, components, forms, and fast responsive page building',
    description:
      'This Bootstrap roadmap focuses on quickly assembling responsive layouts with the grid system, utilities, components, and thoughtful customization.',
    icon: 'layers-outline',
    color: '#F43F5E',
    totalHours: '14h',
    focusAreas: ['Grid', 'Utilities', 'Components', 'Customization'],
    recommendedProject:
      'Build a responsive course website using Bootstrap containers, cards, forms, navbars, and brand-level customization.',
    sections: [
      createSection({
        id: 'bootstrap-foundation',
        title: 'Bootstrap Foundation',
        subtitle: 'Setup, containers, grid, spacing, and utility classes',
        topics: [
          createTopic({
            id: 'bootstrap-grid',
            title: 'Bootstrap Setup, Containers, and Grid',
            summary: 'Use Bootstrap to create fast responsive layout structure.',
            level: 'Beginner',
            duration: '1h 20m',
            points: [
              'Container and container-fluid',
              'Rows and columns',
              'Breakpoint-based layout behavior',
            ],
            theory: [
              'Bootstrap is designed to speed up responsive UI work with prebuilt layout and component patterns.',
              'The grid is one of the framework core strengths because it gives predictable responsive structure very quickly.',
            ],
            practicalTitle: 'Build a three-card layout',
            practicalGoal: 'Use rows and columns to create a responsive section.',
            practicalSteps: [
              'Create a container.',
              'Add a row with a gap.',
              'Create three responsive columns.',
            ],
            starterCode:
              '<div class="container">\n  <div class="row g-3">\n    <div class="col-md-4">Card 1</div>\n    <div class="col-md-4">Card 2</div>\n    <div class="col-md-4">Card 3</div>\n  </div>\n</div>',
            expectedResult: [
              'The cards stack on smaller screens and sit in columns on larger screens.',
            ],
            challenge: [
              'Add a fourth card and observe how wrapping behaves.',
            ],
            references: ['Containers', 'Grid', 'Breakpoints'],
            quizQuestion: 'What is the purpose of the Bootstrap grid system?',
            quizAnswer: 'It helps you create responsive rows and columns quickly across different screen sizes.',
          }),
          createTopic({
            id: 'bootstrap-utilities',
            title: 'Spacing, Typography, and Utility Classes',
            summary: 'Style common UI patterns quickly without writing much custom CSS.',
            level: 'Beginner',
            duration: '1h 15m',
            points: [
              'Padding and margin utilities',
              'Text helpers and colors',
              'Background, display, and border utilities',
            ],
            theory: [
              'Bootstrap utilities are useful because they let you build and adjust interfaces quickly without leaving the markup constantly.',
              'Utility classes work best when they remain intentional rather than becoming random class noise.',
            ],
            practicalTitle: 'Style a promo card with utilities',
            practicalGoal: 'Build a visually improved block using only Bootstrap utility classes.',
            practicalSteps: [
              'Add spacing and background classes.',
              'Style text with color and typography utilities.',
              'Use border radius and shadow helpers.',
            ],
            starterCode:
              '<div class="p-4 rounded-4 shadow-sm bg-light">\n  <h2 class="text-primary">Learn Faster</h2>\n  <p class="text-secondary mb-0">Use Bootstrap utilities for rapid UI.</p>\n</div>',
            expectedResult: [
              'The block feels polished even without custom CSS rules.',
            ],
            challenge: [
              'Create a dark version using utility classes only.',
            ],
            references: ['Spacing utilities', 'Text helpers', 'Background utilities'],
            quizQuestion: 'Why are Bootstrap utility classes useful?',
            quizAnswer: 'They let you apply common layout and visual styles quickly without writing custom CSS for every small adjustment.',
          }),
          createTopic({
            id: 'bootstrap-responsive',
            title: 'Responsive Utilities and Layout Variations',
            summary: 'Adjust visibility and layout details across breakpoints.',
            level: 'Beginner',
            duration: '1h 10m',
            points: [
              'Responsive column widths',
              'Display utilities per breakpoint',
              'Spacing changes across screen sizes',
            ],
            theory: [
              'Bootstrap responsiveness is based on named breakpoints, which makes common layout adjustments easy to read and maintain.',
              'Different components often need different visibility or spacing at different widths.',
            ],
            practicalTitle: 'Adapt a hero section for mobile and desktop',
            practicalGoal: 'Use Bootstrap classes to change spacing and structure across breakpoints.',
            practicalSteps: [
              'Set one-column layout for small screens.',
              'Switch to multi-column layout at medium or large widths.',
              'Adjust padding values across breakpoints.',
            ],
            starterCode:
              '<section class="container py-4 py-md-5">\n  <div class="row align-items-center">\n    <div class="col-12 col-md-6">Hero copy</div>\n    <div class="col-12 col-md-6">Visual</div>\n  </div>\n</section>',
            expectedResult: [
              'The hero changes shape naturally between small and larger screens.',
            ],
            challenge: [
              'Hide one decorative element on smaller screens.',
            ],
            references: ['Responsive classes', 'Display utilities', 'Breakpoint spacing'],
            quizQuestion: 'What do responsive utility classes help you control?',
            quizAnswer: 'They help you change layout, spacing, or visibility depending on the screen size.',
          }),
        ],
      }),
      createSection({
        id: 'bootstrap-components',
        title: 'Bootstrap Components',
        subtitle: 'Navbars, cards, forms, buttons, and interactive building blocks',
        topics: [
          createTopic({
            id: 'bootstrap-navbars',
            title: 'Navbars, Menus, and Layout Shells',
            summary: 'Build a recognizable top navigation pattern quickly.',
            level: 'Intermediate',
            duration: '1h 20m',
            points: [
              'Navbar structure',
              'Branding and links',
              'Responsive collapse concept',
            ],
            theory: [
              'The navbar is one of the most common Bootstrap components because it gives a fast way to create a product shell.',
              'Responsive navigation matters because the same set of links often needs a different presentation on small screens.',
            ],
            practicalTitle: 'Create a site navigation shell',
            practicalGoal: 'Build a simple navbar with branding and route links.',
            practicalSteps: [
              'Add the navbar wrapper.',
              'Insert a brand label and links.',
              'Prepare the structure for responsive collapse.',
            ],
            starterCode:
              '<nav class="navbar navbar-expand-lg bg-white">\n  <div class="container">\n    <a class="navbar-brand" href="#">LearnHub</a>\n  </div>\n</nav>',
            expectedResult: [
              'The page gains a clean top navigation shell with a clear brand anchor.',
            ],
            challenge: [
              'Add a call-to-action button inside the navbar.',
            ],
            references: ['Navbar', 'Responsive navigation', 'Layout shell'],
            quizQuestion: 'Why is navbar structure important in a web page?',
            quizAnswer: 'It gives users a consistent entry point for branding, navigation, and key actions.',
          }),
          createTopic({
            id: 'bootstrap-cards-buttons',
            title: 'Cards, Buttons, and Content Blocks',
            summary: 'Assemble reusable content containers quickly with Bootstrap classes.',
            level: 'Intermediate',
            duration: '1h 15m',
            points: [
              'Card structure',
              'Button variants',
              'Spacing and grouping patterns',
            ],
            theory: [
              'Cards are useful because they package content into clear visual units that repeat well in dashboards and marketing pages.',
              'Buttons should feel related to the rest of the design system even when they come from a framework.',
            ],
            practicalTitle: 'Create a course card grid',
            practicalGoal: 'Display multiple course cards with a primary action button.',
            practicalSteps: [
              'Add a Bootstrap card structure.',
              'Create a title, copy, and button inside each card.',
              'Place multiple cards in a responsive grid.',
            ],
            starterCode:
              '<div class="card shadow-sm">\n  <div class="card-body">\n    <h3 class="card-title">HTML Basics</h3>\n    <p class="card-text">Learn structure, tags, and semantics.</p>\n    <a class="btn btn-primary" href="#">Start</a>\n  </div>\n</div>',
            expectedResult: [
              'The cards look consistent and are ready to repeat as a list.',
            ],
            challenge: [
              'Add a badge or footer section to the card.',
            ],
            references: ['Cards', 'Buttons', 'Content blocks'],
            quizQuestion: 'Why are cards useful in UI design?',
            quizAnswer: 'They organize repeated content into clear, reusable visual units.',
          }),
          createTopic({
            id: 'bootstrap-forms',
            title: 'Forms, Inputs, and Validation Styles',
            summary: 'Build practical forms with Bootstrap form controls and feedback states.',
            level: 'Intermediate',
            duration: '1h 25m',
            points: [
              'Form groups and labels',
              'Control styling',
              'Validation feedback patterns',
            ],
            theory: [
              'Bootstrap form controls provide a consistent baseline that speeds up UI work and reduces setup friction.',
              'Validation styling still needs thoughtful content and clear labels to feel complete.',
            ],
            practicalTitle: 'Build a signup form block',
            practicalGoal: 'Create a styled form section with inputs and an action button.',
            practicalSteps: [
              'Add labeled form controls.',
              'Use spacing utilities to group fields.',
              'Add a submit button and validation-ready markup.',
            ],
            starterCode:
              '<div class="mb-3">\n  <label class="form-label" for="email">Email</label>\n  <input class="form-control" id="email" type="email" />\n</div>',
            expectedResult: [
              'The form looks clean and follows Bootstrap field styling.',
            ],
            challenge: [
              'Add a helper text or invalid feedback message.',
            ],
            references: ['Forms', 'Form controls', 'Validation'],
            quizQuestion: 'What makes a form feel more complete than just having inputs on a page?',
            quizAnswer: 'Clear labels, spacing, feedback states, and a coherent action flow.',
          }),
        ],
      }),
      createSection({
        id: 'bootstrap-customization',
        title: 'Bootstrap Customization and Capstone',
        subtitle: 'Theme direction, overrides, hybrid styling, and final project work',
        topics: [
          createTopic({
            id: 'bootstrap-theme-customization',
            title: 'Customization, Overrides, and Brand Direction',
            summary: 'Use Bootstrap without letting the interface feel generic.',
            level: 'Advanced',
            duration: '1h 20m',
            points: [
              'Adding brand-specific classes',
              'Overriding component defaults',
              'Combining utilities with custom CSS',
            ],
            theory: [
              'Bootstrap speeds up development, but thoughtful customization is what makes a product feel intentional rather than templated.',
              'Overrides work best when they are targeted and consistent instead of scattered across many files.',
            ],
            practicalTitle: 'Theme a Bootstrap page',
            practicalGoal: 'Apply custom brand colors and spacing decisions on top of Bootstrap components.',
            practicalSteps: [
              'Create one brand button class.',
              'Adjust card corners or shadows with custom CSS.',
              'Blend Bootstrap utilities with your own component rules.',
            ],
            starterCode:
              '.btn-brand {\n  background: #0f172a;\n  color: #ffffff;\n}\n\n.course-card {\n  border-radius: 24px;\n}',
            expectedResult: [
              'The interface still benefits from Bootstrap but feels more product-specific.',
            ],
            challenge: [
              'Create a hero section that does not look like a default Bootstrap demo.',
            ],
            references: ['Overrides', 'Brand direction', 'Hybrid styling'],
            quizQuestion: 'Why is customization important when using Bootstrap?',
            quizAnswer: 'It helps the interface feel branded and intentional instead of generic.',
          }),
          createTopic({
            id: 'bootstrap-layout-patterns',
            title: 'Page Sections, Marketing Layouts, and Reusable Patterns',
            summary: 'Combine Bootstrap pieces into complete page sections.',
            level: 'Advanced',
            duration: '1h 15m',
            points: [
              'Hero sections',
              'Feature grids',
              'Call-to-action blocks',
            ],
            theory: [
              'A framework becomes much more valuable when you can assemble many small utilities and components into complete sections.',
              'Reusable layout patterns help you build new pages faster while keeping a consistent structure.',
            ],
            practicalTitle: 'Create a small marketing page',
            practicalGoal: 'Build a hero, features, and final call-to-action section using Bootstrap patterns.',
            practicalSteps: [
              'Create a hero row with copy and visual space.',
              'Add a feature card section.',
              'Finish with a clear action block.',
            ],
            starterCode:
              '<section class="container py-5">\n  <div class="row g-4 align-items-center">\n    <div class="col-md-6">\n      <h1>Learn Web Skills Faster</h1>\n    </div>\n    <div class="col-md-6">Visual area</div>\n  </div>\n</section>',
            expectedResult: [
              'You end up with a page that feels like more than disconnected Bootstrap parts.',
            ],
            challenge: [
              'Add a testimonials or pricing section beneath the features.',
            ],
            references: ['Hero sections', 'Feature layouts', 'CTA blocks'],
            quizQuestion: 'What is a reusable layout pattern?',
            quizAnswer: 'A repeatable section structure that can be adapted across different pages or products.',
          }),
          createTopic({
            id: 'bootstrap-capstone',
            title: 'Bootstrap Course Site Capstone',
            summary: 'Build a complete responsive page with utilities, components, and custom polish.',
            level: 'Advanced',
            duration: '2h 30m',
            points: [
              'Page planning',
              'Component assembly',
              'Customization and final review',
            ],
            theory: [
              'A Bootstrap capstone should show that you can move beyond copying framework snippets and instead assemble them into a cohesive experience.',
              'The final review should check consistency, spacing, responsiveness, and how much generic styling remains.',
            ],
            practicalTitle: 'Build a course website landing page',
            practicalGoal: 'Create a branded landing page using Bootstrap components and custom CSS where needed.',
            practicalSteps: [
              'Plan the page sections and navigation.',
              'Build the layout with the grid and components.',
              'Customize the result so it feels intentional and complete.',
            ],
            starterCode:
              '<main>\n  <section class="container py-5">\n    <h1 class="display-5">Frontend Learning Paths</h1>\n    <p class="lead">Structured modules for HTML, CSS, and JavaScript.</p>\n  </section>\n</main>',
            expectedResult: [
              'The final project feels like a complete responsive website rather than a style exercise.',
            ],
            challenge: [
              'Write down three places where custom CSS improved the Bootstrap baseline.',
            ],
            references: ['Capstone planning', 'Responsive review', 'Customization pass'],
            quizQuestion: 'What should a Bootstrap capstone prove?',
            quizAnswer: 'It should prove that you can use the framework quickly while still creating a polished, branded, responsive interface.',
          }),
        ],
      }),
    ],
  };
