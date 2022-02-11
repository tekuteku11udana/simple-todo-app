import { ActionProvider } from "./ProviderAction"
import { UndoRedoProvider } from "./ProviderUndoRedo"
import { ActionCtx as ExecCtxAction } from "./ProviderAction"
import { UndoRedoCtx as ExecCtxUndoRedo } from "./ProviderUndoRedo"

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