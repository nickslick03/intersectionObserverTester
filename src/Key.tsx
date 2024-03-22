function key() {

    return (
        <div class="w-[250px]">
            <h2 class="font-bold font-mono">
                Key
            </h2>
            <table class="w-full border border-black px-1 py-2 text-sm">
                <tbody class="[&>tr]:border-y [&>tr]:border-black">
                    <tr>
                        <td>Bottom Threshold</td>
                        <td>
                            <div class="w-10 h-full my-auto border-t-2 border-dashed border-blue-500"></div>    
                        </td>   
                    </tr>
                    <tr>
                        <td>Top Threshold</td>
                        <td>
                            <div class="w-10 h-full my-auto border-t-2 border-dashed border-red-500"></div>   
                        </td>
                    </tr>
                    <tr>
                        <td>Overlapped Threshold <br /> {'(won\'t run Observer callback)'}</td>
                        <td>
                            <div class="w-10 h-full my-auto border-t-2 border-dashed border-gray-400"></div>    
                        </td>  
                    </tr>
                    <tr>
                        <td>Positive Margin</td>
                        <td class="bg-pink-500 bg-opacity-20 m-2"></td>
                    </tr>
                    <tr>
                        <td>Negative Margin</td>
                        <td class="bg-purple-500 bg-opacity-20 m-2"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default key