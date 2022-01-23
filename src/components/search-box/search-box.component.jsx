import React from 'react';

import './search-box.styles.scss';

const SearchBox = ({ onSearchChange }) => (
    <div className='search-box'>
        <input
            type="text"
            id="search"
            name="search"
            onChange={onSearchChange}
        />
    </div>
)

export default SearchBox;