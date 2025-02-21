import SearchBar from './SearchBar';
import Dashboard from './Dashboard';
import './../css/style.css';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavouritePhotos } from '../features/FavouritesSlice';



function Favourite() {
    const dispatch = useDispatch();

    const images = useSelector((state) => state.favourite.images);
    const [loadedImages, setLoadedImages] = useState([]);

    const [filteredImages, setFilteredImages] = useState(images);
    const updatedFilteredImages = useSelector((state) => state.images);


    useEffect(() => {
        let data = [];
        Object.entries(localStorage).map(([key, valueJSON]) => {
            data = [...data, JSON.parse(valueJSON)];
        });
        dispatch(setFavouritePhotos(data));
    }, [dispatch]);

    useEffect(() => {
        if (images && images.length > 0) {
            setLoadedImages(images);
        }
    }, [images]);



    const handleSearch = (event) => {

        const inputNode = event.target.previousElementSibling;
        if (!inputNode.value) {
            dispatch(searchRandomPhotos(inputNode.value));
        } else {
            dispatch(searchPhotos(inputNode.value));
        }


        const imagesSearched = images;
        /*const imagesSearched = images.filter((image) => {
            return image.slug.includes(inputNode.value.toLowerCase());
        });*/
        setFilteredImages(imagesSearched);
    }


    return (
        <>
            <SearchBar handleSearch={handleSearch}>
            </SearchBar>
            <h2 className='favouriteTitle'>My collection</h2>
            <Dashboard images={loadedImages}>
            </Dashboard>
        </>
    );
}

export default Favourite;