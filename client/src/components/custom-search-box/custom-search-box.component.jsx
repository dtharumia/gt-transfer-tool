import { connectSearchBox } from 'react-instantsearch-dom';
import { Input } from '@chakra-ui/react';

const CustomSearchBox = ({ refine }) => (

    <form noValidate action="" role="search">
        <Input
            id='filter-search'
            type='search'
            placeholder='Search for GT Courses or Transfer Schools'
            w="md"
            onChange={event => refine(event.currentTarget.value)} />
    </form>
);

export default connectSearchBox(CustomSearchBox);