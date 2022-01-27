import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import { useState } from 'react';

const FilterSelector = () => {

    const [getFilterOption, setFilterOption] = useState("");


    const onFilterSelect = (event) => {
        setFilterOption(event.target.textContent)
    }

    return <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {getFilterOption ? getFilterOption : "Filter By"}
        </MenuButton>
        <MenuList onClick={onFilterSelect}>
            <MenuItem>Course</MenuItem>
            <MenuItem>School</MenuItem>
        </MenuList>
    </Menu>
}

export default FilterSelector