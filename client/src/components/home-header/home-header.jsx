import { Heading, HStack, Box } from "@chakra-ui/react"


const HomeHeader = () => {

    return (
        <HStack>
            <Heading>
                <Box display={'inline'}>Georgia Tech </Box>
                <Box display={'inline'} color={'#A4925A'}>Transfer Tool</Box>
            </Heading>
        </HStack>
    )
}

export default HomeHeader