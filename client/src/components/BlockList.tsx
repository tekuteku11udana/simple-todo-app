import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { BlocksContext } from "../providers/BlockProvider";
import { Block } from "../type/type";
import TextBlock from "./TextBlock"





const BlockList = () => {
   const {blocks, setBlocks} = useContext(BlocksContext)
    
    console.log("Parent rendered")
    console.log(blocks)

   return (
       
        <ul>
            {blocks.map((block, index) => <li key={block.id}><TextBlock id={block.id} index={index}  /></li>)}
        </ul>
       
       
   ) 
}

export default BlockList