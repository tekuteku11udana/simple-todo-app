import { createContext, useRef } from "react";
import { reverseAction } from "./funcs";


export type UndoRedoAction = (
    | {type: "CREATE", items: {id: string, index: number, text: string}[]}
    | {type: "DELETE", items: {id: string, index: number, text: string}[]}
    | {type: "REARRANGE", moves: {startIndex: number, endIndex: number}[]}
    | {type: "TEXT", index: number, text: string}
    | {type: "SELECT", index: number, value: boolean | "TOGGLE"}
    | {type: "NOTHING"}
)

type UndoRedoHistoryType = {
    addUndo: (action: UndoRedoAction) => void;
    readUndo: (action2now: UndoRedoAction) => UndoRedoAction
    readRedo: (action2now: UndoRedoAction) => UndoRedoAction
}


export const UndoRedoCtxHistory = createContext<UndoRedoHistoryType>(undefined!)

export const HistoryProvider = ({children}: any) => {
    // Histories retain actions from past to future.
    const undoHistory = useRef<UndoRedoAction[]>([])
    const redoHistory = useRef<UndoRedoAction[]>([])
    const MAXHISTORY = 100

    const addUndo = (action: UndoRedoAction) => {
        if (action.type === "NOTHING") return
        // if (action.type === "TEXT" && action.textBefore === action.textAfter) return
        undoHistory.current.push(action)
        if (undoHistory.current.length > MAXHISTORY) {
            undoHistory.current.shift()
        }
        redoHistory.current = []
    }

    const readUndo = (action2now: UndoRedoAction) :UndoRedoAction => {
        if (action2now.type === "NOTHING") {
            const action2future = undoHistory.current.pop()
            if (action2future === undefined) {
                console.log("cannot undo any more!")
                return {type: "NOTHING"}
            } else {
                redoHistory.current.push(action2future)
                const action2past = reverseAction(action2future)
                return action2past
            }
        } else {
            redoHistory.current.push(action2now)
            const action2past = reverseAction(action2now)
            return action2past
        }
    }

    const readRedo = (action2now: UndoRedoAction) :UndoRedoAction => {
        if (action2now.type === "NOTHING") {
            const action2future = redoHistory.current.pop()
            if (action2future === undefined ) {
                console.log("cannot redo any more!")
                return {type: "NOTHING"}
            } else {
                undoHistory.current.push(action2future)
                return action2future
            }
        } else {
            redoHistory.current = []
            console.log("cannot redo any more!")
            return {type: "NOTHING"}
        }
    }

    return (
        <UndoRedoCtxHistory.Provider value={{addUndo, readUndo, readRedo}} >
            {children}
        </UndoRedoCtxHistory.Provider>
    )
}