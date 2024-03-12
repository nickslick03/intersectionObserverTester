import { Accessor, For, createEffect, createMemo, createSignal, untrack } from "solid-js"

function Result(props: {
    getThreshold: Accessor<number[]>
}) {

    const [getObserver, setObserver] = createSignal<IntersectionObserver>()
    const [getIsHalfway, setIsHalfway] = createSignal(false);

    createEffect(() => {
        if (untrack(getObserver) !== undefined)
            untrack(getObserver)?.unobserve(document.getElementById("box")!)

        const observer = new IntersectionObserver(
            (e) => {
                console.log(Math.round((e[0].intersectionRatio) * 100) + "%")
            },
            {
                threshold: props.getThreshold(),
                root: document.getElementById("root-container"),
                rootMargin: "0px",
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

    return (
        <div>
            <h2 class="font-mono font-bold">
                Result
            </h2>
            <div 
                id="result-container"
                class=" self-center w-[500px] h-[500px] relative flex items-center">
                <div class="w-[500px] h-[500px] z-10 pointer-events-none">
                    <For each={thresholds()}>{(t, i) => 
                        <>
                            <div 
                                class="absolute w-full border border-dashed border-blue-600" 
                                style={`bottom: ${t*100}%; ${getIsHalfway() ? 'display: none' : ''};`}>
                                <div 
                                    class="absolute font-mono"
                                    style={`${i() % 2 == 0 ? "right" : "left"}: 0; transform: translate(${i() % 2 == 0 ? '' : '-'}150%, -50%)`}>
                                    {t}
                                </div>
                            </div>
                            <div 
                                class="absolute w-full border border-dashed border-red-600" 
                                style={`top: ${t*100}%; ${!getIsHalfway() ? 'display: none' : 's'};`}>
                            <div 
                                class="absolute font-mono"
                                style={`${i() % 2 == 0 ? "right" : "left"}: 0; transform: translate(${i() % 2 == 0 ? '' : '-'}150%, -50%)`}>
                                {t}
                            </div>
                        </div>
                        </>}
                    </For>
                </div>
                <div 
                    id="root-container" 
                    class="absolute w-[500px] h-[500px] top-0 outline outline-black outline-1
                    overflow-x-hidden overflow-y-scroll  flex justify-center"
                    onscroll={(e) => scrollDistance(e.target.scrollTop, e.target.scrollHeight, e.target.clientHeight)}>                 
                    <div class="absolute h-[1500px] flex justify-start items-center">
                        <div
                            id="box"
                            class="relative w-[480px] h-[495px] bg-green-400">
                        </div>
                    </div>
                </div>    
            </div> 
        </div>
    )
}

export default Result