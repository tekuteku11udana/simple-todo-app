import axios from "axios"
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react"
import { BlocksContext } from "../providers/BlocksProvider";
import { FocusedIndexContext } from "../providers/FocusedIndexProvider";
import { Block } from "../type/type";
import TextBlock from "./TextBlock"





const BlocksList = () => {
   const {blocks} = useContext(BlocksContext)
   const {focusedIndex} = useContext(FocusedIndexContext)

   return (     
        <ul className="flex flex-col p-2 bg-red-400 flex-grow">
            {blocks.map((block, index) => 
                <li key={block.id}>
                    <TextBlock 
                        id={block.id} 
                        index={index} 
                        isFocused={focusedIndex === index}
                    />
                </li>)
            }
        </ul>
       
       
   ) 
}

export default BlocksList