import { createSignal } from "solid-js"
import MarginInput from "./MarginInput"
import Observer from "./Observer"
import Result from "./Result"
import ThresholdsInput from "./ThresholdsInput"
import { MarginType } from "./types"
import Key from "./Key"

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
        <div class="flex flex-col">
            <ThresholdsInput getThreshold={getThreshold} setThreshold={setThreshold} />
            <MarginInput getMargins={getMargins} setMargins={setMargins} /> 
            <Key />
        </div> 
        <div>
          <Result getThreshold={getThreshold} getMargins={getMargins} /> 
        </div>
      </div>
      <footer class="text-center mt-8 mb-2 font-mono">
        <p>Confused? Read this <a href="#" class="text-indigo-900">Article</a>.</p>
        <p><a href="https://nickslick03.github.io" class="text-indigo-900">Nicholas Epps</a></p>
      </footer>
    </>
  )
}

export default App
