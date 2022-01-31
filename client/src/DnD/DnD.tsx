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
    selectedItems: DnDItem[]
    nonSelectedItems: DnDItem[]
    interruptIndex: number
    handleItem: DnDItem | null
    canCheckHovered: boolean
    pastCursorPosition: Position
    // initHandlePosition: Position | null
    totalDisplacement: Position | null
}

// export const DnDContext = useContext(undefined!)



export const useDnDBlocks = () => {
    const blocks = useContext(BlocksCtxState)
    const setBlocks = useContext(BlocksCtxFunc)

    const info = useRef<Info>({
        allItems: [],
        selectedItems: [],
        nonSelectedItems: [],
        interruptIndex: 0,
        handleItem: null,
        canCheckHovered: true,
        pastCursorPosition: { x: 0, y: 0 },
        // initHandlePosition: null
        totalDisplacement: null,
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

    const handleOnMouseDown = (e: React.MouseEvent<HTMLElement>, block: Block, index: number) => {
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
        // info.initHandlePosition = currentBlockPosition
        info.totalDisplacement = {x: 0, y: 0}

        info.selectedItems = info.allItems.filter(item => item.isSelected === true)
        info.nonSelectedItems = info.allItems.filter(item => item.isSelected === false)
        info.interruptIndex = index

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
        // const currentHandlePosition = {
        //     x: info.handleItem.pastBlockPosition.x + cursorDX, 
        //     y: info.handleItem.pastBlockPosition.y + cursorDY
        // }

        

        // if (info.initHandlePosition) {
        if (info.totalDisplacement) {
            info.totalDisplacement.x += cursorDX
            info.totalDisplacement.y += cursorDY
            // const handleDX = currentHandlePosition.x - info.initHandlePosition.x
            // const handleDY = currentHandlePosition.y - info.initHandlePosition.y
            info.handleItem.elm.style.transform = `translate(${cursorDX}px,${cursorDY}px)`
            // if ( handleDY > 100 || handleDY < -100) {
            if ( info.totalDisplacement.y > 100 || info.totalDisplacement.y < -100) {
                console.log("Enough drag!")
                // info.initHandlePosition = null
                
                info.selectedItems.forEach(item => {
                    if (item.id !== info.handleItem?.id) {
                        item.elm.style.transform = `translate(${info.totalDisplacement?.x}px,${info.totalDisplacement?.y}px)`
                    }
                })
                info.totalDisplacement = null
            } else {
                
            }
            
        } else {
            info.selectedItems.forEach(item => item.elm.style.transform = `translate(${cursorDX}px,${cursorDY}px)`)
        }

        // info.handleItem.pastBlockPosition = currentHandlePosition


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
                onMouseDown: (e: React.MouseEvent<HTMLElement>) => handleOnMouseDown(e, block, index),
            }
        }
    })


}