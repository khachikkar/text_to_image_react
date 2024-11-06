import React, {useState} from 'react';
import "./index.css"


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://grvmrfcaoijjkwosfekd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdydm1yZmNhb2lqamt3b3NmZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTcwMDYsImV4cCI6MjA0NjQ5MzAwNn0.6tsyxNznDpcnHOiKepP_WHdCWbKX29d-GkgmLS-uxdY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


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

            const resultBlob = await response.blob();
            // const imgUrl = URL.createObjectURL(resultBlob);
            // setImgUrl(imgUrl);

            const fileName = `${Date.now()}.png`;

            const { data: fileData } = await supabase.storage
                .from('t2image')  // Replace with your bucket name
                .upload(fileName, resultBlob, {
                    cacheControl: '3600',
                    upsert: false,
                });
    console.log(fileData)
            // if (uploadError) throw new  uploadError;

            // Retrieve the public URL of the stored image
            const { publicURL } = supabase.storage
                .from('t2image')
                .getPublicUrl(fileName);

            console.log(publicURL, ">>>>>>>>>>>>>>")
            setIsLoading(false);
            setImgUrl(fileName); // Use public URL to display the image


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
                                <img id="img" src={`https://grvmrfcaoijjkwosfekd.supabase.co/storage/v1/object/public/t2image/${imgUrl}`} alt="gg" />
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