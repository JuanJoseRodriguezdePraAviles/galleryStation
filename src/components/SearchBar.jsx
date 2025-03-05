import './../css/style.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


function SearchBar(props) {
    const [open, setOpen] = useState(false);
    const [optionSelected, setOptionSelected] = useState('Import Date');

    
    return (
        <>
            <div className="searchFilterContainer">
                <div className="searchContainer">

                    <input type="text" placeholder='Search photos'></input>
                    <img src="/assets/searchIcon.svg" onClick={props.handleSearch} />
                </div>

                    {useLocation().pathname === '/'? 
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
                    :
                    <input type="text" className='filter' placeholder='Filter by description' onChange={(e)=> {
                        props.setFilterValue(e.target.value);
                    }}/>}

            </div>
        </>
    );
}

export default SearchBar;