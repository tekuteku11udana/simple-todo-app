import { createContext, useRef, useState } from "react";

export const IsOnCompContext = createContext({} as {
    isOnComp: boolean
})

export const IsOnCompProvider = (props: any) => {
    const {children} = props

    const isOnComp = useRef(false).current

    return (
        <IsOnCompContext.Provider value={{isOnComp}} >
            {children}
        </IsOnCompContext.Provider>
    )
}