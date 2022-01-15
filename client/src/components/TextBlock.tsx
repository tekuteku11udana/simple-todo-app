import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

type TextBlockProps = {
    text :string
}

const TextBlock = (props: TextBlockProps) => {
    console.log(props.text)
    const [text, setText] = useState(props.text)
    return (
       <TextareaAutosize value={text} onChange={e => setText(e.currentTarget.value)}/>

    )

}

export default TextBlock