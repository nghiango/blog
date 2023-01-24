---
title: "Usual problems in TS"
author: "Nghia Ngo"
date: "2023-01-24"
excerpt: "Some problems in developer life"
tag: "TS"
cover_image: "/images/posts/img5.jpg"
---
Problems in develop

- How to get keys of an interface?

  - keyof interface

- How to cast string to an element of interface?

  ```js
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