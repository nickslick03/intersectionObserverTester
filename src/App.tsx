import { createSignal } from "solid-js"
import MarginInput from "./MarginInput"
import Observer from "./Observer"
import Result from "./Result"
import ThresholdsInput from "./ThresholdsInput"

function App() {

  const [ getThreshold, setThreshold ] = createSignal<number[]>([]);

  return (
    <>
      <h1 class="text-3xl font-bold text-center my-4 font-mono">
        Intersection Observer Tester
      </h1>
      <Observer getThreshold={getThreshold} />
      <div class="flex gap-20 justify-center flex-wrap mb-2">
        <div class="flex flex-col justify-stretch">
            <MarginInput /> 
            <ThresholdsInput getThreshold={getThreshold} setThreshold={setThreshold} />
        </div> 
        <div>
          <Result getThreshold={getThreshold}/>  
        </div>
      </div>      
    </>
  )
}

export default App
