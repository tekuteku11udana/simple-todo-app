import { stringify } from "querystring";
import { createContext, createRef, useEffect, useRef, useState } from "react";
import { Block } from "../type/type";

export const BlocksCtxState = createContext<Block[]>(undefined!)

export const BlocksCtxFunc = createContext<React.Dispatch<React.SetStateAction<Block[]>>>(undefined!)

type BlocksDatum = {
    id: string,
    text: string,
}


// TODO: delete blocksMutable
export const BlocksProvider = (props: any) => {
    const {children} = props

    const [blocks, setBlocks] = useState<Block[]>([])
    

    useEffect(() => {
        
        // fetch("/api/v1/blocks/")
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log("↓ in BlockProvider fetch()")
        //     console.log(data)
        //     // const newBlocks: Block[] = data.map(datum => {id: datum.id, text: datum.text, isSelected: false })
        //     // setBlocks(newBlocks)
            
            
        // })
        const initData = getDataFromAPI()
        initData
            .then(data => {
                const newBlocks = data.map(datum =>  {
                    const newBlock: Block= {id: datum.id, text: datum.text, isSelected: false}
                    return newBlock
                })
                // console.log(newBlocks)
                setBlocks(newBlocks)
            
            })
            
        
        
        
    },[])

    // const reformatData2Blocks = async () => {
    //     return await getDataFromAPI()
    //         .then(data => data.map(datum =>  {
    //             const newBlock: Block= {id: datum.id, text: datum.text, isSelected: false}
    //             return newBlock
    //         }))
        
    // }
    

    const getDataFromAPI = async () : Promise<BlocksDatum[]>=> {
        const response = await fetch("/api/v1/blocks/")
        const data = await response.json()
        // console.log(data)
        return data
    }

    

    return (
        <BlocksCtxFunc.Provider value={setBlocks} >
            <BlocksCtxState.Provider value={blocks} >
                {children}
            </BlocksCtxState.Provider>
            
        </BlocksCtxFunc.Provider>
    )
}

