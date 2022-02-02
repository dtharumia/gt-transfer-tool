import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import SchoolCard from '../card/card'


const dataFormatter = (courses) => {
    let data = {}
    Object.entries(courses).forEach(([key, val]) => {
        if (!Object.keys(data).includes(val["gt_class"].split(" ")[0])) {
            data = { ...data, [val["gt_class"].split(" ")[0]]: [] }
        }
        data = {
            ...data, [val["gt_class"].split(" ")[0]]:
                [...data[val["gt_class"].split(" ")[0]], [val["gt_class"], val["transfer_class"]]]
        }
    })
    return data
}



const SchoolGrid = ({ school }) => {

    return <Grid templateColumns='repeat(3, 1fr)' gap={6} alignItems={"flex-start"}>
        {Object.entries(dataFormatter(school)).sort().map(data => {
            return <GridItem key={data[0]}>
                <SchoolCard data={data} />
            </GridItem>
        })}
    </Grid>
}

export default SchoolGrid