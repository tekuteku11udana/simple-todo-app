/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Block } from '../type/type';

import {v4 as uuidv4} from 'uuid';
import { BlocksCtxState, BlocksCtxFunc, BlocksCtxRef, BlocksCtxRefCallback, FocusedIndexCtxState, FocusedIndexCtxFunc } from '../providers/BlocksProvider';
import { IsOnCompContext } from '../providers/IsOnCompProvider';
import { UndoRedoContext } from '../providers/UndoRedoProvider';

type TextBlockProps = {
    id: string
    index: number
    dndEvents: {
        ref: (e: HTMLElement | null) => void;
        onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    }  
}


const TextBlock = (props: TextBlockProps) => {
    const blocks = useContext(BlocksCtxState)
    const setBlocks = useContext(BlocksCtxFunc)
    const blocksRef = useContext(BlocksCtxRef)
    const resisterRefs = useContext(BlocksCtxRefCallback)
    const focusedIndex = useContext(FocusedIndexCtxState)
    const setFocusedIndex = useContext(FocusedIndexCtxFunc)
    const {addUndo, readUndo, readRedo} = useContext(UndoRedoContext)

    // const elmRef = useRef<HTMLTextAreaElement>(null)

    
    
    useEffect(() => {
        if (props.index === focusedIndex) {
            // elmRef.current?.focus()
            blocksRef.elms[props.index]?.focus()
        }
    })

    // useEffect(() => {
    //     putNewText(props.id, props.index, blocks[props.index].text)
    // }, [blocks[props.index].text])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === false) {
            e.preventDefault()
            addUndo(blocks, props.index)
            const newId = uuidv4()
            const newIndex = props.index + 1
            const newText = ''
            const newBlocks = [...blocks]
            newBlocks.splice(newIndex, 0, {id: newId, text: newText, isSelected: false})
            
            postNewBlock(newId, newIndex, newText)
            putAllBlocks(newBlocks)
            
            setBlocks(newBlocks)
            blocksRef.elms[newIndex]?.focus()
            // setFocusedIndex(newIndex)
        }

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === true) {
            e.preventDefault()
            addUndo(blocks, props.index)
            const newId = uuidv4()
            const newIndex = props.index
            const newText = ''
            const newBlocks = [...blocks]
            newBlocks.splice(newIndex, 0, {id: newId, text: newText, isSelected: false})

            postNewBlock(newId, newIndex, newText)
            putAllBlocks(newBlocks)
            
            setBlocks(newBlocks)
            

        }

        if (e.ctrlKey === true && e.key === 'h' && blocksRef.elms[props.index]?.selectionStart === 0) {
            addUndo(blocks, props.index)
            const newBlocks = [...blocks]
            newBlocks.splice(props.index, 1)

            fetch(`/api/v1/blocks/${props.id}`, {
                method: 'DELETE',
            })
            putAllBlocks(newBlocks)
            console.log(`DELETEで、下のが残った。`)
            console.log(newBlocks)

            setBlocks(newBlocks)
            // blocksRef.elms[props.index === 0 ? 0 : props.index - 1]?.focus()
            setFocusedIndex(props.index === 0 ? 0 : props.index - 1)           
        }

        if (e.ctrlKey === true && e.key === 'n') {
            e.preventDefault()
            blocksRef.elms[props.index === blocks.length - 1 ? 0 : props.index + 1 ]?.focus()
            // setFocusedIndex(focusedIndex === blocks.length - 1 ? 0 : focusedIndex + 1 )            
        }
        if (e.ctrlKey === true && e.key === 'p') {
            e.preventDefault()
            blocksRef.elms[props.index === 0 ? blocks.length - 1 : props.index - 1 ]?.focus()
            // setFocusedIndex(focusedIndex === 0 ? blocks.length - 1 : focusedIndex - 1 )            
        }

        if (e.metaKey === true && e.key === 'z' && e.shiftKey === false) {
            const [pastBlocks, pastIndex] = readUndo(blocks, props.index)
            setBlocks(pastBlocks)
            blocksRef.elms[pastIndex]?.focus()
            // setFocusedIndex(pastIndex)
        }

        if (e.metaKey === true && e.key === 'z' && e.shiftKey === true) {
            const [futureBlocks, futureIndex] = readRedo(blocks, props.index)
            setBlocks(futureBlocks)
            blocksRef.elms[futureIndex]?.focus()
            // setFocusedIndex(futureIndex)
        }
        
    }

    return (
        <div  
            css={css`
                margin: 8px;
                border: 1px solid lightgrey;
                border-radius: 2px;
                background-color: ${blocks[props.index].isSelected ? 'orange' : 'green'}
            `}
            {...props.dndEvents}
            >
            <TextareaAutosize 
                className={"rounded-lg bg-yellow-200 my-1 px-1"}
                style={{resize: "none"}}
                value={blocks[props.index].text} 
                onChange={e => {
                    addUndo(blocks, props.index)
                    const newBlocks = [...blocks]
                    newBlocks.splice(props.index, 1, {id: props.id, text: e.currentTarget.value, isSelected: false})
                    setBlocks(newBlocks)
                    putNewText(props.id, props.index, newBlocks[props.index].text)
                }}
                onMouseDown={(e) => {
                    blocksRef.elms[props.index]?.focus()
                    // setFocusedIndex(props.index)

                    // toggle isSelected property
                    const newBlocks = [...blocks]
                    newBlocks[props.index].isSelected = !newBlocks[props.index].isSelected
                    setBlocks(newBlocks)
                }}
                onKeyDown={e => handleKeyDown(e)}
                // ref={elmRef}
                ref={e => {
                    resisterRefs(e, props.index)
                }}
            />
        </div>
        

    )

}

export default TextBlock

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