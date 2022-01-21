import { useContext, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { BlocksContext } from './BlockList';

type TextBlockProps = {
    id: number
    index: number
    
}

const TextBlock = (props: TextBlockProps) => {
    const blocksContext = useContext(BlocksContext)
    const [text, setText] = useState(blocksContext[props.id].text)
    console.log(`useContext: ${text}`)

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
            console.log(`id = ${props.id} : ${text} send to backend.`)
        })
        .catch((err) => {
            console.error('ERROR: ', err)
        })
    }, [text])

    return (
       <TextareaAutosize value={text} onChange={e => setText(e.currentTarget.value)}/>

    )

}

export default TextBlock