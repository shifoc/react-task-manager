import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../features/tasks/tasksSlice';
import { TasksState } from '../../types/taskTypes';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/material';

function TaskFilter() {
    const { filter } = useSelector((state: TasksState) => state.tasks);

    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilter(event.target.value));
    };

    return (
        <Box>
            <FormControl component="fieldset">
                <FormLabel component="legend">Filter</FormLabel>
                <RadioGroup
                    aria-label="filter"
                    name="filter"
                    value={filter}
                    onChange={handleChange}
                    row
                >
                    <FormControlLabel value="all" control={<Radio />} label="All" />
                    <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                    <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export default TaskFilter;