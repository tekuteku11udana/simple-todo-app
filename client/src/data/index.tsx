import { ProviderInfo } from "./ProviderInfo"
import { ProviderBlocks } from "./ProviderBlocks"
export { CtxBlocks as DataCtxBlocks } from "./ProviderBlocks"
export { CtxFunc as DataCtxBlocksFunc } from "./ProviderBlocks"
export { CtxInfo as DataCtxInfo } from "./ProviderInfo"
export type { Block } from "./type"

export const DataProvider = ({children}: any) => {
    return (
        <ProviderBlocks >
            <ProviderInfo >
                {children}
            </ProviderInfo> 
        </ProviderBlocks>
    )
}

// export {
//     DataCtxBlocks,
//     DataCtxBlocksFunc,
//     DataCtxInfo,
//     DataCtxRefCallback
// }

