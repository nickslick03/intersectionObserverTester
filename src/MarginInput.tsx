import { Accessor, For, Setter, createMemo } from "solid-js"
import { MarginType } from "./types"

const MARGIN_LABELS = [
    ['margin-y'],
    ['margin-top', 'margin-bottom']
]

function MarginInput(props: {
    getMargins: Accessor<MarginType[]>,
    setMargins: Setter<MarginType[]>
}) {

    const marginIndex = createMemo(() => props.getMargins().length - 1)

    const incrMarginIndex = () => {
        if (marginIndex() < 1)
            props.setMargins(margins => [...margins, {margin: 0, unit: 'px'}])
    }
    const decrMarginIndex = () => {
        if (marginIndex() > 0)
            props.setMargins(margins => margins.slice(0, marginIndex()))
    }
    
    const updateMargin = (marginStr: string, index: number) => {
        const margin = +marginStr
        if (isNaN(margin)) return
        const newMargins = [...props.getMargins()]
        newMargins[index].margin = margin
        props.setMargins(newMargins);
    }
    
    const updateUnit = (unit: string, index: number) => {
        if (unit != 'px' && unit != '%') return
        const newMargins = [...props.getMargins()]
        newMargins[index].unit = unit
        props.setMargins(newMargins)
    }

    return (
        <div>
            <h2 class="font-bold font-mono">
                rootMargin
            </h2>
            <div class="h-[100px] w-[250px]">
                <div class="flex flex-col gap-2">
                    <For each={MARGIN_LABELS[marginIndex()]}>{(label, i) =>
                        <label for={label} class="flex justify-end">
                            <div class="flex-1">
                                {label}:
                            </div>
                            <div class="border border-black font-mono">
                                <input 
                                    type="number"
                                    id={label}
                                    class="w-14 outline-none pl-1"
                                    value={props.getMargins()[i()].margin}
                                    onchange={(e) => updateMargin(e.target.value, i())} />
                                <select 
                                    name={label + "-unit"}
                                    id={label + "-unit"} 
                                    class="outline-none"
                                    onchange={(e) => updateUnit(e.target.value, i())}>
                                    <option 
                                        value="px" 
                                        selected={props.getMargins()[i()].unit == "px" || undefined}>
                                        px
                                    </option>
                                    <option 
                                        value="%"
                                        selected={props.getMargins()[i()].unit == "%" || undefined}>
                                        %
                                    </option>
                                </select>    
                            </div>
                        </label>    
                    }</For>
                    <div class="text-center">
                        <button 
                            disabled={marginIndex() == MARGIN_LABELS.length - 1}
                            onclick={incrMarginIndex}
                            class="px-2 mr-1 border border-black disabled:border-gray-300 disabled:text-gray-300">
                            +
                        </button>
                        <button
                            disabled={marginIndex() == 0}
                            onclick={decrMarginIndex}
                            class="px-2 border border-black disabled:border-gray-300 disabled:text-gray-300">
                            -
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarginInput
