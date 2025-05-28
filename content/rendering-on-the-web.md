---
title: Rendering on the web
date: 2020/10/22
tag: Web Foundation, Rendering
description: Comparison between rendering on the client, server and static-site generation
---

# Rendering on the Web

One on the most important decisions that will affect the architecture is how we render the content. This decision will affect several outstanding metrics to take into consideration, some of them are:

- **Speed** and **User Experience**
- **Data Stale**
- **SEO**
- **Infrastructure costs**
- **Complexity**
- **Security**

The purpose of this article is to analyse the existing types of rendering for the Web to help us to make the decision.

![](https://miro.medium.com/max/1400/0*yrpG02dcyI6HUWVp)Source: [Articles by Victoria](https://lo-victoria.com/client-side-rendering-vs-server-side-rendering-vs-static-site-generation)

# Terminology

The main three types of rendering on the web a those:

- **Server-Side Rendering (SSR)**: the page is rendered on runtime in the server in response to navigation. All logic, templating and data fetching are handled in the server.
- **Static Site Generation (SSG)**: static pages are generated on build time. All logic, templating and data fetching are handle in the server on build time.
- **Client-Side Rendering (CSR)**: the page is rendered on runtime in the the browser. All logic, templating, routing and data fetching are handled in the client.

# **Speed and User Experience**

To measure the performance we are going to pay attention to the loading process of a website:

![](https://miro.medium.com/max/1400/0*bd-nvxMwziZjeUIw)Source: [datacadamia](https://datacadamia.com/_detail/web/browser/page_loading_key_moment.png?id=web%3Abrowser%3Apage_load)

And we are going to focus on the following metrics:

- **TTFB:** [Time to First Byte](https://en.wikipedia.org/wiki/Time_to_first_byte) — time between clicking a link and the first bit of content coming in.
- **FCP:** [First Contentful Paint](https://web.dev/fcp/) — when the requested content becomes visible.
- **TTI:** [Time To Interactive](https://web.dev/tti/) — when the page becomes interactive for the user.

With this information let’s check the summary again:

![](https://miro.medium.com/max/926/1*kjqxrMqihBRn7UiSsNWTZA.png)

- **SSR**: Because the page is rendered in the server, TTFB is slow, but there is no delay between TTI and FCP. The **speed** **is** **fast** (it depends on the resources of the server) and the **UX is great** because the content is ready to interact (TTI = FCP). However, SSR cannot be used with a CDN.
- **SSG**: As the browser is rendering static pages, TTFB is fast and the delay between TTI and FCP is minimal. Therefore, the **speed is fast** and the **UX is great**. Compared to SSR, SSG has the advantage that it can be used with a CDN.
- **CSR**: TTFB is fast but the loading time until the page is ready to interact (TTI) could be a lot, because all logic, templating and data fetching are handled in the browser. CSR can be used with a CDN to boost the performance.

# Data stale

The data is stale when the information displayed is not updated. This is an outstanding topic when deciding our architecture. Let’s check every case:

![](https://miro.medium.com/max/928/1*OXFIU159uTF29fAu0YC9sA.png)

- **SSR**: The page is rendered on the server on runtime. Therefore the data would be fetched with every request and it won’t be stale.
- **SSG**: The page is rendered on the server on build time. In this case, the data could be stale. This approach could be very useful for websites where the data doesn’t change very often (like blogs), but it won’t work if the data needs to change constantly.
- **CSR**: Similar case as the SSR. The page is rendered on the browser on runtime. So, the data would be fetched with every request.

# **SEO**

SEO could be the key point to decide which is the right architecture for your project.

![](https://miro.medium.com/max/932/1*M8IelDjF4fNeR_pNhOBpKw.png)

- **SSR**: Fully-renderer pages are sent to the bots, so there is no risk of partial indexing. In addition, SSR can speed up the page load times, which can help to improve the rank in the search engine.
- **SSG**: Fully-renderer pages are sent to the bots, so there is no risk of partial indexing. In addition, SSG can speed up the page load times (even more than SSR), which can help to improve the rank in the search engine.
- **CSR**: The content may not be available when the search engine bot is crawling the page. So there is a risk of “partial indexing”.

# **Infrastructure costs**

The three solutions required infrastructure to handle the build and the deployment. In that case, the costs won’t change too much from one approach to the other. What we are going to evaluate is how expensive is to maintain the servers to have our website running?

![](https://miro.medium.com/max/928/1*fL0kpWrfX8mRoMx8GVqZ4w.png)

- **SSR**: This is the most expensive solution. As the page is rendered on the server, all the workload is done in the server on runtime. Therefore, we need to invest money on those servers which are constantly running.
- **SSG**: The static pages are handled by the browser. For very large website, the build time would scale and this could affect the costs of the servers to build the application.
- **CSR**: The browser is taking the workload, so there is no extra cost to maintain the website running.

# Complexity

Infrastructure setup, development of the website and maintainability of the projects are the areas to keep in mind about this topic.

![](https://miro.medium.com/max/924/1*c1Peg5sKtxgMVA1U6u6m_w.png)

It used to be that creating a website with SSR or SSG was very complex compared to CSR. However, nowadays there are many options to easily write web applications with SSR or SSG easily. Therefore, the complexity shouldn’t be a topic right now to decide which rendering type to choose.

# Security

At this point, probably the decision is made and the security (or the extra security) shouldn’t be a key topic to decide which rendering type to choose.

![](https://miro.medium.com/max/924/1*6deQbqEmOxydZW6ZPgGCgg.png)

It’s just worth to mention that with SSG, as the page is static, it’s not connected to any server. So this is an extra layer of security with the following benefits:

- Some of the most common vulnerabilities (injections and XSS) won’t affect a SSG. Attackers can’t hack you database since the website is not connected to it.
- The output is pure HTML, CSS and other static files, it’s very unlikely that static content contains security vulnerabilities.

# Conclusions

Let’s have a look to the summary of every topic discussed before to have a better overview:

![](https://miro.medium.com/max/924/1*LuOjAZpvzUBCLQQB1aNU-Q.png)

And let’s match the most common projects with the most suitable technology to use. There are two main types of projects, based on the content:

- **Public content**: When the project is a content site, probably SEO is very important. Therefore, CSR is not an option. SSG should be the way to go because it’s less expensive, more performant and it adds extra security. But it depends on how often change the data. If doesn’t change too frequently, SSG it’s the best option. However, if they data change too frequently or with every render, SSR or an hybrid solution (hydration) with SSG + SSR would be required.

> Examples: Corporate Websites, Blogs, Ecommerce Shops or any other content site would some examples for this use case.

- **Private content**: When the content is hidden behind a login, then the clear option is CSR. Because SEO is not required, the data is related to the user and it changes very often. SSR could improve the performance of the website, however the infrastructure costs and the complexity could be a huge drawbacks compared with the benefits.

> Examples: Banking Apps, Social Apps or any other application behind a login.

Alright! Now we should have enough information to decide how we should build our next project.

# Bonus track

I have written a little website with React and Next.js to demonstrate some of the ideas from this article:

- Demo: [https://nextjs-rendering-types-demo.vercel.app/](https://nextjs-rendering-types-demo.vercel.app/)
- Source code: [https://github.com/lorenzogm/nextjs-rendering-types-demo](https://github.com/lorenzogm/nextjs-rendering-types-demo)

Have fun!
