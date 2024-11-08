import React, {useContext} from 'react';
import "./index.css"
import {Image} from "antd";
import {ImageContext} from "../../context";


const Community = () => {

    const {loading, images} = useContext(ImageContext)

    images.reverse();


    if (loading) return <div>Loading images...</div>;




    return (
        <div className="community">
            <h2>Community Images</h2>
            <div className="images-grid">
                {images.map((url, index) => {
                const end = url.indexOf(".");
                const word = url.slice(13, end)
                const finalWord = word.replace(/_/g, ' ')
                    return (
                        <div key={index}>
                            <Image src={`https://grvmrfcaoijjkwosfekd.supabase.co/storage/v1/object/public/t2image/${url}`} className="community-image"  alt='community-img' />
                            <p><b>Prompt</b> { finalWord || "Empty Prompt"}</p>
                        </div>
                    )

                    }
                )

                }
            </div>
        </div>
    );
};

export default Community;