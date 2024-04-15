import { Task } from "../../../shared/types/taskTypes";

export interface TaskListInterface {
	tasks: Task[];
	filter: string;
}
