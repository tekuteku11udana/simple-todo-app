/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react"
import { BlocksCtxState, BlocksCtxSetfunc } from "../providers/BlocksProvider";
import { FocusedIndexCtxState } from "../providers/FocusedIndexProvider";
import { Block } from "../type/type";
import TextBlock from "./TextBlock"





const BlocksList = () => {
    const blocks = useContext(BlocksCtxState)
    const focusedIndex = useContext(FocusedIndexCtxState)

    

    return ( 
        <div>
            {blocks.map((block, index) =>                            
                
                    <TextBlock 
                        key={block.id}
                        id={block.id} 
                        index={index} 
                        isFocused={focusedIndex === index}
                    />
                
            )}
        </div>
    )  
}

export default BlocksList