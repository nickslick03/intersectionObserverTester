import MarginInput from "./MarginInput"
import Observer from "./Observer"
import Result from "./Result"
import ThresholdsInput from "./ThresholdsInput"

function App() {

  return (
    <>
      <h1 class="text-3xl font-bold text-center my-4 font-mono">
        Intersection Observer Tester
      </h1>
      <Observer />
      <div class="flex gap-10 justify-center flex-wrap">
        <div class="flex flex-col justify-stretch">
            <MarginInput /> 
            <ThresholdsInput />
        </div> 
        <div>
          <Result />  
        </div>
      </div>      
    </>
  )
}

export default App
