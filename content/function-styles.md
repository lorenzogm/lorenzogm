---
title: Function Styles
date: 2025-01-10
tag: Front-End, Project Foundation
description: A function can be defined with the keyword "function" (function declaration or regular functions) or as a variable (function expression or arrow functions)
image: https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
---

# Function Styles

A function can be defined with the keyword "function" (function declaration or regular functions) or as a variable (function expression or arrow functions).

I prefer to use arrow function for callbacks, every other case I use regular functions.

I prefer to write function declaration because:

1. They are hoisted, so I can write the main function at the top and the children functions below.
2. They are more readable, starting with the word function tells you earlier what it is.
3. Arrow functions could be shorter, which is very nice because you write less code. For simple cases is fine, but, it could be the starting point of a function that becomes more complex and harder to read.
4. It's faster if you need to debug with "console.log", as they don't allow an implicit return.
5. I don't need a new line for default exports.
