
import { css, jsx } from '@emotion/react'
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react"
import { BlocksContext } from "../providers/BlocksProvider";
import { FocusedIndexContext } from "../providers/FocusedIndexProvider";
import { Block } from "../type/type";
import TextBlock from "./TextBlock"





const BlocksList = () => {
   const {blocks} = useContext(BlocksContext)
   const {focusedIndex} = useContext(FocusedIndexContext)

   return (     
        <ul >
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