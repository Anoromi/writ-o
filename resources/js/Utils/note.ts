


export type Note = {
    title: string | null,
    id: string,
    data: string
}


export type NoteData = {
    text: string | null
    next?: NoteData[]
}
