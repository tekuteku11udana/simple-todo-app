import { createContext } from "react";



export const UndoRedoCtx = createContext<{
    execUndo: () => void
    execRedo: () => void
}>(undefined!)

export const UndoRedoProvider = ({children}: any) => {
    const execUndo = () => {

    }
    const execRedo = () => {

    }
    return (
        <UndoRedoCtx.Provider value={{execUndo, execRedo}} >
            {children}
        </UndoRedoCtx.Provider>
    )
}