import { Accessor, createMemo } from "solid-js"

function Observer(props: {
    getThreshold: Accessor<number[]>
}) {

    const threshold = 
        createMemo(() => props.getThreshold().length > 0
            ? `[${props.getThreshold().toString().replace(/,/g, ", ")}],`
            : "[], // default threshold is 0")

    return (
        <div class="flex justify-center">
            <div class="whitespace-pre font-mono mb-5">
{`(new IntersectionObserver(callback, {
    rootMargin: ${"0px"},
    thresholds: ${threshold()}
    rootElement: document.getElementById("root-container")
})).observe(target);`}
            </div>
        </div>

    )
}

export default Observer