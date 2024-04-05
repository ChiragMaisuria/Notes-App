// Model for MeetingNote.
export interface MeetingNoteModel{
    id: number,
    title: string,
    content: string,
    listOfActions: Task[],
    createdDate: string
}

// Model for task used in MeetingNote.
interface Task{
    toDoId: number,
    task: string,
    status: boolean
}
