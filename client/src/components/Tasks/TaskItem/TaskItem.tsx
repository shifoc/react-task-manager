import React, { useState } from 'react';
import { Checkbox, IconButton, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';

import { Task } from '../../../types/taskTypes';
import { deleteTask, updateTask } from '../../../features/tasks/tasksSlice';
import ConfirmDialog from '../../ConfirmationDialog/ConfirmationDialog';
import { StyledListItem } from './TaskItemStyles';

const TaskItem = ({ task }: { task: Task }) => {
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);
	const [editedTitle, setEditedTitle] = useState(task.title);
	const [openDialog, setOpenDialog] = useState(false);

	const handleEdit = () => {
		setEditMode(true);
	};

	const handleSave = () => {
		if (!editedTitle) return;
		dispatch(updateTask({ ...task, title: editedTitle }));
		setEditMode(false);
	};

	const handleCancelEdit = () => {
		setEditedTitle(task.title);
		setEditMode(false);
	};

	const handleDelete = () => {
		dispatch(deleteTask(task._id));
		setOpenDialog(false);
	};

	return (
		<StyledListItem key={task._id} disablePadding>
			<ListItemButton dense>
				<ListItemIcon>
					<Checkbox
						edge='start'
						checked={task.completed}
						tabIndex={-1}
						disableRipple
						onChange={() => dispatch(updateTask({ ...task, completed: !task.completed }))}
						icon={<RadioButtonUncheckedIcon />}
						checkedIcon={<CheckCircleOutlineIcon />}
						color='success'
					/>
				</ListItemIcon>
				{editMode ? (
					<>
						<TextField
							fullWidth
							value={editedTitle}
							onChange={(e) => {
								setEditedTitle(e.target.value);
							}}
							autoFocus
							required
							InputProps={{
								disableUnderline: true
							}}
							variant='standard'
						/>
						<IconButton onClick={handleSave} aria-label='save task'>
							<CheckIcon />
						</IconButton>
						<IconButton onClick={handleCancelEdit} aria-label='cancel edit'>
							<CloseIcon />
						</IconButton>
					</>
				) : (
					<>
						<ListItemText primary={task.title} />
						<IconButton onClick={handleEdit} aria-label='edit task'>
							<EditIcon />
						</IconButton>
						<IconButton onClick={() => setOpenDialog(true)} aria-label='delete task'>
							<DeleteIcon color='error' />
						</IconButton>
						<ConfirmDialog
							open={openDialog}
							handleClose={() => setOpenDialog(false)}
							handleConfirm={handleDelete}
							title='Delete'
						>
							Are you sure you want to delete this task?
						</ConfirmDialog>
					</>
				)}
			</ListItemButton>
		</StyledListItem>
	);
};

export default TaskItem;
