import SearchBar from '../components/SearchBar';
import Dashboard from '../components/Dashboard';
import './../css/style.css';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavouritePhotos } from '../redux/slices/FavouritesSlice';

function Favourite() {
    const dispatch = useDispatch();
    const images = useSelector((state) => state.favourite.images);
    const [filteredImages, setFilteredImages] = useState(images);
    const [filterValue, setFilterValue] = useState("");
    const [tagFilter, setTagFilter] = useState({
        landscape: false,
        portrait: false
    });
    
    const [landscapeTagFilter, setLandscapeTagFilter] = useState(false);
    const [portraitTagFilter, setPortraitTagFilter] = useState(false);

    useEffect(() => {
        let data = [];
        if (localStorage.images) {
            JSON.parse(localStorage.images).map((image) => {
                data = [...data, image];
            });
            
            dispatch(setFavouritePhotos(data));
        }
    }, [dispatch]);

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

    useEffect(() => {
        if (!filterValue) {
            setFilteredImages(images);
            return;
        }
        const imagesSearched = images.filter((image) => {
            if (image.description) {
                return image.description.includes(filterValue.toLowerCase());
            } else {
                return null;
            }
        });
        setFilteredImages(imagesSearched);
    }, [filterValue, images]);

    useEffect(() => {
        if(images.length > 0){
            setFilteredImages(images);
        }
    }, [images]);

    return (
        <>
            <SearchBar handleSearch={handleSearch} filterValue={filterValue} setFilterValue={setFilterValue} tagFilter={tagFilter} setTagFilter={setTagFilter} />
            <h2 className='favouriteTitle'>My collection</h2>
            {!filteredImages ?
                <p className='message'>You can add your favourites photos from home</p>
                :
                <Dashboard images={filteredImages} tagFilter={tagFilter}/>
            }
        </>
    );
}

export default Favourite;