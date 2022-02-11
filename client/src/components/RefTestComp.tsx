import { useState } from "react"
import { useContext } from "react"
import { DataCtxBlocks, DataCtxInfo } from "../data"
// import { BlocksInfoCtx } from "../data/InfoProvider"
// import { BlocksCtxState } from "../data/BlocksProvider"
export const RefTestComp = () => {
    // const blocksInfo = useContext(BlocksCtxRef)
    const {blocksInfo} = useContext(DataCtxInfo)
    const [text, setText] = useState("1")
    const [index, setIndex] = useState(0)
    const {blocks} = useContext(DataCtxBlocks)
    

    return ( 
    <div>
        <textarea 
            value={text} 
            onChange={e => {
                setText(e.currentTarget.value)
            }}
        />
        <button 
            onClick={() => {
                if (index >= blocks.length - 1) {
                    blocksInfo.elms[0]?.focus()
                    setIndex(0)
                } else {
                    blocksInfo.elms[index + 1]?.focus()
                    setIndex(prevIndex => prevIndex + 1)
                }
                
            }}
        >Focus
        </button>
    </div>
        
    )
    
}