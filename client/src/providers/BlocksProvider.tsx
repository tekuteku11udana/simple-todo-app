import { createContext, createRef, useEffect, useRef, useState } from "react";
import { Block } from "../type/type";

export const BlocksCtxState = createContext<Block[]>(undefined!)

export const BlocksCtxSetfunc = createContext<React.Dispatch<React.SetStateAction<Block[]>>>(undefined!)



// TODO: delete blocksMutable
export const BlocksProvider = (props: any) => {
    const {children} = props

    const [blocks, setBlocks] = useState<Block[]>([])
    

    useEffect(() => {
        (async function() {
            const response = await fetch("/api/v1/blocks/")


        })()
            
        
        fetch("/api/v1/blocks/")
        .then((res) => res.json())
        .then((data) => {
            console.log("↓ in BlockProvider fetch()")
            console.log(data)
            setBlocks(data)
            
            
        })
        
        
    },[])

    

    return (
        <BlocksCtxSetfunc.Provider value={setBlocks} >
            <BlocksCtxState.Provider value={blocks} >
                {children}
            </BlocksCtxState.Provider>
            
        </BlocksCtxSetfunc.Provider>
    )
}

