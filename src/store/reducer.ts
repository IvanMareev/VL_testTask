
import { TasksState } from "../types/reduxType/type";
import { ADD_TASK, DELETE_TASK, EDIT_TASK, FETCH_TASK_BY_ID } from "./actionTypes";



export const initialState: TasksState = {
  tasks: []
  , selectedTask: null
};
const taskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload)
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.taskId) {
            return {
              ...task,
              ...action.payload.updatedTask
            };
          }
          return task;
        })
      };
    case FETCH_TASK_BY_ID:
      const taskId = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      return {
        ...state,
        selectedTask: task,
      };
    
    default:
      return state;

  }
};


export default taskReducer;

