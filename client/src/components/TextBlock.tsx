import { useContext, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Block } from '../type/type';

import {v4 as uuidv4} from 'uuid';
import { BlocksContext } from '../providers/BlockProvider';
import { IsOnCompContext } from '../providers/IsOnCompProvider';

type TextBlockProps = {
    id: string
    index: number
    
    
}

const TextBlock = (props: TextBlockProps) => {
    const {blocks, setBlocks} = useContext(BlocksContext)
    const {isOnComp} = useContext(IsOnCompContext)
    
    const blocksRef = useRef(blocks).current

    const [text, setText] = useState(blocks[props.index].text)
    

    useEffect(() => {
        fetch(`/api/v1/blocks/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([{id: props.id, index: props.index, text: text}])
        })
        .then(data => {
        })
        .catch((err) => {
            console.error('ERROR: ', err)
        })
    }, [text])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // console.log(`${e.key} pressed on textarea no.${props.index}`)
        // e.preventDefault()
        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === false) {
            e.preventDefault()

            const newId = uuidv4()
            const newIndex = props.index + 1
            const newText = 'New line created below!'

            blocksRef.splice(newIndex, 0, {id: newId, text: newText})

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

            fetch(`/api/v1/blocks/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blocksRef)
            })
            
            .then(data => {
                
            })
            .catch((err) => {
                console.error('ERROR: ', err)
            })

            const newBlocks = [...blocksRef]


            console.log("↓ in Child handleKeyDown()")
            console.log(newBlocks)
            setBlocks(newBlocks)
        }

        if (e.key === 'Enter' && e.shiftKey === true && e.ctrlKey === true) {
            e.preventDefault()

            const newId = uuidv4()
            const newIndex = props.index
            const newText = 'New line created above!'

            blocksRef.splice(newIndex, 0, {id: newId, text: newText})

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

            fetch(`/api/v1/blocks/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blocksRef)
            })
            
            .then(data => {
                
            })
            .catch((err) => {
                console.error('ERROR: ', err)
            })

            const newBlocks = [...blocksRef]


            console.log("↓ in Child handleKeyDown()")
            console.log(newBlocks)
            setBlocks(newBlocks)
        }
        
    }

    console.log("Child rendered")

    return (
        <TextareaAutosize 
            value={text} 
            onChange={e => setText(e.currentTarget.value)}
            onKeyDown={e => handleKeyDown(e)}
        />

    )

}

export default TextBlock