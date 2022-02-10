import { createContext, useContext } from "react";
import { BlocksCtxFunc, FocusedIndexRef } from "../data/BlocksProvider";
import { Block } from "../data/type";
import { action2blocks } from "../action/action2blocks";
import { BlocksAction } from "../action/actionTypes";

type ExecActionType = {
    actionExec: (blocks: Block[], action: BlocksAction) => void
}

export const ExecActionCtx = createContext<ExecActionType>(undefined!)

export const ExecActionProvider = ({children}: any) => {
    const setBlocks = useContext(BlocksCtxFunc)
    const focusedIndexRef = useContext(FocusedIndexRef)

    const actionExec = (blocks: Block[], action: BlocksAction) => {
        const newBlocks = action2blocks(blocks, action)
        switch (action.type) {
            case "TEXT": {
                break
            }
            case "CREATE": {
                focusedIndexRef.current = action.items[0].index
                break
            }
            case "DELETE": {
                focusedIndexRef.current = action.items[0].index === 0 ? 0 : action.items[0].index - 1
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
        <ExecActionCtx.Provider value={{actionExec}} >
            {children}
        </ExecActionCtx.Provider>
    )
}