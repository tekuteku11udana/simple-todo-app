import { createContext } from "react";

type ExecUndoRedoType = {
    execUndo: () => void
    execRedo: () => void
}

export const ExecUndoRedoCtx = createContext<ExecUndoRedoType>(undefined!)

export const ExecUndoRedoProvider = ({children}: any) => {
    const execUndo = () => {

    }
    const execRedo = () => {

    }
    return (
        <ExecUndoRedoCtx.Provider value={{execUndo, execRedo}} >
            {children}
        </ExecUndoRedoCtx.Provider>
    )
}