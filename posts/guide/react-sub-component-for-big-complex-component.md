---
title: 'Sub component for big complex component'
date: 'Feb 07, 2022'
excerpt: 'Guide to use React Hook Form with Yup'
tag: 'reactjs'
author: 'Nghia Ngo'
cover_image: '/images/posts/how-you-understand-nodejs/nodejs-cover.jpeg'
---

# Introduction
When we are working in a complex component, that requires a combination of many components.
We can put all these components into a folder to show the relationship between them. But this way doesn't show the 
relationship when we are using them in the other place. Therefore, to boost the relationship and speed up the development.
We can use sub-component to show the relationship between components.

## What is sub-component
Sub-component is a child component that can be call by Parent component.
For example, we have a `Card` component, and we want to use `Header`, `Body`, `Footer` in `Card` component.
We can create `Header`, `Body`, `Footer` as sub-component of `Card` component.
Then we export them inside `Card` component, and access them by `Card.Header`, `Card.Body`, `Card.Footer`.

# How to create sub-component


# Reference
https://dev.to/devsatasurion/the-best-way-to-build-big-react-components-5295
https://www.skovy.dev/blog/using-component-dot-notation-with-typescript-to-create-a-set-of-components?seed=i30o5s
https://dev.to/hey_yogini/create-react-subcomponents-in-a-simple-way-5h1f