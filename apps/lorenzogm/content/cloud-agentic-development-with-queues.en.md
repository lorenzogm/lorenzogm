---
title: "Cloud Agentic Development with Queues"
date: "2026-07-14"
tag: AI, Agentic Development, GitHub Actions, Automation
description: Four end-to-end flows that run in the cloud with no one at the keyboard — feature delivery, Dependabot updates, security alerts, and broken pipelines — each triggered by an event, driven by an agent, and gated by quality checks before merge.
image: "/cloud-agentic-development-with-queues-en.png"
author: Lorenzo GM
---

# Cloud Agentic Development with Queues

Running an agent from your editor is useful, but it still needs you to be there — open a session, invoke a skill, wait, review, repeat. The next step is to move that work into the cloud, where an **event** starts the agent instead of a person.

GitHub already gives you the pieces: Actions for the triggers, the [GitHub Copilot coding agent](https://github.com/features/ai/github-app) to do the work, and a dashboard that shows every open task the agents are handling. The developer stops being the conveyor belt and becomes the approver.

Four flows cover most of what a team does day to day. They all share the same shape:

```
event ──▶ agent ──▶ pull request ──▶ quality gates ──▶ merge
                                          │
                                   (human approves)
```

The difference is only in what fires the event and how much a human stays in the loop. Let's go through them.

## Queues Are the Key

Before the flows, the idea that makes all of them work: **queues**. Autonomous agentic development isn't one big brain deciding everything — it's a series of queues, where each item waits to be picked up, processed, and moved to the next queue. An agent (or a human) pulls from a queue, does one job, and drops the result into the next one. The system moves forward one hand-off at a time.

Three queues carry the whole life cycle:

```
Jira tickets          GitHub Issues           GitHub Pull Requests
(business             (implementation         (implemented
 requirements)         plans)                  solutions)

  what to build  ──▶  how to build it  ──▶  the built change
```

1. **Jira tickets — the requirements queue.** This is *what* the business wants. Each ticket is a unit of business intent waiting to be turned into a plan. Nothing is built directly from a ticket; it first has to become a plan.
2. **GitHub Issues — the plans queue.** This is *how* the work will be done. A ticket that's ready gets turned into an implementation plan captured as a GitHub Issue. The plan waits here to be reviewed and approved before any code is written.
3. **GitHub Pull Requests — the solutions queue.** This is the *built change*. An approved plan produces a pull request with the implementation and its tests. The PR waits here until the quality gates pass and it's ready to merge.

Each queue is a checkpoint. Work only advances when the previous stage is genuinely done — a ready ticket becomes a plan, an approved plan becomes a PR, a green PR becomes a merge. Because every stage is a queue with a visible state, the whole system is inspectable: at any moment you can see what's waiting to be planned, what's waiting to be approved, and what's waiting to be merged. The flows below are just different ways of feeding and draining these three queues.

## Flow #1 — Feature Delivery

```
Jira ticket (sprint-ready)
        │
        ▼
Workflow generates an implementation plan  ──▶  GitHub Issue
        │
        ▼
Developer reviews the plan        ◀── Copilot app dashboard
        │
        ▼
Developer assigns the issue to an agent
        │
        ▼
Agent opens a PR (TDD: unit + E2E tests)
        │   gates: build · lint · test · format · E2E · contract · Lighthouse · axe
        ▼
Developer checks the preview + reviews the code
        │
        ▼
Merge
```

This is the one flow where a human stays in control at two points: approving the plan, and approving the result.

1. **A ticket is ready.** The work starts in Jira. When a ticket is assigned to the sprint and marked ready for development, it becomes the input for automation. Nothing happens until the ticket is genuinely ready — that keeps half-formed ideas out of the pipeline.
2. **A workflow generates an implementation plan.** A GitHub workflow picks up the ticket and produces a plan as a **GitHub Issue**: the approach, the files it expects to touch, the tests it intends to write, and the trade-offs. The plan is an artifact you can read and challenge before any code exists.
3. **A developer reviews the plan.** This is the first checkpoint. Using the GitHub Copilot app dashboard, the developer sees every open plan at a glance and reads through the proposed approach. A weak plan is cheap to fix here; a weak plan discovered after the code is written is not.
4. **The developer assigns the issue to an agent.** Once the plan is sound, the developer hands the issue to the coding agent. That assignment is the "go" signal — the deliberate human decision that turns a plan into work.
5. **The agent produces a PR following TDD.** The agent writes the failing tests first — new **unit tests** and new **E2E tests** — then the implementation that makes them pass. Opening the PR triggers the full set of quality gates: **build, lint, test, format, E2E testing, contract testing with Playwright, performance with Lighthouse, and accessibility with axe-core**. Each gate is a wall the change has to clear. The developer opens the **preview link** to see the result running and reviews the code.
6. **The developer merges.** With the plan approved, the gates green, and the preview validated, merging is the easy part. Everything risky already happened upstream.

The pattern: automate the mechanical work, keep the human on the two decisions that actually need judgment — *is this the right plan?* and *is this the right result?*

## Flow #2 — Dependabot Security Updates

```
Dependabot opens a PR
        │
        ▼
Quality gates run
        │
   ┌────┴─────┐
   ▼          ▼
 all pass   some fail
   │          │
   ▼          ▼
auto-merge  agent fixes ──▶ gates pass ──▶ auto-merge
```

Dependency updates are frequent, mostly boring, and occasionally breaking. This flow keeps them moving without a human unless something actually needs a human.

1. **Dependabot opens a pull request.** A new version — often a security patch — arrives as a PR, exactly like any other contributor.
2. **The gates decide.** If every quality gate passes, the PR is **auto-merged**. No review, no waiting: a green dependency bump is not worth a human's attention.
3. **A failure hands the work to an agent.** If a gate fails, an agent is triggered to fix the breakage — adjust the code to the new API, update a snapshot, resolve a type error — and push the fix onto the same branch. When the gates go green, the auto-merge rule from step 2 takes over and the PR lands.

The result is a dependency pipeline that only surfaces to a human when the agent itself can't close the gap.

## Flow #3 — Advanced Security Monitoring

```
Security alert appears
        │
        ▼
Alert triggers an agent
        │
        ▼
Agent opens a PR with the fix
        │
        ▼
Quality gates run ──▶ pass ──▶ merge
```

Security alerts are a queue that tends to grow faster than anyone drains it. This flow drains it automatically.

1. **An alert is detected.** Advanced security scanning watches the repository. A new alert — a vulnerable pattern, an exposed risk — is the trigger.
2. **An agent works on a fix.** The alert wakes an agent, which investigates the finding and implements a remediation: patch the vulnerable code, tighten a check, remove the risky path — then opens a **pull request** with the change.
3. **The PR merges once the pipelines pass.** The same quality gates apply. When they're green, the fix merges. The alert closes because the underlying problem is gone, not because someone dismissed it.

## Flow #4 — Pipeline Monitoring

```
A pipeline breaks (new code)
        │
        ▼
Failure triggers an agent
        │
        ▼
Agent opens a PR with the fix
        │
        ▼
Quality gates run ──▶ pass ──▶ merge
```

A red pipeline blocks everyone behind it. Instead of waiting for someone to notice, the failure itself starts the repair.

1. **A pipeline breaks.** New code lands and a pipeline goes red — a failing test, a broken build, a lint violation that slipped through.
2. **An agent works on the fix.** The failure triggers an agent, which reads the logs, reproduces the problem, and implements a correction on a fresh branch, then opens a **pull request**.
3. **The PR merges once the pipelines pass.** The fix runs through the gates like any other change. When they're green, it merges and the pipeline is healthy again — often before the team has finished reading the failure notification.

## The Common Thread

Look at the four diagrams side by side and the same skeleton shows up every time: an **event** starts the work, an **agent** does it, a **pull request** carries it, and **quality gates** decide whether it's allowed in. The gates are what make this safe — nothing merges because an agent said so; it merges because it built, linted, tested, and passed.

Feature delivery keeps a human on the two judgment calls. The other three run unattended and only ask for a human when the agent can't finish the job. That's the real shift: you stop doing the work and start setting the standard the work has to meet.
