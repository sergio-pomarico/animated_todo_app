import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import tasks, {Task} from '../../data/task';

interface TaskReducerProps {
  tasks: Task[];
}

const initialState: TaskReducerProps = {
  tasks: tasks,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    filterCompleteTask: state => {
      state.tasks.filter(task => !task.done);
    },
    updateTask: (state, action: PayloadAction<string>) => {
      state.tasks.map(task =>
        task.id === action.payload ? (task.done = !task.done) : task,
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const Actions = taskSlice.actions;
export default taskSlice.reducer;
