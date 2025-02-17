import './css/style.css';
import React, { useState, useEffect } from 'react';
import ImageContainer from './ImageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from './features/SearchSlice';




function Dashboard() {

    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const updatedImages = useSelector((state) => state.search.images);
    const [filteredImages, setFilteredImages] = useState(images);


    useEffect(() => {

        dispatch(fetchPhotos());
    }, [dispatch]);

    useEffect(() => {
        if (updatedImages && updatedImages.length > 0) {
            setImages(updatedImages);
        }
    }, [updatedImages]);
    return (
        <>


            <div className='bg-blue'>

                {images.map(image => (
                    <>
                        <ImageContainer image={image.links.download}>

                        </ImageContainer>
                    </>
                ))}
            </div>
        </>
    );
}

export default Dashboard;