import React from 'react';
import './Header.css'

const Header = ({ headerValue }) => {
    return (
        <>
            <h2 className='header'>{headerValue}</h2>
        </>
    )
}

export default Header;