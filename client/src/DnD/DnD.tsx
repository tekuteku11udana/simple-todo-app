import { useContext, useRef } from "react"
import { BlocksCtxFunc, BlocksCtxState } from "../providers/BlocksProvider"
import { Block } from "../type/type"

type Position = {
    x: number
    y: number
}

type DnDItem = {
    id: string
    text: string
    isSelected: boolean
    pastBlockPosition: Position
    elm: HTMLElement
}

type Info = {
    allItems: DnDItem[]
    handleItem: DnDItem | null
    canCheckHovered: boolean
    pastCursorPosition: Position
    handleInitTopLeftPosition: Position | null
}

// export const DnDContext = useContext(undefined!)



export const useDnDBlocks = () => {
    const blocks = useContext(BlocksCtxState)
    const setBlocks = useContext(BlocksCtxFunc)

    const info = useRef<Info>({
        allItems: [],
        handleItem: null,
        canCheckHovered: true,
        pastCursorPosition: { x: 0, y: 0 },
        handleInitTopLeftPosition: null
    }).current

    const handleOnRef = (elm: HTMLElement | null, block: Block, index: number) => {
        // On unmount, element === null
        if (!elm) return
        
        // reset position change
        elm.style.transform = "";

        const {left: x, top: y} = elm.getBoundingClientRect()
        const currentBlockPosition : Position = {x, y}

        info.allItems[index] = {
            id: block.id, 
            text: block.text, 
            isSelected: block.isSelected, 
            pastBlockPosition: currentBlockPosition,
            elm: elm, 
        }
    }

    const handleOnMouseDown = (e: React.MouseEvent<HTMLElement>, block: Block) => {
        // const elm = info.allItems[index].elm
        const elm = e.currentTarget

        const {left:x, top:y} = elm.getBoundingClientRect()
        const currentBlockPosition = {x,y}

        elm.style.transition = ""
        elm.style.cursor = "grabbing"

        info.pastCursorPosition = {x: e.clientX, y: e.clientY}
        info.handleItem = {
            id: block.id, 
            text: block.text, 
            isSelected: block.isSelected,
            pastBlockPosition: currentBlockPosition,
            elm: elm
        }
        info.handleInitTopLeftPosition = currentBlockPosition

        window.addEventListener("mousemove", handleOnMouseMove)
        window.addEventListener("mouseup", handleOnMouseUp)
    }

    const handleOnMouseMove = (e: MouseEvent) => {
        if (!info.handleItem) return

        const cursorDX = e.clientX - info.pastCursorPosition.x
        const cursorDY = e.clientY - info.pastCursorPosition.y

        info.handleItem.elm.style.zIndex = "100"
        info.handleItem.elm.style.transform = `translate(${cursorDX}px,${cursorDY}px)`

        const {left: x , top: y} = info.handleItem.elm.getBoundingClientRect()
        info.handleItem.pastBlockPosition = {x,y}

        // if (!info.canCheckHovered) return

        // info.canCheckHovered = false

        // setTimeout(() => {
        //     info.canCheckHovered = true
        // }, 300);

        // const handleIndex = info.allItems.findIndex(item => item.id === info.handleItem?.id)


    }

    const handleOnMouseUp = (e: MouseEvent) => {
        if (!info.handleItem) return

        info.handleItem.elm.style.zIndex = ""
        info.handleItem.elm.style.cursor = "grab"
        info.handleItem.elm.style.transform = ""

        info.handleItem = null
        window.removeEventListener("mousemove", handleOnMouseMove)
        window.removeEventListener("mouseup", handleOnMouseUp)
    }



    return blocks.map((block, index) => {
        return {
            id: block.id,
            text: block.text,
            isSelected: block.isSelected,
            dndEvents: {
                ref: (e: HTMLElement | null) => handleOnRef(e, block, index),
                onMouseDown: (e: React.MouseEvent<HTMLElement>) => handleOnMouseDown(e, block),
            }
        }
    })


}