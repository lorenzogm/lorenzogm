---
title: Blog with Next.js and Contentful
date: 2020-11-02
tag: Blog, Next.js, Contentful, Tailwind CSS
description: Building a blog with Next.js, Tailwind CSS and Contentful as headless CMS
---

Hello!

This is a new post to share my journey, because we are doing very cool stuff at work and it would be a pity to don’t share them!

In this case we have made something simple, we have built a blog with React, Next.js and Contentful. A couple links before starting with the details:

- Demo: [https://lorenzogm.com/](https://lorenzogm.com/)
- Source code: [https://github.com/lorenzogm/blog](https://github.com/lorenzogm/blog)

![](https://miro.medium.com/max/1400/1*MEef6ssM8_W_QyR0D-1yew.jpeg)People pointing WTFs in the demo. Yes, I don’t like styling.

# Stack

- Frontend: React with TypeScript, Next.js and Tailwind CSS
- Backend: Contentful as Headless CMS
- DevOps: Vercel

Over the last years I have been trying several frameworks and libraries in the JavaScript world, mainly in the React ecosystem. And finally, I have found a solid stack where I’m comfortable.

# TypeScript

It’s just a must. It’s hard to have the code 100% typed, but that’s not required. TypeScript is already helping to write better code, even if some types are not defined.

For the blog, the code is 100% typed. I’m using two packages to help me with this task:

> The shared configuration that we have available in Valtech CH, for **ESlint, Prettier and TypeScript**. The strict linting rules helped me to write better JavaScript and TypeScript code.

[https://www.npmjs.com/package/@valtech-ch/eslint-config-react](https://www.npmjs.com/package/@valtech-ch/eslint-config-react)

> A code **TypeScript generator for Contentful**. Automatically, you get the types to use with TypeScript for the content defined in Contenful.

[https://github.com/intercom/contentful-typescript-codegen](https://github.com/intercom/contentful-typescript-codegen)

# Next.js

Nowadays, a blog like this one needs to be built with **Static Site Generation** (SSG). Why? I wrote about this topic in this article **“Rendering on the Web”**:

[

## Rendering on the Web

### One on the most important decisions that will affect the architecture is how we render the content. This decision will…

medium.com

](https://medium.com/valtech-ch/rendering-on-the-web-c384850aeba6)

Since Next.js 9.3, **Static Site Generation** is possible with Next.js. In the past I would have built something similar with Gatsby, but in this case Next.js is my way to go. Why? Unluckily, I didn’t write anything why I’m using Next.js over Gastby. But I have it in my _To Do_ list.

# Tailwind CSS

Let’s talk about styling! Oh, I don’t like styling. I tend to ask my colleagues if they can take the styling tickets and I take the tickets about logic.

I have tried to style my projects in several different ways: with CSS Modules, Styled Components, Emotion and believe me, I have tried a couple more. And now, I’m trying Tailwind CSS…

I can’t say a lot about Tailwind CSS. I like it so far, because it’s very quick to style.

# Contentful

There are many solutions when deciding to pick a headless CMS to handle the content. In this case, I have used Contentful because it’s a strategic solution in our company, Valtech, which is one of the founding companies of the MACH Alliance.

In case you have some interest about the MACH Alliance, a link:

[

## MACH Alliance Blog

### Edit description

machalliance.org

](https://machalliance.org/)

So I have started trying Contentful. A blog is a very basic case and it’s not the best way to test the limitations of Contentful. But it makes sense to start with something basic.

With Contentful, a free account is enough for a project like this. After creating an account, you need to define how your content is going to be structured before defining the final content of the blog. The UI is very simple and it makes the whole process very easy.

On the developer side, we can get the data from Contentful through their REST API or with GraphQL. In this case, I have used [this package](https://www.npmjs.com/package/contentful) to get the data.

Considering the Developer Experience and the Content Manager Experience, it looks like a great solution so far. Probably in the future we need to try more complex solutions to see the limitations of Contentful.

# Vercel

If you don’t know it, just give a try. It plays very good with Next.js and the time invested on DevOps is reduced to almost nothing.

# Conclusions

As a result, I have created a blog with the following features:

- It’s fast, it’s **blazing fast**, because we use **Static Site Generation** from **Next.js**.
- A **Headless CMS** like **Contentful** made the whole process quick and easy, and now I can easily add content to my blog.

Let’s add the links with the demo and the source code again. Scrolling all the way up to check them at the beginning could be very tiring.

- Demo: [https://lorenzogm.com/](https://lorenzogm.com/)
- Source code: [https://github.com/lorenzogm/blog](https://github.com/lorenzogm/blog)
