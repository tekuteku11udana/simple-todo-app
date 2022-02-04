import { createContext, useRef } from "react";
import { reverseAction } from "./funcs";


export type Action = (
    | {type: "CREATE", items: {id: string, index: number, text: string}[]}
    | {type: "DELETE", items: {id: string, index: number, text: string}[]}
    | {type: "REARRANGE", moves: {startIndex: number, endIndex: number}[]}
    | {type: "TEXT", id: string, textBefore: string, textAfter: string}
    | {type: "NOTHING"}
)


export const UndoRedoDiffContext = createContext<any>(undefined!)

export const UndoRedoDiffProvider = ({children}: any) => {
    // Histories retain actions from past to future.
    const undoHistory = useRef<Action[]>([])
    const redoHistory = useRef<Action[]>([])
    const MAXHISTORY = 100

    const addUndo = (action: Action) => {
        if (action.type === "NOTHING") return
        undoHistory.current.push(action)
        if (undoHistory.current.length > MAXHISTORY) {
            undoHistory.current.shift()
        }
        redoHistory.current = []
    }

    const readUndo = (action2now: Action) :Action => {
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

    const readRedo = (action2now: Action) :Action => {
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
}