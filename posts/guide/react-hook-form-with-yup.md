---
title: 'The combination between React Hook Form and Yup'
date: 'Feb 07, 2022'
excerpt: 'Guide to use React Hook Form with Yup'
tag: 'reactjs'
author: 'Nghia Ngo'
cover_image: '/images/posts/how-you-understand-nodejs/nodejs-cover.jpeg'
---
# React Hook Form
React Hook Form is a library to handle form in React. It's a lightweight library and easy to use. It's also support validation and error handling. The library is built with performance in mind, so it's a good choice for a big project.
# Yup
Yup is a library to handle validation. It's a schema-based validation library. It's easy to use and support many types of validation. It's also support custom validation and error message.
# Combination
Wrap a `Input` component with `Controller` and control the value and validation through `control` of `useFormContext` of react-hook-form

```tsx
import { useFormContext } from 'react-hook-form';

interface IProps {
    name: string;
}
const InputForm = (props: IProps) => {
    const { control } = useFormContext();
    
    return (
        <Controller
            name={props.name}
            control={control}
            render={({ field }) => (
                <Input
                    value={field.value}
                    onChange={field.onChange}
                    {...props}
                />
            )}
        />
    );
}
```

To custom label and error message style, we can wrap `InputForm` with `FromWrapper`.

```tsx
import { useFormContext } from 'react-hook-form';

interface IProps {
    name: string;
    label: string;
    children: React.JSXElement;
}

const FormWrapper = (props: IProps) => {
    const { formState } = useFormContext();
    return (
        <>
            <label>{props.label}</label>
            {children}
            <Text type="danger">Error: {formState.errors[props.name]?.message}</Text>
        </>
    );
}
```

In the main page we need to define the Yup schema and pass it to resolver of `useForm` to validate the form

```tsx
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormValues {
    firstName: string;
}

const MainPage = () => {
    const schema = () => {
        object({
            firstName: string().required('First name is required'),
        })
    }

    const methods = useForm<IFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: '',
        }
    });

    const onSubmit = (value: IFormValues) => {
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormWrapper name="firstName" label="First name">
                    <InputForm name="firstName"/>
                </FormWrapper>
                <Button onClick={methods.handleSubmit(onSubmit)}>Submit</Button>
            </form>
        </FormProvider>
    );
}
```
