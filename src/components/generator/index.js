import React, {useState} from 'react';
import "./index.css"
const Generator = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [inputVal, setInputVal] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [res, setRes] = useState("")
    const [init, setInit] = useState(true)

const handleChange = (e)=>{
        const val = e.target.value;
        setInputVal(val)
}
    console.log(inputVal)

const handlePrompt = async (data)=>{
        console.log(data)
        setIsLoading(true);
        setRes(inputVal)
        setInputVal("")
    setInit(false)

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
            {
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        if (!response.ok) {
            const error = await response.json();
            console.error("API error:", error);
            return error;
        }
        const result = await response.blob();
        console.log(result);
        const imgUrl = URL.createObjectURL(result);
        console.log(imgUrl);


        setImgUrl(imgUrl);
        setIsLoading(false);



    } catch (error) {
        console.error("Network or other error:", error);
    }
}



    return (
        <div className="mCont">
            <main>
                <section>
                    <h2>Image Generator</h2>
                    <p>Please Describe what image you want to have?</p>
                    <input onChange={(e)=>handleChange(e)} value={inputVal} id="input" type="text" placeholder="Your image prompt"/>
                    <input onClick={()=>handlePrompt({"inputs": inputVal})} id="button" type="button" value="Generate"/>


                    {
                        isLoading
                            ?
                            <div>
                                <img id="loading"
                                     src="https://i.pinimg.com/originals/6a/ea/10/6aea10bff720c86ed8faa02f2cf6e211.gif"
                                     alt="aa"/>
                            </div>
                            :

                            init
                            ?
                                <div>Image Generation</div>
                            :
                            <div>
                                <h2>Prompt:{res}</h2>
                                <img id="img" src={imgUrl} alt="gg"/>
                                <a href={imgUrl} download="generated_img">
                                    <button id="downloadButton">Download Image</button>
                                </a>
                            </div>
                    }
                </section>
            </main>
        </div>
    )
}


export default Generator;