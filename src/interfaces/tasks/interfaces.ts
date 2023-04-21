export interface Task {
    id: string;
    title: string;
    desc: string;
    completed: boolean;
    color?: string;
    list?: string;
    priority?: number; //Por ahora, deberíamos luego manejarlo como un tipo especial de objeto o a lo mejor solo el número mapeando a un símbolo
    subtasks?: Array<string>; //Pueden ser los ids de las subtareas o a futuro directamente objetos
    labels?: Array<string>; //idem anterior puedo manejarlo como strings simples o como objetos
    dueDate?: string;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    favorite: boolean;
    color?: string;//idem anterior puedo manejarlo como strings simples o como objetos
    createdAt?: Date;
}

export interface TasksState {
    tasks: Task[];
    selectedTask?: Task;
    loading: boolean;
}

export interface NotesState {
    notes: Note[];
    selectedNote?: Note;
    loading: boolean;
}