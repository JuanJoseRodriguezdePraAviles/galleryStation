import './../css/style.css';
import React, { useState } from 'react';


function SearchBar(props) {
    const [isOpen, setOpen] = useState(false);

    const handleSelect = () => {
        //setOpen(true);
    }

    return (
        <>
            <div className="searchFilterContainer">
                <div className="searchContainer">

                    <input type="text"></input>
                    <img src="./src/assets/searchIcon.svg" onClick={props.handleSearch} />
                </div>

                <div className='filterContainer' onClick={handleSelect}>
                    {isOpen ? (
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
                    ) :
                        <p>Import Date <img src="./src/assets/ArrowUp.svg" /></p>
                    }
                    <img src="./src/assets/selectArrow.svg" />
                </div>
            </div>
        </>
    );
}

export default SearchBar;