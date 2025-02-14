import './css/style.css';
import React, { useState } from 'react';

function SearchBar() {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <div className="searchFilterContainer">
                <div className="searchContainer">
                
                    <p>Search photos</p>
                    <img src="./src/assets/searchIcon.svg"/>
                </div>
                
                <div className='filterContainer'>
                {isOpen? (
                    <>
                        <div>Import Date</div>
                        <div>Import Date</div>
                        <div>Width</div>
                        <div>Width</div>
                        <div>Height</div>
                        <div>Height</div>
                        <div>Likes</div>
                        <div>Likes</div>
                    </>
                ):
                    <p>Import Date <img src="./src/assets/ArrowUp.svg"/></p>
                }
                    <img src="./src/assets/selectArrow.svg"/>
                </div>
            </div>
        </>
    );
}

export default SearchBar;