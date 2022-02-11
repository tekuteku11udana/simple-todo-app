
import { ProviderHistory } from "./ProviderHistory"
import { ProviderInfo } from "./ProviderInfo"
import { CtxHistory as UndoRedoCtxHistory } from "./ProviderHistory"
import { CtxInfo as UndoRedoCtxInfo } from "./ProviderInfo"

export const UndoRedoProvider = ({children}: any) => {
    return (
        <ProviderHistory >
            <ProviderInfo >
                
                    {children}
                
            </ProviderInfo>
        </ProviderHistory>
    )
}

export {
    UndoRedoCtxHistory,
    UndoRedoCtxInfo
}