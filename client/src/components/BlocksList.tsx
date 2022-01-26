/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react"
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { BlocksContext } from "../providers/BlocksProvider";
import { FocusedIndexContext } from "../providers/FocusedIndexProvider";
import { Block } from "../type/type";
import TextBlock from "./TextBlock"





const BlocksList = () => {
    const {blocks, setBlocks} = useContext(BlocksContext)
    const {focusedIndex} = useContext(FocusedIndexContext)

    const handleOnDrugEnd = (result: DropResult) => {
        const newBlocks = Array.from(blocks)
        const [reorderedBlock] = newBlocks.splice(result.source.index, 1)
        if (!result.destination) return
        newBlocks.splice(result.destination.index, 0, reorderedBlock)

        setBlocks(blocks)
    }

    return (     
        <DragDropContext 
                onDragEnd={handleOnDrugEnd}
            >
        
            
            <Droppable droppableId='1'>
                {provided => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {blocks.map((block, index) => 
                            <Draggable key={block.id} draggableId={block.id} index={index}>
                                {provided => (
                                    <li key={block.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                                        css={css`
                                            margin: 8px;
                                            border: 1px solid lightgrey;
                                            border-radius: 2px
                                        `}>
                                        <TextBlock 
                                            id={block.id} 
                                            index={index} 
                                            isFocused={focusedIndex === index}
                                        />
                                    </li>
                                )}
                                
                            </Draggable>
                            )
                        }
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
       </DragDropContext>
        
       
       
   ) 
}

export default BlocksList