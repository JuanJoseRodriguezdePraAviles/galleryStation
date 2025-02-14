import './css/style.css';
import React, { useState } from 'react';
import ImageContainer from './imageContainer';

function Dashboard() {
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