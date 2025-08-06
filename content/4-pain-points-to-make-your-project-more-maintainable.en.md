---
title: 4 Pain-points to make your project more maintainable
date: 2020-10-07
tag: Project Foundation
description: Must have dev tools
image: https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

![](https://miro.medium.com/max/1400/1*WzQp_E2TAKEDw9jLaVtA-A.jpeg)

# **How we made our project more maintainable**

Maybe this situation sounds familiar: you are a software developer and you join a project. It’s a good match because you know the technologies and the project itself is interesting for you. So you onboard quickly and get comfortable contributing to the project easily..

However, the project has been running for a while and the codebase is already pretty big. You still don’t have an overview about the existing pages and with every new ticket, you spend more time finding the right page, and the right component, than the time you spend on fixing the bug, because we all start fixing bugs when we join a project.

Ok, now we know where is the page and we find the component with the bug. But the bug is not there, is coming from the mother component. No problem, let’s check it… and the mother component is somewhere else in the huge tree of folders. Then you find out that the bug could be related with a function defined in the “utils” folder… by now, you’ve already lost the context of the very first component. But some time later, you finally fix the bug. The ticket is done and you are happy.

Time to pick the next ticket, it’s something similar to the previous one, so it should be easy. You take your time again to find where is the code that you are looking for and when you arrive… similar functionality done in a completely different way. Yes, it’s normal: several developers have been working on the project, so different ways to achieve a similar result. Mmm, but now the folders and the files have also a different naming convention, and a different folder structure. Anyway, you still find the bug and you fix it. The ticket is done and you are happy, again.

At some point you start getting more complex tickets and the time spent to understand what’s happening and how can you fix it keeps increasing with the complexity. You’re beginning to realise the main pain-points of your codebase.

# **4 Pain-points in our project**

**1. Lack of folders structure**

Actually, there is some structure, because someone created the “components” and the “pages” folder, but inside of those folders… oh dear, that’s the jungle.

- Some pages are in the components folder.
- Many components, not very reusable and just used once are in the “components” folder.
- Something similar is happening with the chaos of the “utils” folder.

**2\. Lack of code conventions**

Somehow, there was no time to setup some basic rules for the technologies used in the project. Therefore, some “not too good” practices have been used in the whole codebase.

**3\. Lack of automated testing**

Testing is good, we all know that testing is very good and it’s very helpful, but who has time to write test? Not me, and not the other developers who previously worked in the project, apparently.

**4\. Lack of documentation**

If they didn’t have time to fight the previous points. Documentation about the project is not expected at all. Or at least not related with the main pain-points on the table.

# **4 steps to make our project more maintainable**

We could see how these pain-points were slowing us down and frustrating the team, so we started taking 4 steps to fix them and make our project more maintainable:

1.  Define a folder structure.
2.  Define linting rules and code conventions.
3.  Write automated tests.
4.  Write documentation about the previous steps.

Every step will come with a detailed post providing more information about our experience.
