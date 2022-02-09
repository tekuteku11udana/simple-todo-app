import { ExecsProvider } from "./ExecsProvider"
import { HistoryProvider } from "./HistoryProvider"
import { InfoProvider } from "./InfoProvider"

export const UndoRedoProvider = ({children}: any) => {
    return (
        <HistoryProvider >
            <InfoProvider >
                <ExecsProvider>
                    {children}
                </ExecsProvider>
            </InfoProvider>
        </HistoryProvider>
    )
}