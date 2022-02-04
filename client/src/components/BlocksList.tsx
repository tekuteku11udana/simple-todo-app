/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react"
import { useDnDBlocks } from '../DnD/DnD';
import { BlocksCtxState, BlocksCtxFunc, FocusedIndexCtxState} from "../providers/BlocksProvider";
import { Block } from "../type/type";
import {TextBlock} from "./TextBlock"





export const BlocksList = () => {
    
    const results = useDnDBlocks()
    
    return ( 
        <div>
            {results.map((result, index) =>                            
                
                    <TextBlock 
                        key={result.id}
                        id={result.id} 
                        index={index} 
                        dndEvents={result.dndEvents}
                    />
                
            )}
        </div>
    )  
}

