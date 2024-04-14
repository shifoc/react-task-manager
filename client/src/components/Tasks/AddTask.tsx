import React from 'react';
import { TextField, ListItem, IconButton, InputAdornment, Box } from '@mui/material';
import { CreateOutlined } from '@mui/icons-material/';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { addTask } from '../../features/tasks/tasksSlice';

const AddTask = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values: { title: string; }) => {
        dispatch(addTask({ title: values.title, completed: false }));
    };

    return (
        <Box>
            <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit, form }) => (
                    <form onSubmit={(event) => {
                        handleSubmit(event); // Handle the submit with Form's handler
                        form.reset(); // reset the form state
                    }} style={{ width: '100%' }}>
                        <Field name="title" render={({ input }) => (
                        <TextField {...input} label="Task Title" variant="outlined" fullWidth required InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="create todo"
                                        edge="end"
                                        type="submit"
                                    >
                                        <CreateOutlined />
                                    </IconButton>
                                </InputAdornment>
                        }} />
                    )} />
                    </form>
                )}
            />
        </Box>
    );
};

export default AddTask;
