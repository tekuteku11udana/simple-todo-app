import { createContext } from "react";

type InfoType = {
    focusedIndex: number
    elms: (HTMLTextAreaElement | null)[]
    isOnComp: boolean
}


export const CtxInfo = createContext<{
    blocksInfo: InfoType
}>(undefined!)

export const CtxRefCallback = createContext<{
    resisterElms: (e: HTMLTextAreaElement | null, index: number) => void
}>(undefined!)

export const ProviderInfo = ({children}: any) => {
    const blocksInfo: InfoType = {
        focusedIndex: 0,
        elms: [],
        isOnComp: false
    }

    const resisterElms = (e: HTMLTextAreaElement | null, index: number): void => {
        if (e === null) return
        blocksInfo.elms[index] = e
    }

    return (
        <CtxInfo.Provider value={{blocksInfo}} >
            <CtxRefCallback.Provider value={{resisterElms}} >
                {children}
            </CtxRefCallback.Provider>
        </CtxInfo.Provider>
    )

}