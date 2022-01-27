// import React, { useEffect, useState } from 'react';
// import GTCard from '../gt-card/gt-card.component';
// import TransferCard from '../transfer-card/transfer-card.component';
// import SchoolCard from '../school-card/school-card.component';
// import { VStack } from '@chakra-ui/react';
// import { filterGTCourses } from '../../firebase/firebase_utils';


// class CardList extends React.Component {


//     constructor() {
//         super()
//         this.state = {
//             courses: {}
//         }
//     }


//     componentDidUpdate(prevProps) {
//         if (this.props.search != prevProps.search) {
//             console.log('running')
//             filterGTCourses(this.props.search)
//                 .then(data => this.setState({ courses: data }))
//         }
//     }


//     render() {
//         return (
//             <div className='card-list'>
//                 {Object.entries(this.state.courses).map((course, index) => {
//                     return <GTCard key={index} gt_class={course} gt_title={this.state.courses[course]} />
//                 })}
//             </div>
//         )
//     }
// }

// export default CardList;

