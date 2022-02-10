import { createContext, MutableRefObject, useRef } from "react";

type Info = {
    textBefore: string ,
    rearrangeIndices: {
        startIndex: number,
        endIndex: number
    }[]
}

type UndoRedoInfoType = {
    undoRedoInfo: MutableRefObject<Info>
}


export const UndoRedoCtxInfo = createContext<UndoRedoInfoType>(undefined!)

export const InfoProvider = ({children}: any) => {
    const undoRedoInfo = useRef<Info>({
        // textBefore: for "TEXT"
        textBefore: "",

        // startIndices　& endIndices: for "REARRANGE"
        rearrangeIndices: []
    })

    return (
        <UndoRedoCtxInfo.Provider value={{undoRedoInfo}} >
            {children}
        </UndoRedoCtxInfo.Provider>
    )

}