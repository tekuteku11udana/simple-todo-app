import { useContext } from "react"
import { BlocksCtxState } from "../providers/BlocksProvider"
import BlocksList from "./BlocksList"

export const MuxOnLoading = () => {
    const blocks = useContext(BlocksCtxState)
    console.log(blocks)
    if (blocks === []) {
        return (
            <div>Loading...</div>
        )
    } else {
        return <BlocksList />
    }
}