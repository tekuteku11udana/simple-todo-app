/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export const Emotion = () => {
    const color = 'green'
    return (
        <div
            css={css`
            background-color: hotpink;
            &:hover {
                color: ${color};
            }
            `}
        >
            This has a hotpink background.
        </div>
    )
}