import { createContext, useEffect, useState } from "react";
import { Block } from "../type/type";

export const BlocksContext = createContext({} as {
    blocks: Block[]
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
})



export const BlocksProvider = (props: any) => {
    const {children} = props

    const [blocks, setBlocks] = useState<Block[]>([])

    useEffect(() => {
        fetch("/api/v1/blocks/")
        .then((res) => res.json())
        .then((data) => {
            console.log("↓ in BlockProvider fetch()")
            console.log(data)
            setBlocks(data)
        })
        
        
    },[])

    return (
        <BlocksContext.Provider value={{blocks, setBlocks}} >
            {children}
        </BlocksContext.Provider>
    )
}