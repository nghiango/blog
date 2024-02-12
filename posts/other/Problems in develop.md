---
title: "Usual problems in development"
author: "Nghia Ngo"
date: 'Feb 07, 2024'
excerpt: "The problem that we usually meet in development"
tag: "nodejs"
cover_image: "/images/posts/img5.jpg"
---
Problems in develop

- How to get keys of an interface?

  - keyof interface

- How to cast string to an element of interface?

  ```ts
  interface Translation {
    en: string;
    de: string;
  }
  const value: string = 'en';
  const translation = {en: 'test', 'de': 'DE_test'}
  type ElementKeys = keyof Translation;
  const element = value as ElementKeys;
  translation[element]
  ```

  - How about cast fail? For example, value is 'fr'