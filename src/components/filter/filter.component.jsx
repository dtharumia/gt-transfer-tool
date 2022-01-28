
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

import 'instantsearch.css/themes/satellite.css';
import './filter.styles.scss'

const Filter = () => {
    const [getFilterOption, setFilterOption] = useState("courses");
    const [getFilterData, setFilterData] = useState({});

    const onFilterSelect = (event) => {
        setFilterOption(event.target.value.toLowerCase() + "s")
    }


    return (

        <InstantSearch indexName={`${getFilterOption}`} searchClient={searchClient}>
            <HStack shouldWrapChildren>
            <SearchBox />
            <Select id="filter-option" onChange={onFilterSelect}>
                <option>Course</option>
                <option>School</option>
            </Select>
            </HStack>
            <FilterHits />
        </InstantSearch>
    )
}

export default Filter;
