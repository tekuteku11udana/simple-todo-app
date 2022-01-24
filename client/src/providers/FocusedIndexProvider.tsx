import { createContext, useState } from "react";

export const FocusedIndexContext = createContext({} as {
    focusedIndex: number
    setFocusedIndex: React.Dispatch<React.SetStateAction<number>>
})

export const FocusedIndexProvider = ({children}: any) => {
    const [focusedIndex, setFocusedIndex] = useState(0)
    return (
        <FocusedIndexContext.Provider value={{focusedIndex, setFocusedIndex}} >
            {children}
        </FocusedIndexContext.Provider>
    )
}