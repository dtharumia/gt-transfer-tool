import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    components: {
        Heading: {

            variants: {
                'gold-text': {
                    color: '#A4925A',
                },
                "blue-text": {
                    color: "#003057"
                }
            },
        },
    },
})

export default theme
