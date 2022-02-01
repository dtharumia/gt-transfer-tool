import React, { useState, useEffect } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import {Center, Box, Heading, Link, Text, Stack, Badge,Button} from "@chakra-ui/react"
import SchoolCard from '../school-card/school-card'
import SocialProfileSimple from '../SocialUserProfileExample'

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


    return <Grid templateColumns='repeat(4, 1fr)' gap={6} alignItems={"flex-start"}>
        {Object.entries(dataFormatter(school)).map(entry => {
            return <GridItem bg='blue.500'>
                {/* <SchoolCard equivalency={entry}/> */}
                <Center py={6}>
                    <Box
                        maxW={'320px'}
                        w={'full'}
                        boxShadow={'2xl'}
                        rounded={'lg'}
                        p={6}
                        textAlign={'center'}>
                        <Heading fontSize={'2xl'} fontFamily={'body'}>
                            Lindsey James
                        </Heading>
                        <Text fontWeight={600} color={'gray.500'} mb={4}>
                            @lindsey_jam3s
                        </Text>
                        <Text
                            textAlign={'center'}
                            px={3}>
                            Actress, musician, songwriter and artist. PM for work inquires or{' '}
                            <Link href={'#'} color={'blue.400'}>
                                #tag
                            </Link>{' '}
                            me in your posts
                        </Text>

                        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                            <Badge
                                px={2}
                                py={1}
                                fontWeight={'400'}>
                                #art
                            </Badge>
                            <Badge
                                px={2}
                                py={1}
                                fontWeight={'400'}>
                                #photography
                            </Badge>
                            <Badge
                                px={2}
                                py={1}
                                fontWeight={'400'}>
                                #music
                            </Badge>
                        </Stack>

                        <Stack mt={8} direction={'row'} spacing={4}>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                _focus={{
                                    bg: 'gray.200',
                                }}>
                                Message
                            </Button>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'full'}
                                bg={'blue.400'}
                                color={'white'}
                                boxShadow={
                                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                }
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                _focus={{
                                    bg: 'blue.500',
                                }}>
                                Follow
                            </Button>
                        </Stack>
                    </Box>
                </Center>
            </GridItem>
        })}
        {/* {
            Object.entries(school).map(entry => {
                

            })
        } */}

    </Grid>
}

export default SchoolGrid