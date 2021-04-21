import React, { Component } from 'react';
import Topic from './Topic';

export default class TopicList extends Component {

    handleClick = id => {
        this.props.onSelectChannel(id);
    }

    render() {

        let list = <div className="no-content-message">There are no topics to show</div>;
        if (this.props.channels && this.props.channels.map) {
            list = this.props.channels.map(c => <Topic key={c.id} id={c.id} name={c.name} participants={c.participants} onClick={this.handleClick} />);
        }
        return (
            <div className='channel-list'>
                {list}
            </div>);
    }

}