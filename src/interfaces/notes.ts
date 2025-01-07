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



export interface NotesState {
    notes: Note[];
    selectedNote?: Note;
    loading: boolean;
}