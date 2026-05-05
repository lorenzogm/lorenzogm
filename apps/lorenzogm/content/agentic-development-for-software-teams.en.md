---
title: "Agentic Development for Software Teams: Phases + RACI"
date: "2026-05-04"
tag: AI, Agentic Development, Process
description: How software teams can structure agentic development with clear phases, role ownership, a RACI matrix, and a practical quality loop that keeps traceability inside the flow.
image: "/agentic-development-for-software-teams-en.png"
author: Lorenzo GM
---

# Agentic Development for Software Teams: Phases + RACI

When a team starts working with AI, the main problem is usually not whether the model can generate code. The real problem is different: who should run each workflow, in what order, how much context must exist before delegating, and where human intervention is still necessary.

That is where agentic development needs a real operating model. BMAD works well here not because it invents new steps, but because it gives structure to steps that already belong in any serious software process: discovery, requirements, design, architecture, stories, implementation, review, and testing.

In this article I use BMAD as a concrete example of agentic development for six common roles:

- Business Analyst
- Project Manager
- Architect
- Designer
- Developer
- Tester

The point is not to treat agentic development as a list of prompts. The point is to treat it as a shared delivery system with clear ownership, clear artifacts, and clear feedback loops.

## The Core Idea

One practical way to structure agentic development is to organize the work into phases. In BMAD, that model is expressed as **four phases**:

1. **Analysis**
2. **Planning**
3. **Solutioning**
4. **Implementation**

On top of that, our team adds one operational convention:

5. **Feedback and Replanning Loop**

This is not an official fifth BMAD phase. It is a team execution rule for something that always happens in real projects: clients change priorities, new requirements emerge, or QA finds gaps after stories looked finished.

Instead of deciding manually whether that only affects one story or whether it should change the PRD, UX, or architecture, we prefer to run `bmad-correct-course` first and let BMAD reassess the impact with context.

The point is not to add bureaucracy. The point is to gain speed and efficiency without compromising quality.

## Why This Flow Works

The practical advantage of agentic development is not just that it distributes work across humans and AI. The real advantage is that it speeds up decisions and reduces rework when each phase has a clear goal, a recognizable set of workflows, and an explicit way to loop back when feedback arrives.

That turns the operating model into three direct benefits:

- more speed, because each phase narrows the decision that must be made
- more efficiency, because context gets reused instead of rebuilt at every handoff
- more quality, because TEA keeps traceability, test design, and gates inside the flow instead of bolting them on at the end

That is why this model scales better when the goal is to move faster without letting quality drift.

## What Each Phase Does

### 1. Analysis

This phase is optional in BMAD, but it is useful whenever the problem is still fuzzy.

Typical skills:

- `bmad-brainstorming` to open options and structure hypotheses
- `bmad-market-research` to understand market context, competitors, or benchmarks
- `bmad-domain-research` to clarify business rules and domain language
- `bmad-technical-research` to validate feasibility, constraints, and technical tradeoffs
- `bmad-product-brief` or `bmad-prfaq` to turn discovery into a sharper product proposal

The weight here usually sits with the **Business Analyst**, **Project Manager**, and **Architect**, with **Designer** contributing when the problem space touches user experience. **Developer** and **Tester** are not involved in this phase at all.

### 2. Planning

This is where the team defines what needs to be built.

Typical skills:

- `bmad-create-prd` to lock scope, goals, and product requirements
- `bmad-create-ux-design` when the project really has a user interface or meaningful design change
- `bmad-testarch-nfr` when the project needs NFR expectations or release criteria defined early
- `bmad-testarch-trace` only in brownfield, to establish a coverage baseline before planning new work

Primary ownership usually sits with the **Project Manager** and **Designer**, with input from the **Architect** so the PRD does not drift away from technical or quality reality. When `bmad-testarch-nfr` or `bmad-testarch-trace` enter the phase, the operating lead should shift to the **Architect**. **Developer** and **Tester** are not part of this phase. Only the roles that directly shape the product definition participate here.

In TEA, `bmad-testarch-trace` is not a Solutioning workflow. Its real place is **Phase 2** when brownfield baseline is needed, **Phase 4** when traceability is refreshed, and the **release gate** when the decision is closed.

### 3. Solutioning

This is where the team decides how to build the solution and how to break the work down.

Typical skills:

- `bmad-create-architecture` to define the technical shape of the solution
- `bmad-create-epics-and-stories` to break the work into executable units
- `bmad-testarch-test-design` once at system level to review testability, risk, and coverage before execution starts
- `bmad-check-implementation-readiness` to confirm the team can start building without major gaps
- `bmad-testarch-framework` once per project if the testing foundation does not exist yet
- `bmad-testarch-ci` once per project if the quality pipeline is not in place yet

BMAD has a dedicated Architect agent. If your team has an explicit **Architect** role, this is where that role owns the phase. The Architect drives architecture, test design, framework, CI, and readiness checks. The **Project Manager** participates for epic and story breakdown but the technical decisions belong to the Architect. **Business Analyst**, **Designer**, **Developer**, and **Tester** are not part of this phase. If your team does not have an Architect role, that responsibility should be owned by a **senior developer or tech lead** instead.

This is where `bmad-testarch-framework` and `bmad-testarch-ci` belong. If they still show up as pending work in Implementation, the gap is usually not delivery. The gap is unfinished Solutioning.

### 4. Implementation

This is where the delivery loop starts. **Developer** and **Tester** join the flow here for the first time. **Business Analyst** and **Designer** are not needed in this phase—their work was completed in Analysis and Planning.

At this point `bmad-testarch-framework` and `bmad-testarch-ci` should no longer reappear. If they are still needed here, Solutioning is being reopened.

**Per epic** when strategy, coverage, or overall quality need a refresh:

- `bmad-sprint-planning` to align objective, capacity, and focus for the epic or sprint
- `bmad-testarch-test-design` to reassess risk and coverage at epic level
- `bmad-sprint-status` to review progress, blockers, and drift
- `bmad-retrospective` to close the cycle with operational learning

**At epic close or as a quality checkpoint** when the team needs a stronger read on quality and coverage:

- `bmad-testarch-test-review` to audit the quality of the test set
- `bmad-testarch-trace` to refresh traceability and expose real gaps

**Per story** inside the normal delivery loop:

- `bmad-create-story` to prepare a clear, executable story
- `bmad-testarch-atdd` optionally when acceptance tests should exist before implementation
- `bmad-dev-story` to implement the story with the prepared context
- `bmad-code-review` to validate technical quality and deviations
- `bmad-testarch-automate` to expand coverage after implementation
- `bmad-qa-generate-e2e-tests` when it fits the project's testing strategy

**Per release or as a gate** when the project demands it:

- `bmad-testarch-nfr` to validate NFRs with evidence if they were not done earlier or need revalidation
- `bmad-testarch-trace` to close the gate decision with coverage and evidence

The most common loop is still story by story, but TEA adds two useful layers: an epic-level design layer and a release-level gate layer.

### 5. Feedback and Replanning Loop

This loop starts in two situations:

- the client brings changes or new requirements
- QA finds bugs or gaps after stories were already marked done

Our rule is simple:

> Every feedback item goes through `bmad-correct-course` first.

We do not manually assume whether the change only affects one story or whether it touches the PRD, UX, architecture, epics, or backlog. We prefer BMAD to reassess impact first and recommend the right route.

After that analysis, the usual outcome is new or updated stories that go back into the same documented implementation loop.

## BMAD RACI Matrix by Phase

Legend:

- `R` Responsible
- `A` Accountable
- `C` Consulted
- `I` Informed

### Table 1. Analysis

| Skill / Workflow | BA | PM | Architect | Designer |
| --- | --- | --- | --- | --- |
| `bmad-brainstorming` | R | A | C | C |
| `bmad-market-research` / `bmad-domain-research` / `bmad-technical-research` | R | A | C | — |
| `bmad-product-brief` / `bmad-prfaq` | R | A | C | C |

### Table 2. Planning

| Skill / Workflow | BA | PM | Architect | Designer |
| --- | --- | --- | --- | --- |
| `bmad-create-prd` | C | A/R | C | C |
| `bmad-create-ux-design` | — | C | — | A/R |
| `bmad-testarch-nfr` | — | C | A/R | — |
| `bmad-testarch-trace` (brownfield baseline) | — | C | A/R | — |

### Table 3. Solutioning

| Skill / Workflow | PM | Architect |
| --- | --- | --- |
| `bmad-create-architecture` | C | A/R |
| `bmad-create-epics-and-stories` | A/R | C |
| `bmad-testarch-test-design` (system-level) | — | A/R |
| `bmad-testarch-framework` | — | A/R |
| `bmad-testarch-ci` | — | A/R |
| `bmad-check-implementation-readiness` | C | A/R |

### Table 4. Implementation

| Skill / Workflow | Cadence | PM | Architect | Dev | Tester |
| --- | --- | --- | --- | --- | --- |
| `bmad-sprint-planning` | Per epic / sprint | A | C | R | C |
| `bmad-testarch-test-design` | Per epic | C | C | C | A/R |
| `bmad-sprint-status` | Sprint tracking | A | — | R | C |
| `bmad-create-story` | Per story | A | C | R | C |
| `bmad-testarch-atdd` | Per story, optional | — | — | C | A/R |
| `bmad-dev-story` | Per story | — | C | A/R | C |
| `bmad-code-review` | Per story | — | C | A/R | C |
| `bmad-qa-generate-e2e-tests` | Per story / strategy-dependent | — | — | C | A/R |
| `bmad-testarch-automate` | Per story / feature | — | C | C | A/R |
| `bmad-testarch-test-review` | Per epic or pre-release | — | C | C | A/R |
| `bmad-testarch-trace` | Epic refresh + release gate | C | C | C | A/R |
| `bmad-testarch-nfr` | Release gate if not done earlier | C | C | C | A/R |
| `bmad-retrospective` | Sprint / epic close | A | — | R | C |

### Table 5. Feedback and Replanning Loop

| Skill / Workflow | BA | PM | Architect | Designer | Dev | Tester |
| --- | --- | --- | --- | --- | --- | --- |
| `bmad-correct-course` for a new functional requirement | R | A | C | — | C | — |
| `bmad-correct-course` for a new UX/UI requirement | — | A | — | R | C | — |
| `bmad-correct-course` for a bug or QA finding | — | A | C | — | C | R |

The key point is that the feedback loop does not always start the same way. It can start from business, design, or QA, but BMAD uses the same workflow to recalculate impact and route the work back to the right phase.

## How to Read These Tables

Three nuances matter here.

### Designer groups UX and UI

BMAD has a **UX Designer** agent, not a separate **UI Designer** agent. That is why this version of the matrix uses a single **Designer** role. If your team splits UX and UI, both can still collaborate inside `bmad-create-ux-design`, but operationally it is cleaner to model design as one responsibility.

### Architect should appear when the role exists

This version of the matrix includes a separate **Architect** role. If your team does not have that formal role, you can absorb that column into Development or Tech Lead, but it is better to do that explicitly than to let architecture ownership disappear by accident.

### Development and Testing join in Implementation

In this model, **Developer** and **Tester** are not part of Analysis, Planning, or Solutioning. Their operating weight starts in **Implementation**, where they execute, review, and validate. Similarly, **Business Analyst** and **Designer** finish their contribution before Implementation and do not participate in the delivery loop.

### Testing may need more than the built-in QA workflow

For many projects, `bmad-qa-generate-e2e-tests` is a good starting point. If you need traceability, formal quality gates, or stronger testing governance, the natural next step is to install **TEA** and distribute skills like `bmad-testarch-framework`, `bmad-testarch-ci`, `bmad-testarch-test-design`, `bmad-testarch-atdd`, `bmad-testarch-automate`, `bmad-testarch-test-review`, `bmad-testarch-trace`, and `bmad-testarch-nfr` inside the normal flow.

## Where to Keep HITL and Where to Increase Autonomy

This is one of the most important tradeoffs in the whole method.

### High HITL

Human supervision should stay high in:

- `bmad-product-brief` / `bmad-prfaq`
- `bmad-create-prd`
- `bmad-create-ux-design`
- `bmad-create-architecture`
- `bmad-testarch-test-design`
- `bmad-testarch-atdd`
- `bmad-testarch-nfr`
- `bmad-testarch-trace`
- `bmad-testarch-test-review`
- `bmad-correct-course`

These workflows define the frame of the problem. If AI gets them wrong, the mistake contaminates everything downstream.

### High autonomy

AI can operate with much more autonomy in:

- `bmad-create-story`
- `bmad-dev-story`
- part of `bmad-qa-generate-e2e-tests`
- `bmad-testarch-automate`

As long as the upstream context is solid, this is where most of the speed gains appear.

### Validation HITL

Then human judgment comes back strongly in:

- `bmad-code-review`
- final QA at epic level
- `bmad-retrospective`
- `bmad-correct-course`

The goal is not to supervise constantly. The goal is to intervene at the moments where a wrong decision changes scope, quality, or delivery direction.

## A Simple and Realistic Team Flow

If I had to summarize this model as a practical sequence, it would look like this:

1. BA and PM clarify the problem and context in Analysis.
2. PM and Designer turn that into a PRD and design.
3. If the project is brownfield and needs a real baseline, `bmad-testarch-trace` can start in Planning.
4. Development owns Solutioning and closes architecture, `bmad-testarch-test-design`, `bmad-testarch-framework`, `bmad-testarch-ci`, and stories.
5. On each epic, `bmad-testarch-test-design` is refreshed.
6. On each story, Development works through `bmad-create-story`, `bmad-dev-story`, `bmad-code-review`, and, when useful, `bmad-testarch-atdd` and `bmad-testarch-automate`.
7. At epic close, `bmad-testarch-test-review` and `bmad-testarch-trace` help measure real quality and coverage.
8. On stricter releases, `bmad-testarch-trace` acts as the gate and `bmad-testarch-nfr` joins when NFRs must be revalidated.
9. Every client feedback item or QA finding goes through `bmad-correct-course`.
10. BMAD decides whether stories, epics, PRD, design, or architecture must change, and the work returns to the right phase without losing traceability.

## Closing Thought

The easiest way to lose quality with AI is not to give it too much autonomy. It is to give it autonomy without a clear operating model.

Agentic development works well for teams when it turns something fuzzy into something governable: who decides, who executes, which artifact feeds the next one, and how feedback is absorbed without breaking the thread of the project. BMAD is one concrete way to do that.

If I had to reduce it to one sentence, it would be this:

> Agentic development does not speed teams up by removing steps. It speeds teams up by giving context, order, and ownership to steps that should already exist.