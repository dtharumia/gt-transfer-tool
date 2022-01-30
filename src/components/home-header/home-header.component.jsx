import { Heading, HStack } from "@chakra-ui/react"


const HomeHeader = () => {

    return (
        <HStack>
            <Heading>Georgia Tech</Heading>
            <Heading variant={"gold-text"}>Transfer Tool</Heading>
        </HStack>
    )
}

export default HomeHeader