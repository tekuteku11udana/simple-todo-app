import { createContext, MutableRefObject, useRef } from "react";

type UndoRedoInfoType = {
    textBefore: string ,
    startIndices: number[] ,
    endIndices: number[] ,

}


export const UndoRedoCtxInfo = createContext<MutableRefObject<UndoRedoInfoType>>(undefined!)

export const InfoProvider = ({children}: any) => {
    const undoRedoInfo = useRef<UndoRedoInfoType>({
        // textBefore: for "TEXT"
        textBefore: "",

        // startIndices　& endIndices: for "REARRANGE"
        startIndices: [],
        endIndices: []
    })

    return (
        <UndoRedoCtxInfo.Provider value={undoRedoInfo} >
            {children}
        </UndoRedoCtxInfo.Provider>
    )

}