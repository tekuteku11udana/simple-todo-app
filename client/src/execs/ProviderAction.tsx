import { createContext, useContext } from "react";
import { action2blocks, BlocksAction } from "../action";
import { Block, DataCtxBlocksFunc, DataCtxInfo } from "../data";

export const ActionCtx = createContext<{
    execAction: (blocks: Block[], action: BlocksAction) => void
}>(undefined!)

export const ActionProvider = ({children}: any) => {
    const {setBlocks} = useContext(DataCtxBlocksFunc)
    // const focusedIndexRef = useContext(FocusedIndexRef)
    const {blocksInfo} = useContext(DataCtxInfo)

    const execAction = (blocks: Block[], action: BlocksAction) => {
        const newBlocks = action2blocks(blocks, action)
        switch (action.type) {
            case "TEXT": {
                break
            }
            case "CREATE": {
                blocksInfo.focusedIndex = action.items[0].index
                break
            }
            case "DELETE": {
                blocksInfo.focusedIndex = action.items[0].index === 0 ? 0 : action.items[0].index - 1
                break
            }
            case "REARRANGE": {
                break
            }
            case "SELECT": {
                break
            }
            default: return
        }

        setBlocks(newBlocks)
    }

    return (
        <ActionCtx.Provider value={{execAction}} >
            {children}
        </ActionCtx.Provider>
    )
}