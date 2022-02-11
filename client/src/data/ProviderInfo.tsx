import { createContext, useRef } from "react";

type InfoType = {
    focusedIndex: number
    elms: (HTMLTextAreaElement | null)[]
    isOnComp: boolean,
    resisterElms: (e: HTMLTextAreaElement | null, index: number) => void
    focus: (index: number) => void
}

export const CtxInfo = createContext<{
    blocksInfo: InfoType
}>(undefined!)

export const ProviderInfo = ({children}: any) => {
    const blocksInfo: InfoType = useRef({
        focusedIndex: 0,
        elms: [],
        isOnComp: false,
        resisterElms: function(e: HTMLTextAreaElement | null, index: number): void {
            if (e === null) return
            blocksInfo.elms[index] = e
        },
        focus: function(index: number): void {
            blocksInfo.focusedIndex = index
            blocksInfo.elms[index]?.focus()
        }
    }).current

    return (
        <CtxInfo.Provider value={{blocksInfo}} >
                {children}
        </CtxInfo.Provider>
    )

}