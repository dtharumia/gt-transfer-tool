
import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom';
import { searchClient } from '../../typesenseAdapter';
import FilterHits from '../filter-hits/filter-hits';

import CustomSearchBox from '../custom-search-box/custom-search-box';

const Filter = () => {
    return (
        <InstantSearch indexName={"searches"} searchClient={searchClient} key={window.location.pathname}>
            <CustomSearchBox />
            <FilterHits/>
        </InstantSearch>
    )


}

export default Filter;
