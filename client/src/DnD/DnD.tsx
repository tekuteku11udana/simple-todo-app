import { useState } from "react"
import { useContext, useRef } from "react"
import { idText } from "typescript"
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
    unselectedItems: DnDItem[]
    interruptIndexInUnselecteds: number
    handleItem: DnDItem | null
    canCheckHovered: boolean
    baseCursorPosition: Position
    // initHandlePosition: Position | null
    beenClustered: boolean
    
}

// export const DnDContext = useContext(undefined!)

const isHover = (firstSelectedElm: HTMLElement, lastSelectedElm: HTMLElement, hoveredElm: HTMLElement): boolean => {
    const {top:hoveredTop, bottom:hoveredBottom} = hoveredElm.getBoundingClientRect()
    const border = (hoveredTop + hoveredBottom) / 2
    const selectedTop = firstSelectedElm.getBoundingClientRect().top
    const selectedBottom = lastSelectedElm.getBoundingClientRect().bottom

    
    // console.log(`selectedTop: ${selectedTop}`)
    // console.log(`border: ${border}`)
    // console.log(`selectedBottom: ${selectedBottom}`)
    // console.log("---------")

    return (border > selectedTop && border < selectedBottom)
}


// export const useDnDBlocks = (blocksOfContext: Block[]) => {
export const useDnDBlocks = (blocksFromContext: Block[]) => {

    const blocks = useContext(BlocksCtxState)
    const setBlocks = useContext(BlocksCtxFunc)
    // const [blocks, setBlocks] = useState(blocksFromContext)
    


    const info = useRef<Info>({
        allItems: [],
        selectedItems: [],
        unselectedItems: [],
        interruptIndexInUnselecteds: 0,
        handleItem: null,
        canCheckHovered: true,
        baseCursorPosition: { x: 0, y: 0 },
        // initHandlePosition: null
        beenClustered: false,
        
    }).current

    const handleOnRef = (elm: HTMLElement | null, block: Block, index: number) => {
        console.log(`handleOnRef called elm === ${elm}`)
        // On unmount, element === null
        if (!elm) {
            // info.selectedItems = []
            // info.unselectedItems = []
            return
        }
        
        // reset position change
        elm.style.transform = "";

        const {left: x, top: y} = elm.getBoundingClientRect()
        const elmInitPosition : Position = {x, y}

        if (info.handleItem !== null) {
            
        }

        // info.selectedItems.forEach(item => {
        //     if (item.id === block.id) {
        //         const dx = item.pastBlockPosition.x - elmInitPosition.x
        //         const dy = item.pastBlockPosition.y - elmInitPosition.y
        //         elm.style.transform = `translate(${dx}px,${dy}px)`
        //         if (block.id === info.handleItem?.id) {
        //             info.pastCursorPosition.x -= dx
        //             info.pastCursorPosition.y -= dy
        //         }
                
        //     }   
            
        // })

        const currentItem = {
            id: block.id, 
            text: block.text, 
            isSelected: block.isSelected, 
            pastBlockPosition: elmInitPosition,
            elm: elm, 
        }

        info.allItems[index] = currentItem
    
    }

    const handleOnMouseDown = (e: React.MouseEvent<HTMLElement>, block: Block, index: number) => {
        if (block.isSelected === false) return


        // const elm = info.allItems[index].elm
        const elm = e.currentTarget

        const {left:x, top:y} = elm.getBoundingClientRect()
        const currentBlockPosition = {x,y}

        elm.style.transition = ""
        elm.style.cursor = "grabbing"

        info.beenClustered = false
        info.baseCursorPosition = {x: e.clientX, y: e.clientY}
        info.handleItem = {
            id: block.id, 
            text: block.text, 
            isSelected: block.isSelected,
            pastBlockPosition: currentBlockPosition,
            elm: elm
        }
        // info.initHandlePosition = currentBlockPosition
        // info.totalDisplacement = {x: 0, y: 0}

        info.selectedItems = info.allItems.filter(item => item.isSelected === true || item.id === block.id)
        info.unselectedItems = info.allItems.filter(item => item.isSelected === false && item.id !== block.id)
        
        
        // console.log(`block.id : ${block.id}`)
        // console.log(info.selectedItems[0])
        // console.log(info.selectedItems)
        // console.log(info.selectedItems[0])
        // // console.log(info.selectedItems[0].text)
        // console.log("-----------------------------")
        // const topId = info.selectedItems[0].id
        // info.selectedItems[0].id = "newId"
        // console.log(info.selectedItems)
        // console.log(info.selectedItems[0].id)

        const handleIndexInSelected = info.selectedItems.findIndex(item => item.id === block.id)
        info.interruptIndexInUnselecteds = index - handleIndexInSelected
        

        window.addEventListener("mousemove", handleOnMouseMove)
        window.addEventListener("mouseup", handleOnMouseUp)
    }

    const handleOnMouseMove = (e: MouseEvent) => {
        if (!info.handleItem) return

        const cursorDX = e.clientX - info.baseCursorPosition.x
        const cursorDY = e.clientY - info.baseCursorPosition.y
        // info.pastCursorPosition = {x: e.clientX, y: e.clientY}


        const {left: x , top: y} = info.handleItem.elm.getBoundingClientRect()
        info.handleItem.pastBlockPosition = {x,y}
        
        if (!info.beenClustered) {
        // if (info.totalDisplacement !== null) {
        //     info.totalDisplacement.x += cursorDX
        //     info.totalDisplacement.y += cursorDY

            info.handleItem.elm.style.zIndex = "100"
            info.handleItem.elm.style.transform = `translate(${cursorDX}px,${cursorDY}px)`

            // if (-100 < info.totalDisplacement.y && info.totalDisplacement.y < 100) return
            if (-10 < cursorDY && cursorDY < 10) return
            
            console.log("Enough drag!")
            
            info.selectedItems.forEach(item => {
                // if (item.id !== info.handleItem?.id) {
                //     item.elm.style.transform = `translate(${info.totalDisplacement?.x}px,${info.totalDisplacement?.y}px)`
                // }
                item.elm.style.transform = `translate(${cursorDX}px,${cursorDY}px)`
            })
            // info.totalDisplacement = null
            info.beenClustered = true

            const start = info.unselectedItems.slice(0, info.interruptIndexInUnselecteds)
            const end = info.unselectedItems.slice(info.interruptIndexInUnselecteds)
            const newItems = [...start, ...info.selectedItems, ...end]
            info.allItems = newItems
            const newBlocks: Block[] = newItems.map(item => {
                return {id: item.id, text: item.text, isSelected: item.isSelected}
            })
            setBlocks(newBlocks)
            
            return   
        } 
        info.selectedItems.forEach(item => item.elm.style.transform = `translate(${cursorDX}px,${cursorDY}px)`)


        if (!info.canCheckHovered) return

        info.canCheckHovered = false

        setTimeout(() => {
            info.canCheckHovered = true
        }, 300);


        const firstSelectedElm = info.selectedItems[0].elm
        const lastSelectedElm = info.selectedItems[info.selectedItems.length - 1].elm
        const hoveredIndexInUnselected = info.unselectedItems.findIndex(item => 
            isHover(firstSelectedElm, lastSelectedElm, item.elm) === true
        )

        if (hoveredIndexInUnselected === -1) return

        console.log("hovering detected")

        const dIndex = info.interruptIndexInUnselecteds
        const hIndex = hoveredIndexInUnselected
        let start : DnDItem[]
        let end : DnDItem[]
        // console.log(`dIndex=${dIndex} > hIndex=${hIndex} ?`)

        if (dIndex > hIndex) {
            start = info.unselectedItems.slice(0, hIndex)
            end = info.unselectedItems.slice(hIndex)
            info.interruptIndexInUnselecteds = hIndex
        } else {
            start = info.unselectedItems.slice(0, hIndex + 1)
            end = info.unselectedItems.slice(hIndex + 1)
            info.interruptIndexInUnselecteds = hIndex + 1
        }
        const newItems = [...start, ...info.selectedItems, ...end]
        info.allItems = newItems
        const newBlocks: Block[] = newItems.map(item => {
            return {id: item.id, text: item.text, isSelected: item.isSelected}
        })
        setBlocks(newBlocks)

    }

    const handleOnMouseUp = (e: MouseEvent) => {
        if (!info.handleItem) return

        info.handleItem.elm.style.zIndex = ""
        info.handleItem.elm.style.cursor = "grab"
        info.handleItem.elm.style.transform = ""
        info.selectedItems.forEach(item => item.elm.style.transform = "")

        info.selectedItems = []
        info.unselectedItems = []
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