import { ITask } from "../global"

type TasksAction = {
    type: string
    article: ITask
}

type TasksState = {
    tasks: ITask[];
    selectedTask: ITask | null;
}
type DispatchType = (args: TasksAction) => TasksAction