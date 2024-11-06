import React from 'react';
import "./index.css"


const Community = ({loading, images}) => {


    if (loading) return <div>Loading images...</div>;

    return (
        <div className="community">
            <h2>Community Images</h2>
            <div className="images-grid">
                {images.map((url, index) => (
                    <img key={index} src={`https://grvmrfcaoijjkwosfekd.supabase.co/storage/v1/object/public/t2image/${url}`} alt='community-img' className="community-image" />
                ))}
            </div>
        </div>
    );
};

export default Community;