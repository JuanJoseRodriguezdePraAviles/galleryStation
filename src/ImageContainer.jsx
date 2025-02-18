import './css/style.css';
import React, { useState } from 'react';

function ImageContainer(props) {
    return (
        <>
            <div className="imageContainer">
                <img src={props.image}/>
                <div className="imageControls">
                    <img src="./src/assets/dislike.svg" />
                    <img src="./src/assets/download.svg" />
                </div>
            </div>
        </>
    );
}

export default ImageContainer;