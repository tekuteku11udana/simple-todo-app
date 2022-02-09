import { createContext, useContext } from "react";
import { BlocksCtxFunc, FocusedIndexRef } from "../blocks/BlocksProvider";
import { Block } from "../type/type";
import { UndoRedoAction } from "../undoRedo/HistoryProvider";
import { action2blocks } from "./action2blocks";

type ActionUtilsType = {
    actionExec: (blocks: Block[], action: UndoRedoAction) => void
}

export const ActionUtilsCtx = createContext<ActionUtilsType>(undefined!)

export const ActionUtilsProvider = ({children}: any) => {
    const setBlocks = useContext(BlocksCtxFunc)
    const focusedIndexRef = useContext(FocusedIndexRef)

    const actionExec = (blocks: Block[], action: UndoRedoAction) => {
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
        <ActionUtilsCtx.Provider value={{actionExec}} >
            {children}
        </ActionUtilsCtx.Provider>
    )
}