import { ExecActionProvider } from "./ExecActionProvider"
import { ExecUndoRedoProvider } from "./ExecUndoRedoProvider"

export const ExecsProvider = ({children}: any) => {
    return (
        <ExecActionProvider >
            <ExecUndoRedoProvider >
                {children}
            </ExecUndoRedoProvider>
        </ExecActionProvider>
    )
}