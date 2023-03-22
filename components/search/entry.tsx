import { Box, Text } from "@chakra-ui/react";

const Entry = ({ hit }) => {
    console.log(hit)
    return (
        <Box>
            <Text>{hit.gt_class}</Text>
            <Text>{hit.transfer_class}</Text>
            <Text>{hit.transfer_school}</Text>
        </Box>
    );

}

export default Entry;