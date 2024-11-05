import React, {useState} from 'react';
import "./index.css"


import { Cloudinary } from 'cloudinary-core';

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



    const cloudinary = new Cloudinary({ cloud_name: 'dxycuikv8' });

    const handlePrompt = async (data) => {
        console.log(data);
        setIsLoading(true);
        setRes(inputVal);
        setInputVal("");
        setInit(false);

        try {
            // Fetch the generated image from your API
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
                setIsLoading(false);
                return error;
            }

            // Convert response to blob and create a URL for display
            const resultBlob = await response.blob();
            const imgUrl = URL.createObjectURL(resultBlob);
            setImgUrl(imgUrl);

            // Convert the blob to a File for Cloudinary upload
            const file = new File([resultBlob], "generated_image.png", { type: "image/png" });

            // Use Cloudinary's client-side upload method (unsigned)
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "unsigned_preset"); // Replace with your preset

            // Upload to Cloudinary
            const uploadResult = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const uploadData = await uploadResult.json();

            // Set the Cloudinary URL in state to render in the community block
            setImgUrl(uploadData.secure_url);
            setIsLoading(false);

            console.log("Uploaded to Cloudinary:", uploadData.secure_url);

        } catch (error) {
            console.error("Network or other error:", error);
            setIsLoading(false);
        }
    };




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