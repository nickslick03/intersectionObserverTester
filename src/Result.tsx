import { onMount } from "solid-js"

function Result() {

    onMount(() => {
        const threshold = [];
        for (let i = 0; i <= 100; i++)
            threshold[i] = i / 100;
        
        const observer = new IntersectionObserver(
            (e) => {
                console.log(Math.round((e[0].intersectionRatio) * 100) + "%");
            },
            {
                threshold,
                root: document.getElementById("root"),
                rootMargin: undefined,
            }
        );

        observer.observe(document.getElementById("box")!);
    })

    return (
        <div>
            <h2 class="font-mono font-bold">
                Result
            </h2>
            <div 
                id="result-container"
                class=" self-center w-[400px] h-[400px] relative flex items-center">
                <div class="w-[500px] h-[500px] z-10 pointer-events-none">
                    <div></div>
                </div>
                <div class="absolute w-[400px] h-[400px] top-0 border border-black
                overflow-x-hidden overflow-y-scroll  flex justify-center">                 
                    <div id="root" class="absolute h-[1100px] flex justify-center items-center">
                        <div
                            id="box"
                            class="relative w-[250px] h-[250px] bg-[coral]">
                        </div>
                    </div>
                </div>    
            </div> 
        </div>
    )
}

export default Result