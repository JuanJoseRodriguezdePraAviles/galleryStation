import './../css/style.css';
import React, { useState } from 'react';


function SearchBar(props) {
    const [open, setOpen] = useState(false);
    const [optionSelected, setOptionSelected] = useState('Import Date');

    const handleSelect = (optionText) => {
        //if(!open){
        setOptionSelected(optionText);
        //}

        setOpen(!open);


    }
    console.log(optionSelected);
    return (
        <>
            <div className="searchFilterContainer">
                <div className="searchContainer">

                    <input type="text"></input>
                    <img src="./src/assets/searchIcon.svg" onClick={props.handleSearch} />
                </div>

                    
                    <select className='filterContainer'>
                        <option value='Import Date ↑'>Import Date ↑<img src="./src/assets/ArrowUp.svg" /></option>
                        <option value='Import Date ↓'>Import Date ↓</option>
                        <option value='Import Date ↑'>Width ↑</option>
                        <option value='Import Date ↓'>Width ↓</option>
                        <option value='Import Date ↑'>Height ↑</option>
                        <option value='Import Date ↓'>Height ↓</option>
                        <option value='Import Date ↑'>Likes ↑</option>
                        <option value='Import Date ↓'>Likes ↓</option>
                    </select>

            </div>
        </>
    );
}

export default SearchBar;