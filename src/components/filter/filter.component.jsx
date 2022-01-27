import React, { useState } from 'react'

import {
    FormControl,
    Input,
    Select,
    HStack,
    FormHelperText,
    FormErrorMessage,
    VStack, Text
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

import GTCard from '../gt-card/gt-card.component';
import CardList from '../card-list/card-list.component';
import { filterGTCourses } from '../../firebase/firebase_utils';



const Filter = () => {
    const [getFilterOption, setFilterOption] = useState("");
    const [getFilterSearch, setFilterSearch] = useState("");
    const [getFilterError, setFilterError] = useState(false);

    const onFilterSelect = (event) => {
        setFilterOption(event.target.value)
        if (event.target.value) {
            setFilterError(false)
        }
    }

    const onSearchChange = (event) => {
        event.target.value = event.target.value.toUpperCase()

        if (event.target.value != "" && !getFilterOption) {
            setFilterError(true)
        }

        setFilterSearch(event.target.value)

    }

    return (
        <VStack>
            <FormControl>
                <HStack shouldWrapChildren>
                    <Input
                        id='filter-search'
                        type='text'
                        placeholder='Select a category and type to search'
                        w="sm"
                        onChange={onSearchChange} />
                    <Select id="filter-option" placeholder='Category' onChange={onFilterSelect} isInvalid={getFilterError} >
                        <option>Course</option>
                        <option>School</option>
                    </Select>
                </HStack>
            </FormControl>
            {!getFilterError && getFilterSearch ? <CardList search={getFilterSearch} type={getFilterOption} /> : null}


        </VStack >
    )
}

export default Filter;