import { Action } from "./UndoRedoDiffProvider"

export const reverseAction = (action: Action): Action => {
    switch (action.type) {
        case "CREATE": {
            const newAction: Action = {
                type: "DELETE",
                items: action.items
            }
            return newAction
        }
        case "DELETE": {
            const newAction: Action = {
                type: "CREATE",
                items: action.items
            }
            return newAction
        }
        case "REARRANGE": {
            const newAction: Action = {
                type: "REARRANGE",
                moves: action.moves.map((move) => {
                    return {
                        startIndex: move.endIndex,
                        endIndex: move.startIndex
                    }
                })
            }
            return newAction
        }
        case "TEXT": {
            const newAction: Action = {
                type: "TEXT",
                id: action.id,
                textBefore: action.textAfter,
                textAfter: action.textBefore
            }
            return newAction
        }
        default : {
            return {type: "NOTHING"}
        }
    }
}