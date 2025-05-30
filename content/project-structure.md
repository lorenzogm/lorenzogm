---
title: Project Structure
date: 2022-05-29
tag: Project Foundation
description: This project structure could be shared across disciplines to facilitate the communication in the team.
image: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

This project structure could be shared across disciplines to facilitate the communication in the team.

It means sharing an structure between:

- Acceptance Criteria: Specifications owned by the business analysts in tools like Confluence.
- Design: UX and UI owned by the designers in tools like Figma.
- Front-end: It can be applied to the folder structure in the FE code, to storybook or any other tool to document the design system and the content models required for the communication with the BE.
- Back-end: This structure should be applicable to the components required for the BE, but it's coming from UI perspective, so it needs to be better tested for the different cases.

Project Structure:

It follows the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) pattern with a few changes:

- `Atoms` are called `Elements`
- `Molecules` are called `Modules`
- `Organisms` are called `Sections`
- `Templates` are not included. As content pages are created through a CMS, in most of the cases there is a 1:1 matching between templates and pages. Therefore, these distinction just exist in the FE code, but not in the other disciplines. In the FE code the template is responsible of the UI, and the page of the data fetching.
- `Layouts` are added to compose the final page.

Those are the required categories:

1. Foundation: The foundation of the design system are the design tokens and basic assets.
2. Elements: Elements are the basic building blocks of matter.
3. Modules: Modules are groups of atoms bonded together and are the smallest fundamental units of a compound. These modules take on their own properties and serve as the backbone of our design systems.
4. Sections: Sections are groups of modules joined together to form a relatively complex, distinct part of an interface.
5. Pages: Pages consist mostly of groups of features stitched together to form pages.
6. Layouts: The layouts define the global page structure: most of the cases header, main, and footer. But they could also contain a generic notification bar or cookie consent popup.

![Design System](./assets/project-structure-design-system.png)
