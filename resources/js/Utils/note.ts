


export type Note = {
    title: string,
    id: string,
    data: NoteData
}


export type NoteData = {
    text: string
    next?: NoteData[]
}
