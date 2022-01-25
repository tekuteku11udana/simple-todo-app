import {createContext, useRef } from "react";
import { Block } from "../type/type";

export type UndoRedoType = {
    undoBlocksHistory: React.MutableRefObject<Block[][] | undefined>
    redoBlocksHistory: React.MutableRefObject<Block[][] | undefined>
    undoFocusHistory: React.MutableRefObject<number[]>
    redoFocusHistory: React.MutableRefObject<number[]>
    maxHistory: number
    addUndo: (nowBlocks: Block[], nowIndex: number) => void
    readUndo: (nowBlocks: Block[], nowIndex: number) => [Block[], number]
    readRedo: (nowBlocks: Block[], nowIndex: number) => [Block[], number]
}


export const UndoRedoContext = createContext<UndoRedoType>(undefined!)

export const UndoRedoProvider = ({children}: any) => {
    const undoBlocksHistory = useRef<Block[][]>([])
    const redoBlocksHistory = useRef<Block[][]>([])
    const undoFocusHistory = useRef<number[]>([])
    const redoFocusHistory = useRef<number[]>([])
    const maxHistory = 100 

    const addUndo = (nowBlocks: Block[], nowIndex: number) => {
        undoBlocksHistory.current.push(nowBlocks)
        undoFocusHistory.current.push(nowIndex)
        if (undoBlocksHistory.current.length > maxHistory) {
            undoBlocksHistory.current.shift()
            undoFocusHistory.current.shift()
        }
        redoBlocksHistory.current = []
        redoFocusHistory.current = []
    }

    const readUndo = (nowBlocks: Block[], nowIndex: number): [Block[], number]=> {
        const pastBlocks = undoBlocksHistory.current.pop()
        const pastIndex = undoFocusHistory.current.pop()
        if (pastBlocks === undefined || pastIndex === undefined) {
            console.log("cannot undo no more!")
            return [nowBlocks, nowIndex]
        }
        redoBlocksHistory.current.push(nowBlocks)
        redoFocusHistory.current.push(nowIndex)
        return [pastBlocks, pastIndex]
    }

    const readRedo = (nowBlocks: Block[], nowIndex: number): [Block[], number] => {
        const futureBlocks = redoBlocksHistory.current.pop()
        const futureIndex = redoFocusHistory.current.pop()
        if (futureBlocks === undefined || futureIndex === undefined) {
            console.log("cannot redo no more!")
            return [nowBlocks, nowIndex]
        }
        undoBlocksHistory.current.push(nowBlocks)
        return [futureBlocks, futureIndex]
    }

    return (
        <UndoRedoContext.Provider value={{undoBlocksHistory, redoBlocksHistory, undoFocusHistory, redoFocusHistory, maxHistory, addUndo, readUndo, readRedo}} >
            {children}
        </UndoRedoContext.Provider>
    )
}