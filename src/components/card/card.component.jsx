import React from 'react'
import { useNavigate } from 'react-router-dom';

import { Flex, Spacer, Text, Box } from '@chakra-ui/react'

const filterSelect = (e) => {

    // navigate(`course/${"gt_class".replaceAll(" ", "_")}`)
    console.log(e)
}


const Card = ({ left, right }) => (
    <Flex w="sm" onClick={filterSelect}>
        <Text>{left}</Text>
        <Spacer />
        <Text>{right}</Text>
    </Flex>

)

export default Card