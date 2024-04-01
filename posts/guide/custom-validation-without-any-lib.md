---
title: 'Custom validation without any lib'
date: 'Feb 12, 2024'
excerpt: "In some project we don't want to use any libs for validation, but we still want to have a good validation system"
tag: 'reactjs'
author: 'Nghia Ngo'
cover_image: '/images/posts/how-you-understand-nodejs/nodejs-cover.jpeg'
---
# Why we need a custom validation
Instead of using a lib for validation, we can achieve validation by our-self. It's not only help us to understand more
about the validation system, but also help us to have a suitable validation system for our project.
## Using hook
```tsx
enum InputType {
    Text = 'text',
    Number = 'number',
    Email = 'email',
    Password = 'password',
    Date = 'date',
}

interface IInputFieldParams {
    value: T
    onChange: (value: T) => void
    validate: (value: T) => string
    placeholder?: string
    label?: string
    type?: string
    required?: boolean
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
}

const useInput = <T, >(params: IInputFieldParams<T>) => {
    const [value, setValue] = useState<T>(params.value)
    const [hasError, setHasError] = useState<boolean>(false)
    const [helperText, setHelperText] = useState<string>(params.helperText)
    const validationRules = useMemo(() => {
        const rules = params.validationRules ?? [];
        if (params.required && !params.disabled) {
            return isRequiredValidationRule.concat(rules);
        } else {
            return rules;
        }
    }, [params.required, params.validationRules, params.disabled]);

    const validateRules = (currentValue?: any) => {
        const currValue = currentValue || value;
        for (const rule of validationRules) {
            if (!rule.validate(currValue)) {
                setHelperText(t(rule.message));
                setHasError(true);
                return false;
            }
        }
        setHelperText(params.helperText);
        setHasError(false);
        return true;
    };

    const getInputField = () => {
        switch (params.type) {
            case InputFieldType.Text:
            case InputFieldType.Number:
                return (
                    <Input
                        className={params.className}
                        key={params.key}
                        label={params.label}
                        placeholder={params.placeholder}
                        popoverInfo={params.popoverInfo}
                        helperText={helperText}
                        leadingText={params.leadingText}
                        leadingIcon={params.leadingIcon}
                        value={value}
                        trailingText={params.trailingText}
                        trailingIcon={params.trailingIcon}
                        mandatory={params.required}
                        disabled={params.disabled}
                        errorText={helperText}
                        state={getState()}
                        onBlur={blurHandler}
                        type={params.type}
                        onInputChange={valueChangeHandler(params.type)}
                        id={params.id}
                    />
                );
            default:
                return null;
        }
    };
    return {
        value,
        setValue,
        hasError,
        setHasError,
        inputField: getInputField(),
        helperText,
        setHelperText,
        validateRules,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value as any);
            validateRules(e.target.value);
        },
        onBlur: () => {
            validateRules();
        },
    };
}
```