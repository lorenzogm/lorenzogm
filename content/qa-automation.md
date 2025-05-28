---
title: QA Automation
date: 2024-03-02
tag: Project Foundation
---

# QA Automation

The main goals of the quality assurance are:

- Detect defects in the software
- Detect them early

To detect the defects in the software we use the following set of tools, to detect them early we introduce them in the development process.

| Area                  | Tool       | Type    | When         |
| --------------------- | ---------- | ------- | ------------ |
| Security              | SonarQube  | Static  | Pull Request |
| End-to-end Testing    | Cypress    | Dynamic | Pull Request |
| Accessibility         | Axe        | Dynamic | Pull Request |
| Visual Regression     | Percy      | Dynamic | Pull Request |
| Front-End Performance | Debug Bear | Dynamic | Nightly      |
| Back-End Performance  | Blazemeter | Dynamic | Nightly      |

## Types

- Static: the tool runs against the code and reports the results.
- Dynamic: a running server is required to run the tool.

## When

- Pull Request: A job is included in the CI, the job is triggered when a PR is created or updated and it must pass.
- Nightly: The tool is configured to run on a regular basis.
