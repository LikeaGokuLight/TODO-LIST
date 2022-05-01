import create from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

interface Task {
    id: string;
    title: string;
    createdAt: string;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>()(devtools(persist( (set, get) => ({
    tasks: [],
    createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
            id: uuidv4(),
            title,
            createdAt: format((new Date()), 'Pp')
        };
        set({
            tasks: [newTask].concat(tasks)
        })
    },
    updateTask: (id: string, title: string) => {
        const {tasks} = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        })
    },
    removeTask: (id: string) => {
        const {tasks} = get();
        set({
            tasks: tasks.filter((task: Task) => task.id !== id)
        })
    },
}))))
