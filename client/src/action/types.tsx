export type BlocksAction = (
        | {type: "CREATE", items: {id: string, index: number, text: string}[]}
        | {type: "DELETE", items: {id: string, index: number, text: string}[]}
        | {type: "REARRANGE", moves: {startIndex: number, endIndex: number}[]}
        | {type: "TEXT", index: number, textBefore: string, textAfter: string}
        | {type: "SELECT", index: number, value: boolean | "TOGGLE"}
        | {type: "NOTHING"}
)
