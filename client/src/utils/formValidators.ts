const validateEmail = (value: string) => {
    if (!value) {
        return 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return 'Invalid email address';
    }
    return undefined;
};

const required = (value: string) => (value ? undefined : 'Required');

export { validateEmail, required };