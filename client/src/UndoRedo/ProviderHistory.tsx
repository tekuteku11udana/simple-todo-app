import { createContext, useRef } from "react";
import { BlocksAction, reverseAction } from "../action";


export const CtxHistory = createContext<{
    addUndo: (action: BlocksAction) => void;
    readUndo: (action2now: BlocksAction) => BlocksAction
    readRedo: (action2now: BlocksAction) => BlocksAction
}>(undefined!)

export const ProviderHistory = ({children}: any) => {
    // Histories retain actions from past to future.
    const undoHistory = useRef<BlocksAction[]>([])
    const redoHistory = useRef<BlocksAction[]>([])
    const MAXHISTORY = 100

    const addUndo = (action: BlocksAction) => {
        if (action.type === "NOTHING") return
        // if (action.type === "TEXT" && action.textBefore === action.textAfter) return
        undoHistory.current.push(action)
        if (undoHistory.current.length > MAXHISTORY) {
            undoHistory.current.shift()
        }
        redoHistory.current = []
        console.log("↓ added undoHistory")
        console.log(undoHistory.current[undoHistory.current.length - 1])
    }

    const readUndo = (action2now: BlocksAction) :BlocksAction => {
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
            console.log(action2past)
            return action2past
        }
    }

    const readRedo = (action2now: BlocksAction) :BlocksAction => {
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
        <CtxHistory.Provider value={{addUndo, readUndo, readRedo}} >
            {children}
        </CtxHistory.Provider>
    )
}