
import { createContext, createRef, useEffect, useRef, useState } from "react";
import { Block } from "./type";

export const CtxBlocks = createContext<{
    blocks: Block[]
}>(undefined!)

export const CtxFunc = createContext<{
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
}>(undefined!)

type BlocksDatum = {
    id: string,
    text: string,
}

export const ProviderBlocks = ({children}: any) => {
    
    const [blocks, setBlocks] = useState<Block[]>([])
 
    useEffect(() => {
        const initData = getDataFromAPI()
        initData
            .then(data => {
                const newBlocks = data.map(datum =>  {
                    const newBlock: Block= {id: datum.id, text: datum.text, isSelected: false}
                    return newBlock
                })
                setBlocks(newBlocks)
            })
    },[])

    const getDataFromAPI = async () : Promise<BlocksDatum[]>=> {
        const response = await fetch("/api/v1/blocks/")
        const data = await response.json()
        // console.log(data)
        return data
    }

    return (
        <CtxFunc.Provider value={{setBlocks}} >
            <CtxBlocks.Provider value={{blocks}} >
                {children}   
            </CtxBlocks.Provider>   
        </CtxFunc.Provider>
    )
}

