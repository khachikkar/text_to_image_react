import React, {useCallback, useContext,useMemo, useState} from 'react';
import "./index.css"
import emailjs from 'emailjs-com';
import { createClient } from '@supabase/supabase-js';
import {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    FETCH_URL,
    BARER_KEY,
    FOLDER_NAME,
    EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID, EMAIL_USER_ID
} from "../../constants";
import {ImageContext} from "../../context";
import loader from "../../img/loader.gif"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


const Generator = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [inputVal, setInputVal] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [res, setRes] = useState("")
    const [init, setInit] = useState(true)
    const {images} =  useContext(ImageContext)



const handleChange = useCallback((e) => {
        const val = e.target.value;
        setInputVal(val);
    }, []);


const sendEmailNotification = () => {
        const templateParams = {
            message: `A new image has been generated:`,
            user_prompt: inputVal
        };

        emailjs.send(
            EMAIL_SERVICE_ID,     // Replace with your EmailJS Service ID
            EMAIL_TEMPLATE_ID,     // Replace with your EmailJS Template ID
            templateParams,
            EMAIL_USER_ID          // Replace with your EmailJS User ID
        )
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
            });
    };
const handlePrompt = async (data) => {

        if(data.inputs === ""){
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
                FETCH_URL,
                {
                    headers: {
                        Authorization: BARER_KEY,
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

            console.log(inputVal, "OOOOO")
            const finInputVal = inputVal.replace(/\s/g, '_')

            const fileName = `${Date.now()}${finInputVal}.png`;

            const { data: fileData } = await supabase.storage
                .from(FOLDER_NAME)  // Replace with your bucket name
                .upload(fileName, resultBlob, {
                    cacheControl: '3600',
                    upsert: false,
                });
    console.log(fileData)
            // if (uploadError) throw new  uploadError;

            // Retrieve the public URL of the stored image
            const { publicURL } = supabase.storage
                .from(FOLDER_NAME)
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



    const b = useMemo(() => {
        return images[Math.floor(Math.random() * images.length)];
    }, [images]);


    return (
        <div className="mCont"
             style={{
                 backgroundImage: `url(${SUPABASE_URL}/storage/v1/object/public/t2image/${b})` || "none"
             }}>
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
                                     src={loader}
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