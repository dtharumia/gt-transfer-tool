import React from 'react';
import CardHeader from '../card-header/card-header.component'
import { readCourseFromDatabase } from '../../firebase/firebase_utils';


import './card-list.styles.scss';


class CardList extends React.Component {

    constructor() {
        super()
        this.state = {
            states: new Set([]),
            transferCourses: []
        }
    }
    componentDidMount() {
        readCourseFromDatabase(this.props.courseName)
            .then((e) => this.setState({ transferCourses: Object.values(e) }))

        // this.props.transferCourses.map(transfer => this.state.states.add(transfer.state))
    }
    render() {
        return <div className='card-list'>
            {
                [...this.state.states].map(state => (

                    <CardHeader key={state} state={state} courses={this.props.transferCourses.filter(transfer => transfer.state.includes(state))}></CardHeader>
                ))
            }
        </div >
    }
}

export default CardList;

