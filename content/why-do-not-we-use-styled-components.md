---
title: Why don't we use Styled Components?
date: 2022-03-07
tag: Project Foundation, Front-End, Styling
description: Exploring alternatives to styled-components and CSS-in-JS solutions
image: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

# Why don't we use Styled Components?

- _Not framework independent_: writing our CSS in our JS and using a library that supports our framework causes a lot of issues should we ever need to upgrade or switch frameworks. While we expect Ring to be a React library for a long time, when the time comes to change frameworks, it will require significant rewriting.
- _Styled components can be difficult to read_: Because they look like other React components it can sometimes be difficult to figure out which is which and what is going on. This can slow down onboarding and make devs less efficient.
- _Styled components are compiled at runtime_: This means a lot more JS over the wire and more processing time.

For more on the limitations you can read these discussions from the industry:

- [Why we are Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b) by Sam Magura, Maintainer of Emotion
- [The React Core Team Finally Have Opinions About CSS](https://dev.to/hypeddev/the-react-core-team-finally-have-opinions-about-css-16f0) by Oliver Williams
