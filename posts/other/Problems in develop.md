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