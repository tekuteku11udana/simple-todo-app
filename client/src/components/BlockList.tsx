import TextBlock from "./TextBlock"

const BlockList = () => {
    const texts = [
        {key:1, text: "ab"},
        {key:2, text: "cd"},
        {key:3, text: "ef"}
    ]

   return (
       <ul>
           {texts.map((text) => <li key={text.key}><TextBlock text={text.text} /></li>)}
       </ul>
   ) 
}

export default BlockList