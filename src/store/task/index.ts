import tasksReducer, {Actions} from './reducer';

const {setTasks, addTask, filterCompleteTask, deleteTask, updateTask} = Actions;

export {
  tasksReducer,
  setTasks,
  addTask,
  filterCompleteTask,
  deleteTask,
  updateTask,
};
