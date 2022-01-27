import React, { useState } from 'react'

import {
    FormControl,
    Input,
    Select,
    HStack,
    FormHelperText,
    FormErrorMessage
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

const Filter = () => {
    const [getFilterOption, setFilterOption] = useState("");
    const [getFilterSearch, setFilterSearch] = useState("");
    const [getFilterError, setFilterError] = useState(false);

    const onFilterSelect = (event) => {
        setFilterOption(event.target.value)
        if(event.target.value) {
            setFilterError(false)
        }
    }

    const onSearchChange = (event) => {

        if (event.target.value != "" && !getFilterOption) {
            setFilterError(true)
        }

        setFilterSearch(event.target.value)

    }

    return <FormControl>
        <HStack shouldWrapChildren>
            <Input
                id='filter-search'
                type='text'
                placeholder='Select a filter and type to search'
                w="sm"
                onChange={onSearchChange} />
            <Select id="filter-option" placeholder='Filter By' onChange={onFilterSelect} isInvalid={getFilterError} >
                <option>Course</option>
                <option>School</option>
            </Select>
        </HStack>
    </FormControl>
}

export default Filter;