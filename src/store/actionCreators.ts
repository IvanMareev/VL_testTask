import { ITask } from '../types/global';
import { ADD_TASK, DELETE_TASK, EDIT_TASK, FETCH_TASK_BY_ID} from './actionTypes'; 

export const addTask = (task: ITask) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const deleteTask = (taskId: string) => {
  return {
    type: DELETE_TASK,
    payload: taskId,
  };
};

export const editTask = (taskId: string, updatedTask: Partial<ITask>) => {
  return {
    type: EDIT_TASK,
    payload: {
      taskId,
      updatedTask,
    },
  };
};

export const fetchTaskById = (taskId: string) => ({
  type: FETCH_TASK_BY_ID,
  payload: taskId,
});

