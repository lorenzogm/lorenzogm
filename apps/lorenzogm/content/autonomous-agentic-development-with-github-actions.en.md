---
title: "The Autonomous Agentic Development Life Cycle with GitHub Actions"
date: "2026-06-03"
tag: AI, Agentic Development, GitHub Actions, Automation
description: Turning the agentic development life cycle into event-driven GitHub workflows — where issues become Epics, Epics become tickets, and every stage runs autonomously from brief to E2E verification.
image: "/autonomous-agentic-development-with-github-actions-en.png"
author: Lorenzo GM
---

# The Autonomous Agentic Development Life Cycle with GitHub Actions

In a previous article I described the [Agentic Software Development Life Cycle](/agentic-software-development-life-cycle) — a workflow built around skills like `/grill-with-docs`, `/to-prd`, `/to-issues`, `/triage`, `/tdd`, and `/qa`. It works. But there's a catch I kept running into: every one of those skills needs a human to open a session and invoke it.

That's fine when you're prototyping a process. It becomes the bottleneck when the process is proven.

The question that pulled me into this next article was simple: what if the backlog itself triggered the work? Not a person remembering to run `/to-prd`, but the platform reacting to an event — a new issue, an approved label, a fresh comment — and moving the ticket forward on its own.

That's the shift from *agentic* to *autonomous*. And GitHub already has everything you need to build it.

## From Invoked Skills to Event-Driven Workflows

The ASDLC had a human in the driver's seat at every transition. You picked a ticket, you ran the skill, you reviewed the output, you moved to the next step. The skills carried the intelligence; you carried the orchestration.

Autonomous development moves the orchestration into the platform. Each phase of the life cycle becomes a **GitHub workflow** that listens for an event and produces the next artifact. The human stops being the conveyor belt and becomes what they should have been all along: the approver.

```
Issue created → PRD/Epic → (approved) → Tickets → (refined) → Plan → (ready) → Build
```

Every arrow in that chain used to be a person opening a terminal. Now every arrow is a GitHub Actions trigger.

## The Vocabulary Shift: Issues, Epics, and Tickets

One small naming decision makes the whole system easier to reason about, so it's worth making it explicit up front.

A **brief** comes in as a plain GitHub issue. Once the system enriches it, that same issue becomes an **Epic** — a PRD captured directly in the issue description. The Epic then spawns **tickets**, which are themselves issues, linked back to the parent.

So everything lives as a GitHub issue. The difference is the stage it's in:

- **Issue (brief):** a raw request, barely structured.
- **Epic (PRD):** the enriched issue carrying the "why", scope, and acceptance criteria.
- **Ticket:** a vertical slice generated from the Epic, ready to implement.

Calling the enriched issue an *Epic* turned out to be the clarifying move. It signals that this issue is a parent, that it owns a set of children, and that it speaks business language rather than implementation detail.

## Step 1 — Brief to PRD: Listening for New Issues

The first workflow listens for `issues.opened`.

When a new issue lands, the workflow reads the raw brief, pulls in the relevant project documentation as context, and rewrites the issue description as a PRD. The issue is now an Epic. It carries the purpose, the scope, the constraints, and a first pass at acceptance criteria — all written in business language.

This is the `/grill-with-docs` and `/to-prd` skills from the ASDLC, fused into a single autonomous reaction. The difference is that no one had to remember to run them. The act of opening an issue *is* the trigger.

The human's job at this stage is not to write the PRD. It's to read it and decide whether it's right.

## Step 2 — PRD to Tickets: Listening for Approval

The second workflow listens for a label change — specifically, the moment a human adds an `approved` label to the Epic.

That label is the quality gate. It's the one deliberate human decision that says: *this PRD captures the right problem, go ahead and break it down.*

Once the label appears, the workflow reads the Epic and generates a set of tickets — independently-actionable issues, each a vertical slice, each linked back to the parent Epic. This is `/to-issues`, now event-driven.

The elegance here is that approval is expressed in the most native way GitHub offers: a label. No external tool, no separate dashboard. The backlog manages its own state.

## Step 3 — Ticket Review: Listening for Comments

The third workflow listens for `issue_comment.created`, and it applies to *every* issue in the system — both Epics and tickets.

When a human leaves a comment, the workflow treats it as a refinement request. It reads the comment, interprets the intent, and adjusts the issue description accordingly. A comment like "we should also handle the logged-out case" becomes an updated acceptance criterion. A comment questioning the scope becomes a tightened set of requirements.

This is the conversational layer of the backlog. Instead of editing issue descriptions by hand, the team talks to the tickets, and the tickets update themselves. The discussion thread becomes the audit trail; the description stays clean.

## Step 4 — Dev: Listening for the Approved Ticket

The fourth workflow fires when a ticket itself is approved.

At this point the system produces the **implementation plan** — the technical brief that the ASDLC generated with a second `/grill-with-docs` pass. It analyzes the affected files, the edge cases, and the approach that fits the existing architecture.

Then it assigns a label that routes the work:

- **`ready for agent`** — when the implementation will be handled autonomously.
- **`ready for dev`** — when a human developer picks it up from here.

That single branching label is what lets the same pipeline serve two very different team shapes. A fully autonomous team lets the agent take `ready for agent` tickets straight into implementation. A team with developers in the loop uses `ready for dev` as a clean, planned handoff — the plan is done, the context is captured, the human just builds.

## Beyond the Plan: TDD, Review, and E2E QA

The chain doesn't stop at the plan. The remaining stages of the ASDLC map onto the same event-driven model:

- **Implementation with TDD** — a workflow picks up a `ready for agent` ticket, runs the red-green-refactor loop against the acceptance criteria, and opens a pull request.
- **Code review** — a workflow reviews the pull request against the ticket's requirements and the project's conventions, leaving comments or requesting changes.
- **E2E QA** — a workflow loads the acceptance criteria, drives a real browser, verifies each criterion end-to-end, and records the result.

Each of these is another listener on another event: a pushed branch, an opened pull request, a passing build. The same pattern repeats all the way to a deployed, verified feature.

## Why This Works

The autonomous model works for the same reason the ASDLC worked — separation of concerns — but it adds one thing the manual version couldn't: **the backlog drives itself.**

- **Events replace orchestration.** No one has to remember which skill comes next. The platform knows.
- **Labels are the quality gates.** Approval is a native, visible, auditable action — not a side conversation.
- **Comments are the refinement channel.** The team talks to the tickets in plain language, and the tickets keep themselves current.
- **One label forks the flow.** `ready for agent` and `ready for dev` let the exact same pipeline serve a fully autonomous team or a hybrid one.

The human role compresses to the decisions that actually matter: *Is this the right problem? Are these the right tickets? Is this ready to build?* Everything between those decisions runs on its own.

## The Workflows

| Trigger | Event | Output |
|---------|-------|--------|
| Brief → PRD | `issues.opened` | Issue rewritten as an Epic (PRD) |
| PRD → Tickets | `issues.labeled` (`approved`) | Tickets created from the Epic |
| Ticket Review | `issue_comment.created` | Issue description refined |
| Dev | ticket approved | Implementation plan + `ready for agent` / `ready for dev` |
| Build | `ready for agent` | TDD implementation + pull request |
| Review | pull request opened | Code review comments |
| QA | build passing | E2E verification of acceptance criteria |

---

The ASDLC taught me that a clear set of skills can make AI a real participant in development. This autonomous model is the next step: wiring those skills to events so the life cycle runs without anyone holding the crank. Start with one workflow. Let `issues.opened` turn your next brief into an Epic, and watch the backlog start to move on its own.
