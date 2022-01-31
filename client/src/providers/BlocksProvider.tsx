import { stringify } from "querystring";
import { createContext, createRef, useEffect, useRef, useState } from "react";
import { Block } from "../type/type";

export const BlocksCtxState = createContext<Block[]>(undefined!)
export const BlocksCtxFunc = createContext<React.Dispatch<React.SetStateAction<Block[]>>>(undefined!)
export const FocusedIndexCtxState = createContext<number>(0)
export const FocusedIndexCtxFunc = createContext<React.Dispatch<React.SetStateAction<number>>>(undefined!)
export const BlocksCtxRef = createContext<BlocksRef>(undefined!)



type BlocksDatum = {
    id: string,
    text: string,
}

type BlocksRef = {
    elms: (HTMLTextAreaElement | null)[]
}


// TODO: delete blocksMutable
export const BlocksProvider = (props: any) => {
    const {children} = props

    const [blocks, setBlocks] = useState<Block[]>([])
    const [focusedIndex, setFocusedIndex] = useState(0)
    const blocksRef = useRef<BlocksRef>({
        elms: []
    }).current
    

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
                <BlocksCtxRef.Provider value={blocksRef} >
                    <FocusedIndexCtxFunc.Provider value={setFocusedIndex} >
                        <FocusedIndexCtxState.Provider value={focusedIndex} >
                            {children}
                        </FocusedIndexCtxState.Provider>
                    </FocusedIndexCtxFunc.Provider>
                </BlocksCtxRef.Provider>   
            </BlocksCtxState.Provider>   
        </BlocksCtxFunc.Provider>
    )
}

