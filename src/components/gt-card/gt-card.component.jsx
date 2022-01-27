import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Text } from '@chakra-ui/react';
const GTCard = ({ gt_class, gt_title }) => {

    return (
        <Stack shouldWrapChildren>
            <Text>{gt_class}</Text>
            <Text>{gt_title}</Text>
        </Stack>
    )
    // const navigate = useNavigate();

    // const CourseSelect = () => {

    //     navigate(`course/${gt_class.replaceAll(" ", "_")}`, {
    //         state: {
    //             gt_class: gt_class,
    //             gt_title: gt_title
    //         }
    //     })
    // }

    // return (
    //     <div className='gt-card' onClick={CourseSelect}>
    //         <span className='gt-class'>{gt_class}</span>
    //         <span className='gt-title'>{gt_title}</span>
    //     </div>
    // )
}

export default GTCard;