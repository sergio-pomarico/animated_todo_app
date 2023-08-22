export interface Task {
  id: string;
  subject: string;
  done: boolean;
}

const tasks: Task[] = [
  {
    id: '132f68b6-39c0-4b14-a860-bc2d1795829f',
    subject: 'Read a book',
    done: false,
  },
  {
    id: '6f8b27c6-226c-4c50-8cd0-df04731d3ea3',
    subject: 'Buy movie tickets',
    done: true,
  },
  {
    id: '525398dc-ee04-4b76-9a9f-7e593a3418bd',
    subject: 'Make a tutorial',
    done: false,
  },
  {
    id: 'f0fcbb56-edc7-413c-b119-1e1ae486159d',
    subject: 'Call mom',
    done: false,
  },
];
export default tasks;
