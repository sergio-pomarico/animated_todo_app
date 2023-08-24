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
    id: '5d11478c-71bc-41d5-a5f6-cb79d8e1390c',
    subject: 'Do something nice for someone I care about',
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
  {
    id: 'ff0b2d14-a2be-4ca7-be19-9c2f0d2f62c8',
    subject: 'Play Yu-Gi-Oh',
    done: false,
  },
  {
    id: '24ad9755-8335-4efa-b329-72ec71880aeb',
    subject: 'Buy milk',
    done: true,
  },
  {
    id: '0f0b2d14-a2be-4ca7-be19-9c2f0d2f62c8',
    subject: 'Watch a live stream of code programing',
    done: false,
  },
  {
    id: 'ba50ae51-ec12-44c4-8329-4e96e9348daf',
    subject: 'Answer all my emails',
    done: true,
  },
  {
    id: '46bba0d5-e857-4971-8e52-bc25f09b39b8',
    subject: 'Watering plants',
    done: false,
  },
  {
    id: '94ee45ab-fdb0-47d0-9266-d7b814c8da5b',
    subject: 'Do exercise',
    done: false,
  },
  {
    id: 'b3f4e1e2-0cc8-478d-a1be-092abf00b42e',
    subject: 'Learn online',
    done: false,
  },
  {
    id: 'd3da80ff-f3a6-4019-948a-8ee00363f5dc',
    subject: 'Message my friends',
    done: false,
  },
  {
    id: 'dd30ce8b-c668-4d56-96b9-0a5da40b41f1',
    subject: 'Read comics',
    done: false,
  },
];
export default tasks;
