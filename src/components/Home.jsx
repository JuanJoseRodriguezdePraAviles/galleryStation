
import SearchBar from './SearchBar';
import Dashboard from './Dashboard';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos, searchRandomPhotos, searchPhotos } from '../features/SearchSlice';



function Home() {
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const updatedImages = useSelector((state) => state.search.images);
    const [filteredImages, setFilteredImages] = useState(images);
    const updatedFilteredImages = useSelector((state) => state.images);


    useEffect(() => {

        dispatch(fetchPhotos());
    }, [dispatch]);

    useEffect(() => {
        if (updatedImages && updatedImages.length > 0) {
            setImages(updatedImages);

            setFilteredImages(updatedFilteredImages);
        }
    }, [updatedImages]);



    const handleSearch = (event) => {

        const inputNode = event.target.previousElementSibling;
        if (!inputNode.value) {
            dispatch(searchRandomPhotos(inputNode.value));
        } else {
            dispatch(searchPhotos(inputNode.value));
        }


        const imagesSearched = images;
        setFilteredImages(imagesSearched);
    }



    return (
        <>
            <SearchBar handleSearch={handleSearch}>
            </SearchBar>

            <Dashboard images={images} filteredImages={filteredImages}>
            </Dashboard>
        </>
    );
}

export default Home;