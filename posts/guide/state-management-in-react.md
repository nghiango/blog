---
title: 'State management in React'
date: 'Feb 12, 2024'
updated: 'Mar 31, 2024'
excerpt: "React now has many ways to manage state, but how to choose the best way for your project?"
tag: 'reactjs'
author: 'Nghia Ngo'
cover_image: '/images/posts/how-you-understand-nodejs/nodejs-cover.jpeg'
---
# State management in React
In react we have many ways to manage state includes native with `useContext` and `useReducer`, and also many
libraries like `redux`, `mobx`, `recoil`, `jotai`, `zustand`, `react-query`, `swr`,...

Each way has its own pros and cons, and it's hard to choose the best way for your project. In this article, I will introduce
the native way and some libraries, but also give you some comparison by my perspective. 

## React Context 
React Context is a way to pass data through the component tree without having to pass props down manually at every level.

Context will force re-render the component when the context value changes, so it's not suitable for the global state that changes frequently.

Combine with `useReducer` to have a simple global state management.

Therefore, I will structure the context like this:
```
src
├── context
│   ├── index.tsx
│   ├── account
│   │   ├── account.context.tsx
│   │   ├── account.reducer.tsx

```

In the `index.tsx` file, I use generic type to define the context providers that splits `value` and `dispatch` into two different contexts.
You may concern why we need to 2 contexts, it's because we want to avoid re-rendering the component that does not need to know about the dispatch.

```tsx
import { createContext, Dispatch, ReactElement, useReducer } from "react";
export interface GenericAction<T> {
    type: string;
    payload: T;
}
export interface GenericType {}

interface IProps<T, K> {
    children: ReactElement | ReactElement[];
    initialValues: T;
    reducer: (state: T, action: K) => T;
    [key: string]: any
}
export const useProvider = <T extends GenericType, K extends GenericAction<T>>({ initialValues, reducer, children }: IProps<T, K>) => {
    const [app, dispatch] = useReducer(reducer, initialValues);
    const ProviderContext = createContext<T>(app);
    const ProviderDispatchContext = createContext<Dispatch<K>>(dispatch);
    return {
        provider: (
          <ProviderContext.Provider value={app}>
              <ProviderDispatchContext.Provider value={dispatch}>
                  {children}
              </ProviderDispatchContext.Provider>
          </ProviderContext.Provider>
        ),
        providerContext: ProviderContext,
        providerDispatchContext: ProviderDispatchContext,
    }
}
```

Now, I will create a concrete context for the account.

In the `account.reducer.ts` file, I define two interfaces `IAccountState` and `IAccountAction`, a enum `AccountActionType`,
 and a `accountReducer` function.

```tsx
import { GenericAction, GenericType } from '@/state-management/context/configuration';

export enum AccountActionType {
  CHANGE_NAME = 'changeName',
  CHANGE_PASSWORD = 'changePassword'
}

export interface IAccountState extends GenericType {
  username: string;
  password: string;
}

export interface IAccountAction extends GenericAction<IAccountState> {
  type: AccountActionType;
  payload: IAccountState;
}

export const accountReducer = (state: IAccountState, action: IAccountAction) => {
  switch (action.type) {
    case AccountActionType.CHANGE_NAME: {
      return { ...state, username: action.payload.username }
    }
    case AccountActionType.CHANGE_PASSWORD: {
      return { ...state, password: action.payload.password }
    }
  }
}
```

In the `account.context.tsx` file, I define the `AccountProvider` that uses the `useProvider` function to create the context provider,
and export two hooks for account context, which are `useAccount` and `useAccountDispatch`.

```tsx
import { useProvider } from '@/state-management/context/configuration';
import { Context, Dispatch, ReactElement, useContext } from 'react';
import {
  accountReducer,
  IAccountAction,
  IAccountState
} from '@/state-management/context/configuration/account/account.reducer';


let accountContext: Context<IAccountState>, accountDispatchContext: Context<Dispatch<IAccountAction>>;
export const useAccountContext = () => {
  return {
    accountState: useContext(accountContext),
    accountDispatch: useContext(accountDispatchContext)
  }
}

const defaultValue: IAccountState = {
  username: '',
  password: ''
}

interface IProps {
  children: ReactElement | ReactElement[];
}
export const AccountProvider = ({ children }: IProps) => {
  const { provider, providerDispatchContext, providerContext } = useProvider<IAccountState, IAccountAction>(
    { initialValues: defaultValue, reducer: accountReducer, children });
  accountContext = providerContext;
  accountDispatchContext = providerDispatchContext;
  return provider;
}
```

## React Redux

## Mobx

## React Query and SWR
