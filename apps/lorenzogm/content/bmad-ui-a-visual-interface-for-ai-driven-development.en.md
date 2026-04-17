---
title: "BMAD UI: A Visual Interface for AI-Driven Development"
date: "2026-04-17"
tag: AI, Tooling, Development
description: The BMAD Method brings structure to AI-powered software development, but its complexity can be a barrier. BMAD UI is an open-source interface that makes it easier to learn, execute, and monitor the entire workflow.
image: https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80
author: Lorenzo GM
---

# BMAD UI: A Visual Interface for AI-Driven Development

AI coding assistants are getting better every month, but using them without structure leads to inconsistent results. You get code that works today and breaks tomorrow. No shared context between sessions. No traceability of decisions. No clear path from idea to shipped product.

The [BMAD Method](https://docs.bmad-method.org/) (Build More Architect Dreams) solves this by providing a framework for AI-driven development with specialized agents, guided workflows, and progressive context management across four phases: Analysis, Planning, Solutioning, and Implementation.

The problem? The method itself is complex. Understanding which skill to invoke, in which order, with which agent, and how everything connects is not straightforward. That complexity is exactly what I wanted to remove.

So I built [BMAD UI](https://bmad.lorenzogm.com/).

## What the BMAD Method Does

Before explaining the UI, it helps to understand what the method provides. BMAD structures AI development into four phases:

1. **Analysis** (optional) — Brainstorming, market research, domain research, and product brief creation
2. **Planning** — Defining requirements through a PRD (Product Requirements Document) and UX design
3. **Solutioning** — Creating the technical architecture, breaking work into epics and stories, and running an implementation readiness check
4. **Implementation** — Sprint planning, then a cycle of story creation, development, and code review for every story

Each phase produces artifacts (PRD, architecture document, epic files, story files) that become context for the next phase. This is the key insight: AI agents make better decisions when they have structured, progressive context rather than a blank slate.

The method uses specialized agents (PM, Architect, Developer, UX Designer, Analyst) and skills (`bmad-create-prd`, `bmad-create-architecture`, `bmad-dev-story`, etc.) that you invoke in your IDE. Each workflow runs in a fresh chat to avoid context window limitations.

## The Problem: Complexity as a Barrier

The BMAD Method is powerful, but it has a steep learning curve:

- There are **dozens of skills** across four phases, each with specific agents and outputs
- The **correct order matters** — you can't create stories before architecture, and you can't start implementation without sprint planning
- **Context management** is critical — each workflow needs to load the right artifacts from previous phases
- There is **no visibility** into what has been completed, what is in progress, or what comes next
- **Non-technical team members** who could benefit from guided AI workflows have no way to participate without learning CLI commands

For a solo developer who has read the full documentation, this is manageable. For a team, or for someone trying to onboard, it is a significant barrier.

## What BMAD UI Provides

BMAD UI is a web interface that sits on top of your local BMAD project files. It reads the `_bmad/` and `_bmad-output/` directories and presents the full project state visually.

### Workflow Visualization

The main workflow view displays all four phases with their status. You can see at a glance which phases are completed, which are in progress, and which are coming next. Each phase shows its workflows, the artifacts they produce, and clear descriptions of what each step does.

This is the learning component. Instead of reading documentation to understand the method, you can explore the workflow visually and understand what each phase requires before you start.

### Session Tracking

Every time you run a BMAD skill through the CLI, BMAD UI tracks the session. You can see:

- Which skill was invoked
- Which AI model was used
- Which story was being worked on
- Start and end timestamps
- Session status (running, completed, cancelled)

This gives you a clear history of all AI interactions within the project.

### Analytics Dashboard

The analytics section provides usage data based on CLI logs:

- **Total requests and tokens** consumed across the project
- **Cost estimates** based on your Copilot plan
- **Token usage by model** — see which models are being used and how much
- **Cache hit rates** — BMAD leverages context caching heavily, and you can see the efficiency
- **Sessions by skill** — understand where most of the AI effort goes
- **Activity heatmaps** — visualize when development is happening
- **Requests by epic** — see the cost and effort distribution across your product backlog

In the future, these analytics can be extended with metrics like skill success rate (how often a skill completes without human intervention), model comparison (which models produce better results for which tasks), and more.

### Execution Support

BMAD UI currently supports execution through the Copilot CLI. When you are on a workflow step, the interface shows you exactly what command to run and provides context about what the skill will do. This can be extended to support Cursor CLI and Claude CLI as well.

The idea is simple: instead of memorizing commands and checking documentation, the UI tells you what to do now and what comes next.

## How It Works Technically

BMAD UI reads your local BMAD project files — there is no database. The planning artifacts (PRD, architecture, epics, stories, sprint status) and session logs are all stored as files in your project repository.

This means:

- **No external dependencies** — everything runs locally alongside your project
- **Version controlled** — all artifacts are in git, just like your code
- **No write actions in the demo** — the [production deployment](https://bmad.lorenzogm.com/) is read-only for exploration purposes; to use it with write capabilities, you attach it to your own BMAD project during development

## The Bigger Goal: Enabling Non-Technical Profiles

This connects directly to something I have been exploring: enabling non-technical team members to work with AI coding tools. In a [previous article](/article/enabling-non-technicals-vscode-github-copilot), I described how a designer built a complete prototype using GitHub Copilot in agent mode with just one hour of onboarding.

BMAD UI takes this further. The goal is to provide a **guided chat interface** that allows non-technical profiles — product managers, designers, analysts — to participate in AI-driven development without needing to learn CLI commands or understand the underlying tool chain.

A product manager could open BMAD UI, navigate to the Planning phase, and create a PRD through a guided conversation. A designer could work on UX specifications. The interface provides the structure and context; the AI does the heavy lifting.

## Try It

- **Explore the demo**: [bmad.lorenzogm.com](https://bmad.lorenzogm.com/) — browse the workflow, sessions, and analytics of a real project
- **BMAD Method docs**: [docs.bmad-method.org](https://docs.bmad-method.org/) — learn the full framework
- **Source code**: [github.com/lorenzogm/bmad-ui](https://github.com/lorenzogm/bmad-ui) — open source, contributions welcome

If you are building with AI and looking for structure beyond "just chat with Copilot," the BMAD Method is worth your time. And if the method feels overwhelming, BMAD UI is here to make it approachable.
