import { createContext, useContext } from "react";
import { BlocksCtxFunc, BlocksCtxState } from "../blocks/BlocksProvider";
import { Block } from "../type/type";
import { UndoRedoAction, UndoRedoCtxHistory } from "./HistoryProvider";
import { UndoRedoCtxInfo } from "./InfoProvider";

type UndoRedoExecsType = {
    execAction: (action: UndoRedoAction) => void
}

export const UndoRedoCtxExecs = createContext<UndoRedoExecsType>(undefined!)

export const ExecsProvider = ({children}: any) => {
    const {addUndo, readUndo, readRedo} = useContext(UndoRedoCtxHistory)
    const undoRedoInfo = useContext(UndoRedoCtxInfo)
    const blocks = useContext(BlocksCtxState)
    const setBlocks = useContext(BlocksCtxFunc)

    // const execAddUndoHistory = () => {

    // }

    const execAction = (action: UndoRedoAction) => {
        switch (action.type) {
            case "NOTHING": return
            case "CREATE": {
                let newBlocks: Block[] = [...blocks]
                action.items.forEach((item) => {
                    newBlocks.splice(item.index, 0, {id: item.id, text: item.text, isSelected: false})
                })
                setBlocks(newBlocks)
                return
            }
            case "DELETE": {
                let newBlocks: Block[] = [...blocks]
                action.items.slice().reverse().forEach((item) => {
                    newBlocks.splice(item.index, 1)
                })
                setBlocks(newBlocks)
                return
            }
            case "REARRANGE": {
                return
            }
            // case "TEXT": {
            //     let newBlocks: Block[] = [...blocks]
            //     const index = newBlocks.findIndex((block) => block.id === action.id )
            //     const block = newBlocks.find((block) => block.id === action.id)
            //     newBlocks.splice(index, 0, {id: action.id, text: action.textAfter, isSelected: block === undefined ? false : block.isSelected})
            //     setBlocks(newBlocks)
            //     return
            // }
            default: return
        }

    }

    return (
        <UndoRedoCtxExecs.Provider value={{execAction}} >
            {children}
        </UndoRedoCtxExecs.Provider>
    )
}