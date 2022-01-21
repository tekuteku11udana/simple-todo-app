import axios from "axios"
import { createContext, useEffect, useState } from "react"
import TextBlock from "./TextBlock"

type Block = {id: number, index: number, text: string}

export const BlocksContext = createContext([] as Block[]);

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
    // console.log([{a: "b"}, {c: "d"}, {e: "f"}])

   return (
       <BlocksContext.Provider value={blocks} >
            <ul>
                {blocks.map((block) => <li key={block.id}><TextBlock id={block.id} index={block.index}  /></li>)}
            </ul>
       </BlocksContext.Provider>
       
   ) 
}

export default BlockList