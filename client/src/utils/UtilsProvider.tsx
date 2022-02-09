import { useContext } from "react";
import { createContext } from "react";
import { BlocksCtxFunc, FocusedIndexRef } from "../blocks/BlocksProvider";
import {v4 as uuidv4} from 'uuid';
import { Block } from "../type/type";
import { postNewBlock, putAllBlocks, putNewText } from "./fetch";

export const UtilFuncs = createContext<{
    createNewBlock: (currentBlocks: Block[], currentIndex: number, newIndex: number) => void,
    deleteBlock: (currentBlocks: Block[], currentIndex: number, currentId: string) => void,
    changeText: (currentBlocks: Block[], currentIndex: number, currentId: string, newText: string) => void,
    toggleSelect: (blocks: Block[], index: number) => void,

}>(undefined!)

export const UtilsProvider = ({children}: any) => {
    // const blocks = useContext(BlocksCtxState)
    const setBlocks = useContext(BlocksCtxFunc)
    const focusedIndexRef = useContext(FocusedIndexRef)

    const createNewBlock = (
            currentBlocks: Block[],
            currentIndex: number,
            newIndex: number
        ) => {
        const newId = uuidv4()
        const newText = ''
        const newBlocks = [...currentBlocks]
        newBlocks.splice(newIndex, 0, {id: newId, text: newText, isSelected: false})

        postNewBlock(newId, newIndex, newText)
        putAllBlocks(newBlocks)

        setBlocks(newBlocks)
        focusedIndexRef.current = newIndex
    }

    const deleteBlock = (
            currentBlocks: Block[],
            currentIndex: number,
            currentId: string
        ) => {
        const newBlocks = [...currentBlocks]
        newBlocks.splice(currentIndex, 1)

        fetch(`/api/v1/blocks/${currentId}`, {
            method: 'DELETE',
        })
        putAllBlocks(newBlocks)
        console.log(`DELETEで、下のが残った。`)
        console.log(newBlocks)

        setBlocks(newBlocks)
        focusedIndexRef.current = currentIndex === 0 ? 0 : currentIndex - 1
    }

    const changeText = (
            currentBlocks: Block[],
            currentIndex: number,
            currentId: string,
            newText: string
        ) => {
        const newBlocks = [...currentBlocks]
        newBlocks.splice(currentIndex, 1, {id: currentId, text: newText, isSelected: false})
        setBlocks(newBlocks)
        putNewText(currentId, currentIndex, newBlocks[currentIndex].text)
    }

    const toggleSelect = (blocks: Block[], index: number) => {
        const newBlocks = [...blocks]
        newBlocks[index].isSelected = !newBlocks[index].isSelected
        setBlocks(newBlocks)
}

    


    return (
       <UtilFuncs.Provider value={{
            createNewBlock,
            deleteBlock,
            changeText,
            toggleSelect,
            
        }} >
           {children}
       </UtilFuncs.Provider>
    ) 
}

