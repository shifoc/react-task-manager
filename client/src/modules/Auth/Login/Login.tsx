import React from "react";
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, TextField, Link } from "@mui/material";
import { LockOutlined } from '@mui/icons-material';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { loginUser } from '../../../features/auth/authSlice';
import { FormContainer, Root, StyledAvatar, StyledPaper, SubmitButton } from "../../../components/Auth/AuthStyles";
import { validateEmail, required } from "../../../utils/formValidators";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (values: { email: string; password: string }) => {
        try {
            await dispatch(loginUser({
                email: values.email,
                password: values.password,
            })).unwrap(); // Ensure the promise returned by dispatch is fulfilled
            navigate('/tasks'); // Redirect on success
        } catch (error: any) {
            enqueueSnackbar('Login failed: ' + (error.message || 'Unknown error'), { variant: 'error' });
        }
    };

    return (
        <Root container>
            <Grid item xs={12} sm={8} md={6} component={StyledPaper} elevation={1} square>
                <Grid container>
                    <Grid item xs={12} sx={{ margin: 'auto' }}>
                        <StyledAvatar>
                            <LockOutlined />
                        </StyledAvatar>
                        <Typography component="h1" variant="h5" align="center">
                            Sign in
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Form
                            onSubmit={onSubmit}
                            render={({ handleSubmit, submitting, pristine, hasValidationErrors }) => (
                                <FormContainer onSubmit={handleSubmit} noValidate>
                                    <Field name="email" validate={validateEmail}>
                                        {({ input, meta }) => (
                                            <TextField
                                                {...input}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                error={meta.error && meta.touched}
                                                helperText={meta.error && meta.touched ? meta.error : ' '}
                                            />
                                        )}
                                    </Field>
                                    <Field name="password" validate={required}>
                                        {({ input, meta }) => (
                                            <TextField
                                                {...input}
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="password"
                                                label="Password"
                                                type="password"
                                                autoComplete="current-password"
                                                error={meta.error && meta.touched}
                                                helperText={meta.error && meta.touched ? meta.error : ' '}
                                            />
                                        )}
                                    </Field>
                                    <SubmitButton
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={submitting || pristine || hasValidationErrors}
                                    >
                                        Sign In
                                    </SubmitButton>
                                    <Grid container>
                                        <Grid item>
                                            <Link href="/register" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </FormContainer>
                            )}
                        />
                    </Grid>
                </Grid>
            </Grid >
        </Root >
    );
};

export default Login;