export interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

export interface TasksState {
    tasks: Task[];
    filteredTasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    filter: 'all' | 'pending' | 'completed';
}
