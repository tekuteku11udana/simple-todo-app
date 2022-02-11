import { Block } from "../data/type";
import { BlocksAction } from "./types";

export const action2blocks = (blocks: Block[], action: BlocksAction) => {
    let newBlocks = [...blocks]
    switch (action.type) {
        case "NOTHING":  return newBlocks
        case "CREATE": {
            action.items.forEach(item => {
                newBlocks.splice(item.index, 0, {id: item.id, text: item.text, isSelected: false})
            })
            return newBlocks   
        }
        case "DELETE": {
            action.items.slice().reverse().forEach(item => {
                newBlocks.splice(item.index, 1)
            })
            return newBlocks
        }
        case "REARRANGE": {
            if (action.moves[action.moves.length - 1].startIndex > newBlocks.length - 1 || action.moves[action.moves.length - 1].endIndex > newBlocks.length - 1) return newBlocks
            const movedBlocks: Block[] = []
            const stayedBlocks: Block[] = []
            newBlocks.forEach((block, index) => {
                action.moves.forEach(move => {
                    if (index === move.startIndex) {
                        movedBlocks.push(block)
                    } else {
                        stayedBlocks.push(block)
                    }
                })
            })
            action.moves.forEach((move, i) => {
                stayedBlocks.splice(move.endIndex, 0, movedBlocks[i])
            })
            newBlocks = stayedBlocks
            return newBlocks
        }
        case "TEXT": {
            newBlocks[action.index].text = action.textAfter
            return newBlocks
        }
        case "SELECT": {
            if (action.value === "TOGGLE") {
                newBlocks[action.index].isSelected = !newBlocks[action.index].isSelected
            } else {
                newBlocks[action.index].isSelected = action.value
            }
            return newBlocks
        }
        default: return newBlocks
    }
}