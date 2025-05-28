---
title: Classes in components and features
date: 2022/08/02
tag: Front-End, Project Foundation, Styling
description: How to write CSS classes
---

# Classes in components and features

When writing CSS, always use [BEM Naming Conventions](https://getbem.com/). For components, create a classes object in the component's hook and assign classnames imported from the SCSS file. For features, add classnames directly to the feature, so don't use a classes object.

## Components

Create a classes object in the component's hook and assign classnames imported from the SCSS file.

![Classes object in component hook](./classes-in-components-and-features/component-hook.png)

Use imported classnames in markup.

![Classnames in markup](./classes-in-components-and-features/component.png)

## Features

Import classnames directly from the SCSS file and add them to the markup.

![Classnames in feature](./classes-in-components-and-features/feature.png)
