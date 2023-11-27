export interface Itask {
    readonly id: number
    username: string
    email: string
    text: string
    is_done: boolean
    created_at: string
    edited: boolean | undefined
}


export interface ItasksRetrieve {
    count: number,
    next: string | null
    previous: string | null
    results: Itask[]
}