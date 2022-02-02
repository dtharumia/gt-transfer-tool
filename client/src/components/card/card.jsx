import React, { useState } from 'react'

import { Center, Box, Heading, Stack, Text } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
const Card = ({ data }) => {
    const [getHidden, setHidden] = useState(true)

    return < Center py={6} >
        <Box
            maxW={'320px'}
            w={'full'}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            <Heading fontSize={'2xl'} fontFamily={'body'} cursor={"pointer"} onClick={() => setHidden(!getHidden)}>
                {data[0]}
            </Heading>
            <Stack mt={8} direction={'row'} spacing={4}>
            </Stack>
            <Box display={getHidden ? "none" : "block"}>
                {data[1].map(course =>
                    <Text key={Math.random()}>
                        {course[0]} <ArrowForwardIcon /> {course[1]}
                    </Text>
                )}
            </Box>

        </Box>
    </Center >
}

export default Card