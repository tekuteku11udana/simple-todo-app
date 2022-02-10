/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { useContext, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {v4 as uuidv4} from 'uuid';
import { Block } from '../data/type';
import { BlocksCtxState, BlocksCtxFunc, BlocksCtxRef, BlocksCtxRefCallback, FocusedIndexCtxState, FocusedIndexCtxFunc, FocusedIndexRef } from '../data/BlocksProvider';
import { UndoRedoCtxHistory } from '../undoRedo/HistoryProvider';
import { ExecActionCtx } from '../execs/ExecActionProvider';
import { BlocksAction } from '../action/actionTypes';
// import { UtilFuncs } from '../utils/UtilsProvider';

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
    const focusedIndexRef = useContext(FocusedIndexRef)
    const {actionExec} = useContext(ExecActionCtx)
    const {addUndo, readUndo, readRedo} = useContext(UndoRedoCtxHistory)

    useEffect(() => {
        if (focusedIndexRef.current === props.index) {
            focusedIndexRef.current = null
            blocksRef.elms[props.index]?.focus()
        }
    },[focusedIndexRef.current])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === false) {
            e.preventDefault()
            const newId = uuidv4()
            const action: BlocksAction = {type: "CREATE", items: [{id: newId, index: props.index + 1, text: ""}] }
            addUndo(action)
            actionExec(blocks, action)

        }

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === true) {
            e.preventDefault()
            const action: BlocksAction = {type: "CREATE", items: [{id: uuidv4(), index: props.index, text: ""}]}
            addUndo(action)
            actionExec(blocks, action)
        }

        if (e.ctrlKey === true && e.key === 'h' && blocksRef.elms[props.index]?.selectionStart === 0) {
            const action: BlocksAction = {type: "DELETE", items: [{id: props.id, index: props.index, text: blocks[props.index].text}]}
            addUndo(action)
            actionExec(blocks, action)        
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
            actionExec(blocks, readUndo({type: "TEXT", index: props.index, text: e.currentTarget.value}))
        }

        if (e.metaKey === true && e.key === 'z' && e.shiftKey === true) {
            actionExec(blocks, readRedo({type: "TEXT", index: props.index, text: e.currentTarget.value}))
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
                    const action: BlocksAction = {type: "TEXT", index: props.index, text: e.currentTarget.value}
                    addUndo(action)
                    actionExec(blocks, action)
                }}
                onMouseDown={(e) => {
                    blocksRef.elms[props.index]?.focus()
                    actionExec(blocks, {type: "SELECT", index: props.index, value: "TOGGLE"})
                }}
                onKeyDown={e => handleKeyDown(e)}
                ref={e => {
                    resisterRefs(e, props.index)
                }}
            />
        </div>
        

    )

}

