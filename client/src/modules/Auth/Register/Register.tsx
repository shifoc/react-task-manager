import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, CssBaseline, Typography, TextField, Link } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { registerUser } from '../../../features/auth/authSlice';
import { FormContainer, Root, StyledAvatar, StyledPaper, SubmitButton } from '../../../components/Auth/AuthStyles';
import { validateEmail, required } from '../../../utils/formValidators';

interface FormErrors {
	password?: string;
	confirmPassword?: string;
}

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const onSubmit = async (values: { email: string; password: string; confirmPassword: string }) => {
		try {
			await dispatch(
				registerUser({
					email: values.email,
					password: values.password
				})
			).unwrap(); // Ensure the promise returned by dispatch is fulfilled
			navigate('/tasks'); // Redirect on success
		} catch (error: any) {
			console.error('Registration failed:', error);
			enqueueSnackbar('Registration failed: ' + (error.message || 'Unknown error'), { variant: 'error' });
		}
	};

	return (
		<Root container>
			<CssBaseline />
			<Grid item xs={12} sm={8} md={6} component={StyledPaper} elevation={1} square>
				<Grid container>
					<Grid item xs={12} sx={{ margin: 'auto' }}>
						<StyledAvatar>
							<LockOutlined />
						</StyledAvatar>
						<Typography component='h1' variant='h5' align='center'>
							Sign Up
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Form
							onSubmit={onSubmit}
							validate={(values) => {
								const errors: FormErrors = {};
								if (!values.password) {
									errors.password = 'Required';
								}
								if (!values.confirmPassword) {
									errors.confirmPassword = 'Required';
								}
								// Validate password length
								if (values.password && values.password.length < 8) {
									errors.password = 'Password must be at least 8 characters long';
								}
								if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
									errors.confirmPassword = 'Passwords do not match';
								}
								return errors;
							}}
							render={({ handleSubmit, submitting, pristine, hasValidationErrors }) => (
								<FormContainer onSubmit={handleSubmit} noValidate>
									<Field name='email' validate={validateEmail}>
										{({ input, meta }) => (
											<TextField
												{...input}
												variant='outlined'
												margin='normal'
												required
												fullWidth
												id='email'
												label='Email'
												autoFocus
												error={meta.error && meta.touched}
												helperText={meta.error && meta.touched ? meta.error : ' '}
											/>
										)}
									</Field>
									<Field name='password' validate={required}>
										{({ input, meta }) => (
											<TextField
												{...input}
												variant='outlined'
												margin='normal'
												required
												fullWidth
												id='password'
												label='Password'
												type='password'
												autoComplete='new-password'
												error={meta.error && meta.touched}
												helperText={meta.error && meta.touched ? meta.error : ' '}
											/>
										)}
									</Field>
                                    <Field name='confirmPassword' validate={required}>
										{({ input, meta }) => (
											<TextField
												{...input}
												variant='outlined'
												margin='normal'
												required
												fullWidth
												id='confirmPassword'
												label='Confirm Password'
												type='password'
												error={meta.error && meta.touched}
												helperText={meta.error && meta.touched ? meta.error : ' '}
											/>
										)}
									</Field>
									<SubmitButton
										type='submit'
										fullWidth
										variant='contained'
										color='primary'
										disabled={submitting || pristine || hasValidationErrors}
									>
										Sign Up
									</SubmitButton>
									<Grid container>
										<Grid item>
											<Link href='/login' variant='body2'>
												Already have an account? Sign in
											</Link>
										</Grid>
									</Grid>
								</FormContainer>
							)}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Root>
	);
};

export default Register;
