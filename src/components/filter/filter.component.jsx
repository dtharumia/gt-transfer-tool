import React, { useState } from 'react'

import {
    FormControl,
    Input,
    Select,
    Stack,
    HStack,
    Flex
} from '@chakra-ui/react'

import { filterCategory } from '../../firebase/firebase_utils';
import Card from '../card/card.component';

const Filter = () => {
    const [getFilterOption, setFilterOption] = useState("");
    const [getFilterSearch, setFilterSearch] = useState("");
    const [getFilterData, setFilterData] = useState({});

    const onFilterSelect = (event) => {
        setFilterOption(event.target.value)
        if (event.target.value && getFilterSearch) {
            filterCategory(event.target.value, getFilterSearch).then((data) => setFilterData(data))
            console.log('runningfilter')
        } else {
            setFilterData({})
        }
    }

    const onSearchChange = (event) => {
        if (getFilterOption === "Course") {
            event.target.value = event.target.value.toUpperCase()
            setFilterSearch(event.target.value)
        } else if (getFilterOption === "School") {
            event.target.value = event.target.value.toLowerCase()
            setFilterSearch(event.target.value)
        }
        if (event.target.value && getFilterOption) {
            filterCategory(getFilterOption, event.target.value).then((data) => setFilterData(data))
            console.log('runningsearch')
        } else {
            setFilterData({})
        }

    }

    return (
        <Stack>
            <FormControl>
                <HStack shouldWrapChildren>
                    <Input
                        id='filter-search'
                        type='text'
                        placeholder='Select a category and type to search'
                        w="sm"
                        onChange={onSearchChange} />
                    <Select id="filter-option" placeholder='Category' onChange={onFilterSelect} isInvalid={getFilterSearch && !getFilterOption} >
                        <option>Course</option>
                        <option>School</option>
                    </Select>
                </HStack>
            </FormControl>
            <Flex flexDir={"column"} >
                {(() => {
                    return Object.entries(getFilterData).map(
                        (data, index) =>
                            <Card key={index} left={data[0]} right={data[1]} />
                    )
                })()}
            </Flex>
        </Stack >
    )
}

export default Filter;