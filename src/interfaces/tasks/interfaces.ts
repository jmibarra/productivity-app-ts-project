export interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    color?: string;
    list?: number;
    priority?: number; //Por ahora, deberíamos luego manejarlo como un tipo especial de objeto o a lo mejor solo el número mapeando a un símbolo
    subtasks?: Array<string>; //Pueden ser los ids de las subtareas o a futuro directamente objetos
    labels?: Array<string>; //idem anterior puedo manejarlo como strings simples o como objetos
    dueDate?: string;
}

export interface Note {
    _id: string;
    title: string;
    content: string;
    favorite: boolean;
    color?: string;//idem anterior puedo manejarlo como strings simples o como objetos
    createdAt: Date;
    creator: string; 
    labels?: Array<string>; 
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