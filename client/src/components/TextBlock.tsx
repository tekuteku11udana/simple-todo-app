import { useContext, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Block } from '../type/type';
import { BlocksContext } from './BlockList';
import {v4 as uuidv4} from 'uuid';

type TextBlockProps = {
    id: string
    index: number
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
    
}

const TextBlock = (props: TextBlockProps) => {
    const blocksContext = useContext(BlocksContext)
    const blocksRef = useRef(blocksContext)
    const [text, setText] = useState(blocksContext[props.index].text)
    // console.log(`useContext: ${text}`)

    useEffect(() => {
        fetch(`/blocks/${props.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: props.id, index: props.index, text: text})
        })
        // .then(res => res.json())
        .then(data => {
            // console.log(`id = ${props.id} : ${text} send to backend.`)
        })
        .catch((err) => {
            console.error('ERROR: ', err)
        })
    }, [text])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // console.log(`${e.key} pressed on textarea no.${props.index}`)
        // e.preventDefault()
        if (e.key === 'Enter') {
            console.log(`Enter!`)
            const time = new Date()
            props.setBlocks(blocksRef.current.splice(props.index + 1, 0, {id: uuidv4(), index: props.index + 1, text: ''}))
        }
        
    }

    return (
        <TextareaAutosize 
            value={text} 
            onChange={e => setText(e.currentTarget.value)}
            onKeyDown={e => handleKeyDown(e)}
        />

    )

}

export default TextBlock