import { Accessor, createMemo } from "solid-js"
import { MarginType } from "./types"
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'


function Observer(props: {
    getThreshold: Accessor<number[]>,
    getMargins: Accessor<MarginType[]>
}) {
    hljs.registerLanguage('javascript', javascript)

    const threshold = 
        createMemo(() => props.getThreshold().length > 0
            ? `[${props.getThreshold().toString().replace(/,/g, ", ")}],`
            : "[], // default threshold is 0")
    
    const margins = createMemo(() => 
    props.getMargins().length == 1
    ? `${props.getMargins()[0].margin + props.getMargins()[0].unit} 0px`
    : `${props.getMargins()[0].margin + props.getMargins()[0].unit} 0px ${props.getMargins()[1].margin + props.getMargins()[1].unit} 0px`)

    const code = createMemo(() => hljs.highlightAuto(
`(new IntersectionObserver(
    (e) => {
        const percent = Math.round(e[0].intersectionRatio * 100) + "%"
        const isTop = e[0].boundingClientRect.top < e[0].rootBounds.top
        const isIntersecting = e[0].isIntersecting
        console.log({percent, isTop, isIntersecting, entry: e[0]})
    },
    {
        rootMargin: "${margins()}",
        thresholds: ${threshold()}
        rootElement: document.getElementById("root-container")
    }
)).observe(document.getElementById("box"))`))

    return (
        <div class="flex justify-center my-4 relative z-20">
            <code 
                class="whitespace-pre mb-4 w-min bg-gray-200 p-3 rounded-md" 
                innerHTML={code().value}>
            </code>
        </div>

    )
}

export default Observer