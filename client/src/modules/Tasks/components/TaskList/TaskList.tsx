import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, List } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import { reorderTasks } from '../../../../features/tasks/tasksSlice';
import TaskItem from '../TaskItem/TaskItem';
import { TaskListInterface } from './TaskListInterface';

function TaskList({ tasks, filter }: TaskListInterface) {
    const dispatch = useDispatch();

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        dispatch(reorderTasks({
            startIndex: result.source.index,
            endIndex: result.destination.index
        }));
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef} sx={{ maxHeight: '40vh', overflow: 'auto' }}>
                        {tasks.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index} isDragDisabled={filter !== 'all'}>
                                {(provided) => (
                                    <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            textDecoration: task.completed ? 'line-through' : 'none'
                                        }}
                                    >
                                        <TaskItem task={task} />
                                    </Box>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default TaskList;