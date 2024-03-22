import { createSignal } from "solid-js"
import MarginInput from "./MarginInput"
import Observer from "./Observer"
import Result from "./Result"
import ThresholdsInput from "./ThresholdsInput"
import { MarginType } from "./types"

function App() {

  const [ getThreshold, setThreshold ] = createSignal<number[]>([])
  const [ getMargins, setMargins ] = createSignal<MarginType[]>([{ margin: 0, unit: 'px' }])

  return (
    <>
      <h1 class="text-3xl font-bold text-center my-6 font-mono">
        Intersection Observer Tester
      </h1>
      <Observer getThreshold={getThreshold} getMargins={getMargins}/>
      <div class="flex gap-20 justify-center flex-wrap pb-2 overflow-x-visible overflow-y-clip">
        <div class="flex flex-col justify-stretch">
            <MarginInput getMargins={getMargins} setMargins={setMargins} /> 
            <ThresholdsInput getThreshold={getThreshold} setThreshold={setThreshold} />
        </div> 
        <div>
          <Result getThreshold={getThreshold} getMargins={getMargins} /> 
        </div>
      </div>      
    </>
  )
}

export default App
