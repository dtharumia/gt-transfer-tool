import React, { useState } from 'react'

import {
    FormControl,
    Input,
    Select,
    Stack,
    HStack,
    Flex
} from '@chakra-ui/react'

import { filterGTCourses } from '../../firebase/firebase_utils';
import Card from '../card/card.component';

const Filter = () => {
    const [getFilterOption, setFilterOption] = useState("");
    const [getFilterSearch, setFilterSearch] = useState("");
    const [getFilterCourses, setFilterCourses] = useState({});

    const onFilterSelect = (event) => {
        setFilterOption(event.target.value)
        if (event.target.value && getFilterSearch) {
            filterGTCourses(getFilterSearch).then((data) => setFilterCourses(data))
            console.log('runningfilter')
        } else {
            setFilterCourses({})
        }
    }

    const onSearchChange = (event) => {
        event.target.value = event.target.value.toUpperCase()
        setFilterSearch(event.target.value)

        if (event.target.value && getFilterOption) {
            filterGTCourses(event.target.value).then((data) => setFilterCourses(data))
            console.log('runningsearch')
        } else {
            setFilterCourses({})
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
                    return Object.entries(getFilterCourses).map(
                        (course, index) =>
                            <Card key={index} number={course[0]} title={course[1]} />
                    )
                })()}
            </Flex>
        </Stack >
    )
}

export default Filter;