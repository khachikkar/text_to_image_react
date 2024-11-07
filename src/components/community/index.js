import React from 'react';
import "./index.css"
import {Image} from "antd";


const Community = ({loading, images}) => {


    if (loading) return <div>Loading images...</div>;

    return (
        <div className="community">
            <h2>Community Images</h2>
            <div className="images-grid">
                {images.map((url, index) => {
                const end = url.indexOf(".");
                    return (
                        <div key={index}>
                            {/*<img*/}
                            {/*    src={`https://grvmrfcaoijjkwosfekd.supabase.co/storage/v1/object/public/t2image/${url}`}*/}
                            {/*    alt='community-img' className="community-image"/>*/}
                            <Image src={`https://grvmrfcaoijjkwosfekd.supabase.co/storage/v1/object/public/t2image/${url}`} className="community-image"  alt='community-img' />
                            <p>{url.slice(13, end)}</p>
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