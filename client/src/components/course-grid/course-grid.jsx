import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import Card from '../card/card'


const dataFormatter = (schools) => {
    let data = {}
    Object.entries(schools).forEach(([key, val]) => {
        if (!Object.keys(data).includes(val["state"])) {
            data = { ...data, [val["state"]]: [] }
        }
        data = {
            ...data, [val["state"]]:
                [...data[val["state"]], [val["transfer_school"], val["transfer_class"]]]
        }
    })
    return data
}



const CourseGrid = ({ course }) => {

    return <Grid templateColumns='repeat(3, 1fr)' gap={6} alignItems={"flex-start"}>
        {Object.entries(dataFormatter(course)).sort().map(data => {
            return <GridItem key={data[0]}>
                <Card data={data} />
            </GridItem>
        })}
    </Grid>
}

export default CourseGrid