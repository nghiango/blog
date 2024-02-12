---
title: 'Sub component for big complex component'
date: 'Feb 07, 2024'
excerpt: 'Guide to use React Hook Form with Yup'
tag: 'reactjs'
author: 'Nghia Ngo'
cover_image: '/images/posts/how-you-understand-nodejs/nodejs-cover.jpeg'
---

# Introduction
When we are working in a complex component, which are made up of many different pieces.
We can put all these components into a folder to show the relationship between them. But this way doesn't show the 
relationship when we are using them. Therefore, to boost the relationship and speed up the development.
We can use sub-component to show the relationship between components.

## What is sub-component
Sub-component is a child component that can be call by Parent component.
For example, we have a `Card` component, and we want to use `Header`, `Body`, `Footer` in `Card` component.
We can create `Header`, `Body`, `Footer` as sub-component of `Card` component.
Then we export them inside `Card` component, and access them by `Card.Header`, `Card.Body`, `Card.Footer`.

## Why we need sub-component
### Namespacing
All sub-components are inherently namespaced under the parent component. Although we can use this component without
the parent component, the name of the sub-component will notify the user that it is a part of the parent component.
Therefore, we don't take too much effort to see the relationship between them.
### Single Import
With only parent component imported, we can call all sub-components. It's very convenient when we want to grow the
component in the future, and then we don't need to re-import the sub-components.
### Discoverability
With namespacing, the developers don't need to remember the name of the sub-component. We just only need to know the parent
component, and then we can use dot notation to see all the sub-components.

# How to create sub-component
To create sub-component, we have different ways to do it. We can use class component, function component.
## Using class component

```tsx
interface IHeaderProps {
    children: React.ReactNode;
}
class Header extends React.Component<IHeaderProps> {
   public render() {
        return (
            <div className='card__header'>
                {this.props.children}
            </div>
        );
    }
}
interface ICardProps {
    children: React.ReactNode;
}
class Card extends React.Component<IProps> {
    public static Header = Header;
    public render() {
        return (
            <div className='card'>
                {this.props.children}
            </div>
        );
    }
}
```
You can refer to the example above, we can add `Body` and `Footer` in the same way as `Header`.

After defined public static `Header`, `Body`, and `Footer`, we can use `Card.Header`, `Card.Body`, `Card.Footer` in the other place.

Here is the example of usage:
```tsx
class App extends React.Component {
    render() {
        return (
            <Card>
                <Card.Header>
                    <h1>Header</h1>
                </Card.Header>
                <Card.Body>
                    <p>Body</p>
                </Card.Body>
                <Card.Footer>
                    <p>Footer</p>
                </Card.Footer>
            </Card>
        );
    }
}
```

## Using function component
For the person who are familiar with function component, we can use function component to create sub-component.

```tsx
interface IHeaderProps {
    children: React.ReactNode;
}
const Header: React.FC<IHeaderProps> = (props) => {
    return (
        <div className='card__header'>
            {props.children}
        </div>
    );
}
interface ICardProps {
    children: React.ReactNode;
}
const Card: React.FC<ICardProps> = (props) => {
    return (
        <div className='card'>
            {props.children}
        </div>
    );
}
Card.Header = Header;
```
## Other stuffs related to sub-component
### Component display name
When we are using react dev tool, the sub-components named still show as `Header`, `Body`, `Footer`. It's not show as `Card.Header`, `Card.Body`, `Card.Footer`.
To enhance the connection between them, we can add `displayName` to the sub-component.

```tsx
class Header extends React.Component<IHeaderProps> {
    public static displayName = 'Card.Header';
    public render() {
        return (
            <div className='card__header'>
                {this.props.children}
            </div>
        );
    }
}
```
### Constrain children only for sub-component
To constrain just only sub-components can be used in the parent component. We can use `React.Children` to check
the type of children.
```tsx
const Card: React.FC = ({ children}) => {
    const subComponentKeys = Object.keys(Card);
    const childrenComponents = React.Children.map(children, (child) => {
        if (subComponentKeys.includes(child.type.name)) {
            return child;
        }
        return null;
    });
    return (
        <div className='card'>
            {childrenComponents}
        </div>
    );
}
const Header: React.FC = ({ children}) => {
    return (
        <div className='card__header'>
            {children}
        </div>
    );
}
// Card now will have a key `Header`
Card.Header = Header;
```

### Automatically assign and add display name

We can use this function to assign children to the parent component, and add display name to children component.
```tsx
import React from 'react';

/**
 * Attaches subcomponents to a parent component for use in
 * composed components. Example:
 * 
 * <Parent>
 *    <Parent.Title>abc</Parent.Title>
 *    <Parent.Body prop1="foobar"/>
 * </Parent>
 * 
 *
 * This function also sets displayname on the parent component
 * and all children component, and has the correct return type
 * for typescript.
 *
 * @param displayName topLevelComponent's displayName
 * @param topLevelComponent the parent element of the composed component
 * @param otherComponents an object of child components (keys are the names of the child components)
 * @returns the top level component with otherComponents as static properties
 */
export function attachSubComponents<
  C extends React.ComponentType,
  O extends Record<string, React.ComponentType>
>(displayName: string, topLevelComponent: C, otherComponents: O): C & O {
  topLevelComponent.displayName = displayName;
  Object.values(otherComponents).forEach(
    (component) =>
      (component.displayName = `${displayName}.${component.displayName}`)
  );

  return Object.assign(topLevelComponent, otherComponents);
}
```

Here is the example of usage:

```tsx
import ReactMarkdown from 'react-markdown';
import children = ReactMarkdown.propTypes.children;

const InternalCard: React.FC = ({ children }) => {
    return (
        <div className='card'>
            {children}
        </div>
    );
}
const Header: React.FC = ({ children }) => {
    return (
        <div className='card__header'>
            {children}
        </div>
    );
}
const Body: React.FC = ({ children }) => {
    return (
        <div className='card__body'>
            {children}
        </div>
    );
}
const Footer: React.FC = ({ children }) => {
    return (
        <div className='card__footer'>
            {children}
        </div>
    );
}
const Card = attachSubComponents('Card', InternalCard, {
    Header,
    Body,
    Footer
});
```
## Problems may occur
### Tree shaking
[Tree shaking](https://webpack.js.org/guides/tree-shaking/) is a technique to remove the unused code from the bundle.
With this kind of implementation, the tree shaking may not work as expected. Because the sub-components are included in
the top-level component, and then it imports and exports all the sub-components when we use the top-level component.

Therefore, when we have many unused sub-components, the bundle size doesn't decrease as expected.
Nevertheless, when we meet this problem, it means that we are overuse the sub-components, so we should split them into
another components.


# Reference
- [The best way to build a big react components](https://dev.to/devsatasurion/the-best-way-to-build-big-react-components-5295)
- [Create react subcomponents](https://dev.to/hey_yogini/create-react-subcomponents-in-a-simple-way-5h1f)
- [Using component dot notation with typescript](https://www.skovy.dev/blog/using-component-dot-notation-with-typescript-to-create-a-set-of-components?seed=i30o5s)