---
title: Branching Strategy
date: 2022-02-05
description: 'Details for a git workflow: Branching, commiting, Pull Requests and Versioning'
tag: Project Foundation, Git
---

## Branching

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) should be used to name branches.

    {type}/{ticket-number}-{ticket-title}


    feat/123456-title-of-the-ticket
    fix/123456-title-of-the-ticket

## Commits

In addition of the previous quality checks, there is one more check which would prevent you to commit your code: the commit message.

The commit message is analysed by `commitlint` and it should follow a specific format defined by [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

To get some help in this process, this repository includes `commitizen`. Just open your terminal (terminal FTW!) and run:

    npm run cz

## Pull requests

The pull requests will be merged into the main branch via `squash and merge`, providing a linear and clean history of commits for the repository. This is as well connected to the automatic [versioning](#Versioning).

> **Therefore, it's very important to have the right title in the Pull Request**

The title must follow the Conventional Commits described in the [commits section](#Commits) section, with two additions:

- The ticket number before the title
- The Pull Request number

So, the final format should be like this one:

    type(scope): [LGM-123456] title of the ticket (#XY)

Which is compose with the following elements:

- Type: "feat", "fix" are the most common, the full list is in the [commits section](#Commits) section.
- Scope: described in the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Ticket number: [LGM-XXXXXX]
- Title of the ticket
- (#YY) Reference to the PR in GitHub (It will be added automatically before finishing the squash merge).

To get some help in this process, this repository includes a [Pull Request Linter](../../.github/workflows/pull-request-linter.yml). This GitHub workflow adds an additional check to verify the Pull Request title.

## Versioning

Following [Semantic Versioning](https://semver.org/)

Given a version number MAJOR.MINOR.PATCH, increment the:

MAJOR version when you make incompatible API changes,
MINOR version when you add functionality in a backwards compatible manner, and
PATCH version when you make backwards compatible hox fixes.

This repository uses [Semantic Release](https://github.com/semantic-release/semantic-release) to automatically release versions following the rules defined above and the following [configuration](./../.releaserc).
