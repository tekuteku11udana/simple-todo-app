/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { useContext, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Block } from '../type/type';
import { BlocksCtxState, BlocksCtxFunc, BlocksCtxRef, BlocksCtxRefCallback, FocusedIndexCtxState, FocusedIndexCtxFunc, FocusedIndexRef } from '../providers/BlocksProvider';
import { UtilFuncs } from '../providers/UtilsProvider';

type TextBlockProps = {
    id: string
    index: number
    dndEvents: {
        ref: (e: HTMLElement | null) => void;
        onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    }  
}


export const TextBlock = (props: TextBlockProps) => {
    const blocks = useContext(BlocksCtxState)
    const blocksRef = useContext(BlocksCtxRef)
    const resisterRefs = useContext(BlocksCtxRefCallback)
    const focusedIndex = useContext(FocusedIndexCtxState)
    const setFocusedIndex = useContext(FocusedIndexCtxFunc)
    const focusedIndexRef = useContext(FocusedIndexRef)
    const {createNewBlock, deleteBlock, changeText, toggleSelect, execUndo, execRedo} = useContext(UtilFuncs)

    useEffect(() => {
        if (focusedIndexRef.current === props.index) {
            focusedIndexRef.current = null
            blocksRef.elms[props.index]?.focus()
        }
    },[focusedIndexRef.current])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === false) {
            e.preventDefault()
            createNewBlock(blocks, props.index, props.index + 1)
        }

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === true) {
            e.preventDefault()
            createNewBlock(blocks, props.index, props.index)
        }

        if (e.ctrlKey === true && e.key === 'h' && blocksRef.elms[props.index]?.selectionStart === 0) {
            deleteBlock(blocks, props.index, props.id)        
        }

        if (e.ctrlKey === true && e.key === 'n') {
            e.preventDefault()
            blocksRef.elms[props.index === blocks.length - 1 ? 0 : props.index + 1 ]?.focus()           
        }
        if (e.ctrlKey === true && e.key === 'p') {
            e.preventDefault()
            blocksRef.elms[props.index === 0 ? blocks.length - 1 : props.index - 1 ]?.focus()          
        }

        if (e.metaKey === true && e.key === 'z' && e.shiftKey === false) {
            execUndo(blocks, props.index)
        }

        if (e.metaKey === true && e.key === 'z' && e.shiftKey === true) {
            execRedo(blocks, props.index)
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
                    changeText(blocks, props.index, props.id, e.currentTarget.value)
                }}
                onMouseDown={(e) => {
                    blocksRef.elms[props.index]?.focus()
                    toggleSelect(blocks, props.index)
                }}
                onKeyDown={e => handleKeyDown(e)}
                ref={e => {
                    resisterRefs(e, props.index)
                }}
            />
        </div>
        

    )

}

