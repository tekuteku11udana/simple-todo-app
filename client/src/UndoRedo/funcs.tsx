import { UndoRedoAction } from "./HistoryProvider"

export const reverseAction = (action: UndoRedoAction): UndoRedoAction => {
    switch (action.type) {
        case "CREATE": {
            const newAction: UndoRedoAction = {
                type: "DELETE",
                items: action.items
            }
            return newAction
        }
        case "DELETE": {
            const newAction: UndoRedoAction = {
                type: "CREATE",
                items: action.items
            }
            return newAction
        }
        case "REARRANGE": {
            const newAction: UndoRedoAction = {
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
        // case "TEXT": {
        //     const newAction: UndoRedoAction = {
        //         type: "TEXT",
        //         index: action.index,
        //         text: ac
        //     }
        //     return newAction
        // }
        default : {
            return action
        }
    }
}