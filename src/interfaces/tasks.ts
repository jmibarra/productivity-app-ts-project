export interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    color?: string;
    list?: string;
    priority?: number; //Por ahora, deberíamos luego manejarlo como un tipo especial de objeto o a lo mejor solo el número mapeando a un símbolo
    subtasks?: Array<string>; //Pueden ser los ids de las subtareas o a futuro directamente objetos
    labels?: Array<string>; //idem anterior puedo manejarlo como strings simples o como objetos
    dueDate?: string;
}

export interface TasksState {
    tasks: Task[];
    selectedTask?: Task;
    loading: boolean;
}

export interface TaskList {
    _id: string;
    name: string;
    icon?: string | any;
    color?: string;
    order?: number;
}

export interface TaskListsState {
    taskLists: TaskList[];
    selectedTaskList?: TaskList;
    loading: boolean;
}