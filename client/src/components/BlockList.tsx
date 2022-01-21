import axios from "axios"
import { useEffect } from "react"
import TextBlock from "./TextBlock"

const BlockList = () => {
    const texts = [
        {key:1, text: "ab"},
        {key:2, text: "cd"},
        {key:3, text: "ef"}
    ]
    
    useEffect(() => {
        fetch("/blocks/")
        .then((res) => res.json())
        .then((data) => console.log(data))
        
        
    },[])

   return (
       <ul>
           {texts.map((text) => <li key={text.key}><TextBlock text={text.text} /></li>)}
       </ul>
   ) 
}

export default BlockList