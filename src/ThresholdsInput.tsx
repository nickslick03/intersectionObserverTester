function ThresholdsInput() {

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
                placeholder={`values from 0 to 1 seperated by spaces\n(e.g. 0 0.4 1)`}>
            </textarea>
        </div>
        
    )
}

export default ThresholdsInput