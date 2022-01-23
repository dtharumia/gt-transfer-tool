import React from 'react';
import Card from '../card/card.component'
import './card-header.styles.scss';


class CardHeader extends React.Component {

    constructor() {
        super();

        this.state = {
            hidden: true
        }
    }

    toggleHidden = () => {
        this.setState({
            hidden: !this.state.hidden
        })
    }

    render() {
        return <div className='card-header'>
            <span className='state' onClick={this.toggleHidden}>{this.props.state}</span>
            <div className={`cards ${this.state.hidden ? "hidden" : ""}`}>
                {
                    this.props.courses.map(course => (
                        <Card key={course.id} course={course}></Card>
                    ))
                }
            </div>
        </div>
    }
}


export default CardHeader;