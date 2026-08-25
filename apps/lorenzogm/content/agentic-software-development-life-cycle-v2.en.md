---
title: "The Agentic Software Development Life Cycle v2"
date: "2026-08-25"
tag: AI, Agentic Development, Process, Software Factory
description: Version 2 of the ASDLC — Experience Design joins the flow, every step becomes a named command, and five explicit approval gates decide what a human still signs off before the Software Factory takes over.
image: "/agentic-software-development-life-cycle-v2-en.png"
author: Lorenzo GM
---

# The Agentic Software Development Life Cycle v2

Once upon a time, the development life cycle had two modes: planning and building. Everything interesting happened in the gap between them, and the gap was where context went to die.

Every day we patched that gap with documents, meetings, and tribal memory. Then I wrote [The Agentic Software Development Life Cycle](/agentic-software-development-life-cycle) — three layers, Planning → Backlog → Build, with the backlog promoted to a first-class middle layer instead of a side effect of planning. That version worked. Teams could adopt it without a reorg, without a RACI matrix, without asking anyone's permission.

Until one day it stopped being enough.

Two things broke it. First, design was still outside the loop: the workflow assumed someone had already decided what the experience should be. Second, the more the agents could actually do, the less obvious it became *where a human was still supposed to say yes*. "Keep a human in the loop" is not a process. It is a slogan.

Because of that, v2 exists. Same spine, three additions: **Experience Design** as a real branch into the backlog, **every step named as a command**, and **five explicit approval gates** — not vibes, gates.

![The Agentic Software Development Life Cycle v2](/agentic-software-development-life-cycle-v2-en.png)

## How to Read the Map

Two symbols carry most of the meaning:

- 🤖 — the step can run **unattended in the Software Factory**. No session, no human watching. You trigger it, or an event triggers it, and it produces its artefact.
- ✋ — the step **needs a human approval before moving on**. The agent does the work; a person decides whether it moves forward.

A step can be both. `/plan-tickets` runs unattended *and* waits for approval — the Factory drafts the tickets overnight, you approve them with coffee. That combination is the whole point of v2.

Steps with neither symbol are conversations. They need you in the room.

## Planning: From Idea to Tickets

The Planning group turns something fuzzy into something the backlog can hold.

### `/plan-idea`

The AI asks you business questions to develop your idea until both of you share the same understanding. No code, no architecture, no ticket format. Just: what are we doing, who is it for, what does success look like, and what are we explicitly not doing.

This step has no 🤖 on purpose. An idea cannot be developed unattended, because the missing information lives in your head. It is the one step in the whole cycle that is irreducibly a conversation.

### `/plan-spec` 🤖

The conversation gets synthesised into a spec — the **epic** — and published to the issue tracker.

This is the first step the Software Factory can own. Once the conversation exists, turning it into a structured spec is a transformation, not a decision. Feed it the transcript, get back an epic in the tracker.

### `/plan-tickets` 🤖 ✋

The spec gets broken into tickets — the **stories** — and each ticket declares which tickets block it.

That last part matters more than it sounds. Declared dependencies are what let the Factory pick up work autonomously later: an agent can ask "what is unblocked right now?" and get a real answer instead of guessing at priority.

This is the first approval gate. A wrong breakdown does not fail loudly — it fails three days later, as rework.

## Experience Design: The Branch v1 Was Missing

The Planning group assumes you know what you are building. Experience Design is for when you do not.

It runs **in parallel** with Planning, not before or after it, and it converges on the same backlog.

### `/xd-discover`

Intake and inspiration. Diverge on the problem space: what exists, what competitors do, what users actually struggle with, what constraints are real and which ones are inherited assumptions.

### `/xd-frame`

Narrative, strategy and principles. Converge on a direction. This is where the team decides what the experience is *about* before deciding what it looks like.

### `/xd-define`

Define the experience that will go into prototyping. Concrete enough to build a prototype from, loose enough that the prototype can still surprise you.

None of these three carry 🤖 either. Design is judgement, and judgement does not run unattended.

### Prototype

The output of Experience Design is not a document. It is **design artefacts and prototypes that ground the experience before planning begins** — something you can click, react to, and argue about.

### `/plan-prototype-to-tickets` 🤖 ✋

Then the branch rejoins Planning. The prototype gets turned into tickets — the stories — ready for the backlog.

Second approval gate. The prototype is the source of truth here, and if the tickets drift from it, the built product will drift from it too.

## Backlog: Still the Middle Layer

Specs (epics) and tickets (stories) are stored in the issue tracker. Nothing else.

The backlog stayed exactly where v1 put it, because it is the part that was already right. It is the contract between business and engineering: written in business language, structured for implementation, carrying its own context.

What changed is that **two roads now lead into it**. Planning feeds it directly when the shape of the solution is known. Experience Design feeds it through a prototype when it is not. Either way, the Development group downstream does not care which road a ticket travelled — it reads the same contract.

## Development: From Ticket to Merged PR

Five steps, and this is where the Software Factory earns its keep: every single one carries 🤖.

### `/dev-implementation-plan` 🤖 ✋

The AI asks you technical questions to define the implementation plan: which files are affected, which seams get tests, what the edge cases are, what the approach is given the existing architecture.

Third approval gate — and the highest-leverage one in the cycle. This is the last moment where changing your mind is cheap. After this, changing your mind costs a rewrite.

### `/dev-implement` 🤖

Implement the tickets from the plan, using TDD at the agreed seams.

"At the agreed seams" is doing real work in that sentence. Not everything deserves a test, and blanket TDD produces test suites nobody trusts. The plan decides where the tests go; this step honours that decision. No approval gate — the plan was already approved, and the review is coming.

### `/dev-code-review` 🤖 ✋

Review the implementation against the plan and the codebase standards.

Fourth gate. Note what it reviews against: **the plan**, not just taste. The question is not "would I have written it this way" but "did this do what we agreed, the way we agreed". Agents drift, and drift from an approved plan is the specific failure mode this catches.

### `/dev-qa` 🤖

Test the functionality against the stories' acceptance criteria and the defined quality gates.

Not unit tests. Behavioural verification against the acceptance criteria that were written back in `/plan-tickets` — which is exactly why those criteria had to be good enough to survive an approval gate.

No ✋ here, and that is deliberate: a QA step that needs human approval to *report a failure* is not a quality gate, it is a formality. It passes or it does not, and if it does not, the work goes back.

### `/dev-ship` 🤖 ✋

Open the PR, add reviewers, and make sure the pipelines pass.

Fifth and final gate. The agent can open the PR, assign it, and babysit the pipeline — but merging into a shared branch is a human decision. This is the boundary between your work and everyone else's.

## The Approval Gates

Five gates in the whole cycle. That number is a design decision, not an accident.

| Gate | Step | What the human is deciding |
| --- | --- | --- |
| 1 | `/plan-tickets` | Is the work broken down correctly? |
| 2 | `/plan-prototype-to-tickets` | Do the tickets match the prototype? |
| 3 | `/dev-implementation-plan` | Is this the right technical approach? |
| 4 | `/dev-code-review` | Did the implementation follow the plan? |
| 5 | `/dev-ship` | Is this ready to merge? |

The pattern is consistent: **approvals sit where a wrong decision propagates, or where the blast radius leaves your own workspace.**

Three of the five gates (1, 2, 3) are *scope and approach* gates — the mistakes that silently multiply. Two of them (4, 5) are *exit* gates — the moments where work leaves the agent's hands and becomes the team's problem.

Just as important is where approvals are **not**. `/plan-spec`, `/dev-implement`, and `/dev-qa` run without them, because they are faithful transformations of something already approved. Adding a gate there does not add safety. It adds a queue.

If you are tempted to add a sixth gate, ask the real question first: is the step actually risky, or is the *upstream* artefact just not good enough to trust? Most requests for more approvals are requests for a better spec wearing a disguise.

## Where the Software Factory Comes In

Count the 🤖 marks: eight of the twelve steps can run unattended.

That is what makes the **Software Factory** possible — an environment where agentic steps execute without a session open, triggered by events instead of by you sitting in front of an editor. A spec lands, `/plan-spec` runs. Tickets are approved, `/dev-implementation-plan` queues up. A plan is approved, `/dev-implement` starts. Your job shifts from *doing the steps* to *clearing the gates*.

The five ✋ gates are what makes that safe. Autonomy without gates is just an unsupervised intern with commit access; gates without autonomy is the process you already have. The Factory needs both.

I am writing a dedicated article about the Software Factory — how the triggers work, how state is carried between unattended runs, and what breaks when you try to run this on real infrastructure. For now, read every 🤖 in the diagram as "this step does not need you in the room."

## The Full Cycle

| Group | Step | Factory | Approval |
| --- | --- | --- | --- |
| Planning | `/plan-idea` | — | — |
| Planning | `/plan-spec` | 🤖 | — |
| Planning | `/plan-tickets` | 🤖 | ✋ |
| Experience Design | `/xd-discover` | — | — |
| Experience Design | `/xd-frame` | — | — |
| Experience Design | `/xd-define` | — | — |
| Planning | `/plan-prototype-to-tickets` | 🤖 | ✋ |
| Development | `/dev-implementation-plan` | 🤖 | ✋ |
| Development | `/dev-implement` | 🤖 | — |
| Development | `/dev-code-review` | 🤖 | ✋ |
| Development | `/dev-qa` | 🤖 | — |
| Development | `/dev-ship` | 🤖 | ✋ |

## What Changed From v1

If you adopted v1, here is the delta:

- **Experience Design is now in the cycle.** v1 started from an idea that was already shaped. v2 has a real path for problems that are still fuzzy, and it converges on the same backlog through a prototype.
- **Every step is a named command.** v1 reused generic skills in different contexts, which worked but made the map harder to read. In v2, `/plan-idea` and `/dev-implementation-plan` are separate commands precisely because one is a business conversation and the other is a technical one.
- **Approvals are explicit.** v1 had human involvement everywhere and nowhere. v2 names five gates and defends the absence of the others.
- **Autonomy is marked.** Eight steps carry 🤖 and can be handed to the Software Factory. That was not something v1 could express.

The three layers did not change. Planning → Backlog → Build is still the spine, and if you want the reasoning behind that structure, it is in [the original article](/agentic-software-development-life-cycle). If you want the heavier, full-team operating model with role ownership and a RACI matrix, that is [Agentic Development for Software Teams](/agentic-development-for-software-teams).

## Closing Thought

The interesting question in agentic development stopped being "can the agent do this step?" A while ago, the answer became yes for most steps.

The interesting question now is the one v2 tries to answer:

> Which steps still deserve a human signature, and which ones only feel like they do?

Get that wrong in one direction and you approve everything, which is v1 with extra ceremony. Get it wrong in the other and you wake up to a merged PR that solves a problem nobody had.

Five gates. Eight unattended steps. That is the whole bet.
