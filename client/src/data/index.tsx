import { BlocksProvider } from "./BlocksProvider"
import { IsOnCompProvider } from "./IsOnCompProvider"

export const DataProvider = ({children}: any) => {
    return (
        <BlocksProvider >
            <IsOnCompProvider >
                {children}
            </IsOnCompProvider>
        </BlocksProvider>
    )
}