import {createContext, useRef } from "react";
import { Block } from "../type/type";

export type UndoRedoType = {
    undoHistory: React.MutableRefObject<Block[][] | undefined>
    redoHistory: React.MutableRefObject<Block[][] | undefined>
    maxHistory: number
    addUndo: (nowBlocks: Block[]) => void
    readUndo: (nowBlocks: Block[]) => Block[]
    readRedo: (nowBlocks: Block[]) => Block[]
}


export const UndoRedoContext = createContext<UndoRedoType>(undefined!)

export const UndoRedoProvider = ({children}: any) => {
    const undoHistory = useRef<Block[][]>([])
    const redoHistory = useRef<Block[][]>([])
    const maxHistory = 100 

    const addUndo = (nowBlocks: Block[]) => {
        undoHistory.current.push(nowBlocks)
        if (undoHistory.current.length > maxHistory) {
            undoHistory.current.shift()
        }
        redoHistory.current = []
    }

    const readUndo = (nowBlocks: Block[]): Block[] => {
        const pastBlocks = undoHistory.current.pop()
        if (!pastBlocks) {
            console.log("cannot undo no more!")
            return nowBlocks
        }
        redoHistory.current.push(nowBlocks)
        return pastBlocks
    }

    const readRedo = (nowBlocks: Block[]): Block[] => {
        const futureBlocks = redoHistory.current.pop()
        if (!futureBlocks) {
            console.log("cannot redo no more!")
            return nowBlocks
        }
        undoHistory.current.push(nowBlocks)
        return futureBlocks
    }

    return (
        <UndoRedoContext.Provider value={{undoHistory, redoHistory, maxHistory, addUndo, readUndo, readRedo}} >
            {children}
        </UndoRedoContext.Provider>
    )
}