import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';

import { fetchTasks, selectTasks } from '../../features/tasks/tasksSlice';
import AddTask from '../../components/Tasks/AddTask/AddTask';
import TaskList from '../../components/Tasks/TaskList/TaskList';
import TaskFilter from '../../components/Tasks/TaskFIlter/TaskFilter';

function Tasks() {
    const dispatch = useDispatch();
    const taskState = useSelector(selectTasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

    return (
        <Container maxWidth='sm'>
            <Paper elevation={3} sx={{ marginTop: 8, padding: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h4' component='h1' gutterBottom align='center'>
                            Task Manager
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <AddTask />
                    </Grid>
                    <Grid item xs={12}>
                        <TaskFilter filter={taskState.filter} />
                    </Grid>
                    <Grid item xs={12}>
                        {taskState.status === 'loading' ? (
                            // Display loading spinner while fetching tasks
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : taskState.error ? (
                            // Display error message if fetching tasks fails
                            <Typography color='error' align='center'>
                                {taskState.error}
                            </Typography>
                        ) : (
                            // Display task list if tasks are fetched successfully
                            <Box>
                                <TaskList tasks={taskState.filteredTasks} filter={taskState.filter} />
                                <Typography align='right'>{taskState.filteredTasks.length} tasks</Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Tasks;
