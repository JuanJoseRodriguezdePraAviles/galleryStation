import './css/style.css';
import React, { useState, useEffect } from 'react';
import ImageContainer from './ImageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { searchSlice } from './features/SearchSlice';



function Dashboard() {

    const dispatch = useDispatch();

    const images = useSelector((state) => state.search.items);
    console.log(images);
    const { filteredImages, setFilteredImages } = useState(images);

    useEffect(() => {
        dispatch(searchSlice.actions.listAll());
    }, [dispatch]);
    return (
        <>


            <div className='bg-blue'>
                <ImageContainer image="./src/assets/mosque.jpg">

                </ImageContainer>

                <ImageContainer image="./src/assets/dog.jpg">

                </ImageContainer>

                <ImageContainer image="./src/assets/love.jpg">

                </ImageContainer>
            </div>
        </>
    );
}

export default Dashboard;