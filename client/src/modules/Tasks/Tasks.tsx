import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectTasks } from '../../features/tasks/tasksSlice';
import AddTask from '../../components/Tasks/AddTask';
import TaskList from '../../components/Tasks/TaskList';
import TaskFilter from '../../components/Tasks/TaskFilter';
import { Box, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';

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
                        <TaskFilter />
                    </Grid>
                    <Grid item xs={12}>
                        {taskState.status === 'loading' ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : taskState.error ? (
                            <Typography color='error' align='center'>
                                {taskState.error}
                            </Typography>
                        ) : (
                            <Box>
                                <TaskList tasks={taskState.filteredTasks} filter={taskState.filter}/>
                                <Typography align="right">{taskState.filteredTasks.length} tasks</Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Tasks;
