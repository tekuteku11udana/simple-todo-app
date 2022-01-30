import { useContext } from "react"
import { BlocksCtxSetfunc, BlocksCtxState } from "../providers/BlocksProvider"

export const DnDField = () => {
    const blocks = useContext(BlocksCtxState)
    const setBlocks = useContext(BlocksCtxSetfunc)

    
}