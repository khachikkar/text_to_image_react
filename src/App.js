import React, {useCallback} from 'react';
import './App.css';
import Generator from "./components/generator";
import Community from "./components/community";
import {useEffect, useState} from "react";
import {supabase} from "./components/generator";







function App() {


    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .storage
                .from('t2image')  // Your bucket name
                .list('', { limit: 100 });  // Adjust the limit as needed

            console.log("Fetched data:", data);
            if (error) {
                throw error;
            }

            // Generate public URLs for each image
            const imageUrls = data.map((file) => {
                console.log(file.name, ">>>>>>>");
                return file.name;
            });

            setImages(imageUrls);
        } catch (error) {
            console.error("Error fetching images:", error.message);
        } finally {
            setLoading(false);
        }
    }, [setImages, setLoading]); // Add dependencies here if needed

    useEffect(() => {
        fetchImages();
    }, [fetchImages, loading]);

    console.log(images);

    console.log(images);



  return (
    <div className="App">
<Generator />
        <Community loading={loading} images={images} />
    </div>
  );
}

export default App;
