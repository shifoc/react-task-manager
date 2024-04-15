import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

import { setFilter } from '../../../../features/tasks/tasksSlice';
import { TaskFilterInterface } from './TaskFilterInterface';

function TaskFilter({ filter }: TaskFilterInterface) {
	const dispatch = useDispatch();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setFilter(event.target.value));
	};

	return (
		<Box>
			<FormControl component='fieldset'>
				<FormLabel component='legend'>Filter</FormLabel>
				<RadioGroup aria-label='filter' name='filter' value={filter} onChange={handleChange} row>
					<FormControlLabel value='all' control={<Radio />} label='All' />
					<FormControlLabel value='completed' control={<Radio />} label='Completed' />
					<FormControlLabel value='pending' control={<Radio />} label='Pending' />
				</RadioGroup>
			</FormControl>
		</Box>
	);
}

export default TaskFilter;
