
import SearchBar from '../components/SearchBar';
import Dashboard from '../components/Dashboard';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos, searchRandomPhotos, searchPhotos } from '../redux/slices/SearchSlice';



function Home() {
    const dispatch = useDispatch();

    const updatedImages = useSelector((state) => state.search.images);
    const [sortedImages, setSortedImages] = useState(updatedImages);
    const updatedSortedImages = useSelector((state) => state.images);

    const [sortOption, setSortOption] = useState('Import Date ↑');


    useEffect(() => {

        dispatch(fetchPhotos());
    }, [dispatch]);

    useEffect(() => {
        if (updatedImages && updatedImages.length > 0) {
            let sortedData = [...updatedImages];
            switch (sortOption) {
                case 'Import Date ↑':
                    sortedData.sort((a, b) => a.created_at > b.created_at ? 1 : - 1)
                        .map((item) => item);
                    break;
                case 'Import Date ↓':
                    sortedData.sort((a, b) => a.created_at > b.created_at ? -1 : 1)
                        .map((item) => item);
                    break;
                case 'Width ↑':
                    sortedData.sort((a, b) => a.width > b.width ? 1 : - 1)
                        .map((item) => item);
                    break;
                case 'Width ↓':
                    sortedData.sort((a, b) => a.width > b.width ? - 1 : 1)
                        .map((item) => item);
                    break;
                case 'Height ↑':
                    sortedData.sort((a, b) => a.height > b.height ? 1 : - 1)
                        .map((item) => item);
                    break;
                case 'Height ↓':
                    sortedData.sort((a, b) => a.height > b.height ? - 1 : 1)
                        .map((item) => item);
                    break;
                case 'Likes ↑':
                    sortedData.sort((a, b) => a.likes > b.likes ? 1 : - 1)
                        .map((item) => item);
                    break;
                case 'Likes ↓':
                    sortedData.sort((a, b) => a.likes > b.likes ? - 1 : 1)
                        .map((item) => item);
                    break;
            }

            setSortedImages(sortedData);
        }
    }, [updatedImages, sortOption]);

    useEffect(() => {
    }, [sortedImages]);



    const handleSearch = (event) => {

        const inputNode = event.target.previousElementSibling;
        if (!inputNode.value) {
            dispatch(searchRandomPhotos(inputNode.value));
        } else {
            dispatch(searchPhotos(inputNode.value));
        }


        const imagesSearched = imagesUpdated;
        setSortedImages(imagesSearched);
    }

    return (
        <>
            <SearchBar handleSearch={handleSearch} sortOption={sortOption} setSortOption={setSortOption}>
            </SearchBar>

            <Dashboard images={updatedImages} filteredImages={sortedImages}>
            </Dashboard>
        </>
    );
}

export default Home;