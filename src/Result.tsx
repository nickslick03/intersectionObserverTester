import { Accessor, For, createEffect, createMemo, createSignal, untrack } from "solid-js"
import { MarginType } from "./types"

const isGray = (threshold: number, mb: number, mt: number, isTop: boolean) => {
    return (threshold * 500) + (-(isTop ? mt : mb)) > (500 - (-(isTop ? mb : mt)))
}

function Result({ 
    getThreshold,
    getMargins, 
}: {
    getThreshold: Accessor<number[]>,
    getMargins: Accessor<MarginType[]>
}) {

    const [getObserver, setObserver] = createSignal<IntersectionObserver>()
    const [getIsHalfway, setIsHalfway] = createSignal(false)

    const marginStr = createMemo(() => 
        `${getMargins()[0].margin}${getMargins()[0].unit} 0px
        ${getMargins().length == 2 ? `${getMargins()[1].margin}${getMargins()[1].unit} 0px` : ''}`)

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
                threshold: getThreshold(),
                root: document.getElementById("root-container"),
                rootMargin: marginStr(),
            }
        );

        observer.observe(document.getElementById("box")!)
        setObserver(observer)
    })

    const thresholds = createMemo(() => 
        getThreshold().length == 0
        ? [0]
        : getThreshold())

    const scrollDistance = (scrollTop: number, scrollHeight: number, clientHeight: number) => {
        const height = scrollHeight - clientHeight
        const distance = scrollTop / height
        const isHalfway = distance >= .5
        if (getIsHalfway() !== isHalfway)
            setIsHalfway(isHalfway)
    }

    const lastIndex = createMemo(() => getMargins().length - 1)

    const mb = createMemo(() => getMargins()[lastIndex()].margin)
    const mt = createMemo(() => getMargins()[0].margin)

    const height = (isNegative: boolean, m: Accessor<number>) => createMemo(() => {
        if (isNegative ? m() < 0 : m() > 0)
        return getMargins()[0].unit == 'px'
            ? Math.abs(m())
            : Math.abs(m()) * 5
        return 0
    })
    const bottomPositiveHeight = height(false, mb)
    const bottomNegativeHeight = height(true, mb)
    const bottomHeight = () => bottomNegativeHeight() || bottomPositiveHeight()
    const topPositiveHeight = height(false, mt)
    const topNegativeHeight = height(true, mt)
    const topHeight = () => topNegativeHeight() || topPositiveHeight()

    return (
        <div>
            <h2 class="font-mono font-bold relative z-20 bg-white mb-[1px]">
                Result
            </h2>
            <div 
                id="result-container"
                class="self-center w-[500px] h-[500px] relative flex items-center outline outline-black outline-1">
                <code class="absolute top-0 left-[2px]">#result-container</code>
                <div 
                    id="thresholds-container" 
                    class="w-[500px] h-[500px] z-10 pointer-events-none relative">
                    <div
                        id="bottom-thresholds"
                        class="absolute w-full" 
                        classList={{
                            "top-[500px]": getIsHalfway(),
                            "bottom-0": mb() < 0 && !getIsHalfway(),
                            "top-0": mb() > 0 && !getIsHalfway()
                        }}>
                        <div id="bottom-positive-margin" class="w-full bg-pink-400 bg-opacity-40 absolute top-0" style={`height: ${bottomPositiveHeight()}px`}></div>
                        <div class="w-full h-[500px] relative">
                            <For each={thresholds()}>{(t, i) => 
                                <div 
                                    class="absolute w-full border border-dashed border-blue-600 text-blue-600" 
                                    style={`bottom: ${(t*100)+((mb() < 0 ? 1 : -1) * bottomHeight()/5)}%; 
                                    ${isGray(t, mb(), mt(), false) ? 'border-color: grey;' : ''}`}>
                                    <div 
                                        class="absolute font-mono"
                                        style={`${i() % 2 == 0 ? "right" : "left"}: 0; transform: translate(${i() % 2 == 0 ? '' : '-'}150%, -50%)`}>
                                        {t}
                                    </div>
                                </div>
                            }</For>    
                        </div>
                        <div id="bottom-negative-margin" class="w-full bg-purple-400 bg-opacity-40 absolute bottom-0" style={`height: ${bottomNegativeHeight()}px`}></div>    
                    </div>
                    <div
                        id="top-thresholds"
                        class="absolute w-full" 
                        classList={{
                            "bottom-[500px]": !getIsHalfway(),
                            "bottom-0": mt() > 0 && getIsHalfway(),
                            "top-0": mt() < 0 && getIsHalfway(),

                        }}>
                        <div id="top-negative-margin" class="w-full bg-purple-400 bg-opacity-40 absolute top-0" style={`height: ${topNegativeHeight()}px`}></div>
                        <div class="w-full h-[500px] relative">
                            <For each={thresholds()}>{(t, i) => 
                                    <div 
                                        class="absolute w-full border border-dashed border-red-600 text-red-600" 
                                        style={`top: ${(t*100)+((mt() < 0 ? 1 : -1) * topHeight()/5)}%;
                                        ${isGray(t, mb(), mt(), true) ? 'border-color: grey;' : ''}`}>
                                    <div 
                                        class="absolute font-mono"
                                        style={`${i() % 2 == 0 ? "right" : "left"}: 0; transform: translate(${i() % 2 == 0 ? '' : '-'}150%, -50%)`}>
                                        {t}
                                    </div>
                                </div>
                            }</For>
                        </div>
                        <div id="top-positive-margin" class="w-full bg-pink-400 bg-opacity-40 absolute bottom-0" style={`height: ${topPositiveHeight()}px`}></div>
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
                            class="relative w-[480px] h-[495px] bg-green-400 outline outline-black outline-1">
                                <code>#box</code>
                        </div>
                    </div>
                </div>    
            </div> 
        </div>
    )
}

export default Result
