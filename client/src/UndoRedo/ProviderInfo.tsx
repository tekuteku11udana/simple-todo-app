import { createContext, useRef } from "react";

type Info = {
    textChange: {
        textBefore: string
        textAfter: string
        canAddHistory: boolean
    }
    rearrangeIndices: {
        startIndex: number,
        endIndex: number
    }[]
    isNothing: boolean
}

export const CtxInfo = createContext<{
    undoRedoInfo: Info
}>(undefined!)

export const ProviderInfo = ({children}: any) => {
    const undoRedoInfo = useRef<Info>({
        // for "TEXT"
        textChange: {
            textBefore: "",
            textAfter: "",
            canAddHistory: false
        },

        // for "REARRANGE"
        rearrangeIndices: [],

        // if isNothing === true, action.type should be "NOTHING"
        isNothing: true
    }).current

    return (
        <CtxInfo.Provider value={{undoRedoInfo}} >
            {children}
        </CtxInfo.Provider>
    )

}