import React from 'react';
import GTCard from '../gt-card/gt-card.component';
import TransferCard from '../transfer-card/transfer-card.component';
import SchoolCard from '../school-card/school-card.component';
import './card-list.styles.scss';


const CardList = ({ courses, type }) => {
    return <div className='card-list'>
        {
            type === "gt" ? (Object.keys(courses).map((course, index) => (
                <GTCard key={index} gt_class={course} gt_title={courses[course]} />
            ))) : ""
        }
        {
            type === "transfer" ? (Object.values(courses).map((transfer, index) => (
                <TransferCard key={index} transfer={transfer} />
            ))) : ""
        }
        {
            type === "school" ? (Object.values(courses).map((course, index) => (
                <SchoolCard key={index} course={course} />
            ))) : ""
        }
    </div>
}

export default CardList;

