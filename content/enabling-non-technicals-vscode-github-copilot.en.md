---
title: "Enabling Non-Technicals with VSCode and GitHub Copilot"
date: "2026-04-14"
tag: AI, GitHub Copilot, Collaboration, Design, Development
description: How a designer built a full B2B prototype with mocked data by leveraging VSCode and GitHub Copilot agent mode — no deep technical background required.
image: https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80
author: Lorenzo GM
---

# Enabling Non-Technicals with VSCode and GitHub Copilot

Last week I worked together with a colleague designer on a tight deadline. We had to build a B2B platform prototype to display around 5 or 6 pages with very detailed data from a big data database — charts, tables, complex dashboards, the works. The goal: impress a client in a matter of days.

Here is what happened and what I learned.

## The Setup: 2 Hours of Technical Foundation

My role in the beginning was purely technical. I invested a couple of hours building the foundation:

- A **Next.js application** with a clean folder structure and sensible defaults
- **Infrastructure** ready for deployment
- **CI/CD pipelines** so that every push triggers a build and a preview URL

This foundation was deliberately simple. No over-engineering. Just enough scaffolding to let someone else hit the ground running.

## The Onboarding: 1 Hour with the Designer

After the foundation was in place, I sat down with the designer for a single one-hour session. We covered:

1. **Installing VSCode** — straightforward, nothing scary
2. **Setting up GitHub Copilot** — connecting the account, enabling the extension
3. **Agent mode basics** — how to open the chat panel, how to describe what you want, how to review the suggested changes
4. **Committing and pushing** — using the VSCode Source Control panel to stage, commit, and push without touching the terminal

One hour. That was it. The designer was ready to work independently.

## The Result: A Fully Working Prototype

The designer took ownership of the entire frontend implementation. Using GitHub Copilot in agent mode, they:

- Built all 5 pages of the prototype with mocked data
- Applied the design vision (layout, typography, colour palette) autonomously
- Iterated quickly without needing to ask me for help on every small change

The final result was a **fully working prototype** — created by the designer — that satisfied every requirement the client had set.

## The Magic Moment: Live Changes During the Client Call

The best part came during the client presentation itself. While the client was sharing feedback on a call, we were already applying some of the requested changes in real time. The client could see the website updating live, directly in response to their first comments of the meeting.

That kind of responsiveness is normally reserved for senior engineers who know the codebase inside out. Here, it came from a designer who had been using the tools for less than a week.

## Why This Works

A few things made this possible:

**The foundation mattered.** The setup I provided included clear instructions, sensible conventions, and a structure that GitHub Copilot could reason about well. The AI agent was not working in chaos — it had good context to build on.

**Mocked data removed the hard dependency.** The designer could build realistic-looking screens without needing a real backend. This is a standard prototyping technique, but it becomes even more powerful when the person implementing the screens is not a backend engineer.

**Agent mode lowers the barrier significantly.** The designer did not need to know React, TypeScript, or Tailwind in depth. They described what they wanted in natural language, reviewed the suggestions, and approved or refined them. The AI handled the syntax.

**Minimal refactoring before production.** Because the foundation was set up with good patterns from the start, the prototype required minimal rework before it could be connected to real backend APIs. The code quality was good enough to build on.

## What I Would Recommend

If you want to try this with your own team:

1. **Invest time in the foundation.** A good project setup, clear conventions, and decent README instructions pay dividends when non-technicals start working in the codebase.
2. **Keep the onboarding short and practical.** One focused session on the tools they will actually use (VSCode, Copilot agent mode, Git basics) is enough to get started.
3. **Start with mocked data.** Do not block the designer on backend availability. Let them build the full UI experience with realistic placeholders.
4. **Trust the process.** It feels counterintuitive to hand a complex frontend project to someone without a traditional development background. But with the right setup and tools, it works remarkably well.

## Closing Thoughts

This experience reinforced something I have been thinking about for a while: the distinction between "technical" and "non-technical" roles in software development is becoming increasingly blurry. A designer with VSCode and GitHub Copilot can deliver production-quality frontend code. A business analyst can prototype a feature end-to-end. A product manager can push a content change without waiting for a developer.

The bottleneck is no longer skill — it is setup. If you give people the right foundation and a short introduction to the tools, they can contribute in ways that would have been unimaginable just a few years ago.

The client was amazed. Honestly, so was I.
