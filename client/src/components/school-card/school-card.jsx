import React, {useState} from 'react'

import { Box, Heading, Text } from '@chakra-ui/react';

const SchoolCard = ({ equivalency }) => {
    const [getHidden, setHidden] = useState(true)
    return (
        <Box>
            <Heading cursor={"pointer"} onClick={() => setHidden(!getHidden)}>
                {equivalency[0]}
            </Heading>
            <Box display={getHidden ? "none" : "block"}>
                {
                    equivalency[1].map(course => {
                        return <Box>
                            <Text>{`${course[0]} ---> ${course[1]}`}</Text>
                        </Box>
                    })
                }
            </Box>

        </Box>
    )

}

export default SchoolCard;