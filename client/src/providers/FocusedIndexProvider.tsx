import { createContext, useState } from "react";

export const FocusedIndexCtxState = createContext<number>(0)
export const FocusedIndexCtxFunc = createContext<React.Dispatch<React.SetStateAction<number>>>(undefined!)

export const FocusedIndexProvider = ({children}: any) => {
    const [focusedIndex, setFocusedIndex] = useState(0)
    return (
        <FocusedIndexCtxState.Provider value={focusedIndex} >
            <FocusedIndexCtxFunc.Provider value={setFocusedIndex} >
                {children}
            </FocusedIndexCtxFunc.Provider>
            
        </FocusedIndexCtxState.Provider>
    )
}