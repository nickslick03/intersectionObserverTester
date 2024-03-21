import { Accessor, For, createEffect, createMemo, createSignal, untrack } from "solid-js"
import { MarginType } from "./types";

const xor = (x: boolean, y: boolean) => (x && !y) || (!x && y)

function Result(props: {
    getThreshold: Accessor<number[]>,
    getMargins: Accessor<MarginType[]>
}) {

    const [getObserver, setObserver] = createSignal<IntersectionObserver>()
    const [getIsHalfway, setIsHalfway] = createSignal(false)

    const marginStr = createMemo(() => 
    props.getMargins().length == 1
    ? `${props.getMargins()[0].margin + props.getMargins()[0].unit} 0px`
    : `${props.getMargins()[0].margin + props.getMargins()[0].unit} 0px ${props.getMargins()[1].margin + props.getMargins()[1].unit} 0px`)

    createEffect(() => {
        if (untrack(getObserver) !== undefined)
            untrack(getObserver)?.unobserve(document.getElementById("box")!)

        const observer = new IntersectionObserver(
            (e) => {
                const percent = Math.round(e[0].intersectionRatio * 100) + "%"
                const isTop = e[0].boundingClientRect.top < e[0].rootBounds!.top
                const isIntersecting = e[0].isIntersecting
                console.log({percent, isTop, isIntersecting, entry: e[0]})
            },
            {
                threshold: props.getThreshold(),
                root: document.getElementById("root-container"),
                rootMargin: marginStr(),
            }
        );

        observer.observe(document.getElementById("box")!)
        setObserver(observer)
    })

    const thresholds = createMemo(() => 
        props.getThreshold().length == 0
        ? [0]
        : props.getThreshold())

    const scrollDistance = (scrollTop: number, scrollHeight: number, clientHeight: number) => {
        const height = scrollHeight - clientHeight
        const distance = scrollTop / height
        const isHalfway = distance >= .5
        if (getIsHalfway() !== isHalfway)
            setIsHalfway(isHalfway)
    }

    const currMarginIndex = createMemo(() => props.getMargins().length == 2 && !getIsHalfway() ? 1 : 0)

    const topMargin = createMemo(() => {
        const mt = props.getMargins()[0].margin
        const unitT = props.getMargins()[0].unit        
        return unitT == 'px' 
        ? mt 
        : mt * 5
    })

    const bottomMargin = createMemo(() => {
        const mb = props.getMargins()[currMarginIndex()].margin
        const unitB = props.getMargins()[currMarginIndex()].unit
        return unitB == 'px'
        ? mb
        : mb * 5
    })

    const topMarginBlock = createMemo(() => {
        const mt = props.getMargins()[0].margin
        const mb = props.getMargins()[currMarginIndex()].margin
        if (mt < 0 && getIsHalfway())
            return Math.abs(topMargin())
        else if (mb > 0 && !getIsHalfway())
            return Math.abs(bottomMargin())
        else
            return 0
    })

    const bottomMarginBlock = createMemo(() => {
        const mt = props.getMargins()[0].margin
        const mb = props.getMargins()[currMarginIndex()].margin
        if (mb < 0 && !getIsHalfway())
            if (mt > 0)
                return Math.abs(bottomMargin()) * 2
            else
                return Math.abs(bottomMargin())
        else if (mt > 0 && getIsHalfway())
            return Math.abs(topMargin())
        else
            return 0
    })

    return (
        <div>
            <h2 class="font-mono font-bold">
                Result
            </h2>
            <div 
                id="result-container"
                class="self-center w-[500px] h-[500px] relative flex items-center 
                outline outline-black outline-1
                overflow-x-visible">
                <div
                    id="thresholds-container" 
                    class="w-[500px] min-h-[500px] z-10 pointer-events-none absolute"
                    classList={{
                        'bottom-0': xor(!getIsHalfway(), topMargin() > 0),
                        'top-0': xor(getIsHalfway(), bottomMargin() > 0)
                    }}>
                    <div 
                        class="bg-purple-400 bg-opacity-20"
                        style={`height: ${topMarginBlock()}px`}>
                    </div>
                    <div class="h-[500px] w-[500px] relative">
                        <For each={thresholds()}>{(t, i) => 
                            <div 
                                class="absolute w-[500px] border border-dashed"
                                classList={{
                                    "border-blue-500": !getIsHalfway(),
                                    "border-red-500": getIsHalfway(),
                                    "translate-y-1/2": !getIsHalfway(),
                                    "-translate-y-1/2": getIsHalfway()
                                }}
                                style={`${getIsHalfway() ? 'top' : 'bottom'}: ${t * 100}%;`}>
                                <div 
                                    id="negative-margin-bottom"
                                    class="absolute font-mono"
                                    style={`${i() % 2 == 0 ? "right" : "left"}: 0; 
                                    transform: translate(${i() % 2 == 0 ? '' : '-'}130%, -${xor(t < .5, getIsHalfway()) ? '80' : '20'}%);`}>
                                    {t}
                                </div>
                            </div>
                        }</For>
                    </div>
                    <div 
                        class="bg-purple-400 bg-opacity-20"
                        style={`height: ${bottomMarginBlock()}px`}>
                    </div>
                </div>
                <div 
                    id="root-container" 
                    class="absolute w-[500px] h-[500px] top-0
                    overflow-x-hidden overflow-y-scroll  flex justify-center"
                    onscroll={(e) => scrollDistance(e.target.scrollTop, e.target.scrollHeight, e.target.clientHeight)}>                 
                    <div class="absolute h-[1500px] flex justify-start items-center">
                        <div
                            id="box"
                            class="relative w-[480px] h-[495px] bg-green-300">
                        </div>
                    </div>
                </div>    
            </div> 
        </div>
    )
}

export default Result