import axios from "axios"
import { useEffect, useState } from "react"
import TextBlock from "./TextBlock"

type Block = {id: number, index: number, text: string}

const BlockList = () => {
    const [blocks, setBlocks] = useState<Block[]>([])
    
    useEffect(() => {
        fetch("/blocks/")
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setBlocks(data)
        })
        
        
    },[])
    console.log([{a: "b"}, {c: "d"}, {e: "f"}])

   return (
       <ul>
           {blocks.map((block) => <li key={block.id}><TextBlock text={block.text} /></li>)}
       </ul>
   ) 
}

export default BlockList