import React, { useEffect, useState } from 'react';

const Community = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {


        const fetchImages = async () => {
            const apiKey = "824729544993874"; // Replace with your Cloudinary API key
            const apiSecret = "W25TO2kGMmqW6ZiP83YkfBorYv8"; // Replace with your Cloudinary API secret
            const cloudName = "dxycuikv8"; // Replace with your Cloudinary cloud name

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const fetchedImages = data.resources.map(image => image.secure_url);
            setImages(fetchedImages);
        };


        fetchImages();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="community">
            {images.length > 0 ? (
                images.map((url, index) => (
                    <img key={index} src={url} alt="aa" />
                ))
            ) : (
                <p>No images available.</p>
            )}
        </div>
    );
};

export default Community;
