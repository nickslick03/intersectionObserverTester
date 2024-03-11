import { For, createSignal } from "solid-js"

const MARGIN1 = ["margin"]
const MARGIN2 = ["margin y", "margin x"]
const MARGIN3 = ["margin top", "margin x", "margin bottom"]
const MARGIN4 = ["margin top", "margin right", "margin bottom", "margin left"]
const MARGIN_LABELS = [MARGIN1]

function MarginInput() {

    const [ getMarginIndex, setMarginIndex ] = createSignal(0)

    const incrMarginIndex = () => getMarginIndex() < 3 ? setMarginIndex(index => index + 1) : null
    const decrMarginIndex = () => getMarginIndex() > 0 ? setMarginIndex(index => index - 1) : null

    return (
        <div>
            <h2 class="font-bold font-mono">
                rootMargin
            </h2>
            <div style="height: 100px; width: 200px;">
                <For each={MARGIN_LABELS[getMarginIndex()]}>{(label, i) =>
                    <div>
                        <label for={"margin-"+i()} style={{
                                "display": "flex",
                                "justify-content": "flex-end"
                            }}>
                            <div style={{
                                    "flex": "1"
                                }}>
                                {label}:&nbsp;
                            </div>
                            <div class="border border-black font-mono">
                                <input type="number" id={"margin-"+i()} class="w-10 outline-none" />
                                <select name="margin-unit" id={"margin-unit-"+i()} class="outline-none">
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                </select>    
                            </div>
                        </label>    
                    </div>
                }</For>
            </div>
{/* {            <div style="text-align: center;">
            <button 
                disabled={getMarginIndex() == MARGIN_LABELS.length - 1}
                onclick={incrMarginIndex}>
                +
            </button>
            <button
                disabled={getMarginIndex() == 0}
                onclick={decrMarginIndex}>
                -
            </button>
        </div>} */}
        </div>
    )
}

export default MarginInput