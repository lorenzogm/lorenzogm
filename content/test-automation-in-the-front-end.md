---
title: Testing Automation in the Front-End
date: 2022-02-07
tag: Project Foundation, Front-End, Testing
description: Strategy to write automated tests
image: https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

# Testing Automation in the Front-End

To define the unit testing strategy it's required to analyse 4 different points:

- The types of testing available
- How to write maintainable tests
- Front-end structure of the software
- Tools to write automated tests

Let's analyse them independently.

## Types of testings

<!-- ![Testing Automation in the Front-End](./testing-automation-in-the-front-end.png) -->

A lot more details about the types of testing can be found in this article about [Front-End Test Automation](https://medium.com/valtech-ch/frontend-test-automation-639bc2ad79ef).

Integration tests should provide a good balance between cost, speed and confidence, that's why most of the test should be integration tests.

## Software structure

Following the project structure described in [design system](/ring-ui/design-system), those are the components available in the UI:

- Foundation
- Components
- Features
- Pages
- Layouts

And keeping in mind the conclusions from the previous section, the focus in the project structure would be mainly in the Pages and the Layouts. However, for projects where a CMS is used, it's also important to tests the features, as testing a specific page doesn't mean that all the features has been tested.

As part of the pages, server-side requests should be included to test all the function required bring the data from the API, apply any required modifications and serve it to the page.

## How to write maintainable tests

The main focus when writing maintainable tests is to write the tests as the final user would see the software. This way, what really matters is that the output in the screen:

- What's displayed: This can be achieved asserting the semantics and the content which is rendered in the DOM, without testing the styling.
- How it's should behave: performing actions like click or type as the user would do.

While the business requirements are the same, the tests are still valid. And this approach would allow us to completly modify the implementation without the need to create, update or delete automated tests.

This approach is totally aligned with our conclusion above about the need of implement integration tests.

## Tools

- Jest, the testing frameworks
- Testing Library, a library which help us to tests the behaviour of our software, not the implementation details
- MSW (Mock Service Worker), a library which uses service workers to mock the API requests

## What's an integration test

After the required context described above, now it's time to define what's an integration tests.

While a unit test would test a single isolated function (components), an integration test would test multiple functions (components) together.

[Testing Library](https://testing-library.com/docs/#what-you-should-avoid-with-testing-library) has a very important role to help us to focus on how the pages are interacted by the users and to avoid testing implementation details.

If you are not familiar with Testing Library, please have a look to this[specific example](https://testing-library.com/docs/react-testing-library/example-intro) to write tests.

## Mocking

Mocking is replacing a specific part of the software by a fake code which simulates what the real code is doing.

Integration testing aim to test multiple units together as close as possible to the final behaviour as the user will see in production. Therefore, mocks should be avoided.

API calls (with MSW) or animations (with Jest) are some good examples where mocks should be mocked.

You can also read [this article](https://kentcdodds.com/blog/the-merits-of-mocking) about mocking and why should be avoided.

## Conclusions

To summary, most of the test should be integration tests focused on those components:

- Features
- Pages (which include server-side requests)

Testing these components should provide enough confidence on our automated tests and a very high percentage of test coverage, as we are testing multiple units together.

To add more confidence, unit tests could be added to the "Elements" and the "Modules" keeping the principles defined in this document.
