import { Task } from "../../../types/taskTypes";

export interface TaskListInterface {
	tasks: Task[];
	filter: string;
}
