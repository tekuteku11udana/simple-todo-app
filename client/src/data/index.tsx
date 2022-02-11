import { ProviderInfo } from "./ProviderInfo"
import { ProviderBlocks } from "./ProviderBlocks"
import { CtxBlocks as DataCtxBlocks } from "./ProviderBlocks"
import { CtxFunc as DataCtxBlocksFunc } from "./ProviderBlocks"
import { CtxInfo as DataCtxInfo } from "./ProviderInfo"
import { CtxRefCallback as DataCtxRefCallback } from "./ProviderInfo"
import { Block } from "./type"

export const DataProvider = ({children}: any) => {
    return (
        <ProviderBlocks >
            <ProviderInfo >
                {children}
            </ProviderInfo> 
        </ProviderBlocks>
    )
}

export {
    DataCtxBlocks,
    DataCtxBlocksFunc,
    DataCtxInfo,
    DataCtxRefCallback
}

export type {Block}