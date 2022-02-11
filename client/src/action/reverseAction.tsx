import { BlocksAction } from "."

export const reverseAction = (action: BlocksAction): BlocksAction => {
    switch (action.type) {
        case "CREATE": {
            const newAction: BlocksAction = {
                type: "DELETE",
                items: action.items
            }
            return newAction
        }
        case "DELETE": {
            const newAction: BlocksAction = {
                type: "CREATE",
                items: action.items
            }
            return newAction
        }
        case "REARRANGE": {
            const newAction: BlocksAction = {
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
            const newAction: BlocksAction = {
                type: "TEXT",
                index: action.index,
                textBefore: action.textAfter,
                textAfter: action.textBefore
            }
            return newAction
        }
        default : {
            return action
        }
    }
}