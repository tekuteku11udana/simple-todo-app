import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Block } from '../type/type';

import {v4 as uuidv4} from 'uuid';
import { BlocksContext } from '../providers/BlocksProvider';
import { IsOnCompContext } from '../providers/IsOnCompProvider';
import { FocusedIndexContext } from '../providers/FocusedIndexProvider';

type TextBlockProps = {
    id: string
    index: number
    isFocused: boolean  
}


const TextBlock = (props: TextBlockProps) => {
    const {blocks, setBlocks} = useContext(BlocksContext)
    const {focusedIndex, setFocusedIndex} = useContext(FocusedIndexContext)

    const elmRef = useRef<HTMLTextAreaElement>(null)
    
    useEffect(() => {
        if (props.isFocused) {
            elmRef.current?.focus()
        }
    })

    useEffect(() => {
        putNewText(props.id, props.index, blocks[props.index].text)
    }, [blocks[props.index].text])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === false) {
            e.preventDefault()

            const newId = uuidv4()
            const newIndex = props.index + 1
            const newText = ''
            const newBlocks = [...blocks]
            newBlocks.splice(newIndex, 0, {id: newId, text: newText})
            
            postNewBlock(newId, newIndex, newText)
            putAllBlocks(newBlocks)
            
            setBlocks(newBlocks)
            setFocusedIndex(newIndex)
        }

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === true) {
            e.preventDefault()

            const newId = uuidv4()
            const newIndex = props.index
            const newText = ''
            const newBlocks = [...blocks]
            newBlocks.splice(newIndex, 0, {id: newId, text: newText})

            postNewBlock(newId, newIndex, newText)
            putAllBlocks(newBlocks)
            
            setBlocks(newBlocks)

        }

        if (e.ctrlKey === true && e.key === 'h' && elmRef.current?.selectionStart === 0) {
            const newBlocks = [...blocks]
            newBlocks.splice(props.index, 1)

            fetch(`/api/v1/blocks/${props.id}`, {
                method: 'DELETE',
            })
            putAllBlocks(newBlocks)
            console.log(`DELETEで、下のが残った。`)
            console.log(newBlocks)

            setBlocks(newBlocks)
            setFocusedIndex(props.index === 0 ? 0 : props.index - 1)           
        }

        if (e.ctrlKey === true && e.key === 'n') {
            e.preventDefault()
            setFocusedIndex(focusedIndex === blocks.length - 1 ? 0 : focusedIndex + 1 )            
        }
        if (e.ctrlKey === true && e.key === 'p') {
            e.preventDefault()
            setFocusedIndex(focusedIndex === 0 ? blocks.length - 1 : focusedIndex - 1 )            
        }
        
    }

    return (
        <div>
            <TextareaAutosize 
                value={blocks[props.index].text} 
                onChange={e => {
                    const newBlocks = [...blocks]
                    newBlocks.splice(props.index, 1, {id: props.id, text: e.currentTarget.value})
                    setBlocks(newBlocks)
                }}
                onMouseDown={() => setFocusedIndex(props.index)}
                onKeyDown={e => handleKeyDown(e)}
                ref={elmRef}
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