import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TasksState } from '../../shared/types/taskTypes';
import instance from '../../shared/configs/axiosConfig';

const initialState: TasksState = {
    tasks: [],
    filteredTasks: [],
    status: 'idle',
    error: null,
    filter: 'all'
};

export const fetchTasks: any = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await instance.get('/api/tasks');
    return response.data;
});

export const addTask: any = createAsyncThunk('tasks/addTask', async (task: Omit<Task, 'id'>) => {
    const response = await instance.post('/api/tasks', task);
    return response.data;
});

export const updateTask: any = createAsyncThunk('tasks/updateTask', async (task: Task) => {
    const response = await instance.put(`/api/tasks/${task._id}`, task);
    return response.data;
});

export const deleteTask: any = createAsyncThunk('tasks/deleteTask', async (id: string) => {
    await instance.delete(`/api/tasks/${id}`);
    return id;
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Reducer to set the current filter and update filtered tasks
        setFilter: (state, action) => {
            state.filter = action.payload;
            state.filteredTasks = state.tasks.filter(task => {
                if (state.filter === 'all') return true;
                return state.filter === 'completed' ? task.completed : !task.completed;
            });
        },
        // Reorder tasks when a task is dragged and dropped
        // TODO: Implement reordering on the server
        reorderTasks: (state, action) => {
            const { startIndex, endIndex } = action.payload;
            const result = Array.from(state.tasks);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            state.tasks = result;
            state.filteredTasks = state.tasks.filter(task => {
                if (state.filter === 'all') return true;
                return state.filter === 'completed' ? task.completed : !task.completed;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            // fetch tasks and filter them once data is successfully fetched
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
                state.filteredTasks = state.tasks.filter(task => {
                    if (state.filter === 'all') return true;
                    return state.filter === 'completed' ? task.completed : !task.completed;
                });
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            // Append new task to the list once successfully added
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload);
                state.filteredTasks = state.tasks.filter(task => {
                    if (state.filter === 'all') return true;
                    return state.filter === 'completed' ? task.completed : !task.completed;
                });
            })
            // Update task in the list once it is successfully updated
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                state.tasks[index] = action.payload;
                state.filteredTasks = state.tasks.filter(task => {
                    if (state.filter === 'all') return true;
                    return state.filter === 'completed' ? task.completed : !task.completed;
                });
            })
            // Remove task from the list once it is successfully deleted
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
                state.filteredTasks = state.tasks.filter(task => {
                    if (state.filter === 'all') return true;
                    return state.filter === 'completed' ? task.completed : !task.completed;
                });
            });
    }
});

export const { setFilter, reorderTasks } = tasksSlice.actions;
export const selectTasks = (state: { tasks: TasksState; }) => state.tasks;
export default tasksSlice.reducer;
