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
    // blockElmRefs: React.MutableRefObject<React.RefObject<HTMLTextAreaElement>[]>   
}


const TextBlock = (props: TextBlockProps) => {
    const {blocks, setBlocks} = useContext(BlocksContext)
    const {focusedIndex, setFocusedIndex} = useContext(FocusedIndexContext)

    const elmRef = useRef<HTMLTextAreaElement>(null)
    const blocksMutable = useRef(blocks).current
    const [text, setText] = useState(blocks[props.index].text)

    if (props.isFocused) {
        elmRef.current?.focus()
    }
    
    useEffect(() => {
        if (props.isFocused) {
            elmRef.current?.focus()
        }
    }, [props.isFocused])

    useEffect(() => {
        putNewText(props.id, props.index, text)
    }, [text])



    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        console.log(`${elmRef.current?.selectionStart} : selectionStart`)

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === false) {
            e.preventDefault()

            const newId = uuidv4()
            const newIndex = props.index + 1
            const newText = 'New line created below!'
            blocksMutable.splice(newIndex, 0, {id: newId, text: newText})
            const newBlocks = [...blocksMutable]

            postNewBlock(newId, newIndex, newText)
            putAllBlocks(newBlocks)
            
            setBlocks(newBlocks)
        }

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === true) {
            e.preventDefault()

            const newId = uuidv4()
            const newIndex = props.index
            const newText = 'New line created above!'
            blocksMutable.splice(newIndex, 0, {id: newId, text: newText})
            const newBlocks = [...blocksMutable]

            postNewBlock(newId, newIndex, newText)
            putAllBlocks(newBlocks)
            
            setBlocks(newBlocks)

        }

        if (e.ctrlKey === true && e.key === 'h' && elmRef.current?.selectionStart === 0) {
            blocksMutable.splice(props.index, 1)
            const newBlocks = [...blocksMutable]

            fetch(`/api/v1/blocks/${props.id}`, {
                method: 'DELETE',
            })
            putAllBlocks(newBlocks)

            setBlocks(newBlocks)

            
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

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        
    }

    return (
        <div>
            <TextareaAutosize 
                value={text} 
                onChange={e => setText(e.currentTarget.value)}
                onKeyDown={e => handleKeyDown(e)}
                // ref={blockElmRefs.current[props.index]}
                ref={elmRef}
            />
            <button onClick={e => handleOnClick(e, props.index)} >Click</button>
        </div>
        

    )

// })
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