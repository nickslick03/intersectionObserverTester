import { Accessor, Setter, Signal } from "solid-js"

function formatSignal(str: string) {
    const strList = str.trim().split(' ')
    const thresholds: number[] = []
    for (let numStr of strList) {
        const num = +numStr
        if (isNaN(num) || num < 0 || num > 1) continue
        thresholds.push(num)
    }
    return thresholds
}

function ThresholdsInput(props: {
    getThreshold: Accessor<number[]>,
    setThreshold: Setter<number[]>
}) {

    const updateThreshold = (str: string) => 
        props.setThreshold(formatSignal(str))

    return (
        <div class="w-[200px]">
            <h2 class="font-bold font-mono">
                Thresholds
            </h2>
            <textarea 
                name="thresholds" 
                id="thresholds"
                rows="5"
                class="w-full border resize-none border-black outline-none"
                placeholder={`Enter values from 0 to 1 seperated by spaces\n(e.g. 0 0.4 1).`}
                onChange={(e) => updateThreshold(e.target.value)}
                value={props.getThreshold().toString().replace(/,/g, " ")}>
            </textarea>
        </div>
        
    )
}

export default ThresholdsInput