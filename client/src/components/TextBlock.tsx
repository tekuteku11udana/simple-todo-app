/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { stringify } from 'querystring';
import { useContext, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {v4 as uuidv4} from 'uuid';
import { BlocksAction } from '../action';
import { DataCtxBlocks, DataCtxInfo } from '../data';
import { ExecCtxAction } from '../execs';
import { UndoRedoCtxHistory, UndoRedoCtxInfo } from '../undoRedo';
type TextBlockProps = {
    id: string
    index: number
    dndEvents: {
        ref: (e: HTMLElement | null) => void;
        onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    }  
}

export const TextBlock = (props: TextBlockProps) => {
    const {blocks} = useContext(DataCtxBlocks)
    const {blocksInfo} = useContext(DataCtxInfo)
    const {execAction} = useContext(ExecCtxAction)
    const {addUndo, readUndo, readRedo} = useContext(UndoRedoCtxHistory)
    const {undoRedoInfo} = useContext(UndoRedoCtxInfo)

    const textBefore = useRef("")
    const textAfter = useRef("")

    useEffect(() => {
        textBefore.current = blocks[props.index].text
        console.log("initiate textBefore")
    },[])

    useEffect(() => {
        if (blocksInfo.focusedIndex === props.index) {
            blocksInfo.focus(props.index)
        }
    },[blocksInfo.focusedIndex])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === false) {
            e.preventDefault()
            const newId = uuidv4()
            const action: BlocksAction = {type: "CREATE", items: [{id: newId, index: props.index + 1, text: ""}] }
            addUndo(action)
            execAction(blocks, action)

        }

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === true) {
            e.preventDefault()
            const action: BlocksAction = {type: "CREATE", items: [{id: uuidv4(), index: props.index, text: ""}]}
            addUndo(action)
            execAction(blocks, action)
        }

        if (e.ctrlKey === true && e.key === 'h' && blocksInfo.elms[props.index]?.selectionStart === 0) {
            const action: BlocksAction = {type: "DELETE", items: [{id: props.id, index: props.index, text: blocks[props.index].text}]}
            addUndo(action)
            execAction(blocks, action)        
        }

        if (e.ctrlKey === true && e.key === 'n') {
            e.preventDefault()
            blocksInfo.focus(props.index === blocks.length - 1 ? 0 : props.index + 1)

        }
        if (e.ctrlKey === true && e.key === 'p') {
            e.preventDefault()
            blocksInfo.focus(props.index === 0 ? blocks.length - 1 : props.index - 1)          
        }

        if (e.metaKey === true && e.key === 'z' && e.shiftKey === false) {
            e.preventDefault()
            console.log("undo")
            execAction(blocks, readUndo({type: "NOTHING"}))
        }

        if (e.metaKey === true && e.key === 'z' && e.shiftKey === true) {
            e.preventDefault()
            execAction(blocks, readRedo({type: "NOTHING"}))
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
            // {...props.dndEvents}
            ref={e => props.dndEvents.ref(e)}
            onMouseDown={(e) => {
                props.dndEvents.onMouseDown(e)
                // execAction(blocks, {type: "SELECT", index: props.index, value: "TOGGLE"})
            }}
            >
            <TextareaAutosize 
                className={"rounded-lg bg-yellow-200 my-1 px-1"}
                style={{resize: "none"}}
                value={blocks[props.index].text} 
                onChange={e => {
                    const action: BlocksAction = {type: "TEXT", index: props.index, textBefore: textBefore.current, textAfter: e.currentTarget.value}
                    // if (undoRedoInfo.textChange.canAddHistory) {
                    //     addUndo(action)
                    //     textBefore.current = e.currentTarget.value
                    //     undoRedoInfo.textChange.canAddHistory = false
                    // }
                    addUndo(action)
                    textBefore.current = e.currentTarget.value
                    textAfter.current = e.currentTarget.value
                    execAction(blocks, action)
                }}
                onFocus={e => blocksInfo.focusedIndex = props.index}
                onMouseDown={e => execAction(blocks, {type: "SELECT", index: props.index, value: "TOGGLE"})}
                onKeyDown={e => handleKeyDown(e)}
                ref={e => {
                    // resisterElms(e, props.index)
                    blocksInfo.resisterElms(e, props.index)
                }}
            />
        </div>
        

    )

}

