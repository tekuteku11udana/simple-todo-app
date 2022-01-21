import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

type TextBlockProps = {
    id: number
    index: number
    text :string
}

const TextBlock = (props: TextBlockProps) => {
    const [text, setText] = useState(props.text)
    console.log(text)

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