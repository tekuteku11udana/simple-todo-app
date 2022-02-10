
import { HistoryProvider } from "./HistoryProvider"
import { InfoProvider } from "./InfoProvider"

export const UndoRedoProvider = ({children}: any) => {
    return (
        <HistoryProvider >
            <InfoProvider >
                
                    {children}
                
            </InfoProvider>
        </HistoryProvider>
    )
}