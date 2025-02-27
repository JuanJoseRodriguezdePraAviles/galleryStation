import './../css/style.css';
import React, { useState } from 'react';


function SearchBar(props) {
    const [open, setOpen] = useState(false);
    const [optionSelected, setOptionSelected] = useState('Import Date');

    const handleSelect = (optionText) => {
        setOptionSelected(optionText);

        setOpen(!open);


    }
    return (
        <>
            <div className="searchFilterContainer">
                <div className="searchContainer">

                    <input type="text"></input>
                    <img src="./src/assets/searchIcon.svg" onClick={props.handleSearch} />
                </div>

                    
                    <select className='filterContainer' onChange={(e) => {
                            props.setSortOption(e.target.value)
                        }}>
                        <option value='Import Date ↑'>Import Date ↑</option>
                        <option value='Import Date ↓'>Import Date ↓</option>
                        <option value='Width ↑'>Width ↑</option>
                        <option value='Width ↓'>Width ↓</option>
                        <option value='Height ↑'>Height ↑</option>
                        <option value='Height ↓'>Height ↓</option>
                        <option value='Likes ↑'>Likes ↑</option>
                        <option value='Likes ↓'>Likes ↓</option>
                    </select>

            </div>
        </>
    );
}

export default SearchBar;