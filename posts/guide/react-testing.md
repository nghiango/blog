---
title: 'React testing collection'
date: 'Feb 16, 2024'
excerpt: "This article will collect my experience about React testing"
tag: 'reactjs'
author: 'Nghia Ngo'
cover_image: '/images/posts/how-you-understand-nodejs/nodejs-cover.jpeg'
---

# Introduction

Testing is an important part of the development process. It helps us to ensure the quality of the project.
In this article, I will collect my experience about testing in React.

In this article, I will use [Jest](https://jestjs.io/),
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and
[msw](https://mswjs.io/) for testing.

# Testing

## Setup testing utilities

Add a setup for `jest-dom` from `testing-library` to adds custom mathchers for asserting on the DOM nodes, that allows
you to do things like `expect(element).toHaveTextContent(/react/i)`.
Read more on [jest-dom](https://github.com/testing-library/jest-dom).

```tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const renderWithProviders = (ui: ReactElement, { route = '/' } = {}) => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
};

export { renderWithProviders as render, screen };
```

Now, whenever we want to use `render` and `screen` from `@testing-library/react`, we can use our custom `render`
and `screen` instead.

## Simple test

We start with a simple test by rendering a component and check if it's rendered correctly.

```tsx
import { render } from 'setupTests';
import HomeComponent from 'pages/HomeComponent';

describe('Simple test', () => {
    test('render correctly', () => {
        const { getByTestId, getAllByTestId } = render(<HomeComponent/>);
        expect(getByTestId('homeHeader')).toBeTruthy();
        expect(getAllByTestId('input')).toHaveLength(4);
    })
})
```

As you can see that, we use `getByTestId` and `getAllByTestId` to get the element by `data-testid` attribute.
Therefore, in our component, we need to add `data-testid` attribute to the element that we want to test.

For example:

```tsx
const HomeComponent = () => {
    return (
        <div>
            <h1 data-testid="homeHeader">Home</h1>
            <input data-testid="input"/>
            <input data-testid="input"/>
            <input data-testid="input"/>
            <input data-testid="input"/>
        </div>
    )
}
```

## Test with Provider

It is clear that some cases require a context to execute logic inside the component, for example, we have `AdminHeader`
component and `NormalHeader` component, now we have to check the user from the context to render the correct component.

<div class="code-block__title">HomeComponent.tsx</div>

```tsx
import { HomeContext } from 'contexts/homeContext';

const HomeComponent = () => {
    const { state } = useContext(HomeContext);
    return (
        <>
            {state.isAdmin ? <AdminHeader data-testid="adminHeader"/> : <NormalHeader data-testid="normalHeader"/>}
            <Content></Content>
        </>
    )
}
```

Now to test with the `HomeContext`, we will mock the value of it.

<div class="code-block__title">HomeComponent.test.tsx</div>

```tsx
import { render } from 'setupTests';
import HomeComponent from 'pages/HomeComponent';

describe('Test with context Provider', () => {
    test('render admin header when isAdmin is true', () => {
        const mockHomeValueContext = {
            state: {
                isAdmin: true
            },
            dispatch: jest.fn(),
        };
        const { getByTestId } = render(
            <HomeContext.Provider value={mockHomeValueContext}>
                <HomeComponent/>
            </HomeContext.Provider>
        );
        expect(getByTestId('adminHeader')).toBeTruthy();
    })
})
```

## Test with Event

In some cases, we want to test behavior of components after an event is triggered. For example, we click on a button
inside a component, then it will trigger an action of the component. Now, we will check if the action is triggered
correctly.

We can use `fireEvent` from `@testing-library/react` to simulate the event.

```tsx
import { fireEvent } from '@testing-library/react';
import { render } from 'setupTests';

describe('Test component after action click', () => {
    test('menu component', () => {
        const mockClick = jest.fn();
        const mockItems = [
            { id: 'id-1', label: 'label-1', icon: 'icon-1' },
            { id: 'id-2', label: 'label-2', icon: 'icon-2' }
        ];
        const mockMenuProps = {
            items: mockItems,
            selectedItemKey: mockItems[0].id,
            onItemClick: mockClick,
        };
        const { getByText } = render(<Menu {...mockMenuProps} />);
        const menuItem = getByText('label-2');
        fireEvent.click(menuItem);
        expect(mockClick).toHaveBeenCalledTimes(1);
    })
})
```

## Test with API

How about if we want to test the component that fetches data from an API? Actually, we have two ways to do it.

- The first way, using mocking HTTP server(msw, nock) to mock a API server, that means we mock at the network level.
- The second way, using jest mock data to mock calling api, that means we mock at code function level.

In conclusion, I prefer mocking with HTTP server more than using jest mock, because we don't need to handle any logics
compared to some complexity configurations before and after calling API.

### Mocking HTTP server with msw

```tsx
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from 'setupTests';

const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({ nickName: 'Hello world' }));
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Render component correctly after data loaded', () => {
    test('Home component render correctly', async () => {
        render(<HomeComponent/>)

        await userEvent.click(screen.getByText('Load Nickname'));
        expect(screen.getByRole('span')).toHaveTextContent('Hello world')
    })
})
```

By using mws, we can setup a server mock for all APIs in a file, and we can use it easily.

<div class="code-block__title">responseData.js</div>

```ts
export const greetingResponse = {
    nickName: "Hello World",
};
export const greetingErr = {
    code: "server.interupts",
    message: "Sorry, the server interupts, please try later!",
};
```

<div class="code-block__title">mockServerSetup.js</div>

```ts
import { setupServer } from "msw/node";
import { rest } from "msw";
import { greetingErr, greetingResponse } from "./responseData";

const ApiPaths = {
    GREETING: "/greeting",
};

const HttpStatus = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
};

const HttpMethod = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
};

const paths = {};

const server = setupServer();

const getKey = (path, method, status, code) => {
    return `${path}.${method}.${status}.${code || ""}`;
};

const use = (path, method, status, code) => {
    switch (method) {
        case HttpMethod.GET: {
            server.use(rest.get(path, paths[getKey(path, method, status, code)]));
            break;
        }
        default:
            console.log("No default");
    }
};

const addToPaths = (path, method, status, response, code) => {
    const value = (req, res, ctx) => {
        return res(ctx.status(status), ctx.json(response));
    };
    paths[getKey(path, method, status, code)] = value;
    use(path, method, status);
};

const initDefaultPaths = () => {
    addToPaths(
        ApiPaths.GREETING,
        HttpMethod.GET,
        HttpStatus.SUCCESS,
        greetingResponse
    );
    addToPaths(
        ApiPaths.GREETING,
        HttpMethod.GET,
        HttpStatus.BAD_REQUEST,
        greetingErr
    );
};

export {
    ApiPaths,
    HttpStatus,
    HttpMethod,
    server,
    initDefaultPaths,
    addToPaths,
    use,
};
```

Now we can easy to use it in test like example below

<div class="code-block__title">MockApiComponent.js</div>

```tsx
/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-disabled-tests */
import React from "react";
import { MockApiComponent } from "./MockApiComponent";
import { render, screen, waitFor } from "@testing-library/react";
import { greetingResponse } from "../mockServerSetup/responseData";
import {
    server,
    initDefaultPaths,
    use,
    ApiPaths,
    HttpMethod,
    HttpStatus,
} from "../mockServerSetup";

initDefaultPaths();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe("MockAPIWithMsw", () => {

    test("render with api calling", async () => {
        use(ApiPaths.GREETING, HttpMethod.GET, HttpStatus.SUCCESS);
        render(<MockApiComponent/>);

        // Only one assertion within waitFor https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
        await waitFor(async () => {
            expect(screen.getByTestId("nickName")).toHaveTextContent(
                greetingResponse.nickName
            );
        });
    });
});

```

### Mocking with jest mock

In this example, we mock the get method of axios to return a resolved value. This way just works when a component
calls an API by using axios.

```tsx
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Render component correctly after data loaded', () => {
    test('Home component render correctly', async () => {
        mockedAxios.get.mockResolveValue({ nickName: 'hello World' });

        render(<HomeComponent/>)

        await userEvent.click(screen.getByText('Load Nickname'));

        expect(mockedAxios.get).toHaveBeenCalled();
        expect(screen.getByRole('span')).toHaveTextContent('Hello world');
    })
})
```

So, how we can test the component that fetches data from multiple APIs, we can use `mockImplementation` of jest to do
it.

```tsx
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Render component correctly after data loaded', () => {
    test('Home component render correctly', async () => {
        const regexTemplate = {
            'greeting': '/greeting/',
            'greetingWithId': '/greeting\/$/'
        }
        mockedAxios.get.mockImplementation((url) => {
            switch (true) {
                case regexTemplate['greeting'].test(url):
                    return Promise.resolve({ data: { nickName: 'Hello world' } })
                case regexTemplate['greetingWithId'].test(url):
                    return Promise.resolve({ data: { nickName: 'Hello world with id' } })
                default:
                    return Promise.reject(new Error('not found'))
            }
        })

        render(<HomeComponent/>)

        await userEvent.click(screen.getByText('Load Nickname'));

        expect(mockedAxios.get).toHaveBeenCalled();
        expect(screen.getByRole('span')).toHaveTextContent('Hello world');
    })
})
```

## Test with React Router Dom

Now we will combine both API and `react-router-dom`, the case is a component fetches user data, and then checking if
this
user is admin or not, if he is an admin, the user should be navigated to admin page.

```tsx
import { MockRouteComponent } from "./MockRouteComponent";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockNavigate = jest.fn();
const mockShouldNavigateToHome = jest.fn();

jest.mock("react-router-dom", () => {
    const actualReactRouterDom = jest.requireActual("react-router-dom");
    return {
        ...actualReactRouterDom,
        useNavigate: () => mockNavigate,
        useLocation: () => {
            return {
                state: {
                    shouldNavigateToHome: mockShouldNavigateToHome(),
                },
            };
        },
    };
});

describe("MockRouteComponent", () => {
    test("render correctly", async () => {
        mockedAxios.get.mockResolveValue({ nickName: 'hello World', isAdmin: false });
        render(<MockRouteComponent/>);
        expect(mockNavigate).toBeCalledWith("/");
    });

    test("render with api calling and then navigate", async () => {
        // IMPORTANT: Must reset the mock to avoid stored state
        mockNavigate.mockReset();
        mockedAxios.get.mockResolveValue({ nickName: 'hello World', isAdmin: true });
        render(<MockRouteComponent/>);

        // Only one assertion within waitFor https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
        await waitFor(async () => {
            expect(screen.getByTestId("nickName")).toHaveTextContent('hello World');
        });
        await waitFor(async () => {
            expect(mockNavigate).toBeCalledWith("/admin");
        });
    });
});
```

## Test with i18n

How about if we combine with the i18n, i18n needs to have configuration about translation file, but actually
we can mock i18n and add just few keys related to the testing component.

<div class="code-block__title">i18n.test.js</div>

```ts
jest.mock('i18n', () => {
    return {
        t: (key: string) => {
            return 'mocked i18n';
        },
        i18n: {
            language: 'en',
        },
    };
});
```

## Test in complex components

When we test, we will have complex component, but we just only care about the logic of this page and ignore other child
components, we can mock the others.

<div class="code-block__title">Homepage.tsx</div>

```tsx
const HomePage = () => {
    return (
        <HomePageContainer>
            <HeadSection/>
            <BodySection/>
            <FooterSection/>
        </HomePageContainer>
    );
}
```

<div class="code-block__title">Homepage.test.tsx</div>

```tsx
jest.mock('./components', () => {
    const HeadSection = (props) => <div data-testid="mock-HeadSection" {...props} />;
    const BodySection = (props) => <div data-testid="mock-BodySection" {...props} />;
    const FooterSection = (props) => <div data-testid="mock-FooterSection" {...props} />;
    return {
        HeadSection, BodySection, FooterSection,
    };
});

describe('HomePage', () => {
    test('render correctly', () => {
        const { getByTestId } = render(<HomePage/>);
        expect(getByTestId('mock-HeadSection')).toBeTruthy();
        expect(getByTestId('mock-BodySection')).toBeTruthy();
        expect(getByTestId('mock-FooterSection')).toBeTruthy();
    })
})
```

## Test function inside component

<div class="code-block__title">Homepage.tsx</div>

```tsx
const HomePage = () => {
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1);
    }

    return (
        <div>
          <h1>Count: {count}</h1>
          <Children increase={increase}/>
        </div>
    );
}
```

<div class="code-block__title">Homepage.test.tsx</div>

```tsx
jest.mock('./components', () => {
  const Children = (props) => <div data-testid="mock-Chirem" onClick={props.increase} {...props} />;
  return {
    Children
  };
});

describe('HomePage', () => {
  test('render correctly', () => {
    const { getByTestId } = render(<HomePage/>);
  })
})
```


## How to remove data-testid for production

We can use `babel-plugin-react-remove-properties` to remove `data-testid` attribute in production.

```json
{
  "plugins": [
    [
      "babel-plugin-react-remove-properties",
      {
        "properties": [
          "data-testid"
        ]
      }
    ]
  ]
}
```

## Note

When we unsure what we imagine what will render in test, we can log it to console log by
the command below

```tsx
const component = render(<MyComponent/>);
console.log(component.debug());
```