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

    const runFilter = (filterOption, filterSearch) => {
        if (filterOption && filterSearch) {
            filterCategory(filterOption, filterSearch).then((data) => {
                if (data) {
                    setFilterData(data)
                }
            })
        } else {
            setFilterData({})
        }
    }

    const onFilterSelect = (event) => {
        setFilterOption(event.target.value)
        runFilter(event.target.value, getFilterSearch)

    }

    const onSearchChange = (event) => {
        const search = event.target.value.toUpperCase();
        runFilter(getFilterOption, search)


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
                    <Select id="filter-option" placeholder='Category' onChange={onFilterSelect} isInvalid={getFilterSearch !== " " && getFilterOption === ""} >
                        <option>Course</option>
                        <option>School</option>
                    </Select>
                </HStack>
            </FormControl>
            <Flex flexDir={"column"} >
                {(() => {
                    return Object.entries(getFilterData).map(
                        (data, index) =>
                            <Card key={index} left={data[1][0]} right={data[1][1]} />
                    )
                })()}
            </Flex>
        </Stack >
    )
}

export default Filter;