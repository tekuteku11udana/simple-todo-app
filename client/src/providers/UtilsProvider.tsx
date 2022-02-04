import { useContext } from "react";
import { createContext } from "react";
import { BlocksCtxFunc, FocusedIndexRef } from "./BlocksProvider";
import {v4 as uuidv4} from 'uuid';
import { Block } from "../type/type";
import { UndoRedoContext } from "./UndoRedoProvider";

export const UtilFuncs = createContext<{
    createNewBlock: (currentBlocks: Block[], currentIndex: number, newIndex: number) => void,
    deleteBlock: (currentBlocks: Block[], currentIndex: number, currentId: string) => void,
    changeText: (currentBlocks: Block[], currentIndex: number, currentId: string, newText: string) => void,
    toggleSelect: (blocks: Block[], index: number) => void,
    execUndo: (currentBlocks: Block[], currentIndex: number) => void,
    execRedo: (currentBlocks: Block[], currentIndex: number) => void

}>(undefined!)

export const UtilsProvider = ({children}: any) => {
    // const blocks = useContext(BlocksCtxState)
    const setBlocks = useContext(BlocksCtxFunc)
    const {addUndo, readUndo, readRedo} = useContext(UndoRedoContext)
    const focusedIndexRef = useContext(FocusedIndexRef)

    const createNewBlock = (
            currentBlocks: Block[],
            currentIndex: number,
            newIndex: number
        ) => {
        addUndo(currentBlocks, currentIndex)
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
        addUndo(currentBlocks, currentIndex)
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
        addUndo(currentBlocks, currentIndex)
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

    const execUndo = (
            currentBlocks: Block[],
            currentIndex: number
        ) => {
        const [pastBlocks, pastIndex] = readUndo(currentBlocks, currentIndex)
        setBlocks(pastBlocks)
        focusedIndexRef.current = pastIndex
    }

    const execRedo = (
            currentBlocks: Block[],
            currentIndex: number
        ) => {
        const [futureBlocks, futureIndex] = readRedo(currentBlocks, currentIndex)
        setBlocks(futureBlocks)
        focusedIndexRef.current = futureIndex
    }


    return (
       <UtilFuncs.Provider value={{
            createNewBlock,
            deleteBlock,
            changeText,
            toggleSelect,
            execUndo,
            execRedo
        }} >
           {children}
       </UtilFuncs.Provider>
    ) 
}

const putNewText = (id: string, index: number,text: string) => {
    fetch(`/api/v1/blocks/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([{id: id, index: index, text: text}])
    })
    .then(data => {
    })
    .catch((err) => {
        console.error('ERROR: ', err)
    })
}

const postNewBlock = (newId: string, newIndex: number, newText: string) => {

    fetch(`/api/v1/blocks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: newId, index: newIndex, text: newText})
    })
    
    .then(data => {
        
    })
    .catch((err) => {
        console.error('ERROR: ', err)
    })
}

const putAllBlocks = (newBlocks: Block[]) => {
    fetch(`/api/v1/blocks/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlocks)
    })
    
    .then(data => {
        
    })
    .catch((err) => {
        console.error('ERROR: ', err)
    })
}