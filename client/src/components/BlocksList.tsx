/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react"
import { useDnDBlocks } from '../DnD/DnD';
import { BlocksCtxState, BlocksCtxFunc } from "../providers/BlocksProvider";
import { FocusedIndexCtxState } from "../providers/FocusedIndexProvider";
import { Block } from "../type/type";
import TextBlock from "./TextBlock"





const BlocksList = () => {
    
    const focusedIndex = useContext(FocusedIndexCtxState)

    const results = useDnDBlocks()
    

    return ( 
        <div>
            {results.map((result, index) =>                            
                
                    <TextBlock 
                        key={result.id}
                        id={result.id} 
                        index={index} 
                        isFocused={focusedIndex === index}
                        dndEvents={result.dndEvents}
                    />
                
            )}
        </div>
    )  
}

export default BlocksList