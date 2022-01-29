
import React, { useState } from 'react'
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { searchClient } from '../../typesenseAdapter';
import FilterHits from '../filter-hits/filter-hits.component';
import {
    FormControl,
    Input,
    Select,
    Stack,
    HStack,
    Flex
} from '@chakra-ui/react'

import CustomSearchBox from '../custom-search-box/custom-search-box.component';

const Filter = () => {
    const [getFilterData, setFilterData] = useState({});
    const [getSearchStatus, setSearchStatus] = useState(false)

    const onFilterSelect = (event) => {
        // setFilterOption(event.target.value.toLowerCase() + "s")
    }


    return (
        <InstantSearch indexName={"courses"} searchClient={searchClient}>
            <CustomSearchBox />
            <FilterHits />
        </InstantSearch>
    )


}

export default Filter;
