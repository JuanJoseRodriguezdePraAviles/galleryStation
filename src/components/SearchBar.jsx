import './../css/style.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Chip from '@mui/material/Chip';

function SearchBar(props) {
    const [tagLandscapeClassFilter, setLandscapeTagClassFilter] = useState('assignTag');
    const [tagPortraitClassFilter, setPortraitTagClassFilter] = useState('assignTag');
    
    const handleLandscapeTagFilter = (e) => {
        props.setTagFilter(prev => ({ ...prev, landscape: !prev.landscape }));
        if(!props.tagFilter.landscape){
            setLandscapeTagClassFilter('assignedTag');
        } else {
            setLandscapeTagClassFilter('assignTag');
        }
    }

    const handlePortraitTagFilter = (e) => {
        props.setTagFilter(prev => ({...prev, portrait: !prev.portrait}));
        if(!props.tagFilter.portrait){
            setPortraitTagClassFilter('assignedTag');
        } else {
            setPortraitTagClassFilter('assignTag');
        }
    }
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
                            <Chip label='Landscape' variant="outlined" className={tagLandscapeClassFilter} onClick={handleLandscapeTagFilter}/>
                            <Chip label='Portrait' variant="outlined" className={tagPortraitClassFilter} onClick={handlePortraitTagFilter}/>
                        </div>
                        
                    </>
                }
            </div>
        </>
    );
}
export default SearchBar;