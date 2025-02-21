import './../css/style.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
    return (
        <header>
            <div className='title'>
                <p>Gallery Station</p>
            </div>
            {useLocation().pathname === '/' ? (
                <Link to="/favourite">
                    <div className='heart disliked'>

                    </div>
                </Link>
            ) : (
                <Link to="/">
                    <div className='heart liked'>

                    </div>
                </Link>
            )}


        </header>
    );

}

export default Header;