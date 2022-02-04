import { useState } from "react"
import { useContext } from "react"
import { BlocksCtxRef, BlocksCtxState } from "../providers/BlocksProvider"
export const RefTestComp = () => {
    const blocksRef = useContext(BlocksCtxRef)
    const [text, setText] = useState("1")
    const [index, setIndex] = useState(0)
    const blocks = useContext(BlocksCtxState)
    

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
                    blocksRef.elms[0]?.focus()
                    setIndex(0)
                } else {
                    blocksRef.elms[index + 1]?.focus()
                    setIndex(prevIndex => prevIndex + 1)
                }
                
            }}
        >Focus
        </button>
    </div>
        
    )
    
}