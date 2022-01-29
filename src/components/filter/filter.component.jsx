
import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom';
import { searchClient } from '../../typesenseAdapter';
import FilterHits from '../filter-hits/filter-hits.component';

import CustomSearchBox from '../custom-search-box/custom-search-box.component';

const Filter = () => {
    return (
        <InstantSearch indexName={"searches"} searchClient={searchClient}>
            <CustomSearchBox />
            <FilterHits />
        </InstantSearch>
    )


}

export default Filter;
