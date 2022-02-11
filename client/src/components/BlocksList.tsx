/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { useDnDBlocks } from '../DnD/DnD';
import {TextBlock} from "./TextBlock"

export const BlocksList = () => {
    
    const results = useDnDBlocks()
    
    return ( 
        <div>
            {results.map((result, index) =>                            
                
                    <TextBlock 
                        key={result.id}
                        id={result.id} 
                        index={index} 
                        dndEvents={result.dndEvents}
                    />
            )}
        </div>
    )  
}

