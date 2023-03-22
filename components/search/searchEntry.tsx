import { Box, Text } from "@chakra-ui/react";

const SearchEntry = ({ hit }) => {
    console.log(hit)
    return (
        <Box textAlign={'center'}>
            <Text>{hit.entry}</Text>
            <Text>{hit.type}</Text>
        </Box>
    );

}

export default SearchEntry;