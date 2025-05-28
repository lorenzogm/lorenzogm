---
title: Building a library of components
date: 2022-08-02
tag: Front-End, Design System, UI Library
description: Building your own library of components it's something that many engineers and companies have thought about at some point in time. In our team, we have gone through that process and the aim of this document is to share our experience.
image: https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1484&q=80
---tle: Building a library of components
date: 2022-08-02
tag: Front-End, Design System, UI Library
description: Building your own library of components it’s something that many engineers and companies have thought about at some point in time. In our team, we have gone through that process and the aim of this document is to share our experience.
---

# Bulding a library of components

Building your own library of components it’s something that many engineers and companies have thought about at some point in time. In our team, we have gone through that process and the aim of this document is to share our experience.

## Our journey

I would like to describe my thoughts regarding this topic since I started my career, and I’m sure that many developers have followed a similar journey:

### Creating my components from scratch

At the beginning of my career, I started creating UI components from scratch. When I realized the amount of work it was required, I decided to pick a library to make it faster and adopt best practices.

### Picking a library

So, on the next project, I decided to use a well-known and well-tested library (like Material UI), and it was great! Adding some content and a few styles and my components were ready to use. But not everything was shiny:

- Learning how to use the library took some time, as sometimes it was not straightforward how to add some content or how to modify the styling.
- When the library was fitting our use case was great, but at some point, we had use cases not covered by the library, so we had to adapt the component to fit our needs, which means extra time fighting the boundaries of the library.
- Finally, my component was working, but it was not perfect: bugs on a specific browser, lack of accessibility, and a really complex and dirty component that was hard to maintain.

### Adding custom components to the library

Life gives you another opportunity to do your best with a new project. And I learned from the previous one, so I decided to stick to the library but if I had a use case that didn’t fit, I was going to create it from scratch in a clean and reusable way.

The theory made sense, but in practice, adapting the custom component to the library was a bit more difficult. It was cleaner than the previous solution, but the adaptations between the library and the components were still too complex.

In addition, we had issues from the very first approach: building your own components is hard.

### Unstyled components to the rescue

In the last years, we have seen that unstyled libraries of components got some attraction, like Radix UI, Reach UI or Headless UI. So, why not use them instead of our custom components?

The solution at that point was a combination of a library, with unstyled components and some custom components (the most simple and very specific for our use case).

At this point, we got a good amount of stuff already done by the main library and the headless components. However, the integration between the library and the components (headless and custom) was sometimes still too complex. E.g. theming, where it was better to use our own theme than adapting the one provided by the library.

### Collections of already made components

On the other side, a stream of new templates (full sections ready to use) started to get some attraction. In this case, the raw HTML + CSS code is provided without any abstraction and the full section is ready to copy-paste into your project. I’m talking about collections like Tailwind UI or Flowbite.

All the previous solutions had something in common: we created a system of components, from the most basic to the most complex. If we keep in mind the Atomic Design methodology, we started from the atoms, then to the molecules, organisms, templates, and finally the pages. The core idea of creating a system of components was implicit in the previous solutions, following a Bottom-Up approach.

In this case, with the Top-Down approach following the templates provided by collections like Tailwind UI or Flowbite, we start from the organisms (sections of a page, what those libraries provide).

This is the summary of my journey until the present day: July 29, 2022. Let’s now talk about the future.

## Our context

For us, it’s important to analyze our context to find out which solution fits our needs.

We are not a company that creates its own product, we are an agency that works with multiple clients, and the requirements change from one project to the next. In addition, we need to keep in mind that we might not be in full control of the processes and practices, as it will depend on the client.

On the other side, we want to optimize the delivery of our projects’ building reference architectures and accelerators. Those accelerators need to be closer to production, which means they need to be opinionated regarding the technology used.

## Our requirements

Based on the context described above, those are the requirements for our solution:

- We want a library of components based on React and Tailwind CSS, as it’s used and flexible enough to fit our needs.
- We prefer to do not build and maintain our own components, we are collecting components (preferably unstyled) from others libraries.
- We want to start with a set of already made sections to speed up our work.

## Our solution

At this point in time, it makes sense for us to continue with the following solution:

1. Take a Top-Down approach, where we start from the collection of sections provided by Tailwind UI.
2. We split the templates into React components to create the most simple elements: Button, Heading, Link, Paragraph, etc.
3. The instance of those elements in the sections don’t have any relation between, so a design system needs to be created out of them. This is the core of the work we need to do together with our design team.
4. We introduce unstyled components (from Radix UI, Headless UI, etc. when needed) and we apply to them our styling.
5. We are not creating a library to be used on the projects, we are creating a boilerplate which serves as an accelerator to speed up the development. Nothing is fixed, everything can be adapted to the needs of the project.
6. The design and the front-end are driven by the sections defined. The markup of the sections is fixed, but new variants can be added to make the whole collection of sections.

In the end, the core idea is to create a place to share, dare and care, a hub that we use to help ourselves in our projects and where we contribute back with more sections, with our leanings, and with our experiences.
