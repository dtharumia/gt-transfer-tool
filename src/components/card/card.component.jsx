import React from 'react'
import { Flex, Spacer, Text, Box } from '@chakra-ui/react'

const Card = ({ number, title }) => (
    <Flex w="sm">
        <Text>{number}</Text>
        <Spacer />
        <Text>{title}</Text>
    </Flex>

)

export default Card