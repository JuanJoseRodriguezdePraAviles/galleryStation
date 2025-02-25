
import SearchBar from '../components/SearchBar';
import Dashboard from '../components/Dashboard';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos, searchRandomPhotos, searchPhotos } from '../redux/slices/SearchSlice';



function Home() {
    const dispatch = useDispatch();

    const updatedImages = useSelector((state) => state.search.images);
    const [filteredImages, setFilteredImages] = useState(updatedImages);
    const updatedFilteredImages = useSelector((state) => state.images);


    useEffect(() => {

        dispatch(fetchPhotos());
    }, [dispatch]);

    useEffect(() => {
        if (updatedImages && updatedImages.length > 0) {

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


        const imagesSearched = imagesUpdated;
        setFilteredImages(imagesSearched);
    }

    return (
        <>
            <SearchBar handleSearch={handleSearch}>
            </SearchBar>

            <Dashboard images={updatedImages} filteredImages={filteredImages}>
            </Dashboard>
        </>
    );
}

export default Home;