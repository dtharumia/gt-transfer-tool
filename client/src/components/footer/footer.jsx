import { Container, Stack, Link, Text } from '@chakra-ui/react'
import React from 'react'


import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            pl={0}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            align={{ base: 'center', md: 'center' }}>
            <Text>© 2022 Dharshan Tharumia</Text>
            <Link href='https://github.com/dtharumia'><AiFillGithub /></Link>
        </Container>
    )
}

export default Footer