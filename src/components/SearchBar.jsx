import './../css/style.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Chip from '@mui/material/Chip';

function SearchBar(props) {
    const [tagClassFilter, setTagClassFilter] = useState('assignTag');
    
    const handleTagFilter = (e) => {
        console.log("handle tag filter");
        props.setTagFilter(!props.tagFilter);
        if(!props.tagFilter){
            setTagClassFilter('assignedTag');
        } else {
            setTagClassFilter('assignTag');
        }
        
    }
    console.log(tagClassFilter);



    return (
        <>
            <div className="searchFilterContainer">
                {useLocation().pathname === '/' &&
                    <div className="searchContainer">
                        <input type="text" placeholder='Search photos'></input>
                        <img src="./assets/searchIcon.svg" onClick={props.handleSearch} />
                    </div>
                }

                {useLocation().pathname === '/' ?
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
                    <>
                        <input type="text" className='filter' placeholder='Filter by description' onChange={(e) => {
                            props.setFilterValue(e.target.value);
                        }} />
                        <div className='tags'>
                            <Chip label='Landscape' variant="outlined" className={tagClassFilter} onClick={handleTagFilter}/>
                        </div>
                        
                    </>
                }
            </div>
        </>
    );
}
export default SearchBar;