import { ActionProvider } from "./ExecActionProvider"
import { UndoRedoProvider } from "./ExecUndoRedoProvider"
import { ActionCtx as ExecCtxAction } from "./ExecActionProvider"
import { UndoRedoCtx as ExecCtxUndoRedo } from "./ExecUndoRedoProvider"

export const ExecsProvider = ({children}: any) => {
    return (
        <ActionProvider >
            <UndoRedoProvider >
                {children}
            </UndoRedoProvider>
        </ActionProvider>
    )
}

export {
    ExecCtxAction,
    ExecCtxUndoRedo
}