import React, {useState} from 'react';
import "./index.css"
import emailjs from 'emailjs-com';
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

    const sendEmailNotification = () => {
        const templateParams = {
            message: `A new image has been generated:`,
            user_prompt: inputVal
        };

        emailjs.send(
            'service_1xa4dbd',     // Replace with your EmailJS Service ID
            'template_4rapfrh',     // Replace with your EmailJS Template ID
            templateParams,
            'epbMqS-2RYpB_FFsQ'          // Replace with your EmailJS User ID
        )
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
            });
    };






    const handlePrompt = async (data) => {

        if(data.inputs == ""){
            alert("Please enter a Prompt for Generation")
            return
        }

        console.log(data);
        setIsLoading(true);
        setRes(inputVal);

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

            const fileName = `${Date.now()}${inputVal}.png`;

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
            sendEmailNotification();

        } catch (error) {
            console.error("Network or other error:", error);
            setIsLoading(false);
        }finally {
            setInputVal("");
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
                                <p className="wait">Your generation can be 2-4 minutes: Wait for magic</p>
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
                                <a href={imgUrl} download={`generated_img_${res}`}>
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