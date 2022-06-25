---
title: 'Multiple security filter chain in Spring Security'
author: 'Nghia Ngo'
date: 'Jun 23, 2022'
excerpt: 'Spring Security'
tag: 'Spring, Java'
cover_image: '/images/posts/img5.jpg'
---

# Overview
Have you wonder how a Java project can handle multiple kind of authentication, for example: the combination of Basic Authentication and JWT authentication?. If yes, you have the correct place to look for.

# Architecture
![alt text](/images/posts/multi-securityfilterchain.png)

In the picture, we can see that will have multiple security filter chain, but how to implement in Java

# References
- https://docs.spring.io/spring-security/site/docs/current/reference/html5/#servlet-multi-securityfilterchain-figure
- https://spring.io/guides/topicals/spring-security-architecture/